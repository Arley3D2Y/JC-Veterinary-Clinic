import { Injectable } from '@angular/core';
import { Droga } from '../model/droga';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enfermedad } from '../model/enfermedad';
import { Estado } from '../model/estado';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  private baseUrl = 'http://localhost:8088/estados';

  constructor( private http: HttpClient ) { }

  findAll(): Observable<Estado[]> {
    return this.http.get<Estado[]>(this.baseUrl);
  }

  finById(id: number): Observable<Estado> {
    return this.http.get<Estado>(`${this.baseUrl}/find/${id}`);
  }


}
