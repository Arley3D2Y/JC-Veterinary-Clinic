import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrogaService } from '../../services/droga.service';
import { CustomerService } from '../../services/customer.service';
import { TratamientoService } from '../../services/tratamiento.service';
import { PetService } from '../../services/pet.service';

import { Mascota } from '../../model/mascota';
import { Cliente } from '../../model/cliente';
import { Tratamiento } from '../../model/tratamiento';

import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard-veterinario',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './dashboard-veterinario.component.html',
  styleUrls: ['./dashboard-veterinario.component.css'] // Corrección aquí
})
export class DashboardVeterinarioComponent implements OnInit {
  mascotas: Mascota[] = [];
  clientes: Cliente[] = [];
  tratamientos: Tratamiento[] = [];
  
  tratamientoMasComun: string = '';
  
  constructor(
    private drogaService: DrogaService,
    private clienteService: CustomerService,
    private tratamientoService: TratamientoService,
    private mascotaService: PetService
  ) {}

  ngOnInit(): void {
    // Cargar los datos de mascotas
    this.mascotaService.findAll().subscribe(mascotas => {
      this.mascotas = mascotas;
      this.actualizarGraficoMascotas(mascotas);
    });

    // Cargar los datos de clientes
    this.clienteService.findAll().subscribe(clientes => {
      this.clientes = clientes;
      this.actualizarGraficoClientes(clientes);
    });

    // Cargar los datos de tratamientos
    this.tratamientoService.findAll().subscribe(tratamientos => {
      this.tratamientos = tratamientos;
      this.tratamientoMasComun = this.obtenerTratamientoMasComun(tratamientos);
      this.actualizarGraficoTratamientos(tratamientos);
    });
  }

  actualizarGraficoMascotas(mascotas: Mascota[]): void {
    const tiposMascotas = mascotas.reduce((acc: Map<string, number>, mascota) => {
      acc.set(mascota.enfermedad, (acc.get(mascota.enfermedad) || 0) + 1);
      return acc;
    }, new Map());

    const mascotasData = {
      labels: Object.keys(tiposMascotas),
      datasets: [{
        data: Object.values(tiposMascotas),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
      }]
    };

    const ctx = document.getElementById('mascotasChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: mascotasData
    });
  }

  actualizarGraficoClientes(clientes: Cliente[]): void {
    const clientesData = {
      labels: clientes.map(cliente => cliente.nombre),
      datasets: [{
        data: clientes.map(cliente => 
          cliente.mascotas ? cliente.mascotas.length : 0
      ),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
      }]
    };

    const ctx = document.getElementById('clientesChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: clientesData
    });
  }

  actualizarGraficoTratamientos(tratamientos: any[]): void {
    const tiposTratamientos = tratamientos.reduce((acc, tratamiento) => {
      acc[tratamiento.tipo] = (acc[tratamiento.tipo] || 0) + 1;
      return acc;
    }, {});

    const tratamientosData = {
      labels: Object.keys(tiposTratamientos),
      datasets: [{
        data: Object.values(tiposTratamientos),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
      }]
    };

    const ctx = document.getElementById('tratamientosChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: tratamientosData
    });
  }

  obtenerTratamientoMasComun(tratamientos: any[]): string {
    const tratamientoMasComun = tratamientos.reduce((prev, current) => {
      return (prev.cantidad > current.cantidad) ? prev : current;
    });
    return tratamientoMasComun.tipo;
  }
}
