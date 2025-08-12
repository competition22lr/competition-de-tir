import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterielSecuriteObligatoireComponent } from './materiel-securite-obligatoire.component';
import { TranslateModule } from '@ngx-translate/core';

describe('MaterielSecuriteObligatoireComponent', () => {
  let component: MaterielSecuriteObligatoireComponent;
  let fixture: ComponentFixture<MaterielSecuriteObligatoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterielSecuriteObligatoireComponent,
        TranslateModule.forRoot()  // ✅ Fournit TranslateService, TranslateStore, etc.
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MaterielSecuriteObligatoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
