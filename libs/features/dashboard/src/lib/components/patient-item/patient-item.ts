import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Patient } from './models';

@Component({
  selector: 'ehr-patient-item',
  templateUrl: './patient-item.html',
  styleUrl: './patient-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { role: 'listitem', class: 'patient-item highlight-on-hover' },
})
export class PatientItem {
  readonly patient = input.required<Patient>();
}
