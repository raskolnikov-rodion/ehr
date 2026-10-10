import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ehr-patient-list',
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientList {}
