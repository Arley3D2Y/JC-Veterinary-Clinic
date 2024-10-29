import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Veterinario } from '../../model/veterinario';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Especialidad } from '../../model/especialidad';
import { EspecialidadesService } from '../../services/especialidades.service';

@Component({
  selector: 'app-veterinario-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './veterinario-form.component.html',
  styleUrls: ['./veterinario-form.component.css']
})
export class VeterinarioFormComponent {
  @Output() addVeterinarioEvent = new EventEmitter<Veterinario>();
  @Input() veterinary!: Veterinario;
  @Input() operation!: string;

  especialidades: Especialidad[] = [];
  selectedEspecialidad?: Especialidad;

  constructor(
    private router: Router,
    private especialidadService: EspecialidadesService
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

      // Asignamos la especialidad seleccionada si estamos en modo de actualización
      this.selectedEspecialidad = this.formVeterinario.especialidad;
    }
  }

  formVeterinario: Veterinario = {
    id: 0,
    nombre: '',
    cedula: '',
    correo: '',
    password: '',
    fotoString: '',
    especialidad: undefined,
    tratamietos: [],
    cantidadAtenciones: 0,
    estado: false,
  };

  pageBack() {
    if (this.operation === 'agregar') {
      this.router.navigate(['/administrador/veterinario']);
    } else {
      this.router.navigate(['/administrador/detalles/veterinario/', this.veterinary.id]);
    }
  }

  onSelectSpeciality(especialidad: Especialidad): void {
    // Asignamos la especialidad seleccionada directamente
    this.selectedEspecialidad = especialidad;
  }
  
  isSpecialitySelected(especialidad: Especialidad): boolean {
    // Comprobamos si la especialidad seleccionada es la actual
    return this.selectedEspecialidad?.id === especialidad.id;
  }
  
  saveVet(form: any) {
    // Asignamos la especialidad seleccionada al formulario del veterinario
    this.formVeterinario.especialidad = this.selectedEspecialidad;
    console.log("Veterinario a guardar:", this.formVeterinario);
    this.addVeterinarioEvent.emit(this.formVeterinario);
  }
}
