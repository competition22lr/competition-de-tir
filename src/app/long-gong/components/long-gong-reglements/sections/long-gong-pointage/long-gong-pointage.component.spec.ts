import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongGongPointageComponent } from './long-gong-pointage.component';

describe('LongGongPointageComponent', () => {
  let component: LongGongPointageComponent;
  let fixture: ComponentFixture<LongGongPointageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LongGongPointageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongGongPointageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
