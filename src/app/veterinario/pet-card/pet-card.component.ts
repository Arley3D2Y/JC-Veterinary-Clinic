import { Component, Input } from '@angular/core';
import { Mascota } from '../../model/mascota';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../../services/pet.service';
import { CommonModule, Location } from '@angular/common';
import { merge, mergeMap, tap } from 'rxjs';
import { TratamientoService } from '../../services/tratamiento.service';
import { CustomerService } from '../../services/customer.service';

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
    private treatmentService: TratamientoService,
    private location: Location,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
  
      // Obtener la información de la mascota
      this.petService.findById(id).pipe(
        mergeMap(petInfo => {
          this.petSelected = petInfo; // Asegúrate de que petSelected esté cargado
          return this.petService.getClientByPetId(this.petSelected.id);
        }),
      ).pipe(
        mergeMap(customerInfo => {
          this.petSelected.cliente = customerInfo;
          return this.petService.getTreatmentsByPetId(this.petSelected.id);
        }
      )).subscribe(
        treatments => {
          this.petSelected.tratamientos = treatments;
          this.isDataLoaded = true;
        }
      )
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

  deleteItem(item: any) {
    this.treatmentService.deleteTratamiento(item.id).subscribe(() => {
      this.ngOnInit();
    })
  }
}
