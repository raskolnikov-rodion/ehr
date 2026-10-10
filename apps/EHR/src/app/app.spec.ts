import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe } from 'vitest-axe';

import { provideRouter } from '@angular/router';
import { Auth } from '@ehr/core';
import { Theme } from '@ehr/theme';
import { App } from './app';

describe('App', () => {
  let mockAuthService: {
    isLoggedIn: () => boolean;
    logout: ReturnType<typeof vi.fn>;
  };
  let mockThemeService: {
    darkTheme: () => boolean;
    toggleTheme: ReturnType<typeof vi.fn>;
  };
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    mockAuthService = { isLoggedIn: () => false, logout: vi.fn() };
    mockThemeService = { darkTheme: () => false, toggleTheme: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        { provide: Auth, useValue: mockAuthService },
        { provide: Theme, useValue: mockThemeService },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(App);
  });

  it('should have no accessibility violations', async () => {
    await fixture.whenStable();
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });
});
