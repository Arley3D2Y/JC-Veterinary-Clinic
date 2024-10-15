import { Tratamiento } from '../../model/tratamiento';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink  } from '@angular/router';
import { Mascota } from '../../model/mascota';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SharedHeaderComponent } from '../../ToolsComponents/shared-header/shared-header.component';


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
  
    constructor(
      private router: Router,
    ) {}
  
    ngOnInit(): void {
      if (this.operation === 'actualizar' && this.treatmentUpdate) {
        this.formTreatment = { ...this.treatmentUpdate };
      } else {
        this.formTreatment;
      }
    }
  
    formTreatment: Tratamiento = {
      id: 0,
      descripcion: '',
      observaciones: '',
      fechaInicio: new Date(),
      fechaFin: new Date(),
      mascota: this.pet,
    }
  
    pageBack() {
      if (this.operation === 'agregar') {
        this.router.navigate(['/veterinario/detalles/mascota/', this.pet.id]);
      } else {
        this.router.navigate(['/veterinario/detalles/tratamiento/', this.treatmentUpdate.id]);
      }
    }
  
    // Método para agregar o actualizar la mascota
    savePet(form: any) {
      this.addTreatmentEvent.emit(this.formTreatment);  // Emite el evento con la mascota
    }
  
}
