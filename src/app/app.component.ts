import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WelcomePageComponent } from './landing-page/welcome-page/welcome-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, WelcomePageComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'JC-Veterinary-Clinic';
}
