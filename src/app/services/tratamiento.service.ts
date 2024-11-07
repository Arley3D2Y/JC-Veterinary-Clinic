import { Injectable } from '@angular/core';
import { Tratamiento } from '../model/tratamiento';
import { Observable } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Droga } from '../model/droga';
import { Mascota } from '../model/mascota';
import { Veterinario } from '../model/veterinario';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {

  private baseUrl = 'http://localhost:8088/tratamientos'; // Definimos la URL base para facilitar

  constructor( private http: HttpClient ) { }

  findAll(): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>(`${this.baseUrl}`);
  }

  findById(id: number): Observable<Tratamiento> {
    return this.http.get<Tratamiento>(`${this.baseUrl}/find/${id}`);
  }

  addTratamiento(petId: number, drugId: number, tratamiento: Tratamiento): Observable<Tratamiento> {
    return this.http.post<Tratamiento>(`${this.baseUrl}/add/mascota/${petId}/droga/${drugId}`, tratamiento);
  }

  deleteTratamiento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  updateTratamiento(id: number, tratamiento: Tratamiento): Observable<Tratamiento> {
    return this.http.put<Tratamiento>(`${this.baseUrl}/update/${id}`, tratamiento);
  }

  sarchTratamientosByName(name: String): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>(`${this.baseUrl}/search-by-description/${name}`);
  }

  getVeterinaryByTratamientoId(id: number): Observable<Veterinario> {
    return this.http.get<Veterinario>(`${this.baseUrl}/${id}/veterinario`);
  }

  getMascotaByTratamientoId(id: number): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.baseUrl}/${id}/mascota`);
  }

  getDrogaByTratamientoId(id: number): Observable<Droga> {
    return this.http.get<Droga>(`${this.baseUrl}/${id}/droga`);
  }

}
