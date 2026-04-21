import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionTireursComponent } from './session-tireurs.component';

describe('SessionTireursComponent', () => {
  let component: SessionTireursComponent;
  let fixture: ComponentFixture<SessionTireursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionTireursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionTireursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
