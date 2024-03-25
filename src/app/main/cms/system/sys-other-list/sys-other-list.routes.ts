import {  Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../../../guards/can-deactivate.guard';
import { SysOtherListComponent } from './sys-other-list.component';

export const routes: Routes = [
  {
    path: "",
    component: SysOtherListComponent,
  },
];