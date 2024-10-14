import { Injectable } from '@angular/core';
import { Veterinario } from '../model/veterinario';

@Injectable({
  providedIn: 'root'
})
export class VeterinaryService {

  constructor() { }

  veterinaryList: Veterinario[] = [
    {
      id: 1,
      nombre: 'Diego Carlos Martinez',
      cedula: '11223344',
      correo: 'dc@m.com',
      password: '1234',
      fotoString: 'https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-afro-professional-doctor-png-image_10148632.png',
      especialidades: 'Neurolocat, Scicent' as any,
      tratamietos: [] as any[],
    },
  ];

  finAll() {
    return this.veterinaryList;
  }

  findById(id : number):Veterinario {
    const vet: Veterinario = this.veterinaryList.find(o => o.id === id)!;
    return vet;
  }

  findByCorreo(correo : string):Veterinario {
    const vet: Veterinario = this.veterinaryList.find(o => o.correo === correo)!;
    return vet;
  }

  findByCedula(cedula : string):Veterinario {
    const vet:Veterinario = this.veterinaryList.find(o => o.cedula === cedula)!;
    return vet;
  }

  deleteVetById(id : number): void {
    const index = this.veterinaryList.findIndex(o => o.id === id);
    if (index !== -1) {
      this.veterinaryList.splice(index, 1);
    }
  }
  
  async createVet(vet: Veterinario):Promise<void> {
    this.veterinaryList.push(vet);
  }

  async updateVet(id: number, vet: Veterinario): Promise<void> {
    const index = this.veterinaryList.findIndex(o => o.id === id);
    if (index !== -1) {
      this.veterinaryList[index] = vet;
    }
  }
}
