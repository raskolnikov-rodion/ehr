import {
  ChangeDetectionStrategy,
  Component,
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

@Component({
  selector: 'ehr-login-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  imports: [FormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
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

  onSubmit(event: SubmitEvent): void {
    event.preventDefault();

    if (this.form().invalid()) return;

    this.formSubmit.emit(this.model());
  }
}
