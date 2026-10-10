import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'ehr-card',
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  readonly id = input<string>(`${Math.random()}`);
  readonly title = input<string>('');
  readonly action = input<string>('');
  readonly bordered = input(true);

  readonly actionClick = output<string>();
}
