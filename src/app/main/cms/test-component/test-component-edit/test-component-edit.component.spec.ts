import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestComponentEditComponent } from './test-component-edit.component';

describe('TestComponentEditComponent', () => {
  let component: TestComponentEditComponent;
  let fixture: ComponentFixture<TestComponentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponentEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestComponentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
