import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import {
  email,
  form,
  FormField,
  minLength,
  required,
} from '@angular/forms/signals';
import { LoginFormData } from './models';
import { MIN_PASSWORD_LENGTH } from './constants';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ehr-login-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, RouterLink],
})
export class FormComponent {
  readonly isLoading = input(false);
  readonly formSubmit = output<LoginFormData>();

  readonly model = signal({ email: '', password: '' });
  readonly showPassword = signal(false);

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

  togglePasswordVisibility(): void {
    this.showPassword.update((v) => !v);
  }

  onSubmit(event: SubmitEvent): void {
    event.preventDefault();

    if (this.submitDisabled()) return;

    this.formSubmit.emit(this.model());
  }
}
