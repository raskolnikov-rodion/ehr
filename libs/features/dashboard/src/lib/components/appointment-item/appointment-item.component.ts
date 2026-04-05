import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Appointment } from './models';

@Component({
  selector: 'ehr-appointment-item',
  templateUrl: './appointment-item.component.html',
  styleUrl: './appointment-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { role: 'listitem', class: 'appt' },
})
export class AppointmentItemComponent {
  readonly appointment = input.required<Appointment>();

  readonly badgeCssClass = computed(
    () => `badge badge--${this.appointment().status}`,
  );
}
