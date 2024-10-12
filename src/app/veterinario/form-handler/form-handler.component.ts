import { Component, input } from '@angular/core';

import { SharedHeaderComponent } from '../../ToolsComponents/shared-header/shared-header.component';
import { PetFormComponent } from '../pet-form/pet-form.component';
import { CustomerFormComponent } from '../customer-form/customer-form.component';

import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Pet } from '../../model/pet';
import { Customer } from '../../model/customer';
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
  styleUrl: './form-handler.component.css'
})
export class FormHandlerComponent {
  typeEntity!: string;  // Tipo de entidad (cliente o mascota)
  typeOperation!: string; // Tipo de operación (crear o actualizar)
  entityId!: number;     // ID de la entidad (cliente o mascota)

  petSelected!: Pet;
  customerSelected!: Customer;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private servicePet: PetService,
    private serviceCustomer: CustomerService
  ) {
    this.route.url.subscribe(url => {
      this.typeEntity = url[2].path;
      this.typeOperation = url[1].path;
      this.entityId = Number(this.route.snapshot.paramMap.get('id') || '');
    });
  }

  ngOnInit() {
    this.searchEntity();
  }

  searchEntity() {
    if (this.typeEntity === 'cliente') {
      if (this.typeOperation === 'actualizar') {
        this.customerSelected = this.serviceCustomer.findById(this.entityId);
      }
    } else if (this.typeEntity === 'mascota') {
      if (this.typeOperation === 'agregar') {
        this.customerSelected = this.serviceCustomer.findById(this.entityId); // Se obtiene el cliente asociado a la mascota
      } else if (this.typeOperation === 'actualizar') {
        this.petSelected = this.servicePet.findById(this.entityId);
        this.customerSelected = this.serviceCustomer.findById(this.petSelected.duenho!.id);
      }
    }
  }


  // Método para guardar entidad
  saveEntity(entity: Pet | Customer) {
    if (this.typeEntity === 'cliente') {
      this.saveCustomer(entity as Customer);
    } else if (this.typeEntity === 'mascota') {
      this.savePet(entity as Pet);
    }
  }

  saveCustomer(customer: Customer) {
    if (this.typeOperation === 'agregar') {
      this.serviceCustomer.createCustomer(customer).then(() => {
        this.router.navigate(['veterinario/detalles/cliente', customer.id]);
      });
    } else if (this.typeOperation === 'actualizar') {
      this.serviceCustomer.updateCustomer(this.customerSelected.id, customer).then(() => {
        this.router.navigate(['veterinario/detalles/cliente', customer.id]);
      });
    }
  }

  savePet(pet: Pet) {
    if (this.typeOperation === 'agregar') {
      this.servicePet.createPet(pet).then((newPet) => {
        this.serviceCustomer.addPetToCustomer(this.customerSelected.id, newPet.id);
        this.router.navigate(['veterinario/detalles/cliente', this.customerSelected.id]);
      });
    } else if (this.typeOperation === 'actualizar') {
      this.servicePet.updatePet(this.petSelected.id, pet).then(() => {
        this.router.navigate(['veterinario/detalles/mascota', this.petSelected.id]);
      });
    }
  }

}
