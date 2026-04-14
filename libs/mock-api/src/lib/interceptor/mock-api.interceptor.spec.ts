import {
  HttpClient,
  HttpErrorResponse,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MockRouteService } from '../service/mock-route.service';
import { MAX_RESPONSE_DELAY_MS } from './constants';
import { mockApiInterceptor } from './mock-api.interceptor';

describe('mockApiInterceptor', () => {
  let httpClient: HttpClient;
  let httpTesting: HttpTestingController;
  let registry: MockRouteService;

  beforeEach(() => {
    vi.useFakeTimers();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([mockApiInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTesting = TestBed.inject(HttpTestingController);
    registry = TestBed.inject(MockRouteService);
  });

  afterEach(() => {
    vi.useRealTimers();
    httpTesting.verify();
    TestBed.resetTestingModule();
  });

  it('passes non-API requests through to next', () => {
    httpClient.get('/public/data').subscribe();
    httpTesting.expectOne('/public/data').flush({ data: 'ok' });
  });

  it('returns a 404 HttpErrorResponse after delay when no handler matches', async () => {
    let error: HttpErrorResponse | undefined;
    httpClient.get('/api/unknown').subscribe({ error: (e) => (error = e) });
    await vi.advanceTimersByTimeAsync(MAX_RESPONSE_DELAY_MS);
    expect(error).toBeInstanceOf(HttpErrorResponse);
    expect(error?.status).toBe(404);
    expect(error?.error).toEqual({
      message: 'No mock handler for GET /api/unknown',
    });
  });

  it('returns the response body on success', async () => {
    registry.register('GET', '/api/items', () => ({
      status: 200,
      body: [{ id: 1 }],
    }));
    let body: unknown;
    httpClient.get('/api/items').subscribe({ next: (r) => (body = r) });
    await vi.advanceTimersByTimeAsync(MAX_RESPONSE_DELAY_MS);
    expect(body).toEqual([{ id: 1 }]);
  });

  it('returns an HttpErrorResponse when the handler returns a 4xx status', async () => {
    registry.register('GET', '/api/forbidden', () => ({
      status: 403,
      body: { message: 'Forbidden' },
    }));
    let error: HttpErrorResponse | undefined;
    httpClient.get('/api/forbidden').subscribe({ error: (e) => (error = e) });
    await vi.advanceTimersByTimeAsync(MAX_RESPONSE_DELAY_MS);
    expect(error).toBeInstanceOf(HttpErrorResponse);
    expect(error?.status).toBe(403);
    expect(error?.error).toEqual({ message: 'Forbidden' });
  });

  it('returns an HttpErrorResponse when the handler returns a 5xx status', async () => {
    registry.register('GET', '/api/broken', () => ({
      status: 500,
      body: { message: 'Internal error' },
    }));
    let error: HttpErrorResponse | undefined;
    httpClient.get('/api/broken').subscribe({ error: (e) => (error = e) });
    await vi.advanceTimersByTimeAsync(MAX_RESPONSE_DELAY_MS);
    expect(error).toBeInstanceOf(HttpErrorResponse);
    expect(error?.status).toBe(500);
  });

  it('passes request headers to the handler with lowercased keys', async () => {
    let captured: Record<string, string> | undefined;
    registry.register('GET', '/api/secured', (req) => {
      captured = req.headers;
      return { status: 200, body: null };
    });
    httpClient
      .get('/api/secured', {
        headers: {
          Authorization: 'Bearer token123',
          'X-Custom-Header': 'value',
        },
      })
      .subscribe();
    await vi.advanceTimersByTimeAsync(MAX_RESPONSE_DELAY_MS);
    expect(captured?.['authorization']).toBe('Bearer token123');
    expect(captured?.['x-custom-header']).toBe('value');
  });

  it('passes an empty headers object when the request has no custom headers', async () => {
    let captured: Record<string, string> | undefined;
    registry.register('GET', '/api/open', (req) => {
      captured = req.headers;
      return { status: 200, body: null };
    });
    httpClient.get('/api/open').subscribe();
    await vi.advanceTimersByTimeAsync(MAX_RESPONSE_DELAY_MS);
    expect(captured).toBeDefined();
    expect(Object.keys(captured as Record<string, string>).length).toBe(0);
  });
});
