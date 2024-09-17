import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from './../../../model/customer';
import { CustomerService } from '../../../services/customer.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customers-table',
  standalone: true,
  imports: [
    CommonModule, RouterLink
  ],
  templateUrl: './customers-table.component.html',
  styleUrl: './customers-table.component.css'
})
export class CustomersTableComponent {
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
