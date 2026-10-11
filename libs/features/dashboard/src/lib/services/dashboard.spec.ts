import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BASE_RETRY_DELAY_MS, Dashboard, MAX_RETRIES } from './dashboard';
import { DashboardResponse, DashboardResult } from './models';

describe('Dashboard', () => {
  let service: Dashboard;
  let httpTesting: HttpTestingController;

  const MOCK_RESPONSE: DashboardResponse = {
    greeting: { name: 'Test User' },
    alert: null,
    stats: [],
    appointments: [],
    actions: [],
    recentVisits: [],
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

    it('maps the response to view models on success', () => {
      let result: DashboardResult | undefined;
      service.getDashboard().subscribe((res) => (result = res));

      httpTesting.expectOne('/api/dashboard').flush(MOCK_RESPONSE);

      expect(result).toEqual({ data: { ...MOCK_RESPONSE }, error: null });
    });

    it.each([
      [401, 'unauthorized'],
      [404, 'not-found'],
      [500, 'unknown'],
    ])('maps HTTP %i to "%s" without retrying', (status, error) => {
      let result: DashboardResult | undefined;
      service.getDashboard().subscribe((res) => (result = res));

      httpTesting
        .expectOne('/api/dashboard')
        .flush(null, { status, statusText: 'Error' });

      expect(result).toEqual({ data: null, error });
    });

    describe('retry on 503', () => {
      beforeEach(() => vi.useFakeTimers());
      afterEach(() => vi.useRealTimers());

      const fail503 = () =>
        httpTesting
          .expectOne('/api/dashboard')
          .flush(null, { status: 503, statusText: 'Unavailable' });

      it('retries with exponential backoff and succeeds', () => {
        let result: DashboardResult | undefined;
        service.getDashboard().subscribe((res) => (result = res));

        fail503();
        httpTesting.expectNone('/api/dashboard');
        vi.advanceTimersByTime(BASE_RETRY_DELAY_MS - 1);
        httpTesting.expectNone('/api/dashboard');
        vi.advanceTimersByTime(1);

        fail503();
        vi.advanceTimersByTime(BASE_RETRY_DELAY_MS * 2 - 1);
        httpTesting.expectNone('/api/dashboard');
        vi.advanceTimersByTime(1);

        httpTesting.expectOne('/api/dashboard').flush(MOCK_RESPONSE);

        expect(result).toEqual({ data: { ...MOCK_RESPONSE }, error: null });
      });

      it('returns "unavailable" once retries are exhausted', () => {
        let result: DashboardResult | undefined;
        service.getDashboard().subscribe((res) => (result = res));

        for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
          fail503();
          vi.advanceTimersByTime(BASE_RETRY_DELAY_MS * 2 ** attempt);
        }
        fail503();

        expect(result).toEqual({ data: null, error: 'unavailable' });
      });
    });
  });
});
