import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideMockApi } from '@ehr/mock-api';
import { appRoutes } from './app.routes';
import { themeInitializer } from './initializers/theme.initializer';

export const appConfig: ApplicationConfig = {
  providers: [
    themeInitializer,
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideMockApi(),
  ],
};
