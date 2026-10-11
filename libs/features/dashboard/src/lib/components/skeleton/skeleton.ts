import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Card, Skeleton } from '@ehr/ui';

@Component({
  selector: 'ehr-dashboard-skeleton',
  templateUrl: './skeleton.html',
  styleUrl: './skeleton.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, Skeleton],
})
export class DashboardSkeleton {}
