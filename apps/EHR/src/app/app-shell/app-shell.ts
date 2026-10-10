import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ShellLayout } from '@ehr/layout';
import { LogoutButton } from './logout-button/logout-button';

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ShellLayout, LogoutButton],
})
export class AppShell {}
