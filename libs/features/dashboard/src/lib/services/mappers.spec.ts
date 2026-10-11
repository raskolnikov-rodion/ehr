import { Appointment, Visit } from '@ehr/domain';
import { ageOn, toAppointmentView, toVisitView } from './mappers';

const NOW = new Date(2026, 3, 10);

const VISIT: Visit = {
  patient: {
    id: 'jane-doe',
    name: 'Jane Doe',
    sex: 'F',
    birthDate: '1974-04-11',
  },
  date: '2026-04-10',
  reason: 'Annual check-up',
};

describe('ageOn', () => {
  it('subtracts a year before the birthday', () => {
    expect(ageOn('1974-04-11', NOW)).toBe(51);
  });

  it('counts the birthday itself', () => {
    expect(ageOn('1974-04-10', NOW)).toBe(52);
  });
});

describe('toAppointmentView', () => {
  it('formats time and type', () => {
    const appointment: Appointment = {
      id: 'a1',
      patientId: 'jane-doe',
      patientName: 'Jane Doe',
      start: '2026-04-10T08:30',
      durationMinutes: 30,
      reason: 'Annual check-up',
      status: 'done',
    };

    expect(toAppointmentView(appointment)).toEqual({
      time: '08:30',
      patient: 'Jane Doe',
      type: 'Annual check-up · 30 min',
      status: 'done',
    });
  });
});

describe('toVisitView', () => {
  it('builds initials, detail and visit label', () => {
    expect(toVisitView(VISIT, 0, NOW)).toEqual({
      patientInitials: 'JD',
      avatarColor: 'blue',
      patientName: 'Jane Doe',
      detail: 'F, 51 · Annual check-up',
      lastVisit: 'Today',
    });
  });

  it('labels yesterday and older visits', () => {
    expect(
      toVisitView({ ...VISIT, date: '2026-04-09' }, 0, NOW).lastVisit,
    ).toBe('Yesterday');
    expect(
      toVisitView({ ...VISIT, date: '2026-04-02' }, 0, NOW).lastVisit,
    ).toBe('2 Apr');
  });

  it('cycles avatar colours by index', () => {
    expect(toVisitView(VISIT, 1, NOW).avatarColor).toBe('teal');
    expect(toVisitView(VISIT, 5, NOW).avatarColor).toBe('blue');
  });
});
