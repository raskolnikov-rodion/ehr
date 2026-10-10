import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeToggle } from '@ehr/theme';
import { LogoutButton } from '@ehr/core';

@Component({
  selector: 'ehr-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ThemeToggle, LogoutButton],
})
export class Header {}
