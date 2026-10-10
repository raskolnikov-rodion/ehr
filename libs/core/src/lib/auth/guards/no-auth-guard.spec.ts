import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Auth } from '../services/auth';
import { noAuthGuard } from './no-auth-guard';

@Component({ template: '', standalone: true })
class StubComponent {}

const isLoggedIn = signal(false);

describe('noAuthGuard', () => {
  beforeEach(async () => {
    isLoggedIn.set(false);
    await TestBed.configureTestingModule({
      providers: [
        { provide: Auth, useValue: { isLoggedIn } },
        provideRouter([
          {
            path: 'login',
            component: StubComponent,
            canActivate: [noAuthGuard],
          },
          { path: 'dashboard', component: StubComponent },
        ]),
      ],
    }).compileComponents();
  });

  afterEach(() => TestBed.resetTestingModule());

  it('allows navigation when the user is not logged in', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/login');
    expect(TestBed.inject(Router).url).toBe('/login');
  });

  it('redirects to /dashboard when the user is already logged in', async () => {
    isLoggedIn.set(true);
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/login');
    expect(TestBed.inject(Router).url).toBe('/dashboard');
  });
});
