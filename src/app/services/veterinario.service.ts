import { Injectable } from '@angular/core';
import { Veterinario } from '../model/veterinario';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tratamiento } from '../model/tratamiento';
import { Especialidad } from '../model/especialidad';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {

  private baseUrl = 'http://localhost:8088/veterinarios';

  constructor(private http: HttpClient) { }

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

  // Eliminar veterinario
  deleteVeterinario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  // Actualizar veterinario
  updateveterinario(id: number, veterinario: Veterinario): Observable<Veterinario> {
    return this.http.put<Veterinario>(`${this.baseUrl}/update/${id}`, veterinario);
  }

  // Buscar veterinarios por cedula
  clienteHome(): Observable<Veterinario> {
    return this.http.get<Veterinario>(`${this.baseUrl}/details`);
  }

  // Buscar veterinarios por nombre
  sarchVeterinariosByName(name: string): Observable<Veterinario[]> {
    return this.http.get<Veterinario[]>(`${this.baseUrl}/search-by-name/${name}`);
  }

  getTratamientosByVet(): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>(`${this.baseUrl}/tratamientos`);
  }

  getEspecialidadByVet(id: number): Observable<Especialidad> {
    return this.http.get<Especialidad>(`${this.baseUrl}/${id}/especialidad`);
  }

}
