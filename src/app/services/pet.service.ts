import { Injectable } from '@angular/core';
import { Mascota } from '../model/mascota';
import { Observable } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Tratamiento } from '../model/tratamiento';
import { Cliente } from '../model/cliente';
import { Enfermedad } from '../model/enfermedad';

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

  addMascota(idC: number, idE: number, pet: Mascota): Observable<Mascota> {
    return this.http.post<Mascota>(`${this.baseUrl}/add/cliente-id/${idC}/enfermedad-id/${idE}`, pet);
  }
 
  deleteMascota(id: Number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  updatePet(id: number, mascota: Mascota): Observable<Mascota> {
    return this.http.put<Mascota>(`${this.baseUrl}/update/${id}`, mascota);
  }

  searhcPetsByName(name: String): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.baseUrl}/search-by-name/${name}`);
  }

  getTreatmentsByPetId(id: Number): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>(`${this.baseUrl}/${id}/tratamientos`);
  }

  getClientByPetId(id: Number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/${id}/cliente`);
  }
  
  getEnfermedadByPetId(id: Number): Observable<Enfermedad> {
    return this.http.get<Enfermedad>(`${this.baseUrl}/${id}/enfermedad`);
  }

}
