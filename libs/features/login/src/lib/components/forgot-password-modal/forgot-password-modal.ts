import {
  ChangeDetectionStrategy,
  Component,
  output,
  viewChild,
} from '@angular/core';
import { Modal } from '@ehr/ui';

@Component({
  selector: 'ehr-forgot-password-modal',
  templateUrl: './forgot-password-modal.html',
  styleUrl: './forgot-password-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Modal],
})
export class ForgotPasswordModal {
  private readonly modalRef = viewChild.required(Modal);

  readonly credentialsAccepted = output<void>();

  open(): void {
    this.modalRef().open();
  }

  accept(): void {
    this.modalRef().close();
  }

  onModalClosed(): void {
    this.credentialsAccepted.emit();
  }
}
