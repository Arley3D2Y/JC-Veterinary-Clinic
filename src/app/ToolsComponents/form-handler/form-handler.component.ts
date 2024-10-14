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
  mostrarForm: boolean = false;

  petSelected!: Mascota;
  customerSelected!: Cliente;
  veterinarySelected!: Veterinario;

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
    this.searchEntity();
  }

  searchEntity() {
    if (this.typeEntity === 'cliente') {
      if (this.typeOperation === 'actualizar') {
        this.serviceClient.findById(this.entityId).subscribe(customerInfo => {
          this.customerSelected = customerInfo;
        })
      }
    } else if (this.typeEntity === 'mascota') {
      if (this.typeOperation === 'agregar') {
        this.serviceClient.findById(this.entityId).subscribe(customerInfo => {
          this.customerSelected = customerInfo;
        });
      } else if (this.typeOperation === 'actualizar') {
        this.servicePet.findById(this.entityId).subscribe(petInfo => {
          this.petSelected = petInfo;
        })
        this.serviceClient.findById(this.petSelected.cliente!.id).subscribe(customerInfo => {
          this.customerSelected = customerInfo;
        })
      }
    } else if (this.typeEntity === 'veterinario') {
      if (this.typeOperation === 'actualizar') {
        this.serviceVet.findById(this.entityId).subscribe(vetInfo => {
          this.veterinarySelected = vetInfo;
        })
      }
    }
  }
  // Método para guardar entidad
  saveEntity(entity: Mascota | Cliente | Veterinario) {
    if (this.typeEntity === 'cliente') {
      this.saveCustomer(entity as Cliente);
    } else if (this.typeEntity === 'mascota') {
      this.savePet(entity as Mascota);
    } else if (this.typeEntity === 'veterinario') {
      this.saveVet(entity as Veterinario);
    }
  }

  saveCustomer(customer: Cliente) {
    if (this.typeOperation === 'agregar') {
      this.serviceClient.addCustomer(customer).subscribe(newClient => {
        this.router.navigate(['veterinario/detalles/cliente', newClient.id]);
      });
    } else if (this.typeOperation === 'actualizar') {
      this.serviceClient.updateCustomer(this.customerSelected.id, customer).subscribe(updateClient => {
        this.router.navigate(['veterinario/detalles/cliente', updateClient.id]);
      });
    }
    
  }

  savePet(pet: Mascota) {
    if (this.typeOperation === 'agregar') {
      this.servicePet.addMascota(this.customerSelected.id, pet).subscribe(newPet => {
        this.router.navigate(['veterinario/detalles/mascota', newPet.id]);
      });
    } else if (this.typeOperation === 'actualizar') {
      this.servicePet.updatePet(this.petSelected.id, pet).subscribe(updatePet => {
        this.router.navigate(['veterinario/detalles/mascota', updatePet.id]);
      });
    }
  }

  saveVet(vet: Veterinario) {
    if (this.typeOperation === 'agregar') {
      this.serviceVet.addveterinario(vet).subscribe(newVet => {
          this.router.navigate(['administrador/detalles/veterinario', newVet.id]);
        }
      );
    } else if (this.typeOperation === 'actualizar') {
      this.serviceVet.updateveterinario(this.veterinarySelected.id, vet).subscribe(updateVet => {
          this.router.navigate(['administrador/detalles/veterinario', updateVet.id]);
        }
      );
    }
  }

}
