import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shared-header',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterModule
    ],
  templateUrl: './shared-header.component.html',
  styleUrl: './shared-header.component.css'
})
export class SharedHeaderComponent {

}
