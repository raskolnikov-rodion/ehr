import { AuthUser } from './models';

export const REGISTERED_USERS: Record<string, AuthUser> = {
  DOCTOR: {
    id: 'DOCTOR',
    name: 'Dr. Demo User',
    email: 'doctor@ehr.demo',
    password: 'doctorPassword',
  },
  NURSE: {
    id: 'NURSE',
    name: 'Nurse Demo User',
    email: 'nurse@ehr.demo',
    password: 'nursePassword',
  },
};
