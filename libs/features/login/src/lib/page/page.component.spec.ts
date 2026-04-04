import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe } from 'vitest-axe';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
import { of, Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '@ehr/core';

import { PageComponent } from './page.component';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;
  let authService: { login: ReturnType<typeof vi.fn> };
  let router: { navigate: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    authService = { login: vi.fn() };
    router = { navigate: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [PageComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the login form inside a card', () => {
    const card = fixture.debugElement.query(By.css('ehr-card'));
    expect(card).toBeTruthy();

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
      expect(getLoadingElement().nativeElement.textContent).toContain(
        'Authenticating credentials',
      );
    });

    it('should hide loading message when login fails', async () => {
      authService.login.mockReturnValue(
        throwError(() => new Error('Unauthorized')),
      );
      component.onFormSubmit({ email: 'bad@test.com', password: 'wrong' });
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
      component.onFormSubmit({
        email: 'test@test.com',
        password: 'password123',
      });
      await fixture.whenStable();

      expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
    });
  });

  describe('Failed Login', () => {
    function getErrorElement() {
      return fixture.debugElement.query(By.css('[test-id="login-error"]'));
    }

    it('should not show an error message initially', () => {
      expect(getErrorElement()).toBeNull();
    });

    it('should display an error message when login fails', async () => {
      authService.login.mockReturnValue(
        throwError(() => new Error('Unauthorized')),
      );
      component.onFormSubmit({ email: 'bad@test.com', password: 'wrong' });
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
      component.onFormSubmit({ email: 'bad@test.com', password: 'wrong' });
      await fixture.whenStable();

      const pending$ = new Subject<never>();
      authService.login.mockReturnValue(pending$);
      component.onFormSubmit({ email: 'bad@test.com', password: 'wrong2' });
      await fixture.whenStable();

      expect(getErrorElement()).toBeNull();
    });
  });

  it('should have no accessibility violations', async () => {
    await fixture.whenStable();
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });
});
