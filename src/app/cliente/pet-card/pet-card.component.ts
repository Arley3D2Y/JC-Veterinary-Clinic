import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PetService } from '../../services/pet.service';
import { Tratamiento } from '../../model/tratamiento';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pet-card',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.css']
})
export class PetCardComponent implements OnChanges {
  @Input() mascotaSeleccionada: any;  // La mascota seleccionada vendrá del componente padre
  tratamientoSeleccionado: any;
  total = 0;
  id: number = 0;
  
  constructor(
    private mascotaService: PetService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['mascotaSeleccionada'] && this.mascotaSeleccionada) {
      this.buscarTratamientos();
    }
  }

  buscarTratamientos() {
    this.mascotaService.getTreatmentsByPetId(this.mascotaSeleccionada.id).subscribe({
      next: (tratamientos) => {
        this.mascotaSeleccionada.tratamientos = tratamientos;
        this.tratamientoSeleccionado = this.mascotaSeleccionada.tratamientos[0];
        this.total = tratamientos.length;
      }, 
      error: (error) => {
        if (error.status === 404) {
          alert('Mascota no encontrada');
        }
      }
    });
  }

  pageBack() {
    this.id = this.id - 1;
    this.tratamientoSeleccionado = this.mascotaSeleccionada.tratamientos[this.id];
  }

  pageNext() {
    this.id = this.id + 1;
    this.tratamientoSeleccionado = this.mascotaSeleccionada.tratamientos[this.id];
  }
}
