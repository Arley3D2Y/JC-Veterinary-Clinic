import { Injectable } from '@angular/core';
import { Mascota } from '../model/mascota';
import { Observable } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private baseUrl = 'http://localhost:8091/veterinario/mascotas'; // Definimos la URL base para facilitar

  constructor(
    private http: HttpClient,
  ) {  }

  finAll(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.baseUrl}`);
  }

  findById(id: Number): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.baseUrl}/find/${id}`);
  }

  deletePetById(id: Number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  createPet(pet: Mascota, customerId: Number) {
    return this.http.post<Mascota>(`${this.baseUrl}/add/cliente/${customerId}`, pet);
  }

  updatePet(id: number, mascota: Mascota) {
    return this.http.put<Mascota>(`${this.baseUrl}/update/${id}`, mascota);
  }

  getPetsByCustomerId(id: Number): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.baseUrl}/search-by-client/${id}`);
  }
}
