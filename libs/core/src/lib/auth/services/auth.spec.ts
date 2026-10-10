import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Auth } from './auth';
import { TOKEN_KEY } from './constants';
import { LoginResponse } from './models';

describe('Auth', () => {
  let service: Auth;
  let httpTesting: HttpTestingController;

  const MOCK_RESPONSE: LoginResponse = {
    accessToken: 'mock-token',
    user: { id: '1', name: 'Test User', email: 'user@ehr.demo' },
  };

  function testSetup() {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(Auth);
    httpTesting = TestBed.inject(HttpTestingController);
  }

  afterEach(() => {
    httpTesting.verify();
    localStorage.clear();
    TestBed.resetTestingModule();
  });

  describe('Initial state', () => {
    it('isLoggedIn is false when no token is in localStorage', () => {
      localStorage.clear();
      testSetup();
      expect(service.isLoggedIn()).toBe(false);
    });

    it('isLoggedIn is true when a token is already in localStorage', () => {
      localStorage.setItem(TOKEN_KEY, 'existing-token');
      testSetup();
      expect(service.isLoggedIn()).toBe(true);
    });
  });

  describe('login', () => {
    const mockCredentials = {
      email: 'user@ehr.demo',
      password: 'password123',
    };

    beforeEach(() => {
      localStorage.clear();
      testSetup();
    });

    it('POSTs to /api/login with the provided credentials', () => {
      service
        .login(mockCredentials.email, mockCredentials.password)
        .subscribe();

      const req = httpTesting.expectOne('/api/login');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockCredentials);
      req.flush(MOCK_RESPONSE);
    });

    it('stores the access token in localStorage on success', () => {
      service
        .login(mockCredentials.email, mockCredentials.password)
        .subscribe();
      httpTesting.expectOne('/api/login').flush(MOCK_RESPONSE);

      expect(localStorage.getItem(TOKEN_KEY)).toBe(MOCK_RESPONSE.accessToken);
    });

    it('sets isLoggedIn to true after a successful login', () => {
      expect(service.isLoggedIn()).toBe(false);

      service
        .login(mockCredentials.email, mockCredentials.password)
        .subscribe();
      httpTesting.expectOne('/api/login').flush(MOCK_RESPONSE);

      expect(service.isLoggedIn()).toBe(true);
    });
  });

  describe('token', () => {
    it('is null when not logged in', () => {
      localStorage.clear();
      testSetup();
      expect(service.token()).toBeNull();
    });

    it('exposes the access token after a successful login', () => {
      localStorage.clear();
      testSetup();
      service.login('user@ehr.demo', 'password123').subscribe();
      httpTesting.expectOne('/api/login').flush(MOCK_RESPONSE);
      expect(service.token()).toBe(MOCK_RESPONSE.accessToken);
    });
  });

  describe('logout', () => {
    beforeEach(() => {
      localStorage.clear();
      testSetup();
      service.login('user@ehr.demo', 'password123').subscribe();
      httpTesting.expectOne('/api/login').flush(MOCK_RESPONSE);
    });

    it('removes the access token from localStorage', () => {
      service.logout();
      expect(localStorage.getItem(TOKEN_KEY)).toBeNull();
    });

    it('sets isLoggedIn to false', () => {
      expect(service.isLoggedIn()).toBe(true);
      service.logout();
      expect(service.isLoggedIn()).toBe(false);
    });
  });
});
