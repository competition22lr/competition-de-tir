import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarabinesAutoriseesComponent } from './carabines-autorisees.component';
import { TranslateModule } from '@ngx-translate/core';

describe('CarabinesAutoriseesComponent', () => {
  let component: CarabinesAutoriseesComponent;
  let fixture: ComponentFixture<CarabinesAutoriseesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarabinesAutoriseesComponent,
        TranslateModule.forRoot()  // ✅ Fournit TranslateService, TranslateStore, etc.
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CarabinesAutoriseesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
