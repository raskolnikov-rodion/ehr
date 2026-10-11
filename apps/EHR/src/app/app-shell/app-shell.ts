import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavItem, ShellLayout } from '@ehr/layout';
import { ROUTE_PATHS } from '../routes/route-paths';
import { LogoutButton } from './logout-button/logout-button';

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ShellLayout, LogoutButton],
})
export class AppShell {
  protected readonly navItems: NavItem[] = [
    {
      label: 'Dashboard',
      path: `/${ROUTE_PATHS.dashboard}`,
      iconUrl: '/icons/clipboard-list.svg',
    },
    {
      label: 'Patients',
      path: `/${ROUTE_PATHS.patients}`,
      iconUrl: '/icons/users.svg',
    },
  ];
}
