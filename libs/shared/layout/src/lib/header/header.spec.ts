import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Auth } from '@ehr/core';
import { Theme } from '@ehr/theme';
import { axe } from 'vitest-axe';
import { Header } from './header';

describe('Header', () => {
  let fixture: ComponentFixture<Header>;
  let component: Header;
  let mockAuthService: {
    isLoggedIn: () => boolean;
    logout: ReturnType<typeof vi.fn>;
  };
  let mockThemeService: {
    darkTheme: () => boolean;
    toggleTheme: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    mockAuthService = { isLoggedIn: () => false, logout: vi.fn() };
    mockThemeService = { darkTheme: () => false, toggleTheme: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideRouter([]),
        { provide: Auth, useValue: mockAuthService },
        { provide: Theme, useValue: mockThemeService },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have no accessibility violations', async () => {
    await fixture.whenStable();
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });
});
