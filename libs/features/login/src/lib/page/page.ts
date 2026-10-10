import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@ehr/core';
import { Alert } from '@ehr/ui';
import { BrandPanel } from '../components/brand-panel/brand-panel';
import { FormHeader } from '../components/form-header/form-header';
import { Form } from '../components/form/form';
import { LoginFormData } from '../components/form/models';
import { SAMPLE_CREDENTIALS } from '../components/form/constants';

@Component({
  selector: 'ehr-login-page',
  templateUrl: './page.html',
  styleUrl: './page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Alert, BrandPanel, Form, FormHeader],
})
export class LoginPage {
  private readonly auth = inject(Auth);
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

  public onSSOLogin(): void {
    this.onFormSubmit(SAMPLE_CREDENTIALS);
  }
}
