import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymPackageComponent } from './gym-package.component';

describe('GymPackageComponent', () => {
  let component: GymPackageComponent;
  let fixture: ComponentFixture<GymPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GymPackageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GymPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
