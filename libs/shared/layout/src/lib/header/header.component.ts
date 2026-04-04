import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@ehr/core';
import { ThemeToggleComponent } from '@ehr/theme';

@Component({
  selector: 'ehr-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ThemeToggleComponent],
})
export class HeaderComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly isLoggedIn = this.auth.isLoggedIn;

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
