import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Customer } from '../../model/customer';
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
  @Output() addCustomerEvent = new EventEmitter<Customer>();  // Usa EventEmitter de @angular/core

  @Input() customer!: Customer;  // Recibe el cliente desde el padre
  @Input() operation!: string;

  constructor(
  ) {}

  ngOnInit(): void {
    if (this.operation === 'actualizar') {
      this.formCustomer = { ...this.customer};
    }
  }

  formCustomer: Customer = {
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
    } else {
    }
  }

  // Método para agregar o actualizar la mascota
  savePet(form: any) {
    this.addCustomerEvent.emit(this.formCustomer);  // Emite el evento con la mascota
  }
}
