import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe } from 'vitest-axe';

import { ColorPaletteComponent } from './color-palette.component';
import { By } from '@angular/platform-browser';

describe('ColorPaletteComponent', () => {
  let component: ColorPaletteComponent;
  let fixture: ComponentFixture<ColorPaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorPaletteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorPaletteComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    document.documentElement.removeAttribute('data-theme');
  });

  it('should render the page heading', async () => {
    await fixture.whenStable();
    const h1 = fixture.debugElement.query(By.css("[test-id='header-heading']"))
      .nativeElement as HTMLElement;
    expect(h1.textContent).toContain('EHR Color Palette');
  });

  it('should render all color group headings', async () => {
    await fixture.whenStable();
    const headings = Array.from(
      fixture.debugElement.queryAll(By.css("[test-id='group-heading']")),
    ).map((el) => (el.nativeElement as HTMLElement).textContent?.trim());

    const expectedTitles = component.groups.map((g) => g.title);
    for (const title of expectedTitles) {
      expect(headings).toContain(title);
    }
  });

  it('should render the Shadows / Elevation section', async () => {
    await fixture.whenStable();
    const headings = Array.from(
      fixture.debugElement.queryAll(By.css("[test-id='shadow-group-heading']")),
    ).map((el) => (el.nativeElement as HTMLElement).textContent?.trim());
    expect(headings).toContain('Shadows / Elevation');
  });

  it('should render a swatch card for every swatch in every group', async () => {
    await fixture.whenStable();
    const totalSwatches = component.groups.reduce(
      (sum, g) => sum + g.swatches.length,
      0,
    );
    const cards = fixture.debugElement.queryAll(
      By.css("[test-id='swatch-card']"),
    );
    expect(cards.length).toBe(totalSwatches);
  });

  it('should render a shadow card for every shadow', async () => {
    await fixture.whenStable();
    const cards = fixture.debugElement.queryAll(
      By.css("[test-id='shadow-card']"),
    );
    expect(cards.length).toBe(component.shadows.length);
  });

  describe('theme toggle', () => {
    it('should show Dark Mode button when theme is light', async () => {
      await fixture.whenStable();
      const btn = getButtonElement();
      expect(btn.textContent).toContain('Dark Mode');
    });

    it('should toggle dark signal and update button text on click', async () => {
      await fixture.whenStable();
      const btn = getButtonElement();

      btn.click();
      await fixture.whenStable();

      expect(component.darkTheme()).toBe(true);
      expect(btn.textContent).toContain('Light Mode');
    });

    it('should set data-theme="dark" on the document root when toggled on', async () => {
      await fixture.whenStable();
      const btn = getButtonElement();

      btn.click();
      await fixture.whenStable();

      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('should set data-theme="light" when toggled back to light', async () => {
      await fixture.whenStable();
      const btn = getButtonElement();

      btn.click();
      await fixture.whenStable();
      btn.click();
      await fixture.whenStable();

      expect(component.darkTheme()).toBe(false);
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });

    function getButtonElement() {
      return fixture.debugElement.query(By.css("[test-id='theme-toggle']"))
        .nativeElement as HTMLButtonElement;
    }
  });

  it('should have no accessibility violations', async () => {
    await fixture.whenStable();
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });
});
