import { Component, Output, EventEmitter } from '@angular/core';  // Corrige la importación aquí
import { FormsModule } from '@angular/forms';
import { Pet } from '../../model/pet';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Customer } from '../../model/customer';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
  ],
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.css']  // Corrección en el nombre de la propiedad
})
export class PetFormComponent {
  // Queremos que la mascota se transmita al componente padre a través de un evento
  @Output()
  addPetEvent = new EventEmitter<Pet>();  // Usa EventEmitter de @angular/core

  sendPet!: Pet;

  customerSelected!: Customer;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.customerSelected = this.customerService.findById(id);
    });
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

  addPet(form: any) {
    this.sendPet = Object.assign({}, this.formPet);
    console.log('Emitting pet:', this.sendPet); // Añade esto para depuración
    this.addPetEvent.emit(this.sendPet);
  }
}
