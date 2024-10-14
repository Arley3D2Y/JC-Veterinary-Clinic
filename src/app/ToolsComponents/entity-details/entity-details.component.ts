import { Component } from '@angular/core';
import { CustomerCardComponent } from '../../veterinario/customer-card/customer-card.component';
import { PetCardComponent } from '../../veterinario/pet-card/pet-card.component';

import { VeterinarioCardComponent } from '../../administrador/veterinario-card/veterinario-card.component';
import { SharedHeaderComponent } from '../shared-header/shared-header.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Pet } from '../../model/pet';
import { Customer } from '../../model/customer';
import { CustomerService } from '../../services/customer.service';
import { PetService } from '../../services/pet.service';

import { VeterinarioService } from '../../services/veterinario.service';
import { Veterinario } from '../../model/veterinario';

@Component({
  selector: 'app-entity-details',
  standalone: true,
  imports: [
    CustomerCardComponent,
    SharedHeaderComponent,
    CommonModule,
    PetCardComponent,
    VeterinarioCardComponent
],
  templateUrl: './entity-details.component.html',
  styleUrl: './entity-details.component.css'
})
export class EntityDetailsComponent {

  typeEntity?: string;
  entityId!: number;
  
  customer!: Customer;
  
  pet!: Pet;
  
  vet!: Veterinario;

  constructor(
    private route: ActivatedRoute,
    private serviceClient: CustomerService,
    private servicePet: PetService,
    private serviceVet: VeterinarioService

  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.typeEntity = data['type'];
      this.entityId = Number(this.route.snapshot.params['id']);
      if (this.typeEntity === 'cliente') {

      } else if (this.typeEntity === 'mascota') {

      } else if (this.typeEntity === 'veterinario') {
        this.loadVeterinary(this.entityId);

      }
    });
  }

  loadClient(id: number): void {
  }

  loadVeterinary(id: number): void {
    this.serviceVet.findById(id).subscribe(
      (data: Veterinario) => {
        this.vet = data;
      }
    );
  }
}
