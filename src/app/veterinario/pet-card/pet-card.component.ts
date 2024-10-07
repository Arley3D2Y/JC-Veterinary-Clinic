import { Component, Input } from '@angular/core';
import { Pet } from '../../model/pet';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../../services/pet.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-pet-card',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './pet-card.component.html',
  styleUrl: './pet-card.component.css'
})
export class PetCardComponent {
  @Input()
  petSelected!: Pet;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private petService: PetService,
    private customerService: CustomerService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.petSelected = this.petService.findById(id);
    });
  }

  // Función para eliminar una mascota
  deletePet(mascota: Pet, duenhoId?: number) {
    if (duenhoId !== undefined) {
      this.customerService.removePetFromCustomer(duenhoId, mascota.id);
      this.router.navigate(['veterinario/detalles-cliente', duenhoId]); // Redirigir al componente de detalles del cliente
    }
  }    
}
