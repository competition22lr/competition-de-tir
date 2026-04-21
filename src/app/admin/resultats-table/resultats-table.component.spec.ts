import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatsTableComponent } from './resultats-table.component';

describe('ResultatsTableComponent', () => {
  let component: ResultatsTableComponent;
  let fixture: ComponentFixture<ResultatsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultatsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultatsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
