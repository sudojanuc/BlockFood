import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationStatusComponent } from './reservation-status.component';

describe('ReservationStatusComponent', () => {
  let component: ReservationStatusComponent;
  let fixture: ComponentFixture<ReservationStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
