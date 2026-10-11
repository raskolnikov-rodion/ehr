import { Route } from '@angular/router';
import { authGuard, logoutGuard, noAuthGuard } from '@ehr/core';
import { AppShell } from '../app-shell/app-shell';
import { ROUTE_PATHS } from './route-paths';

export const appRoutes: Route[] = [
  {
    path: ROUTE_PATHS.login,
    canActivate: [noAuthGuard],
    loadComponent: () => import('@ehr/login').then((m) => m.LoginPage),
  },
  {
    path: ROUTE_PATHS.logout,
    canActivate: [logoutGuard],
    children: [],
  },
  {
    path: '',
    component: AppShell,
    children: [
      {
        path: '',
        redirectTo: ROUTE_PATHS.dashboard,
        pathMatch: 'full',
      },
      {
        path: ROUTE_PATHS.dashboard,
        canActivate: [authGuard],
        loadComponent: () =>
          import('@ehr/dashboard').then((m) => m.DashboardPage),
      },
      {
        path: ROUTE_PATHS.patients,
        canActivate: [authGuard],
        loadComponent: () =>
          import('@ehr/patient-list').then((m) => m.PatientList),
      },
      {
        path: ROUTE_PATHS.patientProfile,
        canActivate: [authGuard],
        loadComponent: () =>
          import('@ehr/patient-profile').then((m) => m.PatientProfile),
      },
      {
        path: ROUTE_PATHS.designSystem,
        loadComponent: () =>
          import('@ehr/design-system').then((m) => m.DesignSystem),
      },
    ],
  },
  {
    path: '**',
    redirectTo: `/${ROUTE_PATHS.login}`,
  },
];
