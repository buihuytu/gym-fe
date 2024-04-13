import {  Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../../guards/can-deactivate.guard';

export const routes: Routes = [
  {
    path: "sys-user",
    loadChildren:() => import('./sys-user/sys-user.routes').then((m) => m.routes)
  },
  {
    path: "gym-package",
    loadChildren:() => import('./gym-package/gym-package.routes').then((m) => m.routes)
  },
  {
    path: "gym-shift",
    loadChildren:() => import('./gym-shift/gym-shift.routes').then((m) => m.routes)
  },
  {
    path: "goods-list",
    loadChildren:() => import('./goods-list/goods-list.routes').then((m) => m.routes)
  }, 
  {
    path: "card-info",
    loadChildren:() => import('./card-info/card-info.routes').then((m) => m.routes)
  },
  {
    path: "card-check-in",
    loadChildren:() => import('./ls-cartcheckin/ls-cart-checkin.routes').then((m) => m.routes)
  },
];