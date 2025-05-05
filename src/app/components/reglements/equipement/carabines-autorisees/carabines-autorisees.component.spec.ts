import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarabinesAutoriseesComponent } from './carabines-autorisees.component';

describe('CarabinesAutoriseesComponent', () => {
  let component: CarabinesAutoriseesComponent;
  let fixture: ComponentFixture<CarabinesAutoriseesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarabinesAutoriseesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarabinesAutoriseesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
