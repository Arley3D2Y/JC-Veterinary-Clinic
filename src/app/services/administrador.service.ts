import { Injectable } from '@angular/core';
import { Administrador } from '../model/administrador';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  constructor() { }

  administradors: Administrador[] = [
    {
      id: 1,
      usuario: 'admin',
      password: '102938'
    },
    {
      id: 2,
      usuario: 'admin2',
      password: '019283'
    },
    {
      id: 3,
      usuario: 'admin3',
      password: '678534'
    }
  ];

  finAll() {
    return this.administradors;
  }

  findById(id: number): Administrador {
    const admin: Administrador = this.administradors.find(o => o.id === id)!;
    return admin;
  }

  findByUser(user: string): Administrador {
    const admin: Administrador = this.administradors.find(o => o.usuario === user)!;
    return admin;
  }
}
