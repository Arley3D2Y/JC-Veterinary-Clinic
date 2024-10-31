import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SharedHeaderComponent } from '../../ToolsComponents/shared-header/shared-header.component';
import { DashboardService } from '../../services/dashboard.service';
import { TratamientoDrogaDTO } from '../../DTO/TratamientoDrogaDTO';
import { EstadoVeterinariosDTO } from '../../DTO/EstadoVeterinariosDTO';
import { EstadoMascotasDTO } from '../../DTO/EstadoMascotasDTO';
import { mergeMap } from 'rxjs';
import { Tratamiento } from '../../model/tratamiento';

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

  totalTratamientosPorMes: number = 0;
  tratamientoDrogaDTO: TratamientoDrogaDTO[] = [];
  estadoVeterinariosDTO: EstadoVeterinariosDTO[] = [];
  totalMascotas: number = 0;
  estadoMascotasDTO: EstadoMascotasDTO[] = [];

  totalSales: number = 0;
  totalProfits: number = 0;
  top3Tratamientos: Tratamiento[] = [];

  graficosCreados: boolean = false;

  // Variables para almacenar las instancias de los gráficos
  chartVeterinarios: any;
  chartMascotas: any;
  chartFinanzas: any;
  chartTratamientosPorMedicamento: any;

  constructor(
    private dashboardService: DashboardService,
  ) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    // this.cargarDatosMascotas();
    
    this.dashboardService.getTotalTreatmentsLastMonth().subscribe((data: number) => {
      this.totalTratamientosPorMes = data;
    });
    
    this.dashboardService.getTratamientosPorMedicamento().subscribe((data: TratamientoDrogaDTO[]) => {
      this.tratamientoDrogaDTO = data;
      this.crearGraficoTratamientosPorMedicamento();
    });

    this.dashboardService.getVeterinarios().subscribe({
      next: (data: EstadoVeterinariosDTO[]) => {
        this.estadoVeterinariosDTO = data;
      }, 
      complete: () => {
        this.crearGraficoVeterinarios();
      }
    })

    this.dashboardService.getTotalMascotas().pipe((
      mergeMap((data: number) => {
        this.totalMascotas = data;
        return this.dashboardService.getMascotasActivasCount();
      })
    )).subscribe(
      (data: EstadoMascotasDTO[]) => {
        this.estadoMascotasDTO = data;
        this.crearGraficoMascotas();
      }
    );

    this.dashboardService.getTotalMascotas().subscribe((data: number) => {
      this.totalMascotas = data;
      this.crearGraficoMascotas();
    });

    this.dashboardService.getTotalSales().pipe((
      mergeMap((data: number) => {
        this.totalSales = data;
        return this.dashboardService.getTotalProfits();
      })
    )).subscribe((data: number) => {
      this.totalProfits = data;
      this.crearGraficoFinanzas();
    })
  }



  ngAfterViewInit() {
    if (!this.graficosCreados) { // Verifica si los gráficos ya han sido creados
      // this.crearGraficos(); // Crear gráficos después de que la vista se haya inicializado.
      this.graficosCreados = true; // Marca la bandera como verdadera después de crear los gráficos
    }
  }

  crearGraficoVeterinarios() {
    this.chartVeterinarios = new Chart('veterinariosChart', {
      type: 'pie',
      data: {
        labels: [ 'Activos', 'Inactivos'],
        datasets: [{
          data: [this.estadoVeterinariosDTO[1].cantidadVeterinarios, this.estadoVeterinariosDTO[0].cantidadVeterinarios],
          backgroundColor: ['#36A2EB', '#FF6384']
        }]
      }
    });
  }


  crearGraficoMascotas(): void {
    this.chartMascotas = new Chart('mascotasChart', {
      type: 'bar',
      data: {
        labels: ['Total', 'Activas'],
        datasets: [{
          label: 'Mascotas',
          data: [this.totalMascotas, this.estadoMascotasDTO[1].cantidad],
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
          data: [this.totalSales, this.totalProfits],
          borderColor: '#FF9F40'
        }]
      }
    });
  }

  crearGraficoTratamientosPorMedicamento() {
    const labels = this.tratamientoDrogaDTO.map(item => item.nombreDroga);
    const data = this.tratamientoDrogaDTO.map(item => item.cantidadTratamiento);

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