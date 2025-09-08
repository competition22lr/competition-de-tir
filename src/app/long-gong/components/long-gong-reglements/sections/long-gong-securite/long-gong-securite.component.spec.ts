import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongGongSecuriteComponent } from './long-gong-securite.component';

describe('LongGongSecuriteComponent', () => {
  let component: LongGongSecuriteComponent;
  let fixture: ComponentFixture<LongGongSecuriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LongGongSecuriteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongGongSecuriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
