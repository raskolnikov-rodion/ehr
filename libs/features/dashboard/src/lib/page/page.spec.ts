import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NEVER, Observable, of } from 'rxjs';
import { axe } from 'vitest-axe';
import { vi } from 'vitest';

import { DashboardPage } from './page';
import { Dashboard } from '../services/dashboard';
import { DashboardResponse } from '../services/models';

const mockDashboard: DashboardResponse = {
  greeting: { name: 'Dr. Test' },
  alert: {
    type: 'warning',
    title: 'Test alert title',
    message: 'Test alert message.',
  },
  stats: [
    {
      label: 'Stat 1',
      value: '1',
      trend: 'up',
      trendDirection: 'up',
      iconUrl: '/icons/test.svg',
    },
    {
      label: 'Stat 2',
      value: '2',
      trend: 'down',
      trendDirection: 'down',
      iconUrl: '/icons/test.svg',
    },
    {
      label: 'Stat 3',
      value: '3',
      trend: 'neutral',
      trendDirection: 'neutral',
      iconUrl: '/icons/test.svg',
    },
    {
      label: 'Stat 4',
      value: '4',
      trend: 'neutral',
      trendDirection: 'neutral',
      iconUrl: '/icons/test.svg',
    },
  ],
  appointments: [
    {
      time: '09:00',
      patient: 'Patient A',
      type: 'Check-up',
      status: 'confirmed',
    },
    {
      time: '10:00',
      patient: 'Patient B',
      type: 'Follow-up',
      status: 'pending',
    },
  ],
  actions: [
    {
      severity: 'urgent',
      title: 'Action 1',
      meta: 'Meta 1',
      actionLabel: 'Review',
    },
    {
      severity: 'info',
      title: 'Action 2',
      meta: 'Meta 2',
      actionLabel: 'Complete',
    },
    {
      severity: 'warning',
      title: 'Action 3',
      meta: 'Meta 3',
      actionLabel: 'Authorise',
    },
  ],
  patients: [
    {
      initials: 'PA',
      avatarColor: 'blue',
      name: 'Patient A',
      detail: 'F, 40',
      lastVisit: 'Today',
    },
    {
      initials: 'PB',
      avatarColor: 'teal',
      name: 'Patient B',
      detail: 'M, 55',
      lastVisit: 'Yesterday',
    },
  ],
};

describe('DashboardPage', () => {
  let component: DashboardPage;
  let fixture: ComponentFixture<DashboardPage>;
  let dashboardService: { getDashboard: ReturnType<typeof vi.fn> };

  function setup(
    response: Observable<DashboardResponse | null> = of(mockDashboard),
  ) {
    dashboardService = { getDashboard: vi.fn().mockReturnValue(response) };

    TestBed.configureTestingModule({
      imports: [DashboardPage],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Dashboard, useValue: dashboardService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
  }

  describe('loading state', () => {
    beforeEach(() => setup(NEVER));

    it('should show skeleton while loading', async () => {
      await fixture.whenStable();
      expect(
        fixture.nativeElement.querySelectorAll('ehr-skeleton').length,
      ).toBeGreaterThan(0);
    });

    it('should not render content while loading', async () => {
      await fixture.whenStable();
      expect(
        fixture.nativeElement.querySelector('ehr-dashboard-greeting'),
      ).toBeNull();
    });
  });

  describe('loaded state', () => {
    beforeEach(async () => {
      setup();
      await fixture.whenStable();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have no accessibility violations', async () => {
      expect(await axe(fixture.nativeElement)).toHaveNoViolations();
    });

    it('should render the greeting with the name from the API', () => {
      const greeting = fixture.nativeElement.querySelector(
        'ehr-dashboard-greeting',
      );
      expect(greeting).toBeTruthy();
    });

    it('should render the alert initially', () => {
      expect(fixture.nativeElement.querySelector('ehr-alert')).toBeTruthy();
    });

    it('should hide the alert when dismissed', () => {
      component.alertDismissed.set(true);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('ehr-alert')).toBeNull();
    });

    it('should render 4 stat cards', () => {
      expect(
        fixture.nativeElement.querySelectorAll('ehr-stat-card'),
      ).toHaveLength(4);
    });

    it('should render all appointments', () => {
      expect(
        fixture.nativeElement.querySelectorAll('ehr-appointment-item'),
      ).toHaveLength(mockDashboard.appointments.length);
    });

    it('should render all pending actions', () => {
      expect(
        fixture.nativeElement.querySelectorAll('ehr-action-item'),
      ).toHaveLength(mockDashboard.actions.length);
    });

    it('should render all recent patients', () => {
      expect(
        fixture.nativeElement.querySelectorAll('ehr-patient-item'),
      ).toHaveLength(mockDashboard.patients.length);
    });
  });

  describe('error state', () => {
    beforeEach(async () => {
      setup(of(null));
      await fixture.whenStable();
    });

    it('should render an error alert', () => {
      expect(fixture.nativeElement.querySelector('ehr-alert')).toBeTruthy();
    });

    it('should not render the greeting or dashboard content', () => {
      expect(
        fixture.nativeElement.querySelector('ehr-dashboard-greeting'),
      ).toBeNull();
      expect(fixture.nativeElement.querySelector('ehr-stat-card')).toBeNull();
    });

    it('should have no accessibility violations', async () => {
      expect(await axe(fixture.nativeElement)).toHaveNoViolations();
    });
  });

  describe('no alert', () => {
    beforeEach(async () => {
      setup(of({ ...mockDashboard, alert: null }));
      await fixture.whenStable();
    });

    it('should not render the alert when API returns null', () => {
      expect(fixture.nativeElement.querySelector('ehr-alert')).toBeNull();
    });
  });
});
