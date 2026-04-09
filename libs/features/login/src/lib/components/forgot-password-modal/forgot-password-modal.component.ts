import {
  ChangeDetectionStrategy,
  Component,
  output,
  viewChild,
} from '@angular/core';
import { ModalComponent } from '@ehr/ui';

@Component({
  selector: 'ehr-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrl: './forgot-password-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ModalComponent],
})
export class ForgotPasswordModalComponent {
  private readonly modalRef = viewChild.required(ModalComponent);

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
