import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { NEVER, Observable, of } from 'rxjs';
import { axe } from 'vitest-axe';
import { vi } from 'vitest';

import { DashboardPage } from './page';
import { Dashboard } from '../services/dashboard';
import { DashboardResult, DashboardView } from '../services/models';

const mockDashboard: DashboardView = {
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
  recentVisits: [
    {
      patientInitials: 'PA',
      avatarColor: 'blue',
      patientName: 'Patient A',
      detail: 'F, 40',
      lastVisit: 'Today',
    },
    {
      patientInitials: 'PB',
      avatarColor: 'teal',
      patientName: 'Patient B',
      detail: 'M, 55',
      lastVisit: 'Yesterday',
    },
  ],
};

describe('DashboardPage', () => {
  let component: DashboardPage;
  let fixture: ComponentFixture<DashboardPage>;
  let dashboardService: { getDashboard: ReturnType<typeof vi.fn> };

  let router: { navigate: ReturnType<typeof vi.fn> };

  function setup(
    response: Observable<DashboardResult> = of({
      data: mockDashboard,
      error: null,
    }),
  ) {
    dashboardService = { getDashboard: vi.fn().mockReturnValue(response) };
    router = { navigate: vi.fn() };

    TestBed.configureTestingModule({
      imports: [DashboardPage],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Dashboard, useValue: dashboardService },
        { provide: Router, useValue: router },
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

    it('should render all recent visits', () => {
      expect(
        fixture.nativeElement.querySelectorAll('ehr-visit-item'),
      ).toHaveLength(mockDashboard.recentVisits.length);
    });
  });

  describe.each([
    'unauthorized',
    'unavailable',
    'not-found',
    'unknown',
  ] as const)('error state: %s', (error) => {
    beforeEach(async () => {
      setup(of({ data: null, error }));
      await fixture.whenStable();
    });

    it('should render the error component for that error', () => {
      expect(
        fixture.nativeElement.querySelector(
          `[test-id='dashboard-error-${error}']`,
        ),
      ).toBeTruthy();
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

  describe('error actions', () => {
    it('should refetch when "Try again" is clicked', async () => {
      setup(of({ data: null, error: 'unavailable' }));
      await fixture.whenStable();
      expect(dashboardService.getDashboard).toHaveBeenCalledTimes(1);

      fixture.nativeElement
        .querySelector("[test-id='dashboard-retry-button']")
        .click();
      await fixture.whenStable();

      expect(dashboardService.getDashboard).toHaveBeenCalledTimes(2);
    });

    it('should navigate to /logout when "Sign in again" is clicked', async () => {
      setup(of({ data: null, error: 'unauthorized' }));
      await fixture.whenStable();

      fixture.nativeElement
        .querySelector("[test-id='dashboard-sign-in-button']")
        .click();

      expect(router.navigate).toHaveBeenCalledWith(['/logout']);
    });
  });

  describe('no alert', () => {
    beforeEach(async () => {
      setup(of({ data: { ...mockDashboard, alert: null }, error: null }));
      await fixture.whenStable();
    });

    it('should not render the alert when API returns null', () => {
      expect(fixture.nativeElement.querySelector('ehr-alert')).toBeNull();
    });
  });
});
