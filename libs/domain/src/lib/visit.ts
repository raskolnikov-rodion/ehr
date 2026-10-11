import type { Patient } from './patient';

export interface Visit {
  patient: Patient;
  /** ISO 8601 date (YYYY-MM-DD). */
  date: string;
  reason: string;
}
