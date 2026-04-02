import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer,
} from '@angular/core';
import { mockApiInterceptor } from '../interceptor/mock-api.interceptor';
import { MockRouteService } from '../service/mock-route.service';
import { ROUTES } from './routes';

export function provideMockApi(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideHttpClient(withInterceptors([mockApiInterceptor])),
    provideAppInitializer(() => {
      const registry = inject(MockRouteService);
      ROUTES.forEach(({ method, pattern, handler }) =>
        registry.register(method, pattern, handler),
      );
    }),
  ]);
}
