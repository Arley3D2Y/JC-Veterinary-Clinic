import { Injectable } from '@angular/core';
import { Mascota } from '../model/mascota';
import { Observable } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Tratamiento } from '../model/tratamiento';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private baseUrl = 'http://localhost:8088/mascotas'; // Definimos la URL base para facilitar

  constructor( private http: HttpClient ) {  }

  findAll(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.baseUrl}`);
  }

  findById(id: Number): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.baseUrl}/find/${id}`);
  }

  addMascota(customerId: Number, pet: Mascota): Observable<Mascota> {
    return this.http.post<Mascota>(`${this.baseUrl}/add/cliente-id/${customerId}`, pet);
  }
  
  updatePet(id: number, mascota: Mascota): Observable<Mascota> {
    return this.http.put<Mascota>(`${this.baseUrl}/update/${id}`, mascota);
  }

  deleteMascota(id: Number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  getPetsByCustomerId(id: Number): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.baseUrl}/search-by-client_id/${id}`);
  }

  searhcByPetName(name: String): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.baseUrl}/search-by-name/${name}`);
  }

  getTreatmentsByPetId(id: Number): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>(`${this.baseUrl}/findTreatmentsByPetId/${id}`);
  }
}
