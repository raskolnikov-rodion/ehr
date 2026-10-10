import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ehr-patient-profile',
  templateUrl: './patient-profile.html',
  styleUrl: './patient-profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientProfile {}
