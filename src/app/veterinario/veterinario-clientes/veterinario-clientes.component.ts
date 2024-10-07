import { Component } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SharedHeaderComponent } from '../../veterinario/shared-header/shared-header.component';
import { CardsTableComponent } from '../cards-table/cards-table.component';

@Component({
  selector: 'app-veterinario-clientes',
  standalone: true,
  imports: [
    SearchBarComponent,
    SharedHeaderComponent,
    CardsTableComponent
  ],
  templateUrl: './veterinario-clientes.component.html',
  styleUrl: './veterinario-clientes.component.css'
})
export class VeterinarioClientesComponent {

}
