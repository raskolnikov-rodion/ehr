import { Route } from '@angular/router';
import { authGuard, noAuthGuard } from '@ehr/core';

export const appRoutes: Route[] = [
  {
    path: 'login',
    canActivate: [noAuthGuard],
    loadComponent: () => import('@ehr/login').then((m) => m.PageComponent),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('@ehr/dashboard').then((m) => m.PageComponent),
  },
  {
    path: 'docs/color-palette',
    loadComponent: () =>
      import('@ehr/color-palette').then((m) => m.ColorPaletteComponent),
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
