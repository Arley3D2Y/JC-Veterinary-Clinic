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
import { User } from '../../model/user';
import { LoginService } from '../../services/login.service';

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
  formUser: User = {
    username: '',
    password: ''
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
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
    this.formUser = {
      username: '',
      password: ''
    }
  }

  login() {
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
    this.loginService.loginCliente(this.formUser).subscribe(
      (data) => {
        localStorage.setItem('token', String(data)); // Guarda el token en localStorage
        this.router.navigate(['cliente/home']);
      }
    );
  }

  private loginVeterinario() {
    this.loginService.loginVet(this.formUser).subscribe(
      (data) => {
        localStorage.setItem('token', String(data)); // Guarda el token en localStorage
        this.router.navigate(['veterinario/home']);
      }
    )
  }

  private loginAdministrador() {
    this.loginService.loginAdmin(this.formUser).subscribe(
      (data) => {
        localStorage.setItem('token', String(data)); // Guarda el token en localStorage
        this.router.navigate(['administrador/home']);
      }
    )
  }

}
