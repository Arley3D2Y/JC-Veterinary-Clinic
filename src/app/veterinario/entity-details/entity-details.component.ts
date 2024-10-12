import { Component } from '@angular/core';
import { CustomerCardComponent } from '../customer-card/customer-card.component';
import { PetCardComponent } from '../pet-card/pet-card.component';

import { SharedHeaderComponent } from '../../ToolsComponents/shared-header/shared-header.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Pet } from '../../model/pet';
import { Customer } from '../../model/customer';
import { CustomerService } from '../../services/customer.service';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-entity-details',
  standalone: true,
  imports: [
    CustomerCardComponent, SharedHeaderComponent, CommonModule,
    PetCardComponent
  ],
  templateUrl: './entity-details.component.html',
  styleUrl: './entity-details.component.css'
})
export class EntityDetailsComponent {
  typeEntity?: string;
  entityId!: number;
  customer!: Customer;
  pet!: Pet;

  constructor(
    private route: ActivatedRoute,
    private serviceCustomer: CustomerService,
    private servicePet: PetService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.typeEntity = data['type'];
      this.entityId = Number(this.route.snapshot.params['id']);
      if (this.typeEntity === 'cliente') {
        this.loadCustomer(this.entityId);
      } else if (this.typeEntity === 'mascota') {
        this.loadPet(this.entityId);
      }
    });
  }

  loadCustomer(id: number): void {
    this.customer = this.serviceCustomer.findById(id);
  }

  loadPet(id: number): void {
    this.pet = this.servicePet.findById(id);
  }
}
