import { Component } from '@angular/core';
import { CustomerCardComponent } from '../../veterinario/customer-card/customer-card.component';
import { PetCardComponent } from '../../veterinario/pet-card/pet-card.component';

import { VeterinarioCardComponent } from '../../administrador/veterinario-card/veterinario-card.component';
import { SharedHeaderComponent } from '../shared-header/shared-header.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Mascota } from '../../model/mascota';
import { Cliente } from '../../model/cliente';
import { CustomerService } from '../../services/customer.service';
import { PetService } from '../../services/pet.service';
import { mergeMap } from 'rxjs';

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
<<<<<<< HEAD:src/app/veterinario/entity-details/entity-details.component.ts
  customer!: Cliente;
  pet!: Mascota;
=======
  
  customer!: Customer;
  
  pet!: Pet;
  
  vet!: Veterinario;
>>>>>>> FeaturesFrontend:src/app/ToolsComponents/entity-details/entity-details.component.ts

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

<<<<<<< HEAD:src/app/veterinario/entity-details/entity-details.component.ts
  loadCustomer(id: number): void {
    this.route.paramMap.subscribe(params => {
      this.serviceCustomer.findById(id).pipe(
        mergeMap(
          (customerInfo) => {
            this.customer = customerInfo;
            return this.servicePet.getPetsByCustomerId(id);
          }
        )
      ).subscribe(
        (mascotasInfo) => {
          this.customer.mascotas = mascotasInfo;
        }
      )
    })
  }

  loadPet(id: number): void {
    this.servicePet.findById(id).subscribe(pet => {
      this.pet = pet;
    })
=======
  loadClient(id: number): void {
  }

  loadVeterinary(id: number): void {
    this.serviceVet.findById(id).subscribe(
      (data: Veterinario) => {
        this.vet = data;
      }
    );
>>>>>>> FeaturesFrontend:src/app/ToolsComponents/entity-details/entity-details.component.ts
  }
}
