import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { CardComponent } from '@ehr/ui';
import { Statistic } from './models';

@Component({
  selector: 'ehr-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent],
})
export class StatCardComponent {
  readonly statistic = input.required<Statistic>();

  readonly trendCssClass = computed(() => {
    switch (this.statistic().trendDirection) {
      case 'up':
        return 'stat-card__trend stat-card__trend--up';
      case 'down':
        return 'stat-card__trend stat-card__trend--down';
      default:
        return 'stat-card__trend';
    }
  });
}
