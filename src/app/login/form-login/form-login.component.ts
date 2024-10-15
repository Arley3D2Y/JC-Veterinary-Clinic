import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { VeterinarioService } from '../../services/veterinario.service';
import { AdministradorService } from '../../services/administrador.service';
import { LoginOptionsComponent } from '../login-options/login-options.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Administrador } from '../../model/administrador';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [
    CommonModule, LoginOptionsComponent, FormsModule,
  ],
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css'] // Corrige 'styleUrl' a 'styleUrls'
})
export class FormLoginComponent implements OnInit {
  @Input() userType: string | null = null;
  typeUser!: string;

  // Modelo para el formulario
  formCliente = {
    cedula: ''
  };

  formAdmin = {
    usuario: '',
    password: ''
  };

  formVeterinario = {
    correo: '',
    password: ''
  };

  constructor(
    private router: Router,
    private vetService: VeterinarioService,
    private adminService: AdministradorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.typeUser = params['typeUser'] || 'cliente'; // Establecer 'cliente' por defecto
    });
    
    // Si el 'userType' está definido, sobrescribir 'typeUser'
    if (this.userType === 'administrador') {
      this.typeUser = 'administrador';
    }
  }

  // Cambiar tipo de usuario
  changeUserType(type: string) {
    this.typeUser = type;
    this.clearForm();
  }

  clearForm() {
    this.formCliente.cedula = '';
    this.formVeterinario.correo = '';
    this.formVeterinario.password = '';
    this.formAdmin.password = '';
    this.formAdmin.usuario = '';
  }

  onSubmit() {
    if (this.userType === null) {
      // Login normal de clientes o veterinarios
      if (this.typeUser === 'cliente') {
        this.router.navigate(['cliente/dashboard', this.formCliente.cedula]);
      } else if (this.typeUser === 'veterinario') {
        this.vetService.searchbyEmail(this.formVeterinario.correo).subscribe(
          (veterinario) => {
            if (veterinario) {
              if (veterinario.password === this.formVeterinario.password) {
                this.router.navigate(['veterinario/clientes']);
              } else {
                alert('Contraseña incorrecta');
              }
            } else {
              alert('Veterinario no encontrado');
            }
          });
      }
    }  else if (this.userType === 'administrador') {
      this.adminService.seachByUser(this.formAdmin.usuario).subscribe(
        (admin: Administrador) => { 
          if (admin && admin.password === this.formAdmin.password) {
            this.router.navigate(['administrador/veterinario']);
          } else {
            alert('Administrador no encontrado o contraseña incorrecta');
          }
        },
        (error) => {
          alert('Error al buscar administrador');
        }
      );
    }
  }
}
