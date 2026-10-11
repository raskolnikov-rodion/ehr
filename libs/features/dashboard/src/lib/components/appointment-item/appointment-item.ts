import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { AppointmentView } from './models';

@Component({
  selector: 'ehr-appointment-item',
  templateUrl: './appointment-item.html',
  styleUrl: './appointment-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { role: 'listitem', class: 'appt highlight-on-hover' },
})
export class AppointmentItem {
  readonly appointment = input.required<AppointmentView>();

  readonly badgeCssClass = computed(
    () => `badge badge--${this.appointment().status}`,
  );
}
