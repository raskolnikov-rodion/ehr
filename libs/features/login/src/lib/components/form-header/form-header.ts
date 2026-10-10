import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ehr-form-header',
  templateUrl: './form-header.html',
  styleUrl: './form-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormHeader {}
