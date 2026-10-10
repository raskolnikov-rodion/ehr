import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Action } from './models';

@Component({
  selector: 'ehr-action-item',
  templateUrl: './action-item.html',
  styleUrl: './action-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { role: 'listitem', class: 'action-item highlight-on-hover' },
})
export class ActionItem {
  readonly action = input.required<Action>();

  readonly dotCssClass = computed(
    () => `action-item__dot action-item__dot--${this.action().severity}`,
  );
}
