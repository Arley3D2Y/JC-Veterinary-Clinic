import { Tratamiento } from '../../model/tratamiento';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink  } from '@angular/router';
import { Mascota } from '../../model/mascota';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SharedHeaderComponent } from '../../ToolsComponents/shared-header/shared-header.component';
import { Droga } from '../../model/droga';
import { DrogaService } from '../../services/droga.service';
import { Veterinario } from '../../model/veterinario';
import { VeterinarioService } from '../../services/veterinario.service';

@Component({
  selector: 'app-treatment-form',
  standalone: true,
  imports: [
    SharedHeaderComponent,
    FormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './treatment-form.component.html',
  styleUrl: './treatment-form.component.css'
})
export class TreatmentFormComponent {
    // Queremos que la mascota se transmita al componente padre a través de un evento
    @Output() addTreatmentEvent = new EventEmitter<Tratamiento>();  // Usa EventEmitter de @angular/core

    @Input() treatmentUpdate!: Tratamiento;
    @Input() pet!: Mascota;  // Recibe el cliente desde el padre
    @Input() operation!: string;
 
    drogas: Droga[] = [];

    constructor(
      private serviceDroga: DrogaService,
      private router: Router,
    ) {}
  
    ngOnInit(): void {
      if (this.operation === 'actualizar' && this.treatmentUpdate) {
        this.formTreatment = { ...this.treatmentUpdate };
      }
      this.serviceDroga.findAll().subscribe(
        (data: Droga[]) => {
          this.drogas = data;
        }
      )
    }
  
    formTreatment: Tratamiento = {
      id: 0,
      descripcion: '',
      observaciones: '',
      fechaInicio: new Date(),
      fechaFin: new Date(),
      mascota: {} as Mascota,
      veterinario: {} as Veterinario, 
      droga: {} as Droga
    };
  
    pageBack() {
      if (this.operation === 'agregar') {
        this.router.navigate(['/veterinario/detalles/mascota/', this.pet.id]);
      } else {
        this.router.navigate(['/veterinario/detalles/tratamiento', this.pet.id]);        
      }
    }
  
    // Método para agregar o actualizar la mascota
    saveTreatment(form: any) {
      this.formTreatment.mascota = this.pet;
      this.addTreatmentEvent.emit(this.formTreatment);  // Emite el evento con la mascota
    }
  
}
