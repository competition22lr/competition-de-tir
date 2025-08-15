import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongGongFeuillePointsComponent } from './long-gong-feuille-points.component';

describe('LongGongFeuillePointsComponent', () => {
  let component: LongGongFeuillePointsComponent;
  let fixture: ComponentFixture<LongGongFeuillePointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LongGongFeuillePointsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongGongFeuillePointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
