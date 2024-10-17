import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Veterinario } from '../../model/veterinario';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Especialidad } from '../../model/especialidad';

@Component({
  selector: 'app-veterinario-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule],
  templateUrl: './veterinario-form.component.html',
  styleUrl: './veterinario-form.component.css'
})
export class VeterinarioFormComponent {
  // Queremos que la mascota se transmita al componente padre a través de un evento
  @Output() addVeterinarioEvent = new EventEmitter<Veterinario>();  // Usa EventEmitter de @angular/core

  @Input() veterinary!: Veterinario;  // Recibe el cliente desde el padre
  @Input() operation!: string;
  especialidades: Especialidad[] = [];
  selectedEspecialidades: Especialidad[] = [];
 
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.operation === 'actualizar') {
      this.formVeterinario = { ...this.veterinary };
    }
  }

  formVeterinario: Veterinario = {
    id: 0,
    nombre: '',
    cedula: '',
    correo: '',
    password: '',
    fotoString: '',
    especialidades: null as any,
    tratamietos: [],
  };

  pageBack() {
    if (this.operation === 'agregar') {
      this.router.navigate(['/administrador/veterinario']);
    } else {
      this.router.navigate(['/administrador/detalles/veterinario/', this.veterinary.id]);
    }
  }

  saveVet(form: any) {
    this.addVeterinarioEvent.emit(form);
  }
}
