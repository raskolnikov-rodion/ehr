import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../service/theme.service';

@Component({
  selector: 'ehr-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleComponent {
  private readonly themeService = inject(ThemeService);

  readonly darkTheme = this.themeService.darkTheme;

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
