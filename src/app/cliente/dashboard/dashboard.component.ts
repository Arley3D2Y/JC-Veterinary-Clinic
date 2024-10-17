import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ClienteInfoCardComponent } from '../cliente-info-card/cliente-info-card.component';
import { PetCardComponent } from '../pet-card/pet-card.component';
import { PetListComponent } from '../pet-list/pet-list.component';

import { PetService } from '../../services/pet.service';
import { CustomerService } from '../../services/customer.service';

import { Mascota } from '../../model/mascota';
import { Cliente } from '../../model/cliente';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ClienteInfoCardComponent,
    PetListComponent,
    RouterModule,
    PetCardComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  cliente: any = {
    mascotas: []
  };
  isDataLoaded: boolean = false;
  petSelected?: Mascota;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: CustomerService, 
    private mascotaService: PetService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const cedula = String(params['cedula']);

      if (cedula) {
        this.clienteService.searchByDocument(cedula).pipe(
          mergeMap((customerInfo: Cliente) => {
            this.cliente = customerInfo;
            return this.mascotaService.getPetsByCustomerId(customerInfo.id);
          })
        ).subscribe((mascotasInfo: Mascota[]) => {
          this.cliente.mascotas = mascotasInfo; 
          this.isDataLoaded = true;
        });

      }
    });
  }

  // Este método se ejecuta cuando una mascota es seleccionada en la lista
  onMascotaSeleccionada(mascota: Mascota) {
    this.petSelected = mascota;
  }

  logout() {
    localStorage.clear(); // Eliminar todos los elementos del localStorage

    // Limpiar cualquier otra variable relacionada con la sesión
    this.cliente = { mascotas: [] };
    this.isDataLoaded = false;
    this.petSelected = undefined;

    this.router.navigate(['/login']);
  }
}
