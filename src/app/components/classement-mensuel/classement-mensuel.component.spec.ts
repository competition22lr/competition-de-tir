import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassementMensuelComponent } from './classement-mensuel.component';
import { TranslateModule } from '@ngx-translate/core';

describe('ClassementMensuelComponent', () => {
  let component: ClassementMensuelComponent;
  let fixture: ComponentFixture<ClassementMensuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassementMensuelComponent,
        TranslateModule.forRoot()  // ✅ Fournit TranslateService, TranslateStore, etc.
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClassementMensuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
