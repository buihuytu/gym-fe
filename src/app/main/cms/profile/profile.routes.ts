import {  Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "employees",
    loadChildren:() => import('./hu-employee/hu-employee.routes').then((m) => m.routes)
  },
  {
    path: "per-customer",
    loadChildren:() => import('./per-customer/per-customer.routes').then((m) => m.routes)
  },
];