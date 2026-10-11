export type Sex = 'F' | 'M';

export interface Patient {
  id: string;
  name: string;
  sex: Sex;
  /** ISO 8601 date (YYYY-MM-DD). */
  birthDate: string;
}
