import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { VisitView } from './models';

@Component({
  selector: 'ehr-visit-item',
  templateUrl: './visit-item.html',
  styleUrl: './visit-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { role: 'listitem', class: 'visit-item highlight-on-hover' },
})
export class VisitItem {
  readonly visit = input.required<VisitView>();
}
