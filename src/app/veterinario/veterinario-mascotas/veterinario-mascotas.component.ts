import { Component } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SharedHeaderComponent } from '../../veterinario/shared-header/shared-header.component';
import { CardsTableComponent } from '../cards-table/cards-table.component';

@Component({
  selector: 'app-veterinario-mascotas',
  standalone: true,
  imports: [
    SearchBarComponent,
    SharedHeaderComponent,
    CardsTableComponent
  ],
  templateUrl: './veterinario-mascotas.component.html',
  styleUrl: './veterinario-mascotas.component.css'
})
export class VeterinarioMascotasComponent {

}
