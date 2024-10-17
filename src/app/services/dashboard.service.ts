import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericoDTO } from '../model/GEnericoDTO';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:8088/dashboard'; // Ajusta esta URL según la configuración del backend

  constructor(private http: HttpClient) {}

  // Método para obtener el total de tratamientos
  getTotalTratamientos(): Observable<Number> {
    return this.http.get<Number>(`${this.apiUrl}/total-tratamientos-mes`);
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

  // Método para obtener las ventas y ganancias totales
  getFinanzas(): Observable<{ ventas: number, ganancias: number }> {
    return this.http.get<{ ventas: number, ganancias: number }>(`${this.apiUrl}/finanzas`);
  }

  // Método para obtener los tratamientos más populares
  getTopTratamientos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/top-tratamientos`);
  }
}
