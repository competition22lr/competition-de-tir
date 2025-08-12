import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibresAutorisesComponent } from './calibres-autorises.component';
import { TranslateModule } from '@ngx-translate/core';

describe('CalibresAutorisesComponent', () => {
  let component: CalibresAutorisesComponent;
  let fixture: ComponentFixture<CalibresAutorisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalibresAutorisesComponent,
        TranslateModule.forRoot()  // ✅ Fournit TranslateService, TranslateStore, etc.
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalibresAutorisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
