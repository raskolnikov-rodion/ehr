import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { Auth } from '@ehr/core';
import { Theme } from '@ehr/theme';
import { axe } from 'vitest-axe';
import { AppShell } from './app-shell';

describe('AppShell', () => {
  let fixture: ComponentFixture<AppShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppShell],
      providers: [
        provideRouter([]),
        {
          provide: Auth,
          useValue: { isLoggedIn: () => true, logout: vi.fn() },
        },
        {
          provide: Theme,
          useValue: { darkTheme: () => false, toggleTheme: vi.fn() },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppShell);
  });

  it('should have no accessibility violations', async () => {
    await fixture.whenStable();
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });

  it('should pass the navigation items to the sidebar', async () => {
    await fixture.whenStable();
    const links = fixture.debugElement.queryAll(
      By.css("ehr-sidebar-nav [test-id='nav-link']"),
    );
    expect(
      links.map((l) => (l.nativeElement as HTMLElement).textContent?.trim()),
    ).toEqual(['Dashboard', 'Patients']);
  });

  it('should project the logout button into the header', async () => {
    await fixture.whenStable();
    expect(
      fixture.debugElement.query(
        By.css("ehr-header [test-id='logout-button']"),
      ),
    ).not.toBeNull();
  });
});
