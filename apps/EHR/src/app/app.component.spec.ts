import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe } from 'vitest-axe';

import { Router, provideRouter } from '@angular/router';
import { AuthService } from '@ehr/core';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let mockAuthService: {
    isLoggedIn: () => boolean;
    logout: ReturnType<typeof vi.fn>;
  };
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    mockAuthService = { isLoggedIn: () => false, logout: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should render title', async () => {
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('EHR');
  });

  it('should have no accessibility violations', async () => {
    await fixture.whenStable();
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });

  describe('Logout button', () => {
    it('should not display log out button when not logged in', () => {
      fixture.detectChanges();
      expect(getLogoutButton(fixture)).toBeNull();
    });

    it('should display log out button when logged in', () => {
      mockAuthService.isLoggedIn = () => true;
      const loggedInFixture = TestBed.createComponent(AppComponent);
      loggedInFixture.detectChanges();
      const button = getLogoutButton(loggedInFixture);
      expect(button).not.toBeNull();
      expect(button.nativeElement.textContent.trim()).toBe('Log out');
    });

    it('should call auth.logout and navigate to /login when logout() is called', async () => {
      const navigateSpy = vi
        .spyOn(TestBed.inject(Router), 'navigate')
        .mockResolvedValue(true);
      await fixture.whenStable();

      fixture.componentInstance.logout();

      expect(mockAuthService.logout).toHaveBeenCalledOnce();
      expect(navigateSpy).toHaveBeenCalledWith(['/login']);
    });

    function getLogoutButton(fxtr: ComponentFixture<AppComponent>) {
      return fxtr.debugElement.query(By.css("[test-id='logout-button']"));
    }
  });

  describe('theme toggle', () => {
    it('should show Dark Mode button when theme is light (default)', async () => {
      await fixture.whenStable();
      const btn = getThemeToggleElement();
      expect(btn.textContent).toContain('Dark Mode');
    });

    it('should toggle dark signal and update button text on click', async () => {
      await fixture.whenStable();
      const btn = getThemeToggleElement();

      btn.click();
      await fixture.whenStable();

      expect(component.darkTheme()).toBe(true);
      expect(btn.textContent).toContain('Light Mode');
    });

    it('should set data-theme="dark" on the document root when toggled on', async () => {
      await fixture.whenStable();
      const btn = getThemeToggleElement();

      btn.click();
      await fixture.whenStable();

      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('should set data-theme="light" when toggled back to light', async () => {
      await fixture.whenStable();
      const btn = getThemeToggleElement();

      btn.click();
      await fixture.whenStable();
      btn.click();
      await fixture.whenStable();

      expect(component.darkTheme()).toBe(false);
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });

    function getThemeToggleElement() {
      return fixture.debugElement.query(By.css("[test-id='theme-toggle']"))
        .nativeElement as HTMLButtonElement;
    }

    afterEach(() => {
      document.documentElement.setAttribute('data-theme', '');
    });
  });
});
