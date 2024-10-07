import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ServicesPageComponent } from '../services-page/services-page.component';
import { ContactComponent } from '../contact/contact.component';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [
    NavbarComponent,
    ServicesPageComponent,
    ContactComponent,
    AboutComponent
  ],
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'] // Cambiado a styleUrls
})
export class WelcomePageComponent {
  title = 'Welcome to Our Website'; // Propiedad para el título
  description = 'Discover our services and connect with us.'; // Descripción opcional

  constructor() {
    // Inyección de servicios si es necesario
  }

  OnInit() {
    // Inicializaciones adicionales, como cargar datos
  }
}
