import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinarioClientesComponent } from './veterinario-clientes.component';

describe('VeterinarioClientesComponent', () => {
  let component: VeterinarioClientesComponent;
  let fixture: ComponentFixture<VeterinarioClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeterinarioClientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeterinarioClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
