import type { Appointment, Visit } from '@ehr/domain';
import type { AlertType } from '@ehr/ui';
import type { Action } from '../components/action-item/models';
import type { AppointmentView } from '../components/appointment-item/models';
import type { VisitView } from '../components/visit-item/models';
import type { Statistic } from '../components/stat-card/models';

interface DashboardBase {
  greeting: { name: string };
  alert: { type: AlertType; title: string; message: string } | null;
  stats: Statistic[];
  actions: Action[];
}

export interface DashboardResponse extends DashboardBase {
  appointments: Appointment[];
  recentVisits: Visit[];
}

export interface DashboardView extends DashboardBase {
  appointments: AppointmentView[];
  recentVisits: VisitView[];
}

export type DashboardErrorType =
  | 'unauthorized'
  | 'unavailable'
  | 'not-found'
  | 'unknown';

export type DashboardResult =
  | { data: DashboardView; error: null }
  | { data: null; error: DashboardErrorType };
