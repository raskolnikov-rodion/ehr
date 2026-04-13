import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Patient } from './models';

@Component({
  selector: 'ehr-patient-item',
  templateUrl: './patient-item.component.html',
  styleUrl: './patient-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { role: 'listitem', class: 'patient-item highlight-on-hover' },
})
export class PatientItemComponent {
  readonly patient = input.required<Patient>();
}
