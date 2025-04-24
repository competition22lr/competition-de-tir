import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeuillePointageComponent } from './feuille-pointage.component';

describe('FeuillePointageComponent', () => {
  let component: FeuillePointageComponent;
  let fixture: ComponentFixture<FeuillePointageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeuillePointageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeuillePointageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
