import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Veterinario } from '../../model/veterinario';
import { VeterinaryService } from '../../services/veterinary.service';

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
  vet?: Veterinario;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vetService: VeterinaryService
  ) {}

  ngOnInit() {
    // Obtener la cédula desde la ruta
    this.route.params.subscribe(params => {
      const cedulaVetSelected = params['cedula'];
      this.vet =  this.vetService.findByCedula(cedulaVetSelected);
    });
  }

  logout() {
    this.router.navigate(['login'], { queryParams: { typeUser: 'veterinario' } });
  }
}
