import type { AppointmentStatus } from '@ehr/domain';

export interface AppointmentView {
  time: string;
  patient: string;
  type: string;
  status: AppointmentStatus;
}
