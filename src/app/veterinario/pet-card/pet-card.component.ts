import { Component, Input } from '@angular/core';
import { Mascota } from '../../model/mascota';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../../services/pet.service';
import { CommonModule, Location } from '@angular/common';
import { mergeMap, tap } from 'rxjs';

@Component({
  selector: 'app-pet-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './pet-card.component.html',
  styleUrl: './pet-card.component.css'
})
export class PetCardComponent {
  petSelected!: Mascota;
  isPetUpdated: Boolean = false;

  isDataLoaded: boolean = false
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private petService: PetService,
    private location: Location,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));

      this.petService.findById(id).pipe(
        tap(petInfo => {
          this.petSelected = petInfo; // Asegúrate de que customerSelected esté cargado
        }),
        mergeMap(petInfo => this.petService.getTreatmentsByPetId(petInfo.id))
      ).subscribe(treatments => {
        this.petSelected.tratamientos = treatments; // Ahora puedes acceder a mascotas
      });
    });
  }

  updatePet() {
    this.isPetUpdated = true;
    this.router.navigate(['/veterinario/actualizar/mascota', this.petSelected.id])
  }

  // Función para eliminar una mascota
  deletePet(id: Number) {
    this.petService.deleteMascota(id).subscribe(() => {
      if (this.isPetUpdated === true) {
        this.location.back();
      } else if (this.isPetUpdated === false) {
        this.router.navigate(['/veterinario/mascotas']);
      }
    })
  }
}
