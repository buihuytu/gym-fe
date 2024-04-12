import {  Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../../../guards/can-deactivate.guard';
import { GoodsListComponent } from './goods-list.component';

export const routes: Routes = [
  {
    path: "",
    component: GoodsListComponent,
  },
  {
    path: ":id",
    component: GoodsListComponent,
    canDeactivate: [CanDeactivateGuard],
  }
];