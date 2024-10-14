import { Injectable } from '@angular/core';
import { Tratamiento } from '../model/tratamiento';
import { Observable } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {

  private baseUrl = 'http://localhost:8091/tratamientos'; // Definimos la URL base para facilitar

  constructor( private http: HttpClient ) { }

  findAll(): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>(this.baseUrl);
  }

  findById(id: number): Observable<Tratamiento> {
    return this.http.get<Tratamiento>(`${this.baseUrl}/find/${id}`);
  }

  addTratamiento(tratamiento: Tratamiento): Observable<Tratamiento> {
    return this.http.post<Tratamiento>(this.baseUrl, tratamiento);
  }

  updateTratamiento(id: number, tratamiento: Tratamiento): Observable<Tratamiento> {
    return this.http.put<Tratamiento>(`${this.baseUrl}/update/${id}`, tratamiento);
  }

  deleteTratamiento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  searchByTratamientoName(name: String): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>(`${this.baseUrl}/search/${name}`);
  }


}
