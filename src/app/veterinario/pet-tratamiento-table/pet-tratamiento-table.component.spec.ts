import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetTratamientoTableComponent } from './pet-tratamiento-table.component';

describe('PetTratamientoTableComponent', () => {
  let component: PetTratamientoTableComponent;
  let fixture: ComponentFixture<PetTratamientoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetTratamientoTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetTratamientoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
