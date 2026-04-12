import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AlertComponent, CardComponent, SkeletonComponent } from '@ehr/ui';
import { ActionItemComponent } from '../components/action-item/action-item.component';
import { AppointmentItemComponent } from '../components/appointment-item/appointment-item.component';
import { GreetingComponent } from '../components/greeting/greeting.component';
import { PatientItemComponent } from '../components/patient-item/patient-item.component';
import { StatCardComponent } from '../components/stat-card/stat-card.component';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'ehr-dashboard-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AlertComponent,
    CardComponent,
    SkeletonComponent,
    GreetingComponent,
    StatCardComponent,
    AppointmentItemComponent,
    ActionItemComponent,
    PatientItemComponent,
  ],
})
export class PageComponent {
  private readonly dashboard = toSignal(
    inject(DashboardService).getDashboard(),
  );

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
