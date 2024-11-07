import { Injectable } from '@angular/core';
import { Cliente } from '../model/cliente';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mascota } from '../model/mascota';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = 'http://localhost:8088/clientes'; // Definimos la URL base para facilitar

  constructor( private http: HttpClient ) { }

  findAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}`);
  }

  findById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/find/${id}`);
  }

  addCustomer(customer: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.baseUrl}/add`, customer);
  }

  deleteCustomer(id: Number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
  
  updateCustomer(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.baseUrl}/update/${id}`, cliente);
  }

  // Mostrar cliente
  clienteHome(): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/details`);
  }

  sarchCustomersByName(name: String): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}/search-by-name/${name}`);
  }

  getPetsByCustomerId(id: Number): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.baseUrl}/${id}/mascotas`);
  }

}
