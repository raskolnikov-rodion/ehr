export enum AppointmentStatus {
  CONFIRMED = 'confirmed',
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}

export interface Appointment {
  time: string;
  patient: string;
  type: string;
  status: AppointmentStatus;
}
