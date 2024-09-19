import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinaryFormsComponent } from './veterinary-forms.component';

describe('VeterinaryFormsComponent', () => {
  let component: VeterinaryFormsComponent;
  let fixture: ComponentFixture<VeterinaryFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeterinaryFormsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeterinaryFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
