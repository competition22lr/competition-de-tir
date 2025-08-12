import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeroulementComponent } from './deroulement.component';
import { TranslateModule } from '@ngx-translate/core';

describe('DeroulementComponent', () => {
  let component: DeroulementComponent;
  let fixture: ComponentFixture<DeroulementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeroulementComponent,
        TranslateModule.forRoot()  // ✅ Fournit TranslateService, TranslateStore, etc.
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DeroulementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
