import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe } from 'vitest-axe';

import { provideRouter } from '@angular/router';
import { AuthService, ThemeService } from '@ehr/core';
import { AppComponent } from './app.component';

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
});
