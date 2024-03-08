import { RouterModule, Routes } from '@angular/router';
import { TestComponentComponent } from './test-component.component';
import { TestComponentEditComponent } from './test-component-edit/test-component-edit.component';
import { CanDeactivateGuard } from '../../../guards/can-deactivate.guard';

export const routes: Routes = [
  {
    path: "",
    component: TestComponentComponent,
  },
  {
    path: ":id",
    component: TestComponentEditComponent,
    canDeactivate: [CanDeactivateGuard],
  }
];