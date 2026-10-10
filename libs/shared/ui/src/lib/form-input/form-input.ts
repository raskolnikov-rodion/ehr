import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { Field, FormField } from '@angular/forms/signals';
import { FormInputType } from './models';

@Component({
  selector: 'ehr-form-input',
  templateUrl: './form-input.html',
  styleUrl: './form-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField],
  host: { class: 'form-input' },
})
export class FormInput {
  readonly id = input.required<string>();
  readonly label = input.required<string>();
  readonly type = input<FormInputType>('text');
  readonly field = input.required<Field<string>>();
  readonly autocomplete = input<string>('off');
  readonly placeholder = input<string>('');
  readonly testId = input<string>('');

  readonly showPassword = signal(false);

  readonly errorId = computed(() => `${this.id()}-error`);
  readonly hasToggle = computed(() => this.type() === 'password');
  readonly inputType = computed(() =>
    this.type() === 'password' && this.showPassword() ? 'text' : this.type(),
  );
  readonly fieldState = computed(() => this.field()());
  readonly isInvalid = computed(
    () => this.fieldState().touched() && this.fieldState().invalid(),
  );

  readonly toggleIconCssClass = computed(() =>
    this.showPassword()
      ? 'form-input__icon-eye-closed'
      : 'form-input__icon-eye',
  );

  togglePassword(): void {
    this.showPassword.update((v) => !v);
  }
}
