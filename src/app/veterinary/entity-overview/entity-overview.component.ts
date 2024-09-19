import { Component } from '@angular/core';
import { SharedHeaderComponent } from '../shared-header/shared-header.component';
import { CardDetailsComponent } from '../card-details/card-details.component';
import { PetDetailComponent } from '../pet-detail/pet-detail.component';

import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-entity-overview',
  standalone: true,
  imports: [
    SharedHeaderComponent,
    CardDetailsComponent,
    PetDetailComponent,
    CommonModule
  ],
  templateUrl: './entity-overview.component.html',
  styleUrl: './entity-overview.component.css'
})
export class EntityOverviewComponent {
  entityType: string = 'cliente';

  constructor(
    private route: ActivatedRoute, private router: Router
  ) {}

  ngOnInit(): void {
    // Detectar el cambio en la URL
    this.route.url.subscribe(url => {
      // Cambiar entityType según la ruta actual
      const currentPath = this.router.url;
      if (currentPath.includes('mascota')) {
        this.entityType = 'mascota';
      } else if (currentPath.includes('cliente')) {
        this.entityType = 'cliente';
      }
    });
  }
}
