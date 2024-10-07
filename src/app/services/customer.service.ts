import { Injectable } from '@angular/core';
import { Customer } from '../model/customer';

import { Pet } from '../model/pet';
import { PetService } from './pet.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private petService: PetService
  ) {
    this.assignRandomPets();
  }

    // Base de datos falsa
    customerList: Customer[] = [
      {
        id: 1,
        nombre: 'Juan Carlos',
        cedula: '1435466',
        correo: 'juancarlos@gmail.com',
        celular: '2343544354',
        direccion: 'Cll 79 # 13-21',
        fotoString: 'https://img.a.transfermarkt.technology/portrait/big/94540-1636851420.jpg?lm=1',
        mascotas: []
      },
      {
        id: 2,
        nombre: 'Pedro',
        cedula: '14789806',
        correo: 'pedro@gmail.com',
        celular: '4366854',
        direccion: 'Cll 80 # 89-21',
        fotoString: 'https://ntvb.tmsimg.com/assets/assets/494807_v9_bd.jpg?w=360&h=480',
        mascotas: []
      },
      {
        id: 3,
        nombre: 'Carlos Luis',
        cedula: '2234466',
        correo: 'carlos@gmail.com',
        celular: '546544354',
        direccion: 'Cr 9 # 130-21',
        fotoString: 'https://static.wikia.nocookie.net/esstarwars/images/2/29/Harrisonford.jpg/revision/latest?cb=20131222030038',
        mascotas: []
      },
      {
        id: 4,
        nombre: 'Luis Alberto',
        cedula: '14789808',
        correo: 'luis@gmail.com',
        celular: '56766854',
        direccion: 'Cll 79 # 13-21',
        fotoString: 'https://img.peliplat.com/api/resize/v1?imagePath=std/202301/a/2/a216e91526720344073201406fb3bee0.jpg&mode=FILL&width=304&height=456&limit=false',
        mascotas: []
      },
      {
        id: 5,
        nombre: 'Ana Mariá',
        cedula: '1234567',
        correo: 'anamaria@gmail.com',
        celular: '3001234567',
        direccion: 'Cll 9 #3-2',
        fotoString: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Ana_de_Armas_GQ_2018_2.png/330px-Ana_de_Armas_GQ_2018_2.png',
        mascotas: []
      },
      {
        id: 6,
        nombre: 'Miguel Ángel',
        cedula: '2345678',
        correo: 'miguelangel@gmail.com',
        celular: '3002345678',
        direccion: 'Cll 79 # 13-21',
        fotoString: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Snoop_Dogg_2019_by_Glenn_Francis.jpg/330px-Snoop_Dogg_2019_by_Glenn_Francis.jpg',
        mascotas: []
      },
      {
        id: 7,
        nombre: 'Laura Gómez',
        cedula: '3456789',
        correo: 'lauragierre@gmail.com',
        celular: '3003456789',
        direccion: 'Cll 79 # 13-21',
        fotoString: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Laura_Dern_Deauville_2017.jpg/330px-Laura_Dern_Deauville_2017.jpg',
        mascotas: []
      },
      {
        id: 8,
        nombre: 'Sofía Martínez',
        cedula: '4567890',
        correo: 'sofia@gmail.com',
        celular: '3004567890',
        direccion: 'Cll 79 # 13-21',
        fotoString: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Laura_Dern_Deauville_2017.jpg/330px-Laura_Dern_Deauville_2017.jpg',
        mascotas: []
      },
      {
        id: 9,
        nombre: 'Javier Pérez',
        cedula: '5678901',
        correo: 'javierperez@gmail.com',
        celular: '3005678901',
        direccion: 'Cll 79 # 13-21',
        fotoString: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/David_Beckham_UNICEF_%28cropped%29.jpg/263px-David_Beckham_UNICEF_%28cropped%29.jpg',
        mascotas: []
      },
      {
        id: 10,
        nombre: 'Carlos Vega',
        cedula: '6789012',
        correo: 'carlosvega@gmail.com',
        celular: '3006789012',
        direccion: 'Cll 79 # 13-21',
        fotoString: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Laura_Dern_Deauville_2017.jpg/330px-Laura_Dern_Deauville_2017.jpg',
        mascotas: []
      }
    ];

    finAll() {
      return this.customerList;
    }

    findById(id : number):Customer {
      const student:Customer = this.customerList.find(o => o.id === id)!;
      return student;
    }

    deleteCustomerById(id: number): void {
      const index = this.customerList.findIndex(o => o.id === id);
      if (index !== -1) {
        this.customerList.splice(index, 1);
      }
    }

    // Asignar mascotas aleatoriamente sin repetir
    assignRandomPets() {
      // Obtener la lista de mascotas de PetService
      const availablePets: Pet[] = [...this.petService.finAll()]; // Copia de la lista

      this.customerList.forEach(customer => {
        if (availablePets.length > 0) {
          // Seleccionar una mascota aleatoria
          const randomIndex = Math.floor(Math.random() * availablePets.length);
          const selectedPet = availablePets.splice(randomIndex, 1)[0]; // Eliminar la mascota de la lista disponible
          selectedPet.duenho = customer; // Relacionar mascota con cliente
          customer.mascotas.push(selectedPet);
        }
      });
    }

    getPetsByCustomerId(id: number): Pet[] {
      const customer = this.findById(id);
      return  customer ? customer.mascotas : [];
    }

    addPetToCustomer(customerId: number, petId: number): void {
      // Buscar el cliente por ID
      const customer = this.findById(customerId);
      
      if (customer) {
        // Buscar la mascota por ID desde el servicio de mascotas
        const pet = this.petService.findById(petId);
        
        if (pet) {
          // Relacionar la mascota con el cliente si aún no la tiene
          const petAlreadyAssigned = customer.mascotas.some(existingPet => existingPet.id === pet.id);
          
          if (!petAlreadyAssigned) {
            pet.duenho = customer; // Asignar el dueño a la mascota
            customer.mascotas.push(pet); // Añadir la mascota al cliente
          }
        }
      }
    }
    

      // Eliminar una mascota de la lista del cliente
    removePetFromCustomer(customerId: number, petId: number): void {
      const customer = this.findById(customerId);
      if (customer) {
        const petIndex = customer.mascotas.findIndex(pet => pet.id === petId);
        if (petIndex !== -1) {
          customer.mascotas.splice(petIndex, 1); // Eliminar la mascota de la lista
          this.petService.deletePetById(petId); // Elimina la mascota de la lista global
        }
      }
    }

}
