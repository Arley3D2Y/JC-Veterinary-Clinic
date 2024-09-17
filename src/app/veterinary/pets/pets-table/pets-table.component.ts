import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Pet } from './../../../model/pet';
import { PetService } from './../../../services/pet.service';

@Component({
  selector: 'app-pets-table',
  standalone: true,
  imports: [
    CommonModule, RouterLink
  ],
  templateUrl: './pets-table.component.html',
  styleUrl: './pets-table.component.css'
})
export class PetsTableComponent {
  // Atributos
  petList!: Pet[];

  selectedPet!: Pet;

  // Inyectar dependencias
  constructor(
      private petService: PetService
    ) {
    }

    // Se realiza llamados cuando ya se carga la interfaz
    ngOnInit(): void {
      this.petList = this.petService.finAll();
    }

    deleteStudent(pet: Pet) {
      const index = this.petList.indexOf(pet);
      if (index !== -1) {
        this.petList.splice(index, 1);
      }
    }
}
