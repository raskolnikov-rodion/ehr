import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { email, form, minLength, required } from '@angular/forms/signals';
import { FormInputComponent } from '@ehr/ui';
import { ForgotPasswordModalComponent } from '../forgot-password-modal/forgot-password-modal.component';
import { MIN_PASSWORD_LENGTH, SAMPLE_CREDENTIALS } from './constants';
import { LoginFormData } from './models';

@Component({
  selector: 'ehr-login-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormInputComponent, ForgotPasswordModalComponent],
})
export class FormComponent {
  private readonly forgotPasswordModal = viewChild.required(
    ForgotPasswordModalComponent,
  );

  readonly isLoading = input(false);
  readonly formSubmit = output<LoginFormData>();

  readonly model = signal({ email: '', password: '' });

  readonly form = form(this.model, (config) => {
    required(config.email, { message: 'Email is required.' });
    email(config.email, { message: 'Enter a valid email address.' });

    required(config.password, { message: 'Password is required.' });
    minLength(config.password, MIN_PASSWORD_LENGTH, {
      message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
    });
  });

  readonly submitDisabled = computed(
    () => this.form().invalid() || this.isLoading(),
  );

  onSubmit(event: SubmitEvent): void {
    event.preventDefault();

    if (this.submitDisabled()) return;

    this.formSubmit.emit(this.model());
  }

  openForgotPasswordModal(): void {
    this.forgotPasswordModal().open();
  }

  onCredentialsAccepted(): void {
    this.model.set(SAMPLE_CREDENTIALS);
  }
}
