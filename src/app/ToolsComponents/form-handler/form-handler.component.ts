import { Component } from '@angular/core';
import { SharedHeaderComponent } from '../shared-header/shared-header.component';
import { PetFormComponent } from '../../veterinario/pet-form/pet-form.component';
import { CustomerFormComponent } from '../../veterinario/customer-form/customer-form.component';
import { VeterinarioFormComponent } from '../../administrador/veterinario-form/veterinario-form.component';

import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Mascota } from '../../model/mascota';
import { Cliente } from '../../model/cliente';
import { PetService } from '../../services/pet.service';
import { CustomerService } from '../../services/customer.service';
import { VeterinarioService } from '../../services/veterinario.service';
import { Veterinario } from '../../model/veterinario';

@Component({
  selector: 'app-form-handler',
  standalone: true,
  imports: [
    CommonModule,
    SharedHeaderComponent,
    PetFormComponent,
    CustomerFormComponent,
    VeterinarioFormComponent
  ],
  templateUrl: './form-handler.component.html',
  styleUrls: ['./form-handler.component.css']
})
export class FormHandlerComponent {
  typeEntity!: string;
  typeOperation!: string;
  entityId!: number;

<<<<<<< HEAD:src/app/veterinario/form-handler/form-handler.component.ts
  petSelected!: Mascota;
  customerSelected!: Cliente;

  mostrarForm: boolean = false;
=======
  petSelected!: Pet;
  customerSelected!: Customer;
  veterinarySelected!: Veterinario;
>>>>>>> FeaturesFrontend:src/app/ToolsComponents/form-handler/form-handler.component.ts

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private servicePet: PetService,
    private serviceClient: CustomerService,
    private serviceVet: VeterinarioService
  ) {
    this.route.url.subscribe(url => {
      this.typeOperation = url[1].path;
      this.typeEntity = url[2].path;
      this.entityId = Number(this.route.snapshot.paramMap.get('id') || '');
    });
  }

  ngOnInit() {
<<<<<<< HEAD:src/app/veterinario/form-handler/form-handler.component.ts
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
=======
    this.searchEntity();
  }

  searchEntity() {
    if (this.typeEntity === 'cliente') {
      if (this.typeOperation === 'actualizar') {
        this.customerSelected = this.serviceClient.findById(this.entityId);
      }
    } else if (this.typeEntity === 'mascota') {
      if (this.typeOperation === 'agregar') {
        this.petSelected = this.servicePet.findById(this.entityId); // Se obtiene el cliente asociado a la mascota
      } else if (this.typeOperation === 'actualizar') {
        this.petSelected = this.servicePet.findById(this.entityId);
        this.customerSelected = this.serviceClient.findById(this.petSelected.duenho!.id);
      }
    } else if (this.typeEntity === 'veterinario') {
      if (this.typeOperation === 'actualizar') {
        this.serviceVet.findById(this.entityId);
      }
    }
  }
  // Método para guardar entidad
  saveEntity(entity: Pet | Customer | Veterinario) {
>>>>>>> FeaturesFrontend:src/app/ToolsComponents/form-handler/form-handler.component.ts
    if (this.typeEntity === 'cliente') {
      this.saveCustomer(entity as Cliente);
    } else if (this.typeEntity === 'mascota') {
<<<<<<< HEAD:src/app/veterinario/form-handler/form-handler.component.ts
      this.savePet(entity as Mascota);
=======
      this.savePet(entity as Pet);
    } else if (this.typeEntity === 'veterinario') {
      this.saveVet(entity as Veterinario);
>>>>>>> FeaturesFrontend:src/app/ToolsComponents/form-handler/form-handler.component.ts
    }
  }

  saveCustomer(customer: Cliente) {
    if (this.typeOperation === 'agregar') {
<<<<<<< HEAD:src/app/veterinario/form-handler/form-handler.component.ts
      this.serviceCustomer.createCustomer(customer).subscribe(newCustomer => {
        this.router.navigate(['veterinario/detalles/cliente', newCustomer.id]);
      });
    } else if (this.typeOperation === 'actualizar') {
      this.serviceCustomer.updateCustomer(this.customerSelected.id, customer).subscribe(() => {
=======
      this.serviceClient.createCustomer(customer).then(() => {
        this.router.navigate(['veterinario/detalles/cliente', customer.id]);
      });
    } else if (this.typeOperation === 'actualizar') {
      this.serviceClient.updateCustomer(this.customerSelected.id, customer).then(() => {
        this.router.navigate(['veterinario/detalles/cliente', customer.id]);
      });
    }
  }

  savePet(pet: Pet) {
    if (this.typeOperation === 'agregar') {
      this.servicePet.createPet(pet).then((newPet) => {
        this.serviceClient.addPetToCustomer(this.customerSelected.id, newPet.id);
>>>>>>> FeaturesFrontend:src/app/ToolsComponents/form-handler/form-handler.component.ts
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
<<<<<<< HEAD:src/app/veterinario/form-handler/form-handler.component.ts
=======

  saveVet(vet: Veterinario) {
    if (this.typeOperation === 'agregar') {
      this.serviceVet.addveterinario(vet).subscribe(
        (newPet => {
          this.router.navigate(['administrador/detalles/veterinario', newPet.id]);
        })
      );
    } else if (this.typeOperation === 'actualizar') {
      this.serviceVet.updateveterinario(this.veterinarySelected.id, vet).subscribe(
        (updateVet => {
          this.router.navigate(['administrador/detalles/veterinario', updateVet.id]);
        })
      );
    }
  }

>>>>>>> FeaturesFrontend:src/app/ToolsComponents/form-handler/form-handler.component.ts
}
