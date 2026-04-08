import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AlertComponent, AlertType, CardComponent } from '@ehr/ui';
import { AppointmentItemComponent } from '../components/appointment-item/appointment-item.component';
import { GreetingComponent } from '../components/greeting/greeting.component';
import { Statistic, TrendDirection } from '../components/stat-card/models';
import { StatCardComponent } from '../components/stat-card/stat-card.component';
import {
  Appointment,
  AppointmentStatus,
} from '../components/appointment-item/models';
import { ActionSeverity, Action } from '../components/action-item/models';
import { ActionItemComponent } from '../components/action-item/action-item.component';
import { Patient, AvatarColor } from '../components/patient-item/models';
import { PatientItemComponent } from '../components/patient-item/patient-item.component';

@Component({
  selector: 'ehr-dashboard-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AlertComponent,
    CardComponent,
    GreetingComponent,
    StatCardComponent,
    AppointmentItemComponent,
    ActionItemComponent,
    PatientItemComponent,
  ],
})
export class PageComponent {
  readonly alertType: AlertType = 'warning';
  readonly alertDismissed = signal(false);

  readonly stats: Statistic[] = [
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
  ];

  readonly appointments: Appointment[] = [
    {
      time: '08:30',
      patient: 'Sarah Thompson',
      type: 'Annual check-up · 30 min',
      status: 'done',
    },
    {
      time: '09:15',
      patient: 'Robert Kim',
      type: 'Follow-up: hypertension · 20 min',
      status: 'done',
    },
    {
      time: '10:00',
      patient: 'Margaret Collins',
      type: 'Lab result review · 15 min',
      status: 'done',
    },
    {
      time: '10:30',
      patient: 'Daniel Reyes',
      type: 'New patient consultation · 45 min',
      status: 'in-progress',
    },
    {
      time: '11:30',
      patient: 'Katie Smith',
      type: 'Chronic care: diabetes · 30 min',
      status: 'confirmed',
    },
    {
      time: '14:00',
      patient: 'James Okafor',
      type: 'Post-op follow-up · 20 min',
      status: 'confirmed',
    },
    {
      time: '15:00',
      patient: 'Linda Williams',
      type: 'Medication review · 15 min',
      status: 'pending',
    },
    {
      time: '15:30',
      patient: 'Thomas Becker',
      type: 'Referral assessment · 30 min',
      status: 'pending',
    },
    {
      time: '16:15',
      patient: 'Anna Foster',
      type: 'Preventive screening · 20 min',
      status: 'pending',
    },
  ];

  readonly pendingActions: Action[] = [
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
  ];

  readonly recentPatients: Patient[] = [
    {
      initials: 'ST',
      avatarColor: 'blue',
      name: 'Sarah Thompson',
      detail: 'F, 52 · Annual check-up',
      lastVisit: 'Today',
    },
    {
      initials: 'RK',
      avatarColor: 'teal',
      name: 'Robert Kim',
      detail: 'M, 61 · Hypertension follow-up',
      lastVisit: 'Today',
    },
    {
      initials: 'MC',
      avatarColor: 'amber',
      name: 'Margaret Collins',
      detail: 'F, 47 · Lab review',
      lastVisit: 'Today',
    },
    {
      initials: 'PP',
      avatarColor: 'green',
      name: 'Katie Smith',
      detail: 'F, 38 · Diabetes management',
      lastVisit: '2 Apr',
    },
    {
      initials: 'JO',
      avatarColor: 'gray',
      name: 'James Okafor',
      detail: 'M, 55 · Post-op follow-up',
      lastVisit: '1 Apr',
    },
  ];
}
