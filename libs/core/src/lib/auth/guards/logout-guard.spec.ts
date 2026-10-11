import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Auth } from '../services/auth';
import { logoutGuard } from './logout-guard';

@Component({ template: '', standalone: true })
class StubComponent {}

describe('logoutGuard', () => {
  const logout = vi.fn();

  beforeEach(async () => {
    logout.mockClear();
    await TestBed.configureTestingModule({
      providers: [
        { provide: Auth, useValue: { logout } },
        provideRouter([
          { path: 'logout', canActivate: [logoutGuard], children: [] },
          { path: 'login', component: StubComponent },
        ]),
      ],
    }).compileComponents();
  });

  afterEach(() => TestBed.resetTestingModule());

  it('logs the user out and redirects to /login', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/logout');

    expect(logout).toHaveBeenCalledTimes(1);
    expect(TestBed.inject(Router).url).toBe('/login');
  });
});
