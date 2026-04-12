import type { AlertType } from '@ehr/ui';
import type { Action } from '../components/action-item/models';
import type { Appointment } from '../components/appointment-item/models';
import type { Patient } from '../components/patient-item/models';
import type { Statistic } from '../components/stat-card/models';

export interface DashboardResponse {
  greeting: { name: string };
  alert: { type: AlertType; title: string; message: string } | null;
  stats: Statistic[];
  appointments: Appointment[];
  actions: Action[];
  patients: Patient[];
}
