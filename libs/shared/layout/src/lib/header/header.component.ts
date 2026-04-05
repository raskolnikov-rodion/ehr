import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeToggleComponent } from '@ehr/theme';
import { LogoutButtonComponent } from '@ehr/core';

@Component({
  selector: 'ehr-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ThemeToggleComponent, LogoutButtonComponent],
})
export class HeaderComponent {}
