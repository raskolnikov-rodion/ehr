import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '@ehr/core';

@Component({
  imports: [RouterLink, RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly isLoggedIn = this.auth.isLoggedIn;

  readonly darkTheme = signal(
    document.documentElement.getAttribute('data-theme') === 'dark',
  );

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  toggleTheme(): void {
    this.darkTheme.update((v) => !v);
    document.documentElement.setAttribute(
      'data-theme',
      this.darkTheme() ? 'dark' : 'light',
    );
  }
}
