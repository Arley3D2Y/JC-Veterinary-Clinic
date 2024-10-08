import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @Input()
  typeObject: String = "";

  constructor() { }

  refresh() {
    window.location.reload();
  }

}
