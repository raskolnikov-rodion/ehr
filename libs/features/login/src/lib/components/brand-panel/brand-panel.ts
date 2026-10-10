import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ehr-brand-panel',
  templateUrl: './brand-panel.html',
  styleUrl: './brand-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandPanel {}
