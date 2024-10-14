import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { Cliente } from '../../model/cliente';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
export class CustomerFormComponent {
  // Queremos que la mascota se transmita al componente padre a través de un evento
  @Output() addCustomerEvent = new EventEmitter<Cliente>();  // Usa EventEmitter de @angular/core

  @Input() customer!: Cliente;  // Recibe el cliente desde el padre
  @Input() operation!: string;

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (this.operation === 'actualizar' && this.customer) {
      this.formCustomer = { ...this.customer};
    }
  }

  formCustomer: Cliente = {
    id: 0,
    nombre: '',
    cedula: '',
    correo: '',
    celular: '',
    direccion: '',
    fotoString: '',
    mascotas: []
  };

  pageBack() {
    if (this.operation === 'agregar') {
      this.router.navigate(['/veterinario/clientes']);
    } else {
      this.router.navigate(['/veterinario/detalles/cliente/', this.customer.id]);
    }
  }

  // Método para agregar o actualizar la mascota
  savePet(form: any) {
    this.addCustomerEvent.emit(this.formCustomer);  // Emite el evento con la mascota
  }
}
