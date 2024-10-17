import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Veterinario } from '../../model/veterinario';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Especialidad } from '../../model/especialidad';
import { EspecialidadesService } from '../../services/especialidades.service'; // Asegúrate de importar tu servicio

@Component({
  selector: 'app-veterinario-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './veterinario-form.component.html',
  styleUrl: './veterinario-form.component.css'
})
export class VeterinarioFormComponent {
  @Output() addVeterinarioEvent = new EventEmitter<Veterinario>();
  @Input() veterinary!: Veterinario;
  @Input() operation!: string;

  especialidades: Especialidad[] = [];
  selectedEspecialidades: Especialidad[] = [];

  constructor(
    private router: Router,
    private especialidadService: EspecialidadesService  // Inyectamos el servicio
  ) { }

  ngOnInit(): void {
    // Cargar especialidades al iniciar el componente
    this.especialidadService.findAll().subscribe(
      (data: Especialidad[]) => {
        this.especialidades = data;
      },
      (error) => {
        console.error('Error al cargar especialidades', error);
      }

    );

    if (this.operation === 'actualizar' && this.veterinary) {
      this.formVeterinario = { ...this.veterinary };

      this.selectedEspecialidades = this.formVeterinario.especialidades || [];
    }
  }

  formVeterinario: Veterinario = {
    id: 0,
    nombre: '',
    cedula: '',
    correo: '',
    password: '',
    fotoString: '',
    especialidades: [],
    tratamietos: [],
  };

  pageBack() {
    if (this.operation === 'agregar') {
      this.router.navigate(['/administrador/veterinario']);
    } else {
      this.router.navigate(['/administrador/detalles/veterinario/', this.veterinary.id]);
    }
  }
  onSelectSpeciality(event: any, especialidad: Especialidad): void {
    if (event.target.checked) {
      // Agregar especialidad si está seleccionada
      this.selectedEspecialidades.push(especialidad);
    } else {
      // Eliminar especialidad si no está seleccionada
      this.selectedEspecialidades = this.selectedEspecialidades.filter(e => e.id !== especialidad.id);
    }
  }
  
  isSpecialitySelected(especialidad: Especialidad): boolean {
    return this.selectedEspecialidades.some(e => e.id === especialidad.id);
  }
  
  saveVet(form: any) {
    // Aseguramos que las especialidades no sean undefined antes de asignarlas
    this.formVeterinario.especialidades = this.selectedEspecialidades ;
    console.log("Veterinario a guardar:", this.formVeterinario);
    this.addVeterinarioEvent.emit(this.formVeterinario);
  }
}
