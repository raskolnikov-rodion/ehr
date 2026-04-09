import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  output,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'ehr-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrl: './forgot-password-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordModalComponent {
  private readonly dialogRef =
    viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  readonly credentialsAccepted = output<void>();

  open(): void {
    this.dialogRef().nativeElement.showModal();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === this.dialogRef().nativeElement) {
      this.accept();
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.accept();
    }
  }

  accept(): void {
    this.credentialsAccepted.emit();
    this.dialogRef().nativeElement.close();
  }
}
