import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatMoyenneComponent } from './stat-moyenne.component';

describe('StatMoyenneComponent', () => {
  let component: StatMoyenneComponent;
  let fixture: ComponentFixture<StatMoyenneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatMoyenneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatMoyenneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
