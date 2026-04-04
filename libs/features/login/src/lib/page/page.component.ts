import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@ehr/core';
import { CardComponent } from '@ehr/ui';
import { FormComponent } from '../form/form.component';
import { LoginFormData } from '../form/models';

@Component({
  selector: 'ehr-login-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
  imports: [CardComponent, FormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly isLoggingIn = signal(false);
  readonly loginError = signal<string | null>(null);

  onFormSubmit(data: LoginFormData): void {
    this.loginError.set(null);
    this.isLoggingIn.set(true);

    this.auth.login(data.email, data.password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: () => {
        this.loginError.set('Incorrect email or password. Please try again.');
        this.isLoggingIn.set(false);
      },
    });
  }
}
