import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysOtherListComponent } from './sys-other-list.component';

describe('SysOtherListComponent', () => {
  let component: SysOtherListComponent;
  let fixture: ComponentFixture<SysOtherListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SysOtherListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SysOtherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
