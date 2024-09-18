import { Component } from '@angular/core';

import { RouterModule, RouterOutlet } from '@angular/router';

import { SharedHeaderComponent } from '../shared-header/shared-header.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { CardsTableComponent } from '../cards-table/cards-table.component';

@Component({
  selector: 'app-customers-search',
  standalone: true,
  imports: [
    SharedHeaderComponent, RouterModule, RouterOutlet,
    SearchBarComponent, CardsTableComponent
  ],
  templateUrl: './customers-search.component.html',
  styleUrl: './customers-search.component.css'
})
export class CustomersSearchComponent {

}
