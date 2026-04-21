import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatPerfectRateComponent } from './stat-perfect-rate.component';

describe('StatPerfectRateComponent', () => {
  let component: StatPerfectRateComponent;
  let fixture: ComponentFixture<StatPerfectRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatPerfectRateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatPerfectRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
