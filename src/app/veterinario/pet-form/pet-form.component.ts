import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink  } from '@angular/router';
import { Cliente } from '../../model/cliente';
import { Mascota } from '../../model/mascota';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { SharedHeaderComponent } from '../shared-header/shared-header.component';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    SharedHeaderComponent
  ],
  templateUrl: './pet-form.component.html',
  styleUrl: './pet-form.component.css'
})
export class PetFormComponent {
  // Queremos que la mascota se transmita al componente padre a través de un evento
  @Output() addPetEvent = new EventEmitter<Mascota>();  // Usa EventEmitter de @angular/core

  @Input() petUpdated!: Mascota;
  @Input() customer!: Cliente;  // Recibe el cliente desde el padre
  @Input() operation!: string;

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (this.operation === 'actualizar' && this.petUpdated) {
      this.formPet = { ...this.petUpdated};
    } else {
      this.formPet;
    }
  }

  formPet: Mascota = {
    id: 0,
    nombre: '',
    sexo: '',
    raza: '',
    fechaNacimiento: '',
    fotoString: '',
    tratamientos: [],
    cliente: undefined
  }

  pageBack() {
    if (this.operation === 'agregar') {
      this.router.navigate(['/veterinario/detalles/cliente/', this.customer.id]);
    } else {
      this.router.navigate(['/veterinario/detalles/mascota/', this.petUpdated.id]);
    }
  }

  // Método para agregar o actualizar la mascota
  savePet(form: any) {
    this.addPetEvent.emit(this.formPet);  // Emite el evento con la mascota
  }
}
