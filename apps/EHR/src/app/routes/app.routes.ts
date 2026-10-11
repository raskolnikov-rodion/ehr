import { Route } from '@angular/router';
import { authGuard, logoutGuard, noAuthGuard } from '@ehr/core';
import { AppShell } from '../app-shell/app-shell';

export const appRoutes: Route[] = [
  {
    path: 'login',
    canActivate: [noAuthGuard],
    loadComponent: () => import('@ehr/login').then((m) => m.LoginPage),
  },
  {
    path: 'logout',
    canActivate: [logoutGuard],
    children: [],
  },
  {
    path: '',
    component: AppShell,
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
          import('@ehr/dashboard').then((m) => m.DashboardPage),
      },
      {
        path: 'patients',
        canActivate: [authGuard],
        loadComponent: () =>
          import('@ehr/patient-list').then((m) => m.PatientList),
      },
      {
        path: 'patient/:id',
        canActivate: [authGuard],
        loadComponent: () =>
          import('@ehr/patient-profile').then((m) => m.PatientProfile),
      },
      {
        path: 'docs/design-system',
        loadComponent: () =>
          import('@ehr/design-system').then((m) => m.DesignSystem),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
