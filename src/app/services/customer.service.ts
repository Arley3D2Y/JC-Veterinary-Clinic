import { Injectable } from '@angular/core';
import { Cliente } from '../model/cliente';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = 'http://localhost:8091/veterinario/clientes'; // Definimos la URL base para facilitar

  constructor(
    private http: HttpClient,
  ) {

  }

  finAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}`);
  }

  findById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/find/${id}`);
  }

  getCustomerByPetId(id: Number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/search-by-pet/${id}`);
  }

  deleteCustomerById(id: Number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  createCustomer(customer: Cliente) {
    return this.http.post<Cliente>(`${this.baseUrl}/add`, customer);
  }

  updateCustomer(id: number, cliente: Cliente) {
    return this.http.put<Cliente>(`${this.baseUrl}/update/${id}`, cliente);
  }

  addPetToCustomer(customerId: number, petId: number): void {
    this.http.post(`${this.baseUrl}/${customerId}/add-pet/${petId}`, {}).subscribe();
  }

  // Eliminar una mascota de la lista del cliente
  removePetFromCustomer(customerId: number, petId: number): void {
    this.http.delete(`${this.baseUrl}/${customerId}/remove-pet/${petId}`).subscribe();
  }

}
