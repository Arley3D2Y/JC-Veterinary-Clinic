import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tratamiento } from '../model/tratamiento';
import { EstadoMascotasDTO } from '../DTO/EstadoMascotasDTO';
import { EstadoVeterinariosDTO } from '../DTO/EstadoVeterinariosDTO';
import { TratamientoDrogaDTO } from '../DTO/TratamientoDrogaDTO';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:8088/dashboard'; // Asegúrate de que esta URL corresponda al backend

  constructor(private http: HttpClient) { }

  // Método para obtener el total de tratamientos del mes
  getTotalTreatmentsLastMonth(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total-treatments/last-month`);
  }

  // Método para obtener los tratamientos por medicamento
  getTratamientosPorMedicamento(): Observable<TratamientoDrogaDTO[]> {
    return this.http.get<TratamientoDrogaDTO[]>(`${this.apiUrl}/treatments-by-medication/last-month`);
  }

  // Método para obtener el número de veterinarios activos e inactivos
  getVeterinarios(): Observable<EstadoVeterinariosDTO[]> {
    return this.http.get<EstadoVeterinariosDTO[]>(`${this.apiUrl}/count-veterinarians/states`);
  }

  // Método para obtener el total de mascotas
  getTotalMascotas(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total-pets/count`);
  }

  // Método para obtener el número de mascotas activas
  getMascotasActivasCount(): Observable<EstadoMascotasDTO[]> {
    return this.http.get<EstadoMascotasDTO[]>(`${this.apiUrl}/total-pets/count-states`);
  }

  // Método para obtener las ganancias totales
  getTotalSales(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total-sales`);
  }

  // Método para obtener las ganancias
  getTotalProfits(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total-profits`);
  }

}