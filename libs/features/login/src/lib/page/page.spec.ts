import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe } from 'vitest-axe';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
import { of, Subject, throwError } from 'rxjs';
import { provideRouter, Router } from '@angular/router';
import { Auth } from '@ehr/core';

import { LoginPage } from './page';

class MockComponent {}

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let authService: { login: ReturnType<typeof vi.fn> };
  let router: Router;

  beforeEach(async () => {
    authService = { login: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [LoginPage],
      providers: [
        { provide: Auth, useValue: authService },
        provideRouter([
          {
            path: 'dashboard',
            component: MockComponent,
          },
        ]),
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the login form', () => {
    const form = fixture.debugElement.query(By.css('ehr-login-form'));
    expect(form).toBeTruthy();
  });

  describe('Loading State', () => {
    function getLoadingElement() {
      return fixture.debugElement.query(By.css("[test-id='login-loading']"));
    }

    it('should not show loading message initially', () => {
      expect(getLoadingElement()).toBeNull();
    });

    it('should show loading message while login is in progress', async () => {
      const pending$ = new Subject<never>();
      authService.login.mockReturnValue(pending$);
      component.onFormSubmit({
        email: 'test@test.com',
        password: 'password123',
      });
      await fixture.whenStable();

      expect(getLoadingElement()).toBeTruthy();
    });

    it('should hide loading message when login fails', async () => {
      authService.login.mockReturnValue(
        throwError(() => new Error('Unauthorized')),
      );
      component.onFormSubmit({
        email: 'bad@test.com',
        password: 'wrongPassword',
      });
      await fixture.whenStable();

      expect(getLoadingElement()).toBeNull();
    });
  });

  describe('Successful Login', () => {
    it('should navigate to the dashboard on successful login', async () => {
      authService.login.mockReturnValue(
        of({
          accessToken: 'token',
          user: { id: '1', name: 'Test', email: 'test@test.com' },
        }),
      );
      vi.spyOn(router, 'navigate');
      component.onFormSubmit({
        email: 'test@test.com',
        password: 'password123',
      });
      await fixture.whenStable();

      expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
    });
  });

  describe('Failed Login', () => {
    it('should not show an error message initially', () => {
      expect(getErrorElement()).toBeNull();
    });

    it('should display an error message when login fails', async () => {
      authService.login.mockReturnValue(
        throwError(() => new Error('Unauthorized')),
      );
      component.onFormSubmit({
        email: 'bad@test.com',
        password: 'wrongPassword',
      });
      await fixture.whenStable();

      const error = getErrorElement();
      expect(error).toBeTruthy();
      expect(error.nativeElement.textContent).toContain(
        'Incorrect email or password',
      );
    });

    it('should clear the error message on a subsequent submit', async () => {
      authService.login.mockReturnValue(
        throwError(() => new Error('Unauthorized')),
      );
      component.onFormSubmit({
        email: 'bad@test.com',
        password: 'wrongPassword',
      });
      await fixture.whenStable();

      const pending$ = new Subject<never>();
      authService.login.mockReturnValue(pending$);
      component.onFormSubmit({
        email: 'bad@test.com',
        password: 'wrongPassword2',
      });
      await fixture.whenStable();

      expect(getErrorElement()).toBeNull();
    });

    function getErrorElement() {
      return fixture.debugElement.query(
        By.css('[test-id="alert-login-error"]'),
      );
    }
  });

  describe('SSO Login', () => {
    it('should login with sample credentials', async () => {
      authService.login.mockReturnValue(
        of({
          accessToken: 'token',
          user: { id: '1', name: 'Test', email: 'doctor@ehr.demo' },
        }),
      );
      vi.spyOn(router, 'navigate');
      component.onSSOLogin();
      await fixture.whenStable();

      expect(authService.login).toHaveBeenCalledWith(
        'doctor@ehr.demo',
        'doctorPassword',
      );
      expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
    });
  });

  it('should have no accessibility violations', async () => {
    await fixture.whenStable();
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });
});
