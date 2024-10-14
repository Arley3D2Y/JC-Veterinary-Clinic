import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; import { CustomerService } from '../../services/customer.service';
import { RouterLink } from '@angular/router';
import { PetService } from '../../services/pet.service';
import { VeterinarioService } from '../../services/veterinario.service';
import { DrogaService } from '../../services/droga.service';
import { Veterinario } from '../../model/veterinario';
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
  @Input() typeObject!: 'clientes' | 'mascotas' | 'veterinarios' | 'drogas' | 'dashboard';
  @Input() dynamicActionUrl: string = "";

  // Inyectar dependencias
  constructor(
    private customerService: CustomerService,
    private petService: PetService,
    private vetService: VeterinarioService,
    private drogaService: DrogaService
  ) {
  }

  // Se realiza llamados cuando ya se carga la interfaz
  ngOnInit(): void {
    if (this.typeObject === 'clientes') {
      this.dynamicActionUrl = '/veterinario/detalles/';
      this.items = this.customerService.finAll();


    } else if (this.typeObject === 'mascotas') {
      this.dynamicActionUrl = '/veterinario/detalles/';
      this.items = this.petService.finAll();


    } else if (this.typeObject === 'veterinarios') {
      this.dynamicActionUrl = '/administrador/detalles/';
      this.loadVeterinarios();

    } else if (this.typeObject === 'drogas') {
      this.dynamicActionUrl = '/administrador/detalles/';
      this.items = this.drogaService.finAll();


    }
  }
  // Método genérico para eliminar el item (ya sea cliente o mascota)
  deleteItem(item: any) {
    if (this.typeObject === 'clientes') {
      this.customerService.deleteCustomerById(item.id);
    } else if (this.typeObject === 'mascotas') {
      this.petService.deletePetById(item.id);
    } else if (this.typeObject === 'veterinarios') {
      this.vetService.deleteVeterinario(item.id);
    } else if (this.typeObject === 'drogas') {
      this.drogaService.deletePetById(item.id);
    }
  }


  loadVeterinarios(): void {
    this.vetService.finAll().subscribe(
      (data: Veterinario[]) => {
        this.items = data;
      }
    );
  }
}
