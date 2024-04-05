import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysUserComponent } from './sys-user.component';

describe('SysUserComponent', () => {
  let component: SysUserComponent;
  let fixture: ComponentFixture<SysUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SysUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SysUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
