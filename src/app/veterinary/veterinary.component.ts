import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-veterinary',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterModule
  ],
  templateUrl: './veterinary.component.html',
  styleUrl: './veterinary.component.css'
})
export class VeterinaryComponent {
  buttonActive = true;
}
