import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe } from 'vitest-axe';

import { AppointmentItem } from './appointment-item';
import { AppointmentView } from './models';

const BASE: AppointmentView = {
  time: '09:00',
  patient: 'Jane Doe',
  type: 'Annual check-up · 30 min',
  status: 'confirmed',
};

describe('AppointmentItem', () => {
  let fixture: ComponentFixture<AppointmentItem>;

  function createComponent(overrides: Partial<AppointmentView> = {}) {
    fixture = TestBed.createComponent(AppointmentItem);
    fixture.componentRef.setInput('appointment', { ...BASE, ...overrides });
    return fixture;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentItem],
    }).compileComponents();
  });

  it('should create', async () => {
    createComponent();
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the time', async () => {
    createComponent({ time: '14:30' });
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('14:30');
  });

  it('should render the patient name', async () => {
    createComponent({ patient: 'Robert Kim' });
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('Robert Kim');
  });

  it('should render the appointment type', async () => {
    createComponent({ type: 'Follow-up: hypertension · 20 min' });
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain(
      'Follow-up: hypertension · 20 min',
    );
  });

  it('should apply badge--confirmed class for confirmed status', async () => {
    createComponent({ status: 'confirmed' });
    await fixture.whenStable();
    const badge = fixture.nativeElement.querySelector('.badge');
    expect(badge.classList).toContain('badge--confirmed');
  });

  it('should apply badge--pending class for pending status', async () => {
    createComponent({ status: 'pending' });
    await fixture.whenStable();
    const badge = fixture.nativeElement.querySelector('.badge');
    expect(badge.classList).toContain('badge--pending');
  });

  it('should apply badge--in-progress class for in-progress status', async () => {
    createComponent({ status: 'in-progress' });
    await fixture.whenStable();
    const badge = fixture.nativeElement.querySelector('.badge');
    expect(badge.classList).toContain('badge--in-progress');
  });

  it('should apply badge--done class for done status', async () => {
    createComponent({ status: 'done' });
    await fixture.whenStable();
    const badge = fixture.nativeElement.querySelector('.badge');
    expect(badge.classList).toContain('badge--done');
  });

  it('should have no accessibility violations', async () => {
    createComponent();
    await fixture.whenStable();
    // Parent-context rules disabled: component is always used inside a <ul> (role="list"),
    // verified in DashboardPage's accessibility test.
    expect(
      await axe(fixture.nativeElement, {
        rules: { 'aria-required-parent': { enabled: false } },
      }),
    ).toHaveNoViolations();
  });
});
