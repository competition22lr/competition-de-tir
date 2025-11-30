import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongGongDeroulementComponent } from './long-gong-deroulement.component';

describe('LongGongDeroulementComponent', () => {
  let component: LongGongDeroulementComponent;
  let fixture: ComponentFixture<LongGongDeroulementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LongGongDeroulementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongGongDeroulementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
