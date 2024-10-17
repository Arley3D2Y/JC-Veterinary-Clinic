import { Injectable } from '@angular/core';
import { Tratamiento } from '../model/tratamiento';
import { Observable } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';

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

  addTratamiento(petId: number, vetId: number, tratamiento: Tratamiento): Observable<Tratamiento> {
    return this.http.post<Tratamiento>(`${this.baseUrl}/add/mascota-id/${petId}/veterinario-id/${vetId}`, tratamiento);
  }

  updateTratamiento(id: number, tratamiento: Tratamiento): Observable<Tratamiento> {
    return this.http.put<Tratamiento>(`${this.baseUrl}/update/${id}`, tratamiento);
  }

  deleteTratamiento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  sarchTratamientosByName(name: String): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>(`${this.baseUrl}/search-by-name/${name}`);
  }

  searchTratamientoByVetId(id: number): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>(`${this.baseUrl}/search-by-veterinario_id/${id}`);
  }

  searchTratamientoByPetId(id: number): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>(`${this.baseUrl}/search-by-mascota_id/${id}`);
  }

}
