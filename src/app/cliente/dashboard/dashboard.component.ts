import { Component, OnInit } from '@angular/core';

import { ClienteCardComponent } from '../cliente-card/cliente-card.component';
import { PetCardComponent } from '../pet-card/pet-card.component';
import { PetListComponent } from '../pet-list/pet-list.component';

import { PetService } from '../../services/pet.service';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Mascota } from '../../model/mascota';
import { Cliente } from '../../model/cliente';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ClienteCardComponent,
    PetCardComponent,
    PetListComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  cliente: any = {
    mascotas: [],
  };
  mascotaSeleccionada?: Mascota;

  constructor(
    private route: ActivatedRoute,
    private clienteService: CustomerService, 
    private mascotaService: PetService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const cedula = String(params['cedula']);

      if (cedula) {
        this.clienteService.searchByDocument(cedula).pipe(
          mergeMap((customerInfo) => {
            this.cliente = customerInfo;
            return this.mascotaService.getPetsByCustomerId(customerInfo.id);
          })
        ).subscribe((mascotasInfo) => {
          this.cliente.mascotas = mascotasInfo;          
        });
      }
    });
  }

  // Este método se ejecuta cuando una mascota es seleccionada en la lista
  onMascotaSeleccionada(mascota: Mascota) {
    this.mascotaSeleccionada = mascota;
  }
}
