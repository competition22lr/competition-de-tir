import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipementComponent } from './equipement.component';
import { TranslateModule } from '@ngx-translate/core';

describe('EquipementComponent', () => {
  let component: EquipementComponent;
  let fixture: ComponentFixture<EquipementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipementComponent,
        TranslateModule.forRoot()  // ✅ Fournit TranslateService, TranslateStore, etc.
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
