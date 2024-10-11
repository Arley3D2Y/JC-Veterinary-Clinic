import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent {
  @Input() mascotas: any[] = [];  // Recibe las mascotas desde un componente padre
  @Output() mascotaSeleccionada = new EventEmitter<any>();  // Envía la mascota seleccionada al padre

  onSelectMascota(mascota: any) {
    this.mascotaSeleccionada.emit(mascota);  // Cuando se selecciona una mascota, se emite el evento
  }
}
