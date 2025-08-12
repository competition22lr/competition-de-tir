import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantDialogComponent } from './participant-dialog.component';
import { TranslateModule } from '@ngx-translate/core';

describe('ParticipantDialogComponent', () => {
  let component: ParticipantDialogComponent;
  let fixture: ComponentFixture<ParticipantDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipantDialogComponent,
        TranslateModule.forRoot()  // ✅ Fournit TranslateService, TranslateStore, etc.
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ParticipantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
