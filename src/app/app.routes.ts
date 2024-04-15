import { Routes } from '@angular/router';
import { Error404Component } from './main/error/error-404/error-404.component';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import("../app/home/home.component").then(m => m.HomeComponent)
  },
  {
    path: "cms",
    children: [
      {
        path: "",
        loadChildren: () => import("./main/cms/cms.module").then(m => m.CmsModule),
      },
    ],
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
  {
    path: "**",
    component: Error404Component,
  },
];
