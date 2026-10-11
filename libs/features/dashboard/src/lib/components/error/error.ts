import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { Alert } from '@ehr/ui';
import type { DashboardErrorType } from '../../services/models';

export type ErrorAction = 'retry' | 'sign-in';

const ERROR_CONTENT: Record<
  DashboardErrorType,
  { title: string; message: string; action: ErrorAction | null }
> = {
  unauthorized: {
    title: 'Session expired',
    message: 'Your session is no longer valid. Please sign in again.',
    action: 'sign-in',
  },
  unavailable: {
    title: 'Dashboard temporarily unavailable',
    message:
      'The service is not responding right now. We retried automatically but it is still down.',
    action: 'retry',
  },
  'not-found': {
    title: 'Dashboard not found',
    message: 'We could not find your dashboard. Please contact support.',
    action: null,
  },
  unknown: {
    title: 'Failed to load dashboard',
    message: 'Something went wrong while loading your dashboard.',
    action: 'retry',
  },
};

@Component({
  selector: 'ehr-dashboard-error',
  templateUrl: './error.html',
  styleUrl: './error.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Alert, NgTemplateOutlet],
})
export class DashboardError {
  readonly error = input.required<DashboardErrorType>();

  readonly action = output<ErrorAction>();

  protected readonly content = computed(() => ERROR_CONTENT[this.error()]);
}
