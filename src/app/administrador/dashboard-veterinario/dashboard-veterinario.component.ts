import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SharedHeaderComponent } from '../../ToolsComponents/shared-header/shared-header.component';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard-veterinario',
  standalone: true,
  imports: [
    CommonModule,
    SharedHeaderComponent
  ],
  templateUrl: './dashboard-veterinario.component.html',
  styleUrls: ['./dashboard-veterinario.component.css']
})
export class DashboardVeterinarioComponent implements OnInit, AfterViewInit {
  tratamientosUltimoMes: number = 0;
  tratamientosPorMedicamento: any[] = [];
  veterinariosActivos: number = 0;
  veterinariosInactivos: number = 0;
  totalMascotas: number = 0;
  mascotasActivas: number = 0;
  ventasTotales: number = 0;
  gananciasTotales: number = 0;
  topTratamientos: any[] = [];
  totalVentasPorMedicamento: Map<string, number> = new Map(); // Variable para almacenar las ventas por medicamento

  graficosCreados: boolean = false; // Bandera para controlar la creación de gráficos
  isDataLoaded: boolean = false;

  // Variables para almacenar las instancias de los gráficos
  chartVeterinarios: any;
  chartMascotas: any;
  chartFinanzas: any;
  chartTratamientosPorMedicamento: any;

  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute
  ) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.cargarDatosMascotas();
    
    this.dashboardService.getTotalTratamientos().subscribe((data: number) => {
      this.tratamientosUltimoMes = data;
      this.isDataLoaded = true;
    });
    
    this.dashboardService.getTratamientosPorMedicamento().subscribe((data: any[]) => {
      this.tratamientosPorMedicamento = data;
      this.crearGraficoTratamientosPorMedicamento();
      this.chartTratamientosPorMedicamento.update(); // Forzar actualización
      this.isDataLoaded = true;
    });

    this.dashboardService.getVeterinarios().subscribe((data: any) => {
      this.veterinariosActivos = data.activos;
      this.veterinariosInactivos = data.inactivos;
      this.crearGraficoVeterinarios();
      this.chartVeterinarios.update(); // Forzar actualización
      this.isDataLoaded = true;
    });

    // Obtener total de ventas por medicamento
    this.dashboardService.obtenerTotalVentasPorMedicamento().subscribe((data: Map<string, number>) => {
      this.totalVentasPorMedicamento = data;
      this.isDataLoaded = true; // Marca los datos como cargados
    }, (error) => {
      console.error('Error al obtener las ventas por medicamento', error);
    });
  }

  ngAfterViewInit() {
    if (!this.graficosCreados) { // Verifica si los gráficos ya han sido creados
      this.crearGraficos(); // Crear gráficos después de que la vista se haya inicializado.
      this.graficosCreados = true; // Marca la bandera como verdadera después de crear los gráficos
    }
  }

  crearGraficos() {
    this.crearGraficoFinanzas();
  }

  crearGraficoVeterinarios() {
    this.chartVeterinarios = new Chart('veterinariosChart', {
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

  cargarDatosMascotas(): void {
    this.dashboardService.getMascotas().subscribe(
      (data) => {
        this.totalMascotas = data.total;
        this.mascotasActivas = data.activas;
        this.crearGraficoMascotas(); // Crea el gráfico después de obtener los datos
      },
      (error) => {
        console.error('Error al obtener los datos de mascotas', error);
      }
    );
  }

  crearGraficoMascotas(): void {
    this.chartMascotas = new Chart('mascotasChart', {
      type: 'bar',
      data: {
        labels: ['Total', 'Activas'],
        datasets: [{
          label: 'Mascotas',
          data: [this.totalMascotas, this.mascotasActivas],
          backgroundColor: ['#4BC0C0', '#FFCE56']
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  crearGraficoFinanzas() {
    this.chartFinanzas = new Chart('finanzasChart', {
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

  crearGraficoTratamientosPorMedicamento() {
    const labels = this.tratamientosPorMedicamento.map(item => item.nombre);
    const data = this.tratamientosPorMedicamento.map(item => item.cantidad);

    this.chartTratamientosPorMedicamento = new Chart('tratamientosChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Cantidad de Tratamientos',
          data: data,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
        }]
      }
    });
  }
}
