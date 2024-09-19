import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';


import { Pet } from '../../model/pet';
import { CustomerService } from '../../services/customer.service';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-pet-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './pet-detail.component.html',
  styleUrl: './pet-detail.component.css'
})
export class PetDetailComponent {
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
