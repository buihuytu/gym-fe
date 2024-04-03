import {  Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "employees",
    loadChildren:() => import('./hu-employee/hu-employee.routes').then((m) => m.routes)
  },
];