import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongGongOrderPassageComponent } from './long-gong-order-passage.component';

describe('LongGongOrderPassageComponent', () => {
  let component: LongGongOrderPassageComponent;
  let fixture: ComponentFixture<LongGongOrderPassageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LongGongOrderPassageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongGongOrderPassageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
