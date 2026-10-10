import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Appointment } from './models';

@Component({
  selector: 'ehr-appointment-item',
  templateUrl: './appointment-item.html',
  styleUrl: './appointment-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { role: 'listitem', class: 'appt highlight-on-hover' },
})
export class AppointmentItem {
  readonly appointment = input.required<Appointment>();

  readonly badgeCssClass = computed(
    () => `badge badge--${this.appointment().status}`,
  );
}
