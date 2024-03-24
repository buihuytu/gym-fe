import { Routes } from '@angular/router';

export const CmsRoutes: Routes = [
    {
        path: 'test',
        loadChildren:() => import('./test-component/test.routes').then((m) => m.routes)
    },
    {
        path: 'system',
        loadChildren:() => import('./system/system.routes').then((m) => m.routes)
    },
];
