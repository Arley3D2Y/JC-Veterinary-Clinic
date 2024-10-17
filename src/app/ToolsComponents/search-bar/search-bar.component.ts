import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @Input() typeObject: String = "";
  searchTerm: string = "";

  @Output() searchEvent = new EventEmitter<string>();

  constructor() { }

  onSearch() {
    this.searchEvent.emit(this.searchTerm)
  }

  refresh() {
    window.location.reload();
  }

}
