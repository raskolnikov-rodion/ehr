import type { Appointment, Visit } from '@ehr/domain';
import type { AppointmentView } from '../components/appointment-item/models';
import type { AvatarColor, VisitView } from '../components/visit-item/models';
import type { DashboardResponse, DashboardView } from './models';

const AVATAR_COLORS: AvatarColor[] = ['blue', 'teal', 'amber', 'green', 'gray'];

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const parseDate = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
};

const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export function ageOn(birthDate: string, now: Date): number {
  const birth = parseDate(birthDate);
  const hadBirthday =
    now.getMonth() > birth.getMonth() ||
    (now.getMonth() === birth.getMonth() && now.getDate() >= birth.getDate());
  return now.getFullYear() - birth.getFullYear() - (hadBirthday ? 0 : 1);
}

function formatVisitDate(iso: string, now: Date): string {
  const days = Math.round(
    (startOfDay(now).getTime() - parseDate(iso).getTime()) / MS_PER_DAY,
  );
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  return parseDate(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
}

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

export function toAppointmentView(appointment: Appointment): AppointmentView {
  return {
    time: appointment.start.slice(11, 16),
    patient: appointment.patientName,
    type: `${appointment.reason} · ${appointment.durationMinutes} min`,
    status: appointment.status,
  };
}

export function toVisitView(visit: Visit, index: number, now: Date): VisitView {
  const { patient } = visit;
  return {
    patientInitials: initialsOf(patient.name),
    avatarColor: AVATAR_COLORS[index % AVATAR_COLORS.length],
    patientName: patient.name,
    detail: `${patient.sex}, ${ageOn(patient.birthDate, now)} · ${visit.reason}`,
    lastVisit: formatVisitDate(visit.date, now),
  };
}

export function toDashboardView(
  response: DashboardResponse,
  now: Date = new Date(),
): DashboardView {
  return {
    greeting: response.greeting,
    alert: response.alert,
    stats: response.stats,
    actions: response.actions,
    appointments: response.appointments.map(toAppointmentView),
    recentVisits: response.recentVisits.map((visit, i) =>
      toVisitView(visit, i, now),
    ),
  };
}
