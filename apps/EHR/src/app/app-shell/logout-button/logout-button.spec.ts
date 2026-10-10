import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { LogoutButton } from './logout-button';
import { Auth } from '@ehr/core';
import { axe } from 'vitest-axe';

describe('LogoutButton', () => {
  let fixture: ComponentFixture<LogoutButton>;
  let component: LogoutButton;
  let mockAuthService: {
    isLoggedIn: () => boolean;
    logout: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    mockAuthService = { isLoggedIn: () => false, logout: vi.fn() };
    await TestBed.configureTestingModule({
      imports: [LogoutButton],
      providers: [
        provideRouter([]),
        { provide: Auth, useValue: mockAuthService },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(LogoutButton);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have no accessibility violations', async () => {
    await fixture.whenStable();
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });

  it('should not display logout button when not logged in', () => {
    fixture.detectChanges();
    expect(getLogoutButton(fixture)).toBeNull();
  });

  it('should display logout button when logged in', () => {
    mockAuthService.isLoggedIn = () => true;
    const signedInFixture = TestBed.createComponent(LogoutButton);
    signedInFixture.detectChanges();
    const button = getLogoutButton(signedInFixture);
    expect(button).not.toBeNull();
    expect(button.nativeElement.textContent.trim()).toBe('Sign out');
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

  function getLogoutButton(fxtr: ComponentFixture<LogoutButton>) {
    return fxtr.debugElement.query(By.css("[test-id='logout-button']"));
  }
});
