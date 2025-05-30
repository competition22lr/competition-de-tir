import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassementAnnuelComponent } from './classement-annuel.component';

describe('ClassementAnnuelComponent', () => {
  let component: ClassementAnnuelComponent;
  let fixture: ComponentFixture<ClassementAnnuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassementAnnuelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassementAnnuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
