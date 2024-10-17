import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Especialidad } from '../model/especialidad';
@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {
  private baseUrl = ' http://localhost:8088/veterinarios/especialidades';
  constructor(private http: HttpClient ) { }

  // Obtener todas las especialidades
  findAll(): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(`${this.baseUrl}`);
  }

  // Obtener una especialidad por ID
  findById(id: number): Observable<Especialidad> {
    return this.http.get<Especialidad>(`${this.baseUrl}/${id}`);
  }

  // Agregar una nueva especialidad
  addEspecialidad(especialidad: Especialidad): Observable<Especialidad> {
    return this.http.post<Especialidad>(`${this.baseUrl}/add`, especialidad);
  }

  // Actualizar una especialidad por ID
  updateEspecialidad(id: number, especialidad: Especialidad): Observable<Especialidad> {
    return this.http.put<Especialidad>(`${this.baseUrl}/update/${id}`, especialidad);
  }

  // Eliminar una especialidad por ID
  deleteEspecialidad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
