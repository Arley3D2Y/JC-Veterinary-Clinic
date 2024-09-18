import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from './../../model/customer';
import { CustomerService } from '../../services/customer.service';
import { RouterLink } from '@angular/router';

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
    customersList!: Customer[];

    selectedCustomer!: Customer;

    // Inyectar dependencias
    constructor(
      private customerService: CustomerService
    ) {
    }

    // Se realiza llamados cuando ya se carga la interfaz
    ngOnInit(): void {
      this.customersList = this.customerService.finAll();
    }

    deleteStudent(customer: Customer) {
      const index = this.customersList.indexOf(customer);
      if (index !== -1) {
        this.customersList.splice(index, 1);
      }
    }
}
