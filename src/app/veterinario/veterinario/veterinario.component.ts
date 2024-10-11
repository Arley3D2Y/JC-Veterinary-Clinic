import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SharedHeaderComponent } from '../../veterinario/shared-header/shared-header.component';
import { CardsTableComponent } from '../cards-table/cards-table.component';

@Component({
  selector: 'app-veterinario',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    SharedHeaderComponent,
    CardsTableComponent,
  ],
  templateUrl: './veterinario.component.html',
  styleUrl: './veterinario.component.css'
})
export class VeterinarioComponent {
  // Definimos una propiedad para manejar el tipo de objeto
  typeSection!: 'clientes' | 'mascotas';
  constructor(private route: ActivatedRoute) {}

  // Puedes inicializar el tipo según lo que necesites o pasar dinámicamente al cargar
  setTypeObject(type: 'clientes' | 'mascotas') {
    this.typeSection = type;
  }

  ngOnInit(): void {
    // Al cargar el componente, obtenemos el valor de `typeObject` desde la ruta
    this.route.data.subscribe((data) => {
      this.typeSection = data['type'];
    });
  }
}
