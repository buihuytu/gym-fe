import { Routes } from '@angular/router';

export const CmsRoutes: Routes = [
    {
        path: 'product',
        loadChildren:() => import('./product/product.routes').then((m) => m.routes)
    },
    {
        path: 'test',
        loadChildren:() => import('./test-component/test.routes').then((m) => m.routes)
    },
];
