import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { axe } from 'vitest-axe';
import { ShellLayout } from './shell-layout';
import { Theme } from '@ehr/theme';

describe('ShellLayout', () => {
  let fixture: ComponentFixture<ShellLayout>;
  let component: ShellLayout;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShellLayout],
      providers: [
        provideRouter([]),
        {
          provide: Theme,
          useValue: { darkTheme: () => false, toggleTheme: vi.fn() },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShellLayout);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('navItems', []);
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
