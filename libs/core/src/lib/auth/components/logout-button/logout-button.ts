import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'ehr-logout-button',
  templateUrl: './logout-button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutButton {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  readonly isLoggedIn = this.auth.isLoggedIn;

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
