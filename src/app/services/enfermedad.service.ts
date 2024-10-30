import { Injectable } from '@angular/core';
import { Droga } from '../model/droga';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enfermedad } from '../model/enfermedad';

@Injectable({
  providedIn: 'root'
})
export class EnfermedadService {

  private baseUrl = 'http://localhost:8088/enfermedades';

  constructor( private http: HttpClient ) { }

  findAll(): Observable<Enfermedad[]> {
    return this.http.get<Enfermedad[]>(this.baseUrl);
  }

  finById(id: number): Observable<Enfermedad> {
    return this.http.get<Enfermedad>(`${this.baseUrl}/find/${id}`);
  }


}
