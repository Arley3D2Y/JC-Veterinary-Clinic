import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivatedRoute,Router } from '@angular/router';

import { Customer } from '../../model/customer';
import { VeterinarioService } from '../../services/veterinario.service';
import { Veterinario } from '../../model/veterinario';
@Component({
  selector: 'app-veterinario-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './veterinario-card.component.html',
  styleUrl: './veterinario-card.component.css'
})
export class VeterinarioCardComponent {
  @Input()
  veterinarySelected!: Veterinario;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vetService: VeterinarioService
  ) {
  }

  // ngOnInit(): void {
  //   this.route.paramMap.subscribe(params => {
  //     const id = Number(params.get('id'));
  //     this.pets = this.customerService.getPetsByCustomerId(id);
  //   });
  // }

  // Función para eliminar una mascota
  deleteVet(id: number) {
    this.vetService.deleteVeterinario(id);
    this.router.navigate(['administrador/veterinario']); // Redirigir al componente de detalles del cliente
  }


}
