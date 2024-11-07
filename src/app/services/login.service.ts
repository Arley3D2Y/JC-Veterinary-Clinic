import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8088/login'; // Definimos la URL base para facilitar

  constructor( private http: HttpClient ) { }

  loginCliente(user: User): Observable<String> {
    return this.http.post(`${this.baseUrl}/cliente`, user, {
      responseType: 'text'
    });
  }

  loginVet(user: User): Observable<String> {
    return this.http.post(`${this.baseUrl}/veterinario`, user, {
      responseType: 'text'
    });
  }

  loginAdmin(user: User): Observable<String> {
    return this.http.post(`${this.baseUrl}/administrador`, user, {
      responseType: 'text'
    });
  }
}
