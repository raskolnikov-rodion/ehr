import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe } from 'vitest-axe';
import { vi } from 'vitest';

import type { DashboardErrorType } from '../../services/models';
import { DashboardError } from './error';

describe('DashboardError', () => {
  let fixture: ComponentFixture<DashboardError>;

  async function setup(error: DashboardErrorType) {
    await TestBed.configureTestingModule({
      imports: [DashboardError],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardError);
    fixture.componentRef.setInput('error', error);
    await fixture.whenStable();
  }

  const query = (testId: string): HTMLElement | null =>
    fixture.nativeElement.querySelector(`[test-id='${testId}']`);

  describe.each([
    ['unauthorized', 'Session expired', 'dashboard-sign-in-button'],
    [
      'unavailable',
      'Dashboard temporarily unavailable',
      'dashboard-retry-button',
    ],
    ['not-found', 'Dashboard not found', null],
    ['unknown', 'Failed to load dashboard', 'dashboard-retry-button'],
  ] as const)('%s', (error, title, actionTestId) => {
    beforeEach(() => setup(error));

    it('should render its own title', () => {
      expect(query(`dashboard-error-${error}`)).toBeTruthy();
      expect(
        fixture.nativeElement.querySelector('ehr-alert').textContent,
      ).toContain(title);
    });

    it('should render the matching action only', () => {
      const actions = [
        'dashboard-sign-in-button',
        'dashboard-retry-button',
      ].filter((id) => query(id));
      expect(actions).toEqual(actionTestId ? [actionTestId] : []);
    });

    it('should have no accessibility violations', async () => {
      expect(await axe(fixture.nativeElement)).toHaveNoViolations();
    });
  });

  it('should emit the "retry" action when "Try again" is clicked', async () => {
    await setup('unavailable');
    const spy = vi.fn();
    fixture.componentInstance.action.subscribe(spy);

    query('dashboard-retry-button')?.click();

    expect(spy).toHaveBeenCalledExactlyOnceWith('retry');
  });

  it('should emit the "sign-in" action when "Sign in again" is clicked', async () => {
    await setup('unauthorized');
    const spy = vi.fn();
    fixture.componentInstance.action.subscribe(spy);

    query('dashboard-sign-in-button')?.click();

    expect(spy).toHaveBeenCalledExactlyOnceWith('sign-in');
  });
});
