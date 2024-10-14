import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DashboardAdminComponent } from './dashboard-admin.component';
import { DashboardService } from '../../services/dashboard.service';

describe('DashboardAdminComponent', () => {
  let component: DashboardAdminComponent;
  let fixture: ComponentFixture<DashboardAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAdminComponent ],  // Declaramos el componente que estamos probando
      imports: [ HttpClientTestingModule ],  // Importamos el módulo de testing para HTTP
      providers: [ DashboardService ]  // Proveemos el servicio que utiliza el componente
    })
    .compileComponents();  // Compilamos los componentes

    fixture = TestBed.createComponent(DashboardAdminComponent);  // Creamos la instancia del componente
    component = fixture.componentInstance;  // Obtenemos la instancia del componente
    fixture.detectChanges();  // Detectamos cambios iniciales
  });

  it('should create', () => {
    expect(component).toBeTruthy();  // Verificamos que el componente se haya creado correctamente
  });

  it('should load dashboard data on init', () => {
    spyOn(component, 'getDashboardData');  // Espiamos el método 'getDashboardData'

    component.ngOnInit();  // Ejecutamos el ciclo de vida de inicio

    expect(component.getDashboardData).toHaveBeenCalled();  // Verificamos que 'getDashboardData' se haya llamado
  });
});
