import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderHomeComponent } from './landing-page/header-home/header-home.component';
import { ServicesHomeComponent } from './landing-page/services-home/services-home.component';
import { AboutHomeComponent } from './landing-page/about-home/about-home.component';
import { ContactHomeComponent } from './landing-page/contact-home/contact-home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, HeaderHomeComponent, ServicesHomeComponent, AboutHomeComponent, ContactHomeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'JC-Veterinary-Clinic';
}
