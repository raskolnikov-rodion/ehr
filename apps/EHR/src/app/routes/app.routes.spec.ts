import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { AuthService } from '@ehr/core';
import { ThemeService } from '@ehr/theme';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { appRoutes } from './app.routes';

const isLoggedIn = signal(false);

describe('appRoutes', () => {
  beforeEach(async () => {
    isLoggedIn.set(false);
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: { isLoggedIn, login: vi.fn(), logout: vi.fn() },
        },
        {
          provide: ThemeService,
          useValue: { darkTheme: () => false, toggleTheme: vi.fn() },
        },
        provideRouter(appRoutes),
      ],
    }).compileComponents();
  });

  afterEach(() => TestBed.resetTestingModule());

  describe('unauthenticated user', () => {
    it('can navigate to /login', async () => {
      const harness = await RouterTestingHarness.create();
      await harness.navigateByUrl('/login');
      expect(getUrl()).toBe('/login');
    });

    it('is redirected from /dashboard to /login', async () => {
      const harness = await RouterTestingHarness.create();
      await harness.navigateByUrl('/dashboard');
      expect(getUrl()).toBe('/login');
    });

    it('is redirected from /patients to /login', async () => {
      const harness = await RouterTestingHarness.create();
      await harness.navigateByUrl('/patients');
      expect(getUrl()).toBe('/login');
    });

    it('is redirected from /patient/:id to /login', async () => {
      const harness = await RouterTestingHarness.create();
      await harness.navigateByUrl('/patient/123');
      expect(getUrl()).toBe('/login');
    });

    it('is redirected from / to /login', async () => {
      const harness = await RouterTestingHarness.create();
      await harness.navigateByUrl('/');
      expect(getUrl()).toBe('/login');
    });

    it('is redirected from an unknown path to /login', async () => {
      const harness = await RouterTestingHarness.create();
      await harness.navigateByUrl('/unknown');
      expect(getUrl()).toBe('/login');
    });
  });

  describe('authenticated user', () => {
    beforeEach(() => isLoggedIn.set(true));

    it('is redirected from /login to /dashboard', async () => {
      const harness = await RouterTestingHarness.create();
      await harness.navigateByUrl('/login');
      expect(getUrl()).toBe('/dashboard');
    });

    it('can navigate to /dashboard', async () => {
      const harness = await RouterTestingHarness.create();
      await harness.navigateByUrl('/dashboard');
      expect(getUrl()).toBe('/dashboard');
    });

    it('can navigate to /patients', async () => {
      const harness = await RouterTestingHarness.create();
      await harness.navigateByUrl('/patients');
      expect(getUrl()).toBe('/patients');
    });

    it('can navigate to /patient/:id', async () => {
      const harness = await RouterTestingHarness.create();
      await harness.navigateByUrl('/patient/123');
      expect(getUrl()).toBe('/patient/123');
    });

    it('is redirected from / to /dashboard', async () => {
      const harness = await RouterTestingHarness.create();
      await harness.navigateByUrl('/');
      expect(getUrl()).toBe('/dashboard');
    });
  });

  it('can navigate to /docs/design-system without authentication', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/docs/design-system');
    expect(getUrl()).toBe('/docs/design-system');
  });

  function getUrl(): string {
    return TestBed.inject(Router).url;
  }
});
