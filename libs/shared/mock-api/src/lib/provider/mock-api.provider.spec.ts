import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { MockRouteService } from '../service/mock-route.service';
import { provideMockApi } from './mock-api.provider';
import { ROUTES } from './routes';

describe('provideMockApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockApi(), provideHttpClientTesting()],
    });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('registers all ROUTES into MockRouteService when the app initializer runs', () => {
    const registry = TestBed.inject(MockRouteService);

    for (const { method, pattern } of ROUTES) {
      if (typeof pattern === 'string') {
        expect(
          registry.match(method, pattern),
          `expected a handler for ${method} ${pattern}`,
        ).toBeDefined();
      }
    }
  });
});
