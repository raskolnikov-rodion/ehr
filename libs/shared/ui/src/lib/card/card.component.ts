import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'ehr-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  readonly id = input<string>(`${Math.random()}`);
  readonly title = input<string>('');
  readonly action = input<string>('');
  readonly bordered = input(true);

  readonly actionClick = output<string>();
}
