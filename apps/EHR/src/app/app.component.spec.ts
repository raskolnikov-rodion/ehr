import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe } from 'vitest-axe';

import { Router, provideRouter } from '@angular/router';
import { AuthService, ThemeService } from '@ehr/core';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let mockAuthService: {
    isLoggedIn: () => boolean;
    logout: ReturnType<typeof vi.fn>;
  };
  let mockThemeService: {
    darkTheme: () => boolean;
    toggleTheme: ReturnType<typeof vi.fn>;
  };
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    mockAuthService = { isLoggedIn: () => false, logout: vi.fn() };
    mockThemeService = { darkTheme: () => false, toggleTheme: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: mockAuthService },
        { provide: ThemeService, useValue: mockThemeService },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
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

  describe('Theme toggle', () => {
    function getToggleButton(fxtr: ComponentFixture<AppComponent>) {
      return fxtr.debugElement.query(By.css("[test-id='theme-toggle']"));
    }

    it('should always render the theme toggle button', () => {
      fixture.detectChanges();
      expect(getToggleButton(fixture)).not.toBeNull();
    });

    it('should show "Dark Mode" label when light theme is active', () => {
      fixture.detectChanges();
      expect(getToggleButton(fixture).nativeElement.textContent.trim()).toBe(
        '🌘 Dark Mode',
      );
    });

    it('should show "Light Mode" label when dark theme is active', () => {
      mockThemeService.darkTheme = () => true;
      const darkFixture = TestBed.createComponent(AppComponent);
      darkFixture.detectChanges();
      expect(
        getToggleButton(darkFixture).nativeElement.textContent.trim(),
      ).toBe('☀️ Light Mode');
    });

    it('should call themeService.toggleTheme() when clicked', () => {
      fixture.detectChanges();
      getToggleButton(fixture).nativeElement.click();
      expect(mockThemeService.toggleTheme).toHaveBeenCalledOnce();
    });
  });
});
