import { Injectable } from '@angular/core';
import { Droga } from '../model/droga';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tratamiento } from '../model/tratamiento';

@Injectable({
  providedIn: 'root'
})
export class DrogaService {

  private baseUrl = 'http://localhost:8088/drogas';

  constructor( private http: HttpClient ) { }

  findAll(): Observable<Droga[]> {
    return this.http.get<Droga[]>(this.baseUrl);
  }

  finById(id: number): Observable<Droga> {
    return this.http.get<Droga>(`${this.baseUrl}/find/${id}`);
  }

  addDroga(drug: Droga): Observable<Droga> {
    return this.http.post<Droga>(`${this.baseUrl}/add`, drug);
  }

  deleteDroga(id: number) {
    this.http.delete<void>(`${this.baseUrl}/delete/${id}`).subscribe();
  }

  updateDroga(id: number, drug: Droga): Observable<Droga> {
    return this.http.put<Droga>(`${this.baseUrl}/update/${id}`, drug);
  }

  searchByName(name: String): Observable<Droga[]> {
    return this.http.get<Droga[]>(`${this.baseUrl}/search-by-name/${name}`);
  }

  getTratamientoByDrogaId(id: number): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>(`${this.baseUrl}/${id}/tratamientos`);
  }


}
