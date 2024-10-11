import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pet-card',
  standalone: true,
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.css']
})
export class PetCardComponent {
  @Input() mascotaSeleccionada: any;  // La mascota seleccionada vendrá del componente padre
}
