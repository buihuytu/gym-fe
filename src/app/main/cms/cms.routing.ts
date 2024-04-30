import { Routes } from '@angular/router';

export const CmsRoutes: Routes = [
    {
        path: 'system',
        loadChildren:() => import('./system/system.routes').then((m) => m.routes)
    },
    {
        path: 'card',
        loadChildren:() => import('./card/card.routes').then((m) => m.routes)
    },
    {
        path: 'list',
        loadChildren:() => import('./list/list.routes').then((m) => m.routes)
    },
    {
        path: 'profile',
        loadChildren:() => import('./profile/profile.routes').then((m) => m.routes)
    },
];
