import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculPointsComponent } from './calcul-points.component';
import { TranslateModule } from '@ngx-translate/core';

describe('CalculPointsComponent', () => {
  let component: CalculPointsComponent;
  let fixture: ComponentFixture<CalculPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculPointsComponent,
        TranslateModule.forRoot()  // ✅ Fournit TranslateService, TranslateStore, etc.
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalculPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
