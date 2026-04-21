import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionSelectComponent } from './competition-select.component';

describe('CompetitionSelectComponent', () => {
  let component: CompetitionSelectComponent;
  let fixture: ComponentFixture<CompetitionSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitionSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
