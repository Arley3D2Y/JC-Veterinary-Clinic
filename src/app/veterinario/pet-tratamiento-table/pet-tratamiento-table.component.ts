import { Component, Input } from '@angular/core';
import { Mascota } from '../../model/mascota';
import { PetService } from '../../services/pet.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pet-tratamiento-table',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './pet-tratamiento-table.component.html',
  styleUrl: './pet-tratamiento-table.component.css'
})
export class PetTratamientoTableComponent {

  @Input() pet!: Mascota; 
  isLoadData = false;

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    if (this.pet) {
      this.petService.getTreatmentsByPetId(this.pet.id).subscribe(tratamientos => {
        this.pet.tratamientos = tratamientos;
        this.isLoadData = true;
      });
    }
  }

}
