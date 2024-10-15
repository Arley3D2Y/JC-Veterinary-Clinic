import { Component } from '@angular/core';
import { CustomerCardComponent } from '../../veterinario/customer-card/customer-card.component';
import { PetCardComponent } from '../../veterinario/pet-card/pet-card.component';
import { TratamientoCardComponent } from '../../veterinario/tratamiento-card/tratamiento-card.component';
import { VeterinarioCardComponent } from '../../administrador/veterinario-card/veterinario-card.component';
import { SharedHeaderComponent } from '../shared-header/shared-header.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Mascota } from '../../model/mascota';
import { Cliente } from '../../model/cliente';
import { CustomerService } from '../../services/customer.service';
import { PetService } from '../../services/pet.service';
import { mergeMap } from 'rxjs';

import { VeterinarioService } from '../../services/veterinario.service';
import { Veterinario } from '../../model/veterinario';
import { Tratamiento } from '../../model/tratamiento';
import { TratamientoService } from '../../services/tratamiento.service';

@Component({
  selector: 'app-entity-details',
  standalone: true,
  imports: [
    CustomerCardComponent,
    SharedHeaderComponent,
    CommonModule,
    PetCardComponent,
    VeterinarioCardComponent,
    TratamientoCardComponent
],
  templateUrl: './entity-details.component.html',
  styleUrl: './entity-details.component.css'
})
export class EntityDetailsComponent {

  typeEntity?: string;
  entityId!: number;
  
  customer!: Cliente;
  pet!: Mascota;
  vet!: Veterinario;
  treatment!: Tratamiento;

  constructor(
    private route: ActivatedRoute,
    private serviceClient: CustomerService,
    private servicePet: PetService,
    private serviceVet: VeterinarioService,
    private serviceTreatment: TratamientoService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.typeEntity = data['type'];
      this.entityId = Number(this.route.snapshot.params['id']);
      if (this.typeEntity === 'cliente') {
        this.loadCliente(this.entityId);
      } else if (this.typeEntity === 'mascota') {
        this.loadMascota(this.entityId);
      } else if (this.typeEntity === 'veterinario') {
        this.loadVeterinario(this.entityId);
      } else if (this.typeEntity === 'tratamiento') {
        this.loadTratamiento(this.entityId);
      }
    });
  }

  loadCliente(id: number): void {
      this.serviceClient.findById(id).pipe(
        mergeMap(
          (customerInfo) => {
            this.customer = customerInfo;
            return this.servicePet.getPetsByCustomerId(id);
          }
        )
      ).subscribe(
        (mascotasInfo) => {
          this.customer.mascotas = mascotasInfo;
        }
      )
    }

  loadMascota(id: number): void {
    this.servicePet.findById(id).subscribe(
      (petInfo) => {
        this.pet = petInfo;
      }
    )
  }

  loadVeterinario(id: number): void {
    this.serviceVet.findById(id).subscribe(
      (vetInfo) => {
        this.vet = vetInfo;
      }
    )
  }

  loadTratamiento(id: number): void {
    this.serviceTreatment.findById(id).subscribe(
      (treatmentInfo) => {
        this.treatment = treatmentInfo;
      }
    )
  }
}
