import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericoDTO } from '../model/GenericoDTO';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:8088/dashboard'; // Asegúrate de que esta URL corresponda al backend

  constructor(private http: HttpClient) { }

  // Método para obtener el total de tratamientos
  getTotalTratamientos(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total-tratamientos-mes`);
  }

  // Método para obtener los tratamientos por medicamento
  getTratamientosPorMedicamento(): Observable<GenericoDTO[]> {
    return this.http.get<GenericoDTO[]>(`${this.apiUrl}/tratamientos-por-medicamento`);
  }

  // Método para obtener el número de veterinarios activos e inactivos
  getVeterinarios(): Observable<{ activos: number, inactivos: number }> {
    return this.http.get<{ activos: number, inactivos: number }>(`${this.apiUrl}/veterinarios-estados`);
  }

  // Método para obtener el total de mascotas y el número de mascotas activas
  getMascotas(): Observable<{ total: number, activas: number }> {
    return this.http.get<{ total: number, activas: number }>(`${this.apiUrl}/mascotas`);
  }

  //Metodo para ver las ganacas totales en medicamentos
  getGanancias(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/ganancias`);
  }

  // Método para obtener los tratamientos más populares
  getTopTratamientos(): Observable<GenericoDTO[]> {
    return this.http.get<GenericoDTO[]>(`${this.apiUrl}/top-tratamientos`);
  }
}
