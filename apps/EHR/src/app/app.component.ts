import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
