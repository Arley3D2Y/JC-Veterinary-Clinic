import { Component, OnInit } from '@angular/core';

import { ClienteCardComponent } from '../cliente-card/cliente-card.component';
import { PetCardComponent } from '../pet-card/pet-card.component';
import { PetListComponent } from '../pet-list/pet-list.component';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Pet } from '../../model/pet';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ClienteCardComponent, PetCardComponent, PetListComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  cliente: any;
  mascotas: Pet[] = [];
  mascotaSeleccionada!: Pet;

  constructor(
    private route: ActivatedRoute,
    private clienteService: CustomerService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const cedula = params.get('cedula');
      
      // Usa el servicio para buscar al cliente
      if (cedula) {
        this.cliente = this.clienteService.findByCedula(cedula);
        
        if (this.cliente) {
          // Obtén las mascotas del cliente
          this.mascotas = this.cliente.mascotas;

        } else {
          // Manejar si no se encuentra al cliente
          console.error('Cliente no encontrado');
        }
      }
    });
  }

  // Este método se ejecuta cuando una mascota es seleccionada en la lista
  onMascotaSeleccionada(mascota: Pet) {
    this.mascotaSeleccionada = mascota;
    console.log('Mascota seleccionada:', this.mascotaSeleccionada);
  }
}
