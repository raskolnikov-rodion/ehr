import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ehr-brand-panel',
  templateUrl: './brand-panel.component.html',
  styleUrl: './brand-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandPanelComponent {}
