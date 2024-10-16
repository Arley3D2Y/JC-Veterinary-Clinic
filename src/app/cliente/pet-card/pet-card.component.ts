import { Component, Input } from '@angular/core';
import { PetService } from '../../services/pet.service';
import { Tratamiento } from '../../model/tratamiento';
import { Mascota } from '../../model/mascota';

@Component({
  selector: 'app-pet-card',
  standalone: true,
  imports: [

  ],
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.css']
})
export class PetCardComponent {
  @Input() mascotaSeleccionada: any;  // La mascota seleccionada vendrá del componente padre
  
  constructor(
    private mascotaService: PetService,
  ) { }

  ngOnInit() {
    if (this.mascotaSeleccionada != undefined) {
    this.mascotaService.getTreatmentsByPetId(this.mascotaSeleccionada.id).subscribe({
      next: (tratamientos: Tratamiento[]) => {
        this.mascotaSeleccionada.tratamientos = tratamientos
      }, error: (error) => {
        if (error.status === 404) {
          alert('Mascota no encontrada');
        }
      }
    }) 
    }
  }
}
