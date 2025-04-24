import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpressionClassementComponent } from './impression-classement.component';

describe('ImpressionClassementComponent', () => {
  let component: ImpressionClassementComponent;
  let fixture: ComponentFixture<ImpressionClassementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImpressionClassementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImpressionClassementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
