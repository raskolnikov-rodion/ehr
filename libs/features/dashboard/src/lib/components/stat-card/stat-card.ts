import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Card } from '@ehr/ui';
import { Statistic } from './models';

@Component({
  selector: 'ehr-stat-card',
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card],
})
export class StatCard {
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
