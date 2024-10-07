import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from './../../model/customer';
import { CustomerService } from '../../services/customer.service';
import { RouterLink } from '@angular/router';
import { Pet } from '../../model/pet';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-cards-table',
  standalone: true,
  imports: [
    CommonModule, RouterLink
  ],
  templateUrl: './cards-table.component.html',
  styleUrl: './cards-table.component.css'
})
export class CardsTableComponent {
    // Atributos
    customers!: Customer[];
    pets!: Pet[];
    @Input() isCustomer!: Boolean;
    @Input() isPet!: Boolean;

    // Inyectar dependencias
    constructor(
      private customerService: CustomerService,
      private petService: PetService
    ) {
    }

    // Se realiza llamados cuando ya se carga la interfaz
    ngOnInit(): void {
      if (this.isCustomer) {
        this.customers = this.customerService.finAll();     
      }
      if (this.isPet) {
        this.pets = this.petService.finAll();
      }
    }

    deleteItem(item: Customer | Pet) {
      if (this.isCustomer) {
        this.customerService.deleteCustomerById(item.id);
      } else if (this.isPet) {
        this.petService.deletePetById(item.id);     
      }
    }
      
}
