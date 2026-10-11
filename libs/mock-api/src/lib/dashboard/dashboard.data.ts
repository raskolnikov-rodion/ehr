import type { Appointment, Visit } from '@ehr/domain';

const pad = (n: number) => String(n).padStart(2, '0');
const isoDate = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const now = new Date();
const todayAt = (time: string) => `${isoDate(now)}T${time}`;
const daysAgo = (days: number) =>
  isoDate(new Date(now.getFullYear(), now.getMonth(), now.getDate() - days));
// 1 Jan birth date keeps the computed age exact for the whole current year.
const birthDateForAge = (age: number) => `${now.getFullYear() - age}-01-01`;

export const MOCK_DASHBOARD_DOCTOR = {
  greeting: { name: 'Dr. Demo User' },
  alert: {
    type: 'warning',
    title: '2 critical lab results require your review',
    message:
      'Margaret Collins (MRN 004821) and James Okafor (MRN 007134) have abnormal results flagged by the lab since yesterday.',
  },
  stats: [
    {
      label: "Today's Appointments",
      value: '9',
      trend: '3 completed · 6 remaining',
      trendDirection: 'neutral',
      iconUrl: '/icons/calendar.svg',
    },
    {
      label: 'Pending Reviews',
      value: '5',
      trend: '↓ 2 urgent · 3 routine',
      trendDirection: 'down',
      iconUrl: '/icons/clipboard-list.svg',
    },
    {
      label: 'Prescriptions Due',
      value: '3',
      trend: 'Renewal requests',
      trendDirection: 'neutral',
      iconUrl: '/icons/users.svg',
    },
    {
      label: 'Patients Seen',
      value: '3',
      trend: '↑ 1 vs. yesterday',
      trendDirection: 'up',
      iconUrl: '/icons/alert-check.svg',
    },
  ],
  appointments: [
    {
      id: 'appt-1',
      patientId: 'sarah-thompson',
      patientName: 'Sarah Thompson',
      start: todayAt('08:30'),
      durationMinutes: 30,
      reason: 'Annual check-up',
      status: 'done',
    },
    {
      id: 'appt-2',
      patientId: 'robert-kim',
      patientName: 'Robert Kim',
      start: todayAt('09:15'),
      durationMinutes: 20,
      reason: 'Follow-up: hypertension',
      status: 'done',
    },
    {
      id: 'appt-3',
      patientId: 'margaret-collins',
      patientName: 'Margaret Collins',
      start: todayAt('10:00'),
      durationMinutes: 15,
      reason: 'Lab result review',
      status: 'done',
    },
    {
      id: 'appt-4',
      patientId: 'daniel-reyes',
      patientName: 'Daniel Reyes',
      start: todayAt('10:30'),
      durationMinutes: 45,
      reason: 'New patient consultation',
      status: 'in-progress',
    },
    {
      id: 'appt-5',
      patientId: 'katie-smith',
      patientName: 'Katie Smith',
      start: todayAt('11:30'),
      durationMinutes: 30,
      reason: 'Chronic care: diabetes',
      status: 'confirmed',
    },
    {
      id: 'appt-6',
      patientId: 'james-okafor',
      patientName: 'James Okafor',
      start: todayAt('14:00'),
      durationMinutes: 20,
      reason: 'Post-op follow-up',
      status: 'confirmed',
    },
    {
      id: 'appt-7',
      patientId: 'linda-williams',
      patientName: 'Linda Williams',
      start: todayAt('15:00'),
      durationMinutes: 15,
      reason: 'Medication review',
      status: 'pending',
    },
    {
      id: 'appt-8',
      patientId: 'thomas-becker',
      patientName: 'Thomas Becker',
      start: todayAt('15:30'),
      durationMinutes: 30,
      reason: 'Referral assessment',
      status: 'pending',
    },
    {
      id: 'appt-9',
      patientId: 'anna-foster',
      patientName: 'Anna Foster',
      start: todayAt('16:15'),
      durationMinutes: 20,
      reason: 'Preventive screening',
      status: 'pending',
    },
  ] satisfies Appointment[],
  actions: [
    {
      severity: 'urgent',
      title: 'Lab results — Margaret Collins',
      meta: 'Abnormal CBC · flagged 18h ago',
      actionLabel: 'Review',
    },
    {
      severity: 'urgent',
      title: 'Lab results — James Okafor',
      meta: 'Elevated creatinine · flagged 22h ago',
      actionLabel: 'Review',
    },
    {
      severity: 'warning',
      title: 'Prescription renewal — Linda Williams',
      meta: 'Metformin 500mg · expires in 3 days',
      actionLabel: 'Authorise',
    },
    {
      severity: 'warning',
      title: 'Prescription renewal — Katie Smith',
      meta: 'Lisinopril 10mg · expires in 5 days',
      actionLabel: 'Authorise',
    },
    {
      severity: 'info',
      title: 'Referral letter — Thomas Becker',
      meta: 'Cardiology · draft saved',
      actionLabel: 'Complete',
    },
  ],
  recentVisits: [
    {
      patient: {
        id: 'sarah-thompson',
        name: 'Sarah Thompson',
        sex: 'F',
        birthDate: birthDateForAge(52),
      },
      date: daysAgo(0),
      reason: 'Annual check-up',
    },
    {
      patient: {
        id: 'robert-kim',
        name: 'Robert Kim',
        sex: 'M',
        birthDate: birthDateForAge(61),
      },
      date: daysAgo(0),
      reason: 'Hypertension follow-up',
    },
    {
      patient: {
        id: 'margaret-collins',
        name: 'Margaret Collins',
        sex: 'F',
        birthDate: birthDateForAge(47),
      },
      date: daysAgo(0),
      reason: 'Lab review',
    },
    {
      patient: {
        id: 'katie-smith',
        name: 'Katie Smith',
        sex: 'F',
        birthDate: birthDateForAge(38),
      },
      date: daysAgo(2),
      reason: 'Diabetes management',
    },
    {
      patient: {
        id: 'james-okafor',
        name: 'James Okafor',
        sex: 'M',
        birthDate: birthDateForAge(55),
      },
      date: daysAgo(3),
      reason: 'Post-op follow-up',
    },
  ] satisfies Visit[],
};

