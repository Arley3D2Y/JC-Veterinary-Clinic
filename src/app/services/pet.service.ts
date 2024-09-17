import { Injectable } from '@angular/core';
import { Pet } from '../model/pet';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  petList: Pet[] = [];

  constructor(
    private customerService: CustomerService,
  ) {
  this.petList = [
    {
      id: 1,
      nombre: 'Lily',
      sexo: 'Hembra',
      raza: 'Birmano',
      fechaNacimiento: '2019-01-01',
      fotoString: 'https://content.elmueble.com/medio/2023/04/12/gato-birmano_40aca551_230412112429_900x900.jpg',
      duenho: this.customerService.findById(1)
    },
    {
      id: 2,
      nombre: 'Oscar',
      sexo: 'Macho',
      raza: 'Persa',
      fechaNacimiento: '2020-08-01',
      fotoString: 'https://www.purina.es/sites/default/files/styles/ttt_image_510/public/2024-02/sitesdefaultfilesstylessquare_medium_440x440public2022-06Persian-Long-Hair.jpg?itok=AOnt5aNF',
      duenho: this.customerService.findById(1)
    },
    {
      id: 3,
      nombre: 'Sammy',
      sexo: 'Hembra',
      raza: 'Burmés',
      fechaNacimiento: '2019-06-13',
      fotoString: 'https://miperroesunico.com/img/razas-de-gatos/Raza-de-Gato-Burmes.jpg',
      duenho: this.customerService.findById(1)
    },
    {
      id: 4,
      nombre: 'Maggie',
      sexo: 'Macho',
      raza: 'Ragdoll',
      fechaNacimiento: '2013-09-14',
      fotoString: 'https://content.elmueble.com/medio/2023/02/24/gato-de-raza-ragdoll_5c5827ec_230224104944_900x900.jpg',
      duenho: this.customerService.findById(1)
    },
    {
      id: 5,
      nombre: 'Cleo',
      sexo: 'Hembra',
      raza: 'Siberiano',
      fechaNacimiento: '2020-06-19',
      fotoString: 'https://www.zooplus.es/magazine/wp-content/uploads/2017/10/fotolia_126848656-1024x995.jpg',
      duenho: this.customerService.findById(1)
    },
    {
      id: 6,
      nombre: 'Dexter',
      sexo: 'Macho',
      raza: 'Birmano',
      fechaNacimiento: '2019-01-01',
      fotoString: 'https://content.elmueble.com/medio/2023/04/12/gato-birmano_40aca551_230412112429_900x900.jpg',
      duenho: this.customerService.findById(1)
    },
    {
      id: 7,
      nombre: 'Luna',
      sexo: 'Hembra',
      raza: 'Persa',
      fechaNacimiento: '2020-08-01',
      fotoString: 'https://www.purina.es/sites/default/files/styles/ttt_image_510/public/2024-02/sitesdefaultfilesstylessquare_medium_440x440public2022-06Persian-Long-Hair.jpg?itok=AOnt5aNF',
      duenho: this.customerService.findById(1)
    },
    {
      id: 8,
      nombre: 'Charlie',
      sexo: 'Macho',
      raza: 'Burmés',
      fechaNacimiento: '2019-06-13',
      fotoString: 'https://miperroesunico.com/img/razas-de-gatos/Raza-de-Gato-Burmes.jpg',
      duenho: this.customerService.findById(1)
    },
    {
      id: 9,
      nombre: 'Maggie',
      sexo: 'Hembra',
      raza: 'Ragdoll',
      fechaNacimiento: '2013-09-14',
      fotoString: 'https://content.elmueble.com/medio/2023/02/24/gato-de-raza-ragdoll_5c5827ec_230224104944_900x900.jpg',
      duenho: this.customerService.findById(1)
    }
  ]
  }
  
  
  finAll() {
    return this.petList;
  }

  findById(id : number):Pet {
    const student:Pet = this.petList.find(o => o.id === id)!;
    return student;
  }

}
