import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongGongReglementsComponent } from './long-gong-reglements.component';

describe('LongGongReglementsComponent', () => {
  let component: LongGongReglementsComponent;
  let fixture: ComponentFixture<LongGongReglementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LongGongReglementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongGongReglementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
