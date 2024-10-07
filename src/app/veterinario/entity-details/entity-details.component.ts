import { Component } from '@angular/core';
import { CustomerCardComponent } from '../customer-card/customer-card.component';
import { PetCardComponent } from '../pet-card/pet-card.component';

import { SharedHeaderComponent } from '../shared-header/shared-header.component';
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
  customer!: Customer;
  pet!: Pet;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceCustomer: CustomerService,
    private servicePet: PetService
  ) {}

  ngOnInit(): void {
    // Detectar el cambio en la URL
    this.route.url.subscribe(() => {
      const id = Number(this.route.snapshot.params['id']);
      
      // Cambiar entityType según la ruta actual
      const currentPath = this.router.url;
      if (currentPath.includes('cliente')) {
        this.typeEntity = 'cliente';
        this.searchCustomer(id);
      } else if (currentPath.includes('mascota')) {
        this.typeEntity = 'mascota';
        this.searchPet(id);
      }
    });
  }

  searchCustomer(id: number): void {
    const customer = this.serviceCustomer.findById(id);
    if (customer) {
      this.customer = customer;
    }
  }

  searchPet(id: number): void {
    const pet = this.servicePet.findById(id);
    if (pet) {
      this.pet = pet;
    }
  }
}
