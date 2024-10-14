import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Pet } from '../../model/pet';
import { Cliente } from '../../model/cliente';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  mascotas: Pet[] = [];
  clientes: Cliente[] = [];
  tratamientos: any[] = [];
  tratamientoMasComun: string = '';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    // Cargar los datos de mascotas
    this.dashboardService.getMascotas().subscribe(mascotas => {
      this.mascotas = mascotas;
      this.actualizarGraficoMascotas(mascotas);
    });

    // Cargar los datos de clientes
    this.dashboardService.getClientes().subscribe(clientes => {
      this.clientes = clientes;
      this.actualizarGraficoClientes(clientes);
    });

    // Cargar los datos de tratamientos
    this.dashboardService.getTratamientos().subscribe(tratamientos => {
      this.tratamientos = tratamientos;
      this.tratamientoMasComun = this.obtenerTratamientoMasComun(tratamientos);
      this.actualizarGraficoTratamientos(tratamientos);
    });
  }

  actualizarGraficoMascotas(mascotas: Pet[]): void {
    const tiposMascotas = mascotas.reduce((acc, mascota) => {
      acc[mascota.tipo] = (acc[mascota.tipo] || 0) + 1;
      return acc;
    }, {});

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
        data: clientes.map(cliente => cliente.frecuenciaVisitas),
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
