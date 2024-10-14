import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface DashboardData {
  mascotas: Array<any>;
  clientes: Array<any>;
  tratamientos: Array<any>;
  veterinarios: Array<any>;
  drogas: Array<any>;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  getTratamientos() {
    throw new Error('Method not implemented.');
  }
  getClientes() {
    throw new Error('Method not implemented.');
  }
  getMascotas() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:4000/api/dashboard'; 

  constructor(private http: HttpClient) { }

  getDashboardData(): Observable<DashboardData> {
    return this.http.get<DashboardData>(this.apiUrl);
  }
}