import {  Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../../../guards/can-deactivate.guard';
import { HuEmployeeComponent } from './hu-employee.component';

export const routes: Routes = [
  {
    path: "",
    component: HuEmployeeComponent,
  },
  // {
  //   path: ":id",
  //   component: SysOtherListTypeEditComponent,
  //   canDeactivate: [CanDeactivateGuard],
  // }
];