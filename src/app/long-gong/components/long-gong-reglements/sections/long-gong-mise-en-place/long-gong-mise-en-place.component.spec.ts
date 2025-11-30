import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongGongMiseEnPlaceComponent } from './long-gong-mise-en-place.component';

describe('LongGongMiseEnPlaceComponent', () => {
  let component: LongGongMiseEnPlaceComponent;
  let fixture: ComponentFixture<LongGongMiseEnPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LongGongMiseEnPlaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongGongMiseEnPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
