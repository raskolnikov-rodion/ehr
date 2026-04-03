import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'docs/color-palette',
    loadComponent: () =>
      import('@ehr/color-palette').then((m) => m.ColorPaletteComponent),
  },
];
