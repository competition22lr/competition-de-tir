import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatMeilleurScoreComponent } from './stat-meilleur-score.component';

describe('StatMeilleurScoreComponent', () => {
  let component: StatMeilleurScoreComponent;
  let fixture: ComponentFixture<StatMeilleurScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatMeilleurScoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatMeilleurScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
