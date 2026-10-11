import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Alert, Card } from '@ehr/ui';
import { ActionItem } from '../components/action-item/action-item';
import { AppointmentItem } from '../components/appointment-item/appointment-item';
import { Greeting } from '../components/greeting/greeting';
import { DashboardSkeleton } from '../components/skeleton/skeleton';
import { StatCard } from '../components/stat-card/stat-card';
import { VisitItem } from '../components/visit-item/visit-item';
import { Dashboard } from '../services/dashboard';

@Component({
  selector: 'ehr-dashboard-page',
  templateUrl: './page.html',
  styleUrl: './page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Alert,
    Card,
    DashboardSkeleton,
    Greeting,
    StatCard,
    AppointmentItem,
    ActionItem,
    VisitItem,
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
  readonly recentVisits = computed(() => this.dashboard()?.recentVisits ?? []);

  readonly alertDismissed = signal(false);
}
