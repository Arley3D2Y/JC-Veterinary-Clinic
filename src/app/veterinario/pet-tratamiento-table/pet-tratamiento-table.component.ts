import { Component, Input } from '@angular/core';
import { Pet } from '../../model/pet';
import { PetService } from '../../services/pet.service';
import { CommonModule } from '@angular/common';
import { Tratamiento } from '../../model/tratamiento';

@Component({
  selector: 'app-pet-tratamiento-table',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './pet-tratamiento-table.component.html',
  styleUrl: './pet-tratamiento-table.component.css'
})
export class PetTratamientoTableComponent {

  @Input() petSelected!: Pet; 
  tratamientos: Tratamiento[] = []; 

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    if (this.petSelected) {
    
      this.tratamientos = this.petService.findTratamientosByPetId(this.petSelected.id);
    }
  }

}
