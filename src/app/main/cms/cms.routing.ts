import { Routes } from '@angular/router';

export const CmsRoutes: Routes = [
    {
        path: 'product',
        loadChildren:() => import('./product/product.routes').then((m) => m.routes)
    },
];
