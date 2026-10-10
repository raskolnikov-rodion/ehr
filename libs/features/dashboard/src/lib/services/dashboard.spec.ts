import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Dashboard } from './dashboard';
import { DashboardResponse } from './models';

describe('Dashboard', () => {
  let service: Dashboard;
  let httpTesting: HttpTestingController;

  const MOCK_RESPONSE: DashboardResponse = {
    greeting: { name: 'Test User' },
    alert: null,
    stats: [],
    appointments: [],
    actions: [],
    patients: [],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(Dashboard);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
    TestBed.resetTestingModule();
  });

  describe('getDashboard', () => {
    it('GETs /api/dashboard', () => {
      service.getDashboard().subscribe();

      const req = httpTesting.expectOne('/api/dashboard');
      expect(req.request.method).toBe('GET');
      req.flush(MOCK_RESPONSE);
    });

    it('returns the response on success', () => {
      let result: DashboardResponse | null | undefined;
      service.getDashboard().subscribe((res) => (result = res));

      httpTesting.expectOne('/api/dashboard').flush(MOCK_RESPONSE);

      expect(result).toEqual(MOCK_RESPONSE);
    });

    it('returns null on HTTP error', () => {
      let result: DashboardResponse | null | undefined;
      service.getDashboard().subscribe((res) => (result = res));

      httpTesting
        .expectOne('/api/dashboard')
        .flush(null, { status: 500, statusText: 'Server Error' });

      expect(result).toBeNull();
    });
  });
});
