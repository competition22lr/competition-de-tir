import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TirageGagnantsComponent } from './tirage-gagnants.component';

describe('TirageGagnantsComponent', () => {
  let component: TirageGagnantsComponent;
  let fixture: ComponentFixture<TirageGagnantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TirageGagnantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TirageGagnantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
