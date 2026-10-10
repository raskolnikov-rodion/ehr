import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Alert, Card, Skeleton } from '@ehr/ui';
import { ActionItem } from '../components/action-item/action-item';
import { AppointmentItem } from '../components/appointment-item/appointment-item';
import { Greeting } from '../components/greeting/greeting';
import { PatientItem } from '../components/patient-item/patient-item';
import { StatCard } from '../components/stat-card/stat-card';
import { Dashboard } from '../services/dashboard';

@Component({
  selector: 'ehr-dashboard-page',
  templateUrl: './page.html',
  styleUrl: './page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Alert,
    Card,
    Skeleton,
    Greeting,
    StatCard,
    AppointmentItem,
    ActionItem,
    PatientItem,
  ],
})
export class DashboardPage {
  private readonly dashboard = toSignal(inject(Dashboard).getDashboard());

  readonly isLoading = computed(() => this.dashboard() === undefined);
  readonly hasError = computed(() => this.dashboard() === null);

  readonly greeting = computed(
    () => this.dashboard()?.greeting ?? { name: '' },
  );
  readonly alert = computed(() => this.dashboard()?.alert ?? null);
  readonly stats = computed(() => this.dashboard()?.stats ?? []);
  readonly appointments = computed(() => this.dashboard()?.appointments ?? []);
  readonly pendingActions = computed(() => this.dashboard()?.actions ?? []);
  readonly recentPatients = computed(() => this.dashboard()?.patients ?? []);

  readonly alertDismissed = signal(false);
}
