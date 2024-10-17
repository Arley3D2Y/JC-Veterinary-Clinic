import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientoCardComponent } from './treatment-card.component';

describe('TratamientoCardComponent', () => {
  let component: TratamientoCardComponent;
  let fixture: ComponentFixture<TratamientoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TratamientoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TratamientoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
