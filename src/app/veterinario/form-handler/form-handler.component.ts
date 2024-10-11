import { Component } from '@angular/core';
import { SharedHeaderComponent } from '../shared-header/shared-header.component';
import { PetFormComponent } from '../pet-form/pet-form.component';
import { CustomerFormComponent } from '../customer-form/customer-form.component';

import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Mascota } from '../../model/mascota';
import { Cliente } from '../../model/cliente';
import { PetService } from '../../services/pet.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-form-handler',
  standalone: true,
  imports: [
    CommonModule,
    SharedHeaderComponent,
    PetFormComponent,
    CustomerFormComponent,
  ],
  templateUrl: './form-handler.component.html',
  styleUrls: ['./form-handler.component.css']
})
export class FormHandlerComponent {
  typeEntity!: string;  // Tipo de entidad (cliente o mascota)
  typeOperation!: string; // Tipo de operación (crear o actualizar)
  entityId!: number;     // ID de la entidad (cliente o mascota)

  petSelected!: Mascota;
  customerSelected!: Cliente;

  mostrarForm: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private servicePet: PetService,
    private serviceCustomer: CustomerService
  ) {
    this.route.url.subscribe(url => {
      this.typeOperation = url[1].path;
      this.typeEntity = url[2].path;
      this.entityId = Number(this.route.snapshot.paramMap.get('id') || '');
    });
  }

  ngOnInit() {
    // Mostrar formulario inmediatamente si es una operación de "agregar"
    if (this.typeOperation === 'agregar') {
      if (this.typeEntity === 'mascota') {
        this.route.paramMap.subscribe(params => {
          this.serviceCustomer.findById(this.entityId).subscribe(customer => {
            this.customerSelected = customer;
          })
        })
      }
      this.mostrarForm = true;
    } else if (this.typeOperation === 'actualizar') {
      // Si es una actualización, cargar la entidad primero
      if (this.typeEntity === 'cliente') {
        this.serviceCustomer.findById(this.entityId).subscribe(customer => {
          this.customerSelected = customer;
          this.mostrarForm = true;  // Mostrar formulario después de cargar cliente
        });
      } else if (this.typeEntity === 'mascota') {
        this.servicePet.findById(this.entityId).subscribe(pet => {
          if (pet.cliente) {
            this.customerSelected = pet.cliente;
          }
          this.petSelected = pet;
          this.mostrarForm = true;  // Mostrar formulario después de cargar mascota
        });
      }
    }
  }

  // Método para guardar entidad
  saveEntity(entity: Mascota | Cliente) {
    if (this.typeEntity === 'cliente') {
      this.saveCustomer(entity as Cliente);
    } else if (this.typeEntity === 'mascota') {
      this.savePet(entity as Mascota);
    }
  }

  saveCustomer(customer: Cliente) {
    if (this.typeOperation === 'agregar') {
      this.serviceCustomer.createCustomer(customer).subscribe(newCustomer => {
        this.router.navigate(['veterinario/detalles/cliente', newCustomer.id]);
      });
    } else if (this.typeOperation === 'actualizar') {
      this.serviceCustomer.updateCustomer(this.customerSelected.id, customer).subscribe(() => {
        this.router.navigate(['veterinario/detalles/cliente', this.customerSelected.id]);
      });
    }
  }

  savePet(pet: Mascota) {
    if (this.typeOperation === 'agregar') {
      this.servicePet.createPet(pet, this.customerSelected.id).subscribe(newPet => {
        this.router.navigate(['veterinario/detalles/mascota', newPet.id]);
      });
    } else if (this.typeOperation === 'actualizar') {
      this.servicePet.updatePet(this.petSelected.id, pet).subscribe(() => {
        this.router.navigate(['veterinario/detalles/mascota', this.petSelected.id]);
      });
    }
  }
}
