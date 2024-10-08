import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivatedRoute,Router } from '@angular/router';

import { Customer } from '../../model/customer';
import { CustomerService } from '../../services/customer.service';
import { Pet } from '../../model/pet';

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

  visiblePets: Boolean = false;
  pets!: Pet[]
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.pets = this.customerService.getPetsByCustomerId(id);
    });
  }

  // Función para eliminar una mascota
  deleteCustomer(id: number) {
    this.customerService.deleteCustomerById(id);
    this.router.navigate(['veterinario/clientes']); // Redirigir al componente de detalles del cliente
  }

}
