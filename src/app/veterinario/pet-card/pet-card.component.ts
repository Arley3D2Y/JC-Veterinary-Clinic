import { Component, Input } from '@angular/core';
import { Mascota } from '../../model/mascota';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../../services/pet.service';
import { CustomerService } from '../../services/customer.service';
import { CommonModule, Location } from '@angular/common';
import { mergeMap } from 'rxjs';

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
  @Input()
  petSelected!: Mascota;
  isPetUpdated: Boolean = false;
  
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
      this.petService.findById(id).subscribe(pet => {
        this.petSelected = pet;
        this.petSelected.cliente = pet.cliente;
      })
    });
  }

  updatePet() {
    this.isPetUpdated = true;
    this.router.navigate(['/veterinario/actualizar/mascota', this.petSelected.id])
  }

  // Función para eliminar una mascota
  deletePet(id: Number) {
    this.petService.deletePetById(id).subscribe(() => {
      if (this.isPetUpdated === true) {
        this.location.back();
      } else if (this.isPetUpdated === false) {
        this.router.navigate(['/veterinario/mascotas']);
      }
    })
  }
}
