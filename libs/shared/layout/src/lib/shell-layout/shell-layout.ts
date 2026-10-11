import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer';
import { NavItem } from '../models';
import { Header } from '../header/header';
import { SidebarNav } from '../sidebar-nav/sidebar-nav';

@Component({
  selector: 'ehr-shell-layout',
  templateUrl: './shell-layout.html',
  styleUrl: './shell-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, Header, Footer, SidebarNav],
})
export class ShellLayout {
  readonly navItems = input.required<NavItem[]>();
}
