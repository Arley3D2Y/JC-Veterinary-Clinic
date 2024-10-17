import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchBarComponent } from '../../ToolsComponents/search-bar/search-bar.component';
import { SharedHeaderComponent } from '../../ToolsComponents/shared-header/shared-header.component';
import { CardsTableComponent } from '../../ToolsComponents/cards-table/cards-table.component';
import { VeterinarioService } from '../../services/veterinario.service';

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
  @ViewChild(CardsTableComponent) cardsTable!: CardsTableComponent; // Referencia al componente CardsTable

  // Definimos una propiedad para manejar el tipo de objeto
  typeSection!: 'clientes' | 'mascotas';
  veterinarioId!: number;

  constructor(
    private route: ActivatedRoute,
    private vetService: VeterinarioService
  ) { }

  // Puedes inicializar el tipo según lo que necesites o pasar dinámicamente al cargar
  setTypeObject(type: 'clientes' | 'mascotas') {
    this.typeSection = type;
  }

  ngOnInit(): void {
    // Al cargar el componente, obtenemos el valor de `typeObject` desde la ruta
    this.route.data.subscribe((data) => {
      this.typeSection = data['type'];
    });

    // Obtenemos el valor de `veterinarioId` desde la ruta
    this.route.queryParams.subscribe((params) => {
      const idParam = params['id'];

      if (idParam) {
        this.veterinarioId = +idParam; 
        this.vetService.setVeterinarioId(this.veterinarioId); // Establecer el ID en el servicio
      }
    })
  }

  onSearch(searchTerm: string): void {
    if (this.cardsTable) {
      this.cardsTable.searchItemsByName(searchTerm); // Llama al método en CardsTableComponent
    }
  }
}
