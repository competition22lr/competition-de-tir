import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongGongClassementComponent } from './long-gong-classement.component';

describe('LongGongClassementComponent', () => {
  let component: LongGongClassementComponent;
  let fixture: ComponentFixture<LongGongClassementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LongGongClassementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongGongClassementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
