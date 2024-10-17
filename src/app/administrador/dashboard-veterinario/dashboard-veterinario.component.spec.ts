import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard-veterinario',
  templateUrl: './dashboard-veterinario.component.html',
  styleUrls: ['./dashboard-veterinario.component.css']
})
export class DashboardVeterinarioComponent implements OnInit {
  totalTratamientos: number = 0;
  tratamientosPorMedicamento: any[] = [];
  veterinariosActivos: number = 0;
  veterinariosInactivos: number = 0;
  totalMascotas: number = 0;
  mascotasActivas: number = 0;
  ventasTotales: number = 0;
  gananciasTotales: number = 0;
  topTratamientos: any[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.dashboardService.obtenerDatosDashboard().subscribe(
      (datos) => {
        this.totalTratamientos = datos.totalTratamientos;
        this.tratamientosPorMedicamento = datos.tratamientosPorMedicamento;
        this.veterinariosActivos = datos.veterinariosActivos;
        this.veterinariosInactivos = datos.veterinariosInactivos;
        this.totalMascotas = datos.totalMascotas;
        this.mascotasActivas = datos.mascotasActivas;
        this.ventasTotales = datos.ventasTotales;
        this.gananciasTotales = datos.gananciasTotales;
        this.topTratamientos = datos.topTratamientos;

        this.crearGraficos();
      },
      (error) => {
        console.error('Error al cargar los datos del dashboard', error);
      }
    );
  }

  crearGraficos() {
    this.crearGraficoVeterinarios();
    this.crearGraficoMascotas();
    this.crearGraficoFinanzas();
  }

  crearGraficoVeterinarios() {
    new Chart('veterinariosChart', {
      type: 'pie',
      data: {
        labels: ['Activos', 'Inactivos'],
        datasets: [{
          data: [this.veterinariosActivos, this.veterinariosInactivos],
          backgroundColor: ['#36A2EB', '#FF6384']
        }]
      }
    });
  }

  crearGraficoMascotas() {
    new Chart('mascotasChart', {
      type: 'bar',
      data: {
        labels: ['Total', 'Activas'],
        datasets: [{
          label: 'Mascotas',
          data: [this.totalMascotas, this.mascotasActivas],
          backgroundColor: ['#4BC0C0', '#FFCE56']
        }]
      }
    });
  }

  crearGraficoFinanzas() {
    new Chart('finanzasChart', {
      type: 'line',
      data: {
        labels: ['Ventas', 'Ganancias'],
        datasets: [{
          label: 'Finanzas',
          data: [this.ventasTotales, this.gananciasTotales],
          borderColor: '#FF9F40'
        }]
      }
    });
  }
}