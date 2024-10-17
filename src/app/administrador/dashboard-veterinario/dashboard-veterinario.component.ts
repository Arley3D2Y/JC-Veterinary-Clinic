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
  tratamientosUltimoMes: Number = 0;
  tratamientosPorMedicamento: any[] = [ ];
  veterinariosActivos: number = 0;
  veterinariosInactivos: number = 0;
  totalMascotas: number = 130;
  mascotasActivas: number = 60;
  ventasTotales: Number = 0;
  gananciasTotales: Number = 0;
  topTratamientos: any[] = [ ]

  graficosCreados: boolean = false; // Bandera para controlar la creación de gráficos
  isDataLoaded: boolean = false;

  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute
  ) {
    // Registra los componentes necesarios para los gráficos
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.dashboardService.getTotalTratamientos().subscribe((data: Number) => {
      this.tratamientosUltimoMes = data;
      this.isDataLoaded = true;
    })
    this.dashboardService.getTratamientosPorMedicamento().subscribe((data: any[]) => {
      this.tratamientosPorMedicamento = data;

      this.crearGraficoTratamientosPorMedicamento();
      this.isDataLoaded = true;
    })

    this.dashboardService.getVeterinarios().subscribe((data: any) => {
      this.veterinariosActivos = data.activos;
      this.veterinariosInactivos = data.inactivos;

      this.crearGraficoVeterinarios();
      this.isDataLoaded = true;
    })

    this.dashboardService.getFinanzas().subscribe((data: any) => {
      console.log(data);
      this.ventasTotales = data.ventasTotales;
      this.gananciasTotales = data.gananciaTotales;

      this.crearGraficoFinanzas();
    })
  }

  ngAfterViewInit() {
    if (!this.graficosCreados) { // Verifica si los gráficos ya han sido creados
      this.crearGraficos(); // Crear gráficos después de que la vista se haya inicializado.
      this.graficosCreados = true; // Marca la bandera como verdadera después de crear los gráficos
    }
  }

  crearGraficos() {
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

  crearGraficoTratamientosPorMedicamento() {
    const labels = this.tratamientosPorMedicamento.map(item => item.nombre);
    const data = this.tratamientosPorMedicamento.map(item => item.cantidad);

    new Chart('tratamientosChart', {
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
