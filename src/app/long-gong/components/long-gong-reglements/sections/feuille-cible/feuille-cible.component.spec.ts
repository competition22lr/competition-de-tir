import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeuilleCibleComponent } from './feuille-cible.component';

describe('FeuilleCibleComponent', () => {
  let component: FeuilleCibleComponent;
  let fixture: ComponentFixture<FeuilleCibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeuilleCibleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeuilleCibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
