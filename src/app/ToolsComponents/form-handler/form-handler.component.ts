import { Component, input } from '@angular/core';

import { SharedHeaderComponent } from '../shared-header/shared-header.component';
import { PetFormComponent } from '../../veterinario/pet-form/pet-form.component';
import { CustomerFormComponent } from '../../veterinario/customer-form/customer-form.component';
import { VeterinarioFormComponent } from '../../administrador/veterinario-form/veterinario-form.component';

import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Pet } from '../../model/pet';
import { Customer } from '../../model/customer';
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
  styleUrl: './form-handler.component.css'
})
export class FormHandlerComponent {
  typeEntity!: string;
  typeOperation!: string;
  entityId!: number;

  petSelected!: Pet;
  customerSelected!: Customer;
  veterinarySelected!: Veterinario;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private servicePet: PetService,
    private serviceClient: CustomerService,
    private serviceVet: VeterinarioService
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
    if (this.typeEntity === 'cliente') {
      this.saveCustomer(entity as Customer);
    } else if (this.typeEntity === 'mascota') {
      this.savePet(entity as Pet);
    } else if (this.typeEntity === 'veterinario') {
      this.saveVet(entity as Veterinario);
    }
  }

  saveCustomer(customer: Customer) {
    if (this.typeOperation === 'agregar') {
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
        this.router.navigate(['veterinario/detalles/cliente', this.customerSelected.id]);
      });
    } else if (this.typeOperation === 'actualizar') {
      this.servicePet.updatePet(this.petSelected.id, pet).then(() => {
        this.router.navigate(['veterinario/detalles/mascota', this.petSelected.id]);
      });
    }
  }

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

}
