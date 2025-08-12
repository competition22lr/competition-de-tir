import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeuillePointageComponent } from './feuille-pointage.component';
import { TranslateModule } from '@ngx-translate/core';

describe('FeuillePointageComponent', () => {
  let component: FeuillePointageComponent;
  let fixture: ComponentFixture<FeuillePointageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeuillePointageComponent,
        TranslateModule.forRoot()  // ✅ Fournit TranslateService, TranslateStore, etc.
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeuillePointageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
