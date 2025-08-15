import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongGongCalculPointsComponent } from './long-gong-calcul-points.component';

describe('LongGongCalculPointsComponent', () => {
  let component: LongGongCalculPointsComponent;
  let fixture: ComponentFixture<LongGongCalculPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LongGongCalculPointsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongGongCalculPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
