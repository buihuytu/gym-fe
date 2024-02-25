import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { CanDeactivateGuard } from '../../../guards/can-deactivate.guard';

export const routes: Routes = [
    {
        path: "",
        component: ProductComponent,
      },
      {
        path: ":id",
        component: ProductEditComponent,
        canDeactivate: [CanDeactivateGuard],
      }
];