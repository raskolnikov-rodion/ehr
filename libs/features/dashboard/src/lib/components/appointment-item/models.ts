export type AppointmentStatus =
  | 'confirmed'
  | 'pending'
  | 'in-progress'
  | 'done';

export interface Appointment {
  time: string;
  patient: string;
  type: string;
  status: AppointmentStatus;
}
