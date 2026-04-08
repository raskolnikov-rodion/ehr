import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe } from 'vitest-axe';
import { By } from '@angular/platform-browser';

import { FormComponent } from './form.component';
import { LoginFormData } from './models';
import { DebugElement } from '@angular/core';
import { MIN_PASSWORD_LENGTH } from './constants';
import { provideRouter } from '@angular/router';

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
});
