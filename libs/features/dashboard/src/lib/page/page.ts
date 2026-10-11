import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Alert, Card } from '@ehr/ui';
import { BehaviorSubject, concat, of, switchMap } from 'rxjs';
import { ActionItem } from '../components/action-item/action-item';
import { AppointmentItem } from '../components/appointment-item/appointment-item';
import { Greeting } from '../components/greeting/greeting';
import { DashboardError, ErrorAction } from '../components/error/error';
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
    DashboardError,
    Greeting,
    StatCard,
    AppointmentItem,
    ActionItem,
    VisitItem,
  ],
})
export class DashboardPage {
  private readonly router = inject(Router);
  private readonly service = inject(Dashboard);
  private readonly reload$ = new BehaviorSubject<void>(undefined);

  private readonly result = toSignal(
    this.reload$.pipe(
      switchMap(() => concat(of(undefined), this.service.getDashboard())),
    ),
  );

  private readonly dashboard = computed(() => this.result()?.data ?? null);

  readonly isLoading = computed(() => this.result() === undefined);
  readonly error = computed(() => this.result()?.error ?? null);

  readonly greeting = computed(
    () => this.dashboard()?.greeting ?? { name: '' },
  );
  readonly alert = computed(() => this.dashboard()?.alert ?? null);
  readonly stats = computed(() => this.dashboard()?.stats ?? []);
  readonly appointments = computed(() => this.dashboard()?.appointments ?? []);
  readonly pendingActions = computed(() => this.dashboard()?.actions ?? []);
  readonly recentVisits = computed(() => this.dashboard()?.recentVisits ?? []);

  readonly alertDismissed = signal(false);

  onErrorAction(action: ErrorAction): void {
    switch (action) {
      case 'retry':
        this.reload$.next();
        break;
      case 'sign-in':
        this.router.navigate(['/logout']);
        break;
    }
  }
}
