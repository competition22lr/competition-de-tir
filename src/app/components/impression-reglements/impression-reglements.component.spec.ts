import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpressionReglementsComponent } from './impression-reglements.component';
import { TranslateModule } from '@ngx-translate/core';

describe('ImpressionReglementsComponent', () => {
  let component: ImpressionReglementsComponent;
  let fixture: ComponentFixture<ImpressionReglementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImpressionReglementsComponent,
        TranslateModule.forRoot()  // ✅ Fournit TranslateService, TranslateStore, etc.
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ImpressionReglementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
