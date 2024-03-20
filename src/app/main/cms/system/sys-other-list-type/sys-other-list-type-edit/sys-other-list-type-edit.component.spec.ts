import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysOtherListTypeEditComponent } from './sys-other-list-type-edit.component';

describe('SysOtherListTypeEditComponent', () => {
  let component: SysOtherListTypeEditComponent;
  let fixture: ComponentFixture<SysOtherListTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SysOtherListTypeEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SysOtherListTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
