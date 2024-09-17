import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ServicesPageComponent } from './services-page/services-page.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    HeaderComponent, ServicesPageComponent, AboutComponent, ContactComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
