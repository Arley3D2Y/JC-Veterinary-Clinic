import { Injectable } from '@angular/core';
import { Veterinario } from '../model/veterinario';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {

  private baseUrl = 'http://localhost:8088/veterinarios';

  constructor( private http: HttpClient ) { }

  // Obtener todos los veterinarios
  findAll(): Observable<Veterinario[]> {
    return this.http.get<Veterinario[]>(`${this.baseUrl}`);
  }

  // Obtener veterinario por id
  findById(id: number): Observable<Veterinario> {
    return this.http.get<Veterinario>(`${this.baseUrl}/find/${id}`);
  }

  // Agregar veterinario
  addveterinario(veterinario: Veterinario): Observable<Veterinario> {
    return this.http.post<Veterinario>(`${this.baseUrl}/add`, veterinario);
  }

  // Actualizar veterinario
  updateveterinario(id: number, veterinario: Veterinario): Observable<Veterinario> {
    return this.http.put<Veterinario>(`${this.baseUrl}/update/${id}`, veterinario);
  }

  // Eliminar veterinario
  deleteVeterinario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  // Buscar veterinarios por nombre
  searchByName(name: string): Observable<Veterinario[]> {
    return this.http.get<Veterinario[]>(`${this.baseUrl}/search-by-name/${name}`);
  }

  // Buscar veterinarios por cedula
  searchByDocument(docuemnt: string): Observable<Veterinario> {
    return this.http.get<Veterinario>(`${this.baseUrl}/search-by-document/${docuemnt}`);
  }

  // Obtener veterinario por correo
  searchbyEmail(email: string): Observable<Veterinario> {
    return this.http.get<Veterinario>(`${this.baseUrl}/search-by-email/${email}`);
  }

}
