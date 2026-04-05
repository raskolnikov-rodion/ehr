import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { CardComponent } from '@ehr/ui';
import { TrendDirection } from './models';

@Component({
  selector: 'ehr-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent],
})
export class StatCardComponent {
  readonly label = input.required<string>();
  readonly value = input.required<number | string>();
  readonly trend = input.required<string>();
  readonly trendDirection = input<TrendDirection>(TrendDirection.NEUTRAL);
  readonly iconUrl = input.required<string>();

  readonly trendCssClass = computed(() => {
    switch (this.trendDirection()) {
      case TrendDirection.UP:
        return 'stat-card__trend stat-card__trend--up';
      case TrendDirection.DOWN:
        return 'stat-card__trend stat-card__trend--down';
      default:
        return 'stat-card__trend';
    }
  });
}
