import { Injectable } from '@angular/core';
import { Droga } from '../model/droga';

@Injectable({
  providedIn: 'root'
})
export class DrogaService {

  constructor() { }

  drogasList: any[] = [
    {
      id: 1,
      nombre: "acetaminofen",
      precioCompra: 200,
      precioVenta: 150,
      unidadesDisponibles: 20,
      UnidadesVendidas: 100,
      tratamientoDroga: [] as any[]
    },
    {
      id: 2,
      nombre: "ibuprofeno",
      precioCompra: 200,
      precioVenta: 150,
      unidadesDisponibles: 20,
      UnidadesVendidas: 100,
      tratamientoDroga: [] as any[]
    },
    {
      id: 3,
      nombre: "paracetamol",
      precioCompra: 200,
      precioVenta: 150,
      unidadesDisponibles: 20,
      UnidadesVendidas: 100,
      tratamientoDroga: [] as any[]
    },
    {
      id: 4,
      nombre: "amoxicilina",
      precioCompra: 200,
      precioVenta: 150,
      unidadesDisponibles: 20,
      UnidadesVendidas: 100,
      tratamientoDroga: [] as any[]
    }
  ];

  finAll() {
    return this.drogasList;
  }

  finById(id: number): Droga {
    const drug: Droga = this.drogasList.find(droga => droga.id === id)!;
    return drug;
  }

  deletePetById(id: number): void {
    const index = this.drogasList.findIndex(droga => droga.id === id);
    if (index !== -1) {
      this.drogasList.splice(index, 1);
    }
  }

  async updateDrug(id: number, drug: Droga): Promise<void> {
    const index = this.drogasList.findIndex(droga => droga.id === id);
    if (index !== -1) {
      this.drogasList[index] = {...this.drogasList[index], ...drug};
    }
  }

}
