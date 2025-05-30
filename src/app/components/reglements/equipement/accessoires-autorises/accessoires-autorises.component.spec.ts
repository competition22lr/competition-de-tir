import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoiresAutorisesComponent } from './accessoires-autorises.component';

describe('AccessoiresAutorisesComponent', () => {
  let component: AccessoiresAutorisesComponent;
  let fixture: ComponentFixture<AccessoiresAutorisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessoiresAutorisesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessoiresAutorisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
