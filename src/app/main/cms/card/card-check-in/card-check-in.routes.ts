import {  Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../../../guards/can-deactivate.guard';
import { CardCheckInComponent } from './card-check-in.component';

export const routes: Routes = [
  {
    path: "",
    component: CardCheckInComponent,
  },
];