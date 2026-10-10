import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Theme } from '../../service/theme';

@Component({
  selector: 'ehr-theme-toggle',
  templateUrl: './theme-toggle.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggle {
  private readonly themeService = inject(Theme);

  readonly darkTheme = this.themeService.darkTheme;

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
