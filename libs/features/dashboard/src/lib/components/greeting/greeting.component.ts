import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ehr-dashboard-greeting',
  templateUrl: './greeting.component.html',
  styleUrl: './greeting.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe],
})
export class GreetingComponent {
  readonly name = input.required<string>();

  protected readonly today = new Date();

  protected get greeting(): string {
    const hour = this.today.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }
}
