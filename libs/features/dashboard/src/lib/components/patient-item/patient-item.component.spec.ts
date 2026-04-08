import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe } from 'vitest-axe';

import { AvatarColor, Patient } from './models';
import { PatientItemComponent } from './patient-item.component';

const BASE: Patient = {
  initials: 'JD',
  avatarColor: 'blue',
  name: 'Jane Doe',
  detail: 'F, 45 · Annual check-up',
  lastVisit: 'Today',
};

describe('PatientItemComponent', () => {
  let fixture: ComponentFixture<PatientItemComponent>;

  function createComponent(overrides: Partial<Patient> = {}) {
    fixture = TestBed.createComponent(PatientItemComponent);
    fixture.componentRef.setInput('patient', { ...BASE, ...overrides });
    return fixture;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientItemComponent],
    }).compileComponents();
  });

  it('should create', async () => {
    createComponent();
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the patient name', async () => {
    createComponent({ name: 'Sarah Thompson' });
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('Sarah Thompson');
  });

  it('should render the detail', async () => {
    createComponent({ detail: 'M, 61 · Hypertension follow-up' });
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain(
      'M, 61 · Hypertension follow-up',
    );
  });

  it('should render the last visit', async () => {
    createComponent({ lastVisit: '2 Apr' });
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('2 Apr');
  });

  it('should render the initials in the avatar', async () => {
    createComponent({ initials: 'ST' });
    await fixture.whenStable();
    const avatar = fixture.nativeElement.querySelector('.patient-item__avatar');
    expect(avatar.textContent.trim()).toBe('ST');
  });

  it('should apply the correct avatar color class', async () => {
    const avatarColor: AvatarColor[] = [
      'amber',
      'blue',
      'gray',
      'green',
      'teal',
    ];
    for (const color of avatarColor) {
      createComponent({ avatarColor: color });
      await fixture.whenStable();
      const avatar = fixture.nativeElement.querySelector(
        '.patient-item__avatar',
      );
      expect(avatar.classList).toContain(`patient-item__avatar--${color}`);
    }
  });

  it('should have no accessibility violations', async () => {
    createComponent();
    await fixture.whenStable();
    // Parent-context rules disabled: component is always used inside a <ul> (role="list"),
    // verified in PageComponent's accessibility test.
    expect(
      await axe(fixture.nativeElement, {
        rules: { 'aria-required-parent': { enabled: false } },
      }),
    ).toHaveNoViolations();
  });
});
