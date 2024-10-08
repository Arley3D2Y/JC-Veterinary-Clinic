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
    // Datos genéricos, pueden ser clientes o mascotas
    items: any[] = [];
    // Atributo que recibe el tipo de objeto (clientes o mascotas)
    @Input() typeObject!: 'clientes' | 'mascotas'; 

    // Inyectar dependencias
    constructor(
      private customerService: CustomerService,
      private petService: PetService
    ) {
    }

    // Se realiza llamados cuando ya se carga la interfaz
    ngOnInit(): void {
      if (this.typeObject === 'clientes') {
        this.items = this.customerService.finAll();
      } else if (this.typeObject === 'mascotas') {
        this.items = this.petService.finAll();
      }
    }
    // Método genérico para eliminar el item (ya sea cliente o mascota)
    deleteItem(item: any) {
      if (this.typeObject === 'clientes') {
        this.customerService.deleteCustomerById(item.id);
      } else if (this.typeObject === 'mascotas') {
        this.petService.deletePetById(item.id);
      }
    }  
}
