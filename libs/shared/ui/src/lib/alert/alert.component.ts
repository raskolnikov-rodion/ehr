import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { AlertType } from './models';
import { ICON_URL } from './constants';

@Component({
  selector: 'ehr-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.test-id]': `"alert-" + id()`,
    '[attr.role]': 'ariaRole()',
    '[attr.aria-live]': 'ariaLive()',
    '[class]': 'cssClass()',
  },
})
export class AlertComponent {
  readonly id = input<string>(`${Math.random()}`);
  readonly message = input.required<string>();
  readonly type = input<AlertType>(AlertType.ERROR);
  readonly title = input<string>('');
  readonly dismissible = input(false);

  readonly dismissed = output<string>();

  readonly iconUrl = computed(() => ICON_URL[this.type()]);
  readonly isErrorOrWarning = computed(
    () => this.type() === AlertType.ERROR || this.type() === AlertType.WARNING,
  );
  readonly ariaRole = computed(() =>
    this.isErrorOrWarning() ? 'alert' : 'status',
  );
  readonly ariaLive = computed(() =>
    this.isErrorOrWarning() ? 'assertive' : 'polite',
  );
  readonly cssClass = computed(() => `alert alert--${this.type()}`);
}
