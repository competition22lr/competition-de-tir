import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongGongCalibresComponent } from './long-gong-calibres.component';

describe('LongGongCalibresComponent', () => {
  let component: LongGongCalibresComponent;
  let fixture: ComponentFixture<LongGongCalibresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LongGongCalibresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongGongCalibresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
