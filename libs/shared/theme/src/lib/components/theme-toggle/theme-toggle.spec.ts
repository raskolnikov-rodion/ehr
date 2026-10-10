import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeToggle } from './theme-toggle';
import { Theme } from '../../service/theme';
import { axe } from 'vitest-axe';
import { By } from '@angular/platform-browser';

describe('ThemeToggle', () => {
  let fixture: ComponentFixture<ThemeToggle>;
  let component: ThemeToggle;
  let mockThemeService: {
    darkTheme: () => boolean;
    toggleTheme: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    mockThemeService = { darkTheme: () => false, toggleTheme: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [ThemeToggle],
      providers: [{ provide: Theme, useValue: mockThemeService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeToggle);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have no accessibility violations', async () => {
    await fixture.whenStable();
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });

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
    const darkFixture = TestBed.createComponent(ThemeToggle);
    darkFixture.detectChanges();
    expect(getToggleButton(darkFixture).nativeElement.textContent.trim()).toBe(
      '☀️ Light Mode',
    );
  });

  it('should call themeService.toggleTheme() when clicked', () => {
    fixture.detectChanges();
    getToggleButton(fixture).nativeElement.click();
    expect(mockThemeService.toggleTheme).toHaveBeenCalledOnce();
  });

  function getToggleButton(fxtr: ComponentFixture<ThemeToggle>) {
    return fxtr.debugElement.query(By.css("[test-id='theme-toggle']"));
  }
});
