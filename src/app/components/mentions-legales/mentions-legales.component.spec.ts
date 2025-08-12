import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentionsLegalesComponent } from './mentions-legales.component';
import { TranslateModule } from '@ngx-translate/core';

describe('MentionsLegalesComponent', () => {
  let component: MentionsLegalesComponent;
  let fixture: ComponentFixture<MentionsLegalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MentionsLegalesComponent,
        TranslateModule.forRoot()  // ✅ Fournit TranslateService, TranslateStore, etc.
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MentionsLegalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
