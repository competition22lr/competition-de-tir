import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoueFortuneComponent } from './roue-fortune.component';
import { TranslateModule } from '@ngx-translate/core';

describe('RoueFortuneComponent', () => {
  let component: RoueFortuneComponent;
  let fixture: ComponentFixture<RoueFortuneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoueFortuneComponent,
        TranslateModule.forRoot()  // ✅ Fournit TranslateService, TranslateStore, etc.
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RoueFortuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
