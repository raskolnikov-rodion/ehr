import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { MockRoute } from '../service/mock-route';
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

  it('registers all ROUTES into MockRoute when the app initializer runs', () => {
    const registry = TestBed.inject(MockRoute);

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
