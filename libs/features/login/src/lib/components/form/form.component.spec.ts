import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
import { axe } from 'vitest-axe';

import { DebugElement } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MIN_PASSWORD_LENGTH } from './constants';
import { FormComponent } from './form.component';
import { LoginFormData } from './models';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();

    // jsdom does not implement HTMLDialogElement methods
    const modal = getDemoModal();
    modal.showModal = vi.fn(() => {
      modal.open = true;
    });
    modal.close = vi.fn(() => {
      modal.open = false;
    });
  });

  it('should render the email and password inputs', () => {
    expect(getEmailInput()).toBeTruthy();
    expect(getPasswordInput()).toBeTruthy();
  });

  it('should render the submit button', () => {
    expect(getSubmitButton()).toBeTruthy();
  });

  describe('Validation', () => {
    it('should not show errors before submission', () => {
      expect(getEmailError()).toBeNull();
      expect(getPasswordError()).toBeNull();
    });

    it('should show required errors when submitting empty form', async () => {
      getEmailInput().dispatchEvent(new Event('blur'));
      getPasswordInput().dispatchEvent(new Event('blur'));
      await fixture.whenStable();

      expect(getEmailError().nativeElement.textContent).toContain(
        'Email is required.',
      );
      expect(getPasswordError().nativeElement.textContent).toContain(
        'Password is required.',
      );
    });

    it('should show invalid email error for malformed email', async () => {
      getEmailInput().value = 'not-an-email';
      getEmailInput().dispatchEvent(new Event('input'));
      getEmailInput().dispatchEvent(new Event('blur'));
      await fixture.whenStable();

      expect(getEmailError().nativeElement.textContent).toContain(
        'valid email',
      );
    });

    it('should show min-length error for short password', async () => {
      getPasswordInput().value = 'short';
      getPasswordInput().dispatchEvent(new Event('input'));
      getPasswordInput().dispatchEvent(new Event('blur'));
      await fixture.whenStable();

      expect(getPasswordError().nativeElement.textContent).toContain(
        `${MIN_PASSWORD_LENGTH} characters`,
      );
    });
  });

  describe('Submission', () => {
    it('should emit formSubmit with form data when form is valid', async () => {
      let emitted: LoginFormData | null = null;
      component.formSubmit.subscribe((data) => (emitted = data));

      const mockInputValue = {
        email: 'user@example.com',
        password: 'password123',
      };
      getEmailInput().value = mockInputValue.email;
      getEmailInput().dispatchEvent(new Event('input'));
      getPasswordInput().value = mockInputValue.password;
      getPasswordInput().dispatchEvent(new Event('input'));
      await fixture.whenStable();
      getSubmitButton().click();
      await fixture.whenStable();

      expect(emitted).toEqual(mockInputValue);
    });

    it('should not emit formSubmit when form is invalid', async () => {
      const emitted: LoginFormData[] = [];
      component.formSubmit.subscribe((data) => emitted.push(data));

      getSubmitButton().click();
      await fixture.whenStable();

      expect(emitted.length).toBe(0);
    });

    it('should not emit formSubmit when form submit is dispatched directly while disabled', async () => {
      const emitted: LoginFormData[] = [];
      component.formSubmit.subscribe((data) => emitted.push(data));

      const formEl = fixture.debugElement.query(By.css('form')).nativeElement;
      formEl.dispatchEvent(new SubmitEvent('submit'));
      await fixture.whenStable();

      expect(emitted.length).toBe(0);
    });
  });

  describe('Loading state', () => {
    it('should show the loading spinner when isLoading is true', async () => {
      fixture.componentRef.setInput('isLoading', true);
      await fixture.whenStable();

      expect(getLoadingSpinner()).toBeTruthy();
    });

    it('should hide the loading spinner when isLoading is false', async () => {
      fixture.componentRef.setInput('isLoading', false);
      await fixture.whenStable();

      expect(getLoadingSpinner()).toBeNull();
    });

    it('should disable the submit button when isLoading is true', async () => {
      fixture.componentRef.setInput('isLoading', true);
      await fixture.whenStable();

      expect(getSubmitButton().disabled).toBe(true);
    });
  });

  describe('Forgot password', () => {
    it('should open the modal when clicking forgot password button', async () => {
      getForgotPasswordButton().click();
      await fixture.whenStable();

      expect(getDemoModal().open).toBe(true);
    });

    it('should fill demo credentials and close modal when clicking modal button', async () => {
      getForgotPasswordButton().click();
      await fixture.whenStable();

      getDemoCredentialsButton().click();
      await fixture.whenStable();

      expect(getEmailInput().value).toBe('doctor@ehr.demo');
      expect(getPasswordInput().value).toBe('doctorPassword');
      expect(getDemoModal().open).toBe(false);
    });

    it('should fill demo credentials and close modal when clicking modal backdrop', async () => {
      getForgotPasswordButton().click();
      await fixture.whenStable();

      const modal = getDemoModal();
      modal.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await fixture.whenStable();

      expect(getEmailInput().value).toBe('doctor@ehr.demo');
      expect(getPasswordInput().value).toBe('doctorPassword');
      expect(modal.open).toBe(false);
    });

    it('should fill demo credentials and close modal when pressing Escape', async () => {
      getForgotPasswordButton().click();
      await fixture.whenStable();

      const modal = getDemoModal();
      modal.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
      );
      await fixture.whenStable();

      expect(getEmailInput().value).toBe('doctor@ehr.demo');
      expect(getPasswordInput().value).toBe('doctorPassword');
      expect(modal.open).toBe(false);
    });
  });

  it('should have no accessibility violations', async () => {
    await fixture.whenStable();
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });

  function getEmailInput(): HTMLInputElement {
    return fixture.debugElement.query(By.css("[test-id='email-input']"))
      .nativeElement as HTMLInputElement;
  }

  function getPasswordInput(): HTMLInputElement {
    return fixture.debugElement.query(By.css("[test-id='password-input']"))
      .nativeElement as HTMLInputElement;
  }

  function getSubmitButton(): HTMLButtonElement {
    return fixture.debugElement.query(By.css("[test-id='submit-button']"))
      .nativeElement as HTMLButtonElement;
  }

  function getEmailError(): DebugElement {
    return fixture.debugElement.query(By.css("[test-id='email-error']"));
  }

  function getPasswordError(): DebugElement {
    return fixture.debugElement.query(By.css("[test-id='password-error']"));
  }

  function getLoadingSpinner(): DebugElement {
    return fixture.debugElement.query(By.css("[test-id='login-loading']"));
  }

  function getForgotPasswordButton(): HTMLButtonElement {
    return fixture.debugElement.query(
      By.css("[test-id='forgot-password-button']"),
    ).nativeElement as HTMLButtonElement;
  }

  function getDemoModal(): HTMLDialogElement {
    return fixture.debugElement.query(By.css("[test-id='demo-modal']"))
      .nativeElement as HTMLDialogElement;
  }

  function getDemoCredentialsButton(): HTMLButtonElement {
    return fixture.debugElement.query(
      By.css("[test-id='demo-credentials-button']"),
    ).nativeElement as HTMLButtonElement;
  }
});
