import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongGongJeuComponent } from './long-gong-jeu.component';

describe('LongGongJeuComponent', () => {
  let component: LongGongJeuComponent;
  let fixture: ComponentFixture<LongGongJeuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LongGongJeuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongGongJeuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