export const MOCK_DASHBOARD_NURSE = {
  greeting: { name: 'Nurse Demo User' },
  alert: null,
  stats: [
    {
      label: 'Vitals Due',
      value: '6',
      trend: '2 completed · 4 remaining',
      trendDirection: 'neutral',
      iconUrl: '/icons/calendar.svg',
    },
    {
      label: 'Medications Due',
      value: '4',
      trend: '↓ 1 overdue',
      trendDirection: 'down',
      iconUrl: '/icons/clipboard-list.svg',
    },
    {
      label: 'Care Plans Updated',
      value: '2',
      trend: '↑ 1 vs. yesterday',
      trendDirection: 'up',
      iconUrl: '/icons/users.svg',
    },
    {
      label: 'Patients Assessed',
      value: '5',
      trend: 'Shift so far',
      trendDirection: 'neutral',
      iconUrl: '/icons/alert-check.svg',
    },
  ],
  appointments: [
    {
      id: 'appt-10',
      patientId: 'sarah-thompson',
      patientName: 'Sarah Thompson',
      start: todayAt('07:00'),
      durationMinutes: 15,
      reason: 'Morning vitals',
      status: 'done',
    },
    {
      id: 'appt-11',
      patientId: 'robert-kim',
      patientName: 'Robert Kim',
      start: todayAt('07:30'),
      durationMinutes: 10,
      reason: 'Medication administration',
      status: 'done',
    },
    {
      id: 'appt-12',
      patientId: 'margaret-collins',
      patientName: 'Margaret Collins',
      start: todayAt('08:00'),
      durationMinutes: 20,
      reason: 'Wound dressing change',
      status: 'done',
    },
    {
      id: 'appt-13',
      patientId: 'daniel-reyes',
      patientName: 'Daniel Reyes',
      start: todayAt('09:00'),
      durationMinutes: 30,
      reason: 'Nursing assessment',
      status: 'in-progress',
    },
    {
      id: 'appt-14',
      patientId: 'katie-smith',
      patientName: 'Katie Smith',
      start: todayAt('10:00'),
      durationMinutes: 10,
      reason: 'Blood glucose check',
      status: 'confirmed',
    },
    {
      id: 'appt-15',
      patientId: 'james-okafor',
      patientName: 'James Okafor',
      start: todayAt('11:00'),
      durationMinutes: 15,
      reason: 'Post-op vitals',
      status: 'confirmed',
    },
    {
      id: 'appt-16',
      patientId: 'linda-williams',
      patientName: 'Linda Williams',
      start: todayAt('13:00'),
      durationMinutes: 10,
      reason: 'Medication administration',
      status: 'pending',
    },
    {
      id: 'appt-17',
      patientId: 'thomas-becker',
      patientName: 'Thomas Becker',
      start: todayAt('14:00'),
      durationMinutes: 30,
      reason: 'Patient education session',
      status: 'pending',
    },
    {
      id: 'appt-18',
      patientId: 'anna-foster',
      patientName: 'Anna Foster',
      start: todayAt('15:00'),
      durationMinutes: 20,
      reason: 'Discharge preparation',
      status: 'pending',
    },
  ] satisfies Appointment[],
  actions: [
    {
      severity: 'urgent',
      title: 'Vitals overdue — James Okafor',
      meta: 'Post-op check · 45 min overdue',
      actionLabel: 'Record',
    },
    {
      severity: 'warning',
      title: 'Medication due — Linda Williams',
      meta: 'Metformin 500mg · due in 30 min',
      actionLabel: 'Administer',
    },
    {
      severity: 'warning',
      title: 'Medication due — Robert Kim',
      meta: 'Lisinopril 10mg · due in 1 hour',
      actionLabel: 'Administer',
    },
    {
      severity: 'info',
      title: 'Care plan update — Daniel Reyes',
      meta: 'New patient · draft pending',
      actionLabel: 'Complete',
    },
    {
      severity: 'info',
      title: 'Discharge checklist — Anna Foster',
      meta: 'Scheduled for 16:00',
      actionLabel: 'Review',
    },
  ],
  recentVisits: [
    {
      patient: {
        id: 'sarah-thompson',
        name: 'Sarah Thompson',
        sex: 'F',
        birthDate: birthDateForAge(52),
      },
      date: daysAgo(0),
      reason: 'Morning vitals',
    },
    {
      patient: {
        id: 'robert-kim',
        name: 'Robert Kim',
        sex: 'M',
        birthDate: birthDateForAge(61),
      },
      date: daysAgo(0),
      reason: 'Medication admin',
    },
    {
      patient: {
        id: 'margaret-collins',
        name: 'Margaret Collins',
        sex: 'F',
        birthDate: birthDateForAge(47),
      },
      date: daysAgo(0),
      reason: 'Wound care',
    },
    {
      patient: {
        id: 'daniel-reyes',
        name: 'Daniel Reyes',
        sex: 'M',
        birthDate: birthDateForAge(34),
      },
      date: daysAgo(0),
      reason: 'New patient assessment',
    },
    {
      patient: {
        id: 'james-okafor',
        name: 'James Okafor',
        sex: 'M',
        birthDate: birthDateForAge(55),
      },
      date: daysAgo(0),
      reason: 'Post-op monitoring',
    },
  ] satisfies Visit[],
};
