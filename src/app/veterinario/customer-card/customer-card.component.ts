import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Customer } from '../../model/customer';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-customer-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './customer-card.component.html',
  styleUrl: './customer-card.component.css',
})
export class CustomerCardComponent {
  @Input()
  customerSelected!: Customer;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private petService: PetService,
    private customerService: CustomerService
  ) {
  }

  displayPets(id: number) {
    
  }

  // Función para eliminar una mascota
  deleteCustomer(id: number) {
    this.customerService.deleteCustomerById(id);
    this.router.navigate(['veterinario/clientes']); // Redirigir al componente de detalles del cliente
  }

}
