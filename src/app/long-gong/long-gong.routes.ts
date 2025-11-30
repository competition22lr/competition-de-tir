import { Routes } from '@angular/router';

export const longGongRoutes: Routes = [
    {
        path: 'reglements',
        loadComponent: () =>
            import('./components/long-gong-reglements/long-gong-reglements.component').then(
                (m) => m.LongGongReglementsComponent
            ),
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'reglements',
    },
];