import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, RouterLink  } from '@angular/router';
import { Customer } from '../../model/customer';
import { CustomerService } from '../../services/customer.service';
import { Pet } from '../../model/pet';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { SharedHeaderComponent } from '../../ToolsComponents/shared-header/shared-header.component';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    SharedHeaderComponent
  ],
  templateUrl: './pet-form.component.html',
  styleUrl: './pet-form.component.css'
})
export class PetFormComponent {
  // Queremos que la mascota se transmita al componente padre a través de un evento
  @Output() addPetEvent = new EventEmitter<Pet>();  // Usa EventEmitter de @angular/core

  @Input() petUpdated!: Pet;
  @Input() customer!: Customer;  // Recibe el cliente desde el padre
  @Input() operation!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    if (this.operation === 'actualizar') {
      this.formPet = { ...this.petUpdated};
    }
  }

  formPet: Pet = {
    id: 0,
    nombre: '',
    sexo: '',
    raza: '',
    fechaNacimiento: '',
    fotoString: '',
    duenho: undefined
  }

  pageBack() {
    if (this.operation === 'agregar') {
      this.router.navigate(['/veterinario/detalles/cliente/', this.customer.id]);
    } else {
      this.router.navigate(['/veterinario/detalles/mascota/', this.petUpdated.id]);
    }
  }

  // Método para agregar o actualizar la mascota
  savePet(form: any) {
    this.addPetEvent.emit(this.formPet);  // Emite el evento con la mascota
  }
}
