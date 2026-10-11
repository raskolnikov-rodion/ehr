import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe } from 'vitest-axe';

import { AvatarColor, VisitView } from './models';
import { VisitItem } from './visit-item';

const BASE: VisitView = {
  patientInitials: 'JD',
  avatarColor: 'blue',
  patientName: 'Jane Doe',
  detail: 'F, 45 · Annual check-up',
  lastVisit: 'Today',
};

describe('VisitItem', () => {
  let fixture: ComponentFixture<VisitItem>;

  function createComponent(overrides: Partial<VisitView> = {}) {
    fixture = TestBed.createComponent(VisitItem);
    fixture.componentRef.setInput('visit', { ...BASE, ...overrides });
    return fixture;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitItem],
    }).compileComponents();
  });

  it('should create', async () => {
    createComponent();
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the patient name', async () => {
    createComponent({ patientName: 'Sarah Thompson' });
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
    createComponent({ patientInitials: 'ST' });
    await fixture.whenStable();
    const avatar = fixture.nativeElement.querySelector('.visit-item__avatar');
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
      const avatar = fixture.nativeElement.querySelector('.visit-item__avatar');
      expect(avatar.classList).toContain(`visit-item__avatar--${color}`);
    }
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
