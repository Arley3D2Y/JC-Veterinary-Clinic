import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink  } from '@angular/router';
import { Cliente } from '../../model/cliente';
import { Mascota } from '../../model/mascota';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { SharedHeaderComponent } from '../../ToolsComponents/shared-header/shared-header.component';
import { Enfermedad } from '../../model/enfermedad';
import { Estado } from '../../model/estado';
import { EstadoService } from '../../services/estado.service';
import { EnfermedadService } from '../../services/enfermedad.service';
import { Console } from 'console';

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

  estados: Estado[] = [];
  enfermedades: Enfermedad[] = [];

  constructor(
    private router: Router,
    private serviceEstado: EstadoService,
    private serviceEnfermedad: EnfermedadService
  ) {}

  ngOnInit(): void {
    if (this.operation === 'actualizar' && this.petUpdated) {
      this.formPet = { ...this.petUpdated};
    } else {
      this.formPet;
    }
    this.serviceEstado.findAll().subscribe(
      (data: Estado[]) => {
        this.estados = data;
      }
    )
    this.serviceEnfermedad.findAll().subscribe(
      (data: Enfermedad[]) => {
        this.enfermedades = data;
      }
    )
  }

  formPet: Mascota = {
    id: 0,
    nombre: '',
    edad: '',
    peso: '',
    raza: '',
    sexo: '',
    fotoString: '',
    enfermedad: {} as Enfermedad,
    estado: {} as Estado,
    cliente: this.customer,
    tratamientos: []
  };

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
