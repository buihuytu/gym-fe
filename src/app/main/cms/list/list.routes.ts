import {  Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../../guards/can-deactivate.guard';

export const routes: Routes = [
  {
    path: "sys-user",
    loadChildren:() => import('./sys-user/sys-user.routes').then((m) => m.routes)
  },
];