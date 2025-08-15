import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongGongCategoriesComponent } from './long-gong-categories.component';

describe('LongGongCategoriesComponent', () => {
  let component: LongGongCategoriesComponent;
  let fixture: ComponentFixture<LongGongCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LongGongCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongGongCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
