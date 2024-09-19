import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { SharedHeaderComponent } from '../shared-header/shared-header.component';
import { PetFormComponent } from '../pet-form/pet-form.component';
import { ActivatedRoute } from '@angular/router';

import { Pet } from '../../model/pet';
import { PetService } from '../../services/pet.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-veterinary-forms',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    PetFormComponent,
    SharedHeaderComponent,
  ],
  templateUrl: './veterinary-forms.component.html',
  styleUrl: './veterinary-forms.component.css'
})
export class VeterinaryFormsComponent {
  entityType = 'mascota';
  customerId!: number; // Variable para almacenar el id del cliente

  constructor(
    private petService: PetService,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ){
      const id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.customerId = Number(params.get('id')); // Obtén el id del parámetro
      // Puedes realizar otras acciones aquí, como cargar datos de cliente
    });
  }

  addPet(pet: Pet) {
    this.petService.createPet(pet);
    this.customerService.addPetToCustomer(this.customerId, pet.id) ;
    this.router.navigate(['veterinario/detalles-cliente', this.customerId]); // Redirige usando el id
  }
}
