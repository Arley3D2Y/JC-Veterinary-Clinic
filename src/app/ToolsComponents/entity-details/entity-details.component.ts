import { Component } from '@angular/core';
import { CustomerCardComponent } from '../../veterinario/customer-card/customer-card.component';
import { PetCardComponent } from '../../veterinario/pet-card/pet-card.component';
import { TratamientoCardComponent } from '../../veterinario/treatment-card/treatment-card.component';
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

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.typeEntity = data['type'];
      this.entityId = Number(this.route.snapshot.params['id']);
    });
  }
}
