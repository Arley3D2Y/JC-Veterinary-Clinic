import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { VeterinarioService } from '../../services/veterinario.service';
import { AdministradorService } from '../../services/administrador.service';
import { LoginOptionsComponent } from '../login-options/login-options.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Administrador } from '../../model/administrador';
import { CustomerService } from '../../services/customer.service';

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
  typeUser: string | null = null;

  // Modelo para el formulario
  form = {
    cedula: '',
    usuario: '',
    password: '',
    correo: '',
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clientService: CustomerService,
    private vetService: VeterinarioService,
    private adminService: AdministradorService,
  ) { }

  ngOnInit() {
    if (this.userType) {
      this.typeUser = this.userType;
    } else {
      this.typeUser = 'cliente';
    }
  }

  // Cambiar tipo de usuario
  changeUserType(type: string) {
    this.typeUser = type;
    this.clearForm();
  }

  clearForm() {
    this.form = {
      cedula: '',
      usuario: '',
      password: '',
      correo: '',
    }
  }

  onSubmit() {
    switch (this.typeUser) {
      case 'cliente':
        this.loginCliente();
        break;

      case 'veterinario':
        this.loginVeterinario();
        break;

      case 'administrador':
        this.loginAdministrador();
        break;

      default:
        alert("Tipo de usuario no válido");
        break;
    }
  }

  private loginCliente() {
    this.clientService.searchByDocument(this.form.cedula).subscribe({
      next: (customer) => {
        if (customer.cedula === this.form.cedula) {
          this.router.navigate(['cliente/dashboard', this.form.cedula]);
        }
      },
      error: (error) => {
        if (error.status === 404) {
          alert('Cliente no encontrado');
        }
      }
    });
  }

  private loginVeterinario() {
    this.vetService.searchbyEmail(this.form.correo).subscribe({
      next: (veterinario) => {
        if (veterinario.password === this.form.password) {
          this.router.navigate(['veterinario/clientes'], { queryParams: { id: veterinario.id } });
        } else {
          alert('Contraseña incorrecta');
        }
      },
      error: (error) => {
        if (error.status === 404) {
          alert('Veterinario no encontrado');
        }
      }
    });
  }

  private loginAdministrador() {
    this.adminService.seachByUser(this.form.usuario).subscribe({
      next: (admin) => {
        if (admin && admin.password === this.form.password) {
          this.router.navigate(['administrador/veterinario']);
        } else {
          alert('Contraseña incorrecta');
        }
      },
      error: (error) => {
        if (error.status === 404) {
          alert('Administrador no encontrado');
        } else if (error.status === 401) {
        }
      }
    });
  }

}
