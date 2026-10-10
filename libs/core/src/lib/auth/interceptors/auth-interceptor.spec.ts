import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Auth } from '../services/auth';
import { authInterceptor } from './auth-interceptor';

describe('authInterceptor', () => {
  let http: HttpClient;
  let httpTesting: HttpTestingController;
  const token = signal<string | null>(null);

  beforeEach(() => {
    token.set(null);
    TestBed.configureTestingModule({
      providers: [
        { provide: Auth, useValue: { token } },
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    http = TestBed.inject(HttpClient);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
    TestBed.resetTestingModule();
  });

  it('does not add an Authorization header for non-API requests', () => {
    token.set('my-token');
    http.get('/some-path').subscribe();
    const req = httpTesting.expectOne('/some-path');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush(null);
  });

  it('does not add an Authorization header for /api/login', () => {
    token.set('my-token');
    http.post('/api/login', {}).subscribe();
    const req = httpTesting.expectOne('/api/login');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush(null);
  });

  it('does not add an Authorization header when there is no token', () => {
    http.get('/api/patients').subscribe();
    const req = httpTesting.expectOne('/api/patients');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush(null);
  });

  it('adds Authorization: Bearer header for authenticated API requests', () => {
    const mockToken = 'my-token';
    token.set(mockToken);
    http.get('/api/patients').subscribe();
    const req = httpTesting.expectOne('/api/patients');
    expect(req.request.headers.get('Authorization')).toBe(
      `Bearer ${mockToken}`,
    );
    req.flush(null);
  });
});
