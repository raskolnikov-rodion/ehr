import { DOCUMENT } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe } from 'vitest-axe';

import { provideRouter } from '@angular/router';
import { AuthService } from '@ehr/core';
import { ThemeService } from '@ehr/theme';
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

  it('should append a fonts link to the document head', () => {
    const doc = TestBed.inject(DOCUMENT);
    const links = Array.from(
      doc.head.querySelectorAll('link[rel="stylesheet"]'),
    );
    const fontLink = links.find((l) =>
      (l as HTMLLinkElement).href.includes('fonts'),
    );
    expect(fontLink).toBeTruthy();
  });

  it('should have no accessibility violations', async () => {
    await fixture.whenStable();
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });
});
