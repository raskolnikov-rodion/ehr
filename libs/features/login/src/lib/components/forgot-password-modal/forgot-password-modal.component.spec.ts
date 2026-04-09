import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe } from 'vitest-axe';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';

import { ForgotPasswordModalComponent } from './forgot-password-modal.component';

describe('ForgotPasswordModalComponent', () => {
  let component: ForgotPasswordModalComponent;
  let fixture: ComponentFixture<ForgotPasswordModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPasswordModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();

    const modal = getDialog();
    modal.showModal = vi.fn(() => {
      modal.open = true;
    });
    modal.close = vi.fn(() => {
      modal.open = false;
    });
  });

  it('should render the dialog', () => {
    expect(getDialog()).toBeTruthy();
  });

  it('should open the dialog when open() is called', () => {
    component.open();
    expect(getDialog().open).toBe(true);
  });

  it('should emit credentialsAccepted and close when clicking modal button', async () => {
    component.open();
    let emitted = false;
    component.credentialsAccepted.subscribe(() => (emitted = true));

    getDemoCredentialsButton().click();
    await fixture.whenStable();

    expect(emitted).toBe(true);
    expect(getDialog().open).toBe(false);
  });

  it('should not emit credentialsAccepted when clicking inside modal content', async () => {
    component.open();
    let emitted = false;
    component.credentialsAccepted.subscribe(() => (emitted = true));

    const content = fixture.debugElement.query(
      By.css('.forgot-password-modal__content'),
    ).nativeElement;
    content.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await fixture.whenStable();

    expect(emitted).toBe(false);
    expect(getDialog().open).toBe(true);
  });

  it('should emit credentialsAccepted and close when clicking backdrop', async () => {
    component.open();
    let emitted = false;
    component.credentialsAccepted.subscribe(() => (emitted = true));

    const modal = getDialog();
    modal.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await fixture.whenStable();

    expect(emitted).toBe(true);
    expect(modal.open).toBe(false);
  });

  it('should emit credentialsAccepted and close when pressing Escape', async () => {
    component.open();
    let emitted = false;
    component.credentialsAccepted.subscribe(() => (emitted = true));

    const modal = getDialog();
    modal.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
    );
    await fixture.whenStable();

    expect(emitted).toBe(true);
    expect(modal.open).toBe(false);
  });

  it('should have no accessibility violations', async () => {
    await fixture.whenStable();
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });

  function getDialog(): HTMLDialogElement {
    return fixture.debugElement.query(By.css("[test-id='demo-modal']"))
      .nativeElement as HTMLDialogElement;
  }

  function getDemoCredentialsButton(): HTMLButtonElement {
    return fixture.debugElement.query(
      By.css("[test-id='demo-credentials-button']"),
    ).nativeElement as HTMLButtonElement;
  }
});
