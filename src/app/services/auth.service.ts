import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(id: number, correo: string): void {
    localStorage.setItem('veterinarioId', id.toString()); // Guarda id como string
    localStorage.setItem('correo', correo);
  }

  logout(): void {
    localStorage.removeItem('veterinarioId');
    localStorage.removeItem('correo');
  }

  getVeterinarioData(): { id: number | null, correo: string | null } {
    const id = localStorage.getItem('veterinarioId');
    return {
      id: id ? +id : null, // Convierte id de string a número
      correo: localStorage.getItem('correo')
    };
  }
}
