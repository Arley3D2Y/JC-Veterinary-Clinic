import { Component } from '@angular/core';
import { CustomerCardComponent } from '../../veterinario/customer-card/customer-card.component';
import { PetCardComponent } from '../../veterinario/pet-card/pet-card.component';

import { SharedHeaderComponent } from '../shared-header/shared-header.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Pet } from '../../model/pet';
import { Customer } from '../../model/customer';
import { CustomerService } from '../../services/customer.service';
import { PetService } from '../../services/pet.service';

import { VeterinaryService } from '../../services/veterinary.service';
import { Veterinario } from '../../model/veterinario';
import { VeterinarioCardComponent } from "../../administrador/veterinario-card/veterinario-card.component";

@Component({
  selector: 'app-entity-details',
  standalone: true,
  imports: [
    CustomerCardComponent, SharedHeaderComponent, CommonModule,
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
veterinary: any;

  constructor(
    private route: ActivatedRoute,
    private serviceCustomer: CustomerService,
    private servicePet: PetService,
    private serviceVet: VeterinaryService

  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.typeEntity = data['type'];
      this.entityId = Number(this.route.snapshot.params['id']);
      if (this.typeEntity === 'cliente') {
        this.loadCustomer(this.entityId);
      } else if (this.typeEntity === 'mascota') {
        this.loadPet(this.entityId);
      } else if (this.typeEntity === 'veterinario') {
        this.loadVet(this.entityId);
      } else if (this.typeEntity === 'medicamento') {
        this.loadVet(this.entityId);
      }
    });
  }

  loadCustomer(id: number): void {
    this.customer = this.serviceCustomer.findById(id);
  }

  loadPet(id: number): void {
    this.pet = this.servicePet.findById(id);
  }

  loadVet(id: number): void {
    this.vet = this.serviceVet.findById(id);
  }
}
