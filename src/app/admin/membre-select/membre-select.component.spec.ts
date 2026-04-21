import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembreSelectComponent } from './membre-select.component';

describe('MembreSelectComponent', () => {
  let component: MembreSelectComponent;
  let fixture: ComponentFixture<MembreSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembreSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembreSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
