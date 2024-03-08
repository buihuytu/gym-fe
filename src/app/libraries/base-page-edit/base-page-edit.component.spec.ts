import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasePageEditComponent } from './base-page-edit.component';

describe('BasePageEditComponent', () => {
  let component: BasePageEditComponent;
  let fixture: ComponentFixture<BasePageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasePageEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasePageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
