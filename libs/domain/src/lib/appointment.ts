export type AppointmentStatus =
  | 'confirmed'
  | 'pending'
  | 'in-progress'
  | 'done';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  /** ISO 8601 local date-time (YYYY-MM-DDTHH:mm), no offset. */
  start: string;
  durationMinutes: number;
  reason: string;
  status: AppointmentStatus;
}
