import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymPackageEditComponent } from './gym-package-edit.component';

describe('GymPackageEditComponent', () => {
  let component: GymPackageEditComponent;
  let fixture: ComponentFixture<GymPackageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GymPackageEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GymPackageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
