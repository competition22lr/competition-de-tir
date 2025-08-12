import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassementComponent } from './classement.component';
import { TranslateModule } from '@ngx-translate/core';

describe('ClassementComponent', () => {
  let component: ClassementComponent;
  let fixture: ComponentFixture<ClassementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassementComponent,
        TranslateModule.forRoot()  // ✅ Fournit TranslateService, TranslateStore, etc.
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClassementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
