import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AuthService } from '@ehr/core';
import { axe } from 'vitest-axe';
import { ShellLayoutComponent } from './shell-layout.component';
import { ThemeService } from '@ehr/theme';

describe('ShellLayoutComponent', () => {
  let fixture: ComponentFixture<ShellLayoutComponent>;
  let component: ShellLayoutComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShellLayoutComponent],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: { isLoggedIn: () => false, logout: vi.fn() },
        },
        {
          provide: ThemeService,
          useValue: { darkTheme: () => false, toggleTheme: vi.fn() },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShellLayoutComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have no accessibility violations', async () => {
    await fixture.whenStable();
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });

  it('should render the header', async () => {
    await fixture.whenStable();
    expect(fixture.debugElement.query(By.css('ehr-header'))).not.toBeNull();
  });

  it('should render the footer', async () => {
    await fixture.whenStable();
    expect(fixture.debugElement.query(By.css('ehr-footer'))).not.toBeNull();
  });

  it('should render a main element containing a router-outlet', async () => {
    await fixture.whenStable();
    const main = fixture.debugElement.query(By.css('main'));
    expect(main).not.toBeNull();
    expect(main.query(By.css('router-outlet'))).not.toBeNull();
  });
});
