import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongGongEquipementComponent } from './long-gong-equipement.component';

describe('LongGongEquipementComponent', () => {
  let component: LongGongEquipementComponent;
  let fixture: ComponentFixture<LongGongEquipementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LongGongEquipementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongGongEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
