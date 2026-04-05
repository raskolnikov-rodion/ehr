import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe } from 'vitest-axe';

import { StatCardComponent } from './stat-card.component';
import { TrendDirection } from './models';

describe('StatCardComponent', () => {
  let fixture: ComponentFixture<StatCardComponent>;

  function createComponent(
    inputs: {
      label?: string;
      value?: number | string;
      trend?: string;
      trendDirection?: TrendDirection;
      iconUrl?: string;
    } = {},
  ) {
    fixture = TestBed.createComponent(StatCardComponent);
    fixture.componentRef.setInput('label', inputs.label ?? 'Test Label');
    fixture.componentRef.setInput('value', inputs.value ?? 0);
    fixture.componentRef.setInput('trend', inputs.trend ?? 'No change');
    fixture.componentRef.setInput(
      'iconUrl',
      inputs.iconUrl ?? '/icons/test.svg',
    );
    if (inputs.trendDirection !== undefined) {
      fixture.componentRef.setInput('trendDirection', inputs.trendDirection);
    }
    return fixture;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatCardComponent],
    }).compileComponents();
  });

  it('should create', async () => {
    createComponent();
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the label', async () => {
    createComponent({ label: 'Patients Seen' });
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('Patients Seen');
  });

  it('should render the value', async () => {
    createComponent({ value: 12 });
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('12');
  });

  it('should render the trend text', async () => {
    createComponent({ trend: '↑ 3 vs. yesterday' });
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('↑ 3 vs. yesterday');
  });

  it('should apply trend--up class when trendDirection is up', async () => {
    createComponent({ trendDirection: TrendDirection.UP });
    await fixture.whenStable();
    const trendEl = fixture.nativeElement.querySelector('.stat-card__trend');
    expect(trendEl.classList).toContain('stat-card__trend--up');
    expect(trendEl.classList).not.toContain('stat-card__trend--down');
  });

  it('should apply trend--down class when trendDirection is down', async () => {
    createComponent({ trendDirection: TrendDirection.DOWN });
    await fixture.whenStable();
    const trendEl = fixture.nativeElement.querySelector('.stat-card__trend');
    expect(trendEl.classList).toContain('stat-card__trend--down');
    expect(trendEl.classList).not.toContain('stat-card__trend--up');
  });

  it('should not apply a directional class when trendDirection is neutral', async () => {
    createComponent({ trendDirection: TrendDirection.NEUTRAL });
    await fixture.whenStable();
    const trendEl = fixture.nativeElement.querySelector('.stat-card__trend');
    expect(trendEl.classList).not.toContain('stat-card__trend--up');
    expect(trendEl.classList).not.toContain('stat-card__trend--down');
  });

  it('should apply iconUrl as mask-image style', async () => {
    createComponent({ iconUrl: '/icons/calendar.svg' });
    await fixture.whenStable();
    const iconEl = fixture.nativeElement.querySelector('.stat-card__icon');
    expect(iconEl.style.maskImage).toContain('/icons/calendar.svg');
  });

  it('should have no accessibility violations', async () => {
    createComponent();
    await fixture.whenStable();
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });
});
