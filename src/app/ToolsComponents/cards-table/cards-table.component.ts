import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer.service';
import { RouterLink } from '@angular/router';
import { PetService } from '../../services/pet.service';
import { VeterinarioService } from '../../services/veterinario.service';

import { Veterinario } from '../../model/veterinario';
import { Mascota } from '../../model/mascota';
import { Cliente } from '../../model/cliente';
import { TratamientoService } from '../../services/tratamiento.service';
import { Tratamiento } from '../../model/tratamiento';

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
  @Input() typeObject!: 'clientes' | 'mascotas' | 'veterinarios' | 'drogas' | 'tratamientos';
  @Input() dynamicActionUrl: string = "";

  // Inyectar dependencias
  constructor(
    private customerService: CustomerService,
    private petService: PetService,
    private vetService: VeterinarioService,
    private tratamientoService: TratamientoService
  ) {
  }

  // Se realiza llamados cuando ya se carga la interfaz
  ngOnInit(): void {
    if (this.typeObject === 'clientes') {
      this.dynamicActionUrl = '/veterinario/detalles/';
      this.loadClientes();

    } else if (this.typeObject === 'mascotas') {
      this.dynamicActionUrl = '/veterinario/detalles/';
      this.loadMascotas();

    } else if (this.typeObject === 'veterinarios') {
      this.dynamicActionUrl = '/administrador/detalles/';
      this.loadVeterinarios();

    } else if (this.typeObject === 'tratamientos') {
      this.dynamicActionUrl = '/veterinario/detalles/';
      this.loadTratamientos();

    }
  }
  // Método genérico para eliminar el item (ya sea cliente o mascota)
  deleteItem(item: any) {
    if (this.typeObject === 'clientes') {
      this.customerService.deleteCustomer(item.id).subscribe(() => {
        this.loadClientes();
      })
    } else if (this.typeObject === 'mascotas') {
      this.petService.deleteMascota(item.id).subscribe(() => {
        this.loadMascotas();
      })
    } else if (this.typeObject === 'veterinarios') {
      this.vetService.deleteVeterinario(item.id).subscribe(() => {
        this.loadVeterinarios();
      })
    } else if (this.typeObject === 'tratamientos') {
      this.tratamientoService.deleteTratamiento(item.id).subscribe(() => {
        this.loadTratamientos();
      })
    }
  }


  loadVeterinarios(): void {
    this.vetService.findAll().subscribe(
      (data: Veterinario[]) => {
        this.items = data;
      }
    );
  }

  loadTratamientos(): void {
    this.tratamientoService.findAll().subscribe(
      (data: Tratamiento[]) => {
        this.items = data;
      }
    );
  }

  loadMascotas(): void {
    this.petService.findAll().subscribe(
      (data: Mascota[]) => {
        this.items = data;
      }
    );
  }

  loadClientes(): void {
    this.customerService.findAll().subscribe(
      (data: Cliente[]) => {
        this.items = data;
      }
    );
  }

}
