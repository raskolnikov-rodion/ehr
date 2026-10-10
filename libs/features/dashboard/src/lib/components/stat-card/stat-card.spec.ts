import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe } from 'vitest-axe';

import { Statistic } from './models';
import { StatCard } from './stat-card';

const BASE: Statistic = {
  label: 'Test Label',
  value: '0',
  trend: 'No change',
  trendDirection: 'neutral',
  iconUrl: '/icons/test.svg',
};

describe('StatCard', () => {
  let fixture: ComponentFixture<StatCard>;

  function createComponent(overrides: Partial<Statistic> = {}) {
    fixture = TestBed.createComponent(StatCard);
    fixture.componentRef.setInput('statistic', { ...BASE, ...overrides });
    return fixture;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatCard],
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
    createComponent({ value: '12' });
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('12');
  });

  it('should render the trend text', async () => {
    createComponent({ trend: '↑ 3 vs. yesterday' });
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('↑ 3 vs. yesterday');
  });

  it('should apply trend--up class when trendDirection is up', async () => {
    createComponent({ trendDirection: 'up' });
    await fixture.whenStable();
    const trendEl = fixture.nativeElement.querySelector('.stat-card__trend');
    expect(trendEl.classList).toContain('stat-card__trend--up');
    expect(trendEl.classList).not.toContain('stat-card__trend--down');
  });

  it('should apply trend--down class when trendDirection is down', async () => {
    createComponent({ trendDirection: 'down' });
    await fixture.whenStable();
    const trendEl = fixture.nativeElement.querySelector('.stat-card__trend');
    expect(trendEl.classList).toContain('stat-card__trend--down');
    expect(trendEl.classList).not.toContain('stat-card__trend--up');
  });

  it('should not apply a directional class when trendDirection is neutral', async () => {
    createComponent({ trendDirection: 'neutral' });
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
