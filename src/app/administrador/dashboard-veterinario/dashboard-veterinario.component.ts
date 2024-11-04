import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js/auto';
import { CommonModule } from '@angular/common';
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
export class DashboardVeterinarioComponent implements OnInit {

  public chart: Chart<"line"> | null = null;

  ngOnInit(): void {
      const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }
        ]
      }

      this.chart = new Chart('myChart', {
        type: 'line',
        data
      });
  }

}

/*
export class DashboardVeterinarioComponent implements OnInit, AfterViewInit {

  totalTratamientosPorMes: number = 0;
  tratamientoDrogaDTO: TratamientoDrogaDTO[] = [];
  estadoVeterinariosDTO: EstadoVeterinariosDTO[] = [];
  totalMascotas: number = 0;
  estadoMascotasDTO: EstadoMascotasDTO[] = [];
  totalSales: number = 0;
  totalProfits: number = 0;
  top3Tratamientos: Tratamiento[] = [];

  isDataLoaded = false;

  // Variables para almacenar las instancias de los gráficos
  chartVeterinarios: any = null;
  chartMascotas: any = null;
  chartFinanzas: any = null;
  chartTratamientosPorMedicamento: any = null;

  constructor(private dashboardService: DashboardService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
      
  }

  ngAfterViewInit() {
    this.loadDashboardData();
  }

  private loadDashboardData() {
    this.loadTotalTratamientos();
    this.loadTratamientosPorMedicamento();
    this.loadVeterinarios();
    this.loadMascotas();
    this.loadFinanzas();
  }

  private loadTotalTratamientos() {
    this.dashboardService.getTotalTreatmentsLastMonth().subscribe((data: number) => {
      this.totalTratamientosPorMes = data;
    });
  }

  private loadTratamientosPorMedicamento() {
    this.dashboardService.getTratamientosPorMedicamento().subscribe({
      next: (data: TratamientoDrogaDTO[]) => {
      this.tratamientoDrogaDTO = data;
      }, complete: () => {
        this.crearGraficoTratamientosPorMedicamento();        
      }
    });
  }

  private loadVeterinarios() {
    this.dashboardService.getVeterinarios().subscribe({
      next: (data: EstadoVeterinariosDTO[]) => {
        this.estadoVeterinariosDTO = data;
      }, complete: () => {
        this.crearGraficoVeterinarios();
      }
    });
  }

  private loadMascotas() {
    this.dashboardService.getTotalMascotas().pipe(
      mergeMap((total: number) => {
        this.totalMascotas = total;
        return this.dashboardService.getMascotasActivasCount();
      })
    ).subscribe({
      next: (data: EstadoMascotasDTO[]) => {
        this.estadoMascotasDTO = data;
      },
      complete: () => {
        this.crearGraficoMascotas();
      }
    });
  }

  private loadFinanzas() {
    this.dashboardService.getTotalSales().pipe(
      mergeMap((sales: number) => {
        this.totalSales = sales;
        return this.dashboardService.getTotalProfits();
      })
    ).subscribe({
      next: (profits: number) => {
      this.totalProfits = profits;
      }, complete: () => {
        this.crearGraficoFinanzas();
      }
    });
  }



  // Creación de los gráficos
  private crearGraficoTratamientosPorMedicamento() {
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

  private crearGraficoVeterinarios() {
    this.chartVeterinarios = new Chart('veterinariosChart', {
      type: 'pie',
      data: {
        labels: ['Activos', 'Inactivos'],
        datasets: [{
          data: [
            this.estadoVeterinariosDTO[1]?.cantidadVeterinarios || 0,
            this.estadoVeterinariosDTO[0]?.cantidadVeterinarios || 0
          ],
          backgroundColor: ['#36A2EB', '#FF6384']
        }]
      }
    });
  }

  private crearGraficoMascotas(): void {
    this.chartMascotas = new Chart('mascotasChart', {
      type: 'bar',
      data: {
        labels: ['Total', 'Activas'],
        datasets: [{
          label: 'Mascotas',
          data: [this.totalMascotas, this.estadoMascotasDTO[1]?.cantidad || 0],
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

  private crearGraficoFinanzas() {
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


}
*/