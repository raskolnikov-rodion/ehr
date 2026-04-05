import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ehr-form-header',
  templateUrl: './form-header.component.html',
  styleUrl: './form-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormHeaderComponent {}
