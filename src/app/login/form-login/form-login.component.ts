import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { LoginOptionsComponent } from '../login-options/login-options.component';
import { VeterinaryService } from '../../services/veterinary.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [
    CommonModule, LoginOptionsComponent, FormsModule, 
  ],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css'
})
export class FormLoginComponent {
  typeUser!: string;

  // Modelo para el formulario
  formCliente = {
    cedula: ''
  };

  formVeterinario = {
    correo: '',
    password: ''
  };

  constructor(
    private router: Router,
    private vetService: VeterinaryService, // Inyectar el servicio
    private route: ActivatedRoute
  ) {
    
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.typeUser = params['typeUser'] || 'cliente'; // Establecer 'cliente' por defecto
    });
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
  }

  onSubmit() {
    if (this.typeUser === 'cliente') {
      this.router.navigate(['cliente/dashboard', this.formCliente.cedula]); // Redirige a la página del cliente
    } else if (this.typeUser === 'veterinario') {
      const veterinario = this.vetService.findByCorreo(this.formVeterinario.correo);

      if (veterinario.password === this.formVeterinario.password) {
        this.router.navigate(['veterinario/clientes']);
      }
    }
  }

}
