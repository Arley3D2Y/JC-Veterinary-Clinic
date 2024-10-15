import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivatedRoute,Router } from '@angular/router';

import { Cliente } from '../../model/cliente';
import { CustomerService } from '../../services/customer.service';
import { PetService } from '../../services/pet.service';
import { mergeMap, tap } from 'rxjs';

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
  customerSelected!: Cliente;
  visiblePets: Boolean = false;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private petService: PetService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));

      this.customerService.findById(id).pipe(
        tap(customerInfo => {
          this.customerSelected = customerInfo; // Asegúrate de que customerSelected esté cargado
        }),
        mergeMap(customerInfo => this.petService.getPetsByCustomerId(customerInfo.id))
      ).subscribe(pets => {
        this.customerSelected.mascotas = pets; // Ahora puedes acceder a mascotas
      });
    });
  }


  // Función para eliminar una mascota
  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id).subscribe(() => {
      this.router.navigate(['veterinario/clientes']); // Redirigir al componente de detalles del cliente
    })
  }

}
