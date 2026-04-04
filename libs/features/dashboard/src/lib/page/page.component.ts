import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from '@ehr/ui';

@Component({
  selector: 'ehr-dashboard-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {}
