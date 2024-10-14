import { Injectable } from '@angular/core';
import { Administrador } from '../model/administrador';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private baseUrl = 'http://localhost:8091/administradores';

  constructor( private http: HttpClient ) { }

  findAll(): Observable<Administrador[]> {
    return this.http.get<Administrador[]>(`${this.baseUrl}`);
  }

  findById(id: number): Observable<Administrador> {
    return this.http.get<Administrador>(`${this.baseUrl}/find/${id}`);
  }

  seachByUser(user: string): Observable<Administrador> {
    return this.http.get<Administrador>(`${this.baseUrl}/find-by-user/${user}`);
  }
}
