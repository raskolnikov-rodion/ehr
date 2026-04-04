import { Route } from '@angular/router';
import { authGuard, noAuthGuard } from '@ehr/core';
import { ShellLayoutComponent } from '@ehr/layout';

export const appRoutes: Route[] = [
  {
    path: 'login',
    canActivate: [noAuthGuard],
    loadComponent: () => import('@ehr/login').then((m) => m.PageComponent),
  },
  {
    path: '',
    component: ShellLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () =>
          import('@ehr/dashboard').then((m) => m.PageComponent),
      },
      {
        path: 'docs/color-palette',
        loadComponent: () =>
          import('@ehr/color-palette').then((m) => m.ColorPaletteComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
