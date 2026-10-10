import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ehr-skeleton',
  templateUrl: './skeleton.html',
  styleUrl: './skeleton.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skeleton {
  readonly width = input('100%');
  readonly height = input('1rem');
}
