import { Component, Input } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface NavLink {
  path: string;
  label: string;
}

@Component({
  selector: 'app-shared-header',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterModule
  ],
  templateUrl: './shared-header.component.html',
  styleUrls: ['./shared-header.component.css']
})
export class SharedHeaderComponent {
  @Input() navLinks: NavLink[] = []; // Acepta links dinámicos
  @Input() logoutRedirectUrl: string = 'login'; // URL dinámica para el logout

  constructor(
    private router: Router,
  ) {}

  logout() {
    // Redirigir a la URL dinámica proporcionada, sin pasar el tipo de usuario
    this.router.navigate([this.logoutRedirectUrl]);
  }
}
