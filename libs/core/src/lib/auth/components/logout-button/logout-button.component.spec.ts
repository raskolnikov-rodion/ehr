import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { LogoutButtonComponent } from './logout-button.component';
import { AuthService } from '../../services/auth.service';
import { axe } from 'vitest-axe';

describe('LogoutButtonComponent', () => {
  let fixture: ComponentFixture<LogoutButtonComponent>;
  let component: LogoutButtonComponent;
  let mockAuthService: {
    isLoggedIn: () => boolean;
    logout: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    mockAuthService = { isLoggedIn: () => false, logout: vi.fn() };
    await TestBed.configureTestingModule({
      imports: [LogoutButtonComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(LogoutButtonComponent);
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
    const signedInFixture = TestBed.createComponent(LogoutButtonComponent);
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

  function getLogoutButton(fxtr: ComponentFixture<LogoutButtonComponent>) {
    return fxtr.debugElement.query(By.css("[test-id='logout-button']"));
  }
});
