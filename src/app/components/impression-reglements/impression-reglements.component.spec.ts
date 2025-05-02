import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpressionReglementsComponent } from './impression-reglements.component';

describe('ImpressionReglementsComponent', () => {
  let component: ImpressionReglementsComponent;
  let fixture: ComponentFixture<ImpressionReglementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImpressionReglementsComponent]
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
