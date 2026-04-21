import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatFeuilleCibleComponent } from './resultat-feuille-cible.component';

describe('ResultatFeuilleCibleComponent', () => {
  let component: ResultatFeuilleCibleComponent;
  let fixture: ComponentFixture<ResultatFeuilleCibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultatFeuilleCibleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultatFeuilleCibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
