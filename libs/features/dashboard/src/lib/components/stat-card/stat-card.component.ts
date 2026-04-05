import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { CardComponent } from '@ehr/ui';
import { Statistic, TrendDirection } from './models';

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
      case TrendDirection.UP:
        return 'stat-card__trend stat-card__trend--up';
      case TrendDirection.DOWN:
        return 'stat-card__trend stat-card__trend--down';
      default:
        return 'stat-card__trend';
    }
  });
}
