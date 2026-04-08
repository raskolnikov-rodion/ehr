import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  signal,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { form, required } from '@angular/forms/signals';
import { axe } from 'vitest-axe';

import { FormInputComponent } from './form-input.component';
import { FormInputType } from './models';

@Component({
  template: `
    <ehr-form-input
      id="test-field"
      label="Test label"
      [type]="type()"
      [field]="testForm.value"
      autocomplete="email"
      placeholder="Test placeholder"
      testId="test-input"
    />
  `,
  imports: [FormInputComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  readonly type = signal<FormInputType>('text');
  readonly model = signal({ value: '' });
  readonly testForm = form(this.model, (config) => {
    required(config.value, { message: 'Field is required.' });
  });
}

describe('FormInputComponent', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    host = hostFixture.componentInstance;
    await hostFixture.whenStable();
  });

  it('should create', () => {
    expect(host).toBeTruthy();
  });

  it('should render the label', () => {
    const label = hostFixture.debugElement.query(By.css('label'))
      .nativeElement as HTMLElement;
    expect(label.textContent).toContain('Test label');
  });

  it('should link the label to the input via for/id', () => {
    const label = hostFixture.debugElement.query(By.css('label'))
      .nativeElement as HTMLLabelElement;
    expect(label.htmlFor).toBe(getInput().id);
  });

  it('should render the input with the provided autocomplete', () => {
    expect(getInput().autocomplete).toBe('email');
  });

  it('should render the input with the provided placeholder', () => {
    expect(getInput().placeholder).toBe('Test placeholder');
  });

  it('should default to type text', () => {
    expect(getInput().type).toBe('text');
  });

  it('should not show a toggle button for non-password types', () => {
    expect(getToggleButton()).toBeNull();
  });

  describe('Validation', () => {
    it('should not show an error initially', () => {
      expect(getError()).toBeNull();
    });

    it('should not set aria-invalid initially', () => {
      expect(getInput().getAttribute('aria-invalid')).toBeNull();
    });

    it('should show an error when the field is touched and invalid', async () => {
      getInput().dispatchEvent(new Event('blur'));
      await hostFixture.whenStable();

      expect(getError()).toBeTruthy();
      expect(getError()?.nativeElement.textContent).toContain(
        'Field is required.',
      );
    });

    it('should give the error role="alert"', async () => {
      getInput().dispatchEvent(new Event('blur'));
      await hostFixture.whenStable();

      expect(getError()?.nativeElement.getAttribute('role')).toBe('alert');
    });

    it('should set aria-invalid on the input when invalid', async () => {
      getInput().dispatchEvent(new Event('blur'));
      await hostFixture.whenStable();

      expect(getInput().getAttribute('aria-invalid')).toBe('true');
    });
  });

  describe('Password toggle', () => {
    beforeEach(async () => {
      host.type.set('password');
      await hostFixture.whenStable();
    });

    it('should show the toggle button', () => {
      expect(getToggleButton()).toBeTruthy();
    });

    it('should default to "Show password" aria-label', () => {
      expect(getToggleButton()?.nativeElement.getAttribute('aria-label')).toBe(
        'Show password',
      );
    });

    it('should toggle the input to type text when clicked', async () => {
      getToggleButton()?.nativeElement.click();
      await hostFixture.whenStable();

      expect(getInput().type).toBe('text');
    });

    it('should update aria-label to "Hide password" after toggling', async () => {
      getToggleButton()?.nativeElement.click();
      await hostFixture.whenStable();

      expect(getToggleButton()?.nativeElement.getAttribute('aria-label')).toBe(
        'Hide password',
      );
    });

    it('should toggle back to type password on second click', async () => {
      getToggleButton()?.nativeElement.click();
      await hostFixture.whenStable();
      getToggleButton()?.nativeElement.click();
      await hostFixture.whenStable();

      expect(getInput().type).toBe('password');
    });
  });

  it('should project label-sibling content', async () => {
    const mockContent = 'Forgot password?';

    @Component({
      template: `
        <ehr-form-input id="proj-field" label="Label" [field]="testForm.value">
          <label-sibling>{{ content }}</label-sibling>
        </ehr-form-input>
      `,
      imports: [FormInputComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      changeDetection: ChangeDetectionStrategy.OnPush,
    })
    class ProjectionHostComponent {
      readonly content = mockContent;
      readonly model = signal({ value: '' });
      readonly testForm = form(this.model, (config) => {
        required(config.value, { message: 'Field is required.' });
      });
    }

    const projFixture = TestBed.createComponent(ProjectionHostComponent);
    await projFixture.whenStable();

    expect(projFixture.nativeElement.textContent).toContain(mockContent);
  });

  it('should have no accessibility violations', async () => {
    expect(await axe(hostFixture.nativeElement)).toHaveNoViolations();
  });

  function getInput(): HTMLInputElement {
    return hostFixture.debugElement.query(By.css("[test-id='test-input']"))
      .nativeElement as HTMLInputElement;
  }

  function getError() {
    return hostFixture.debugElement.query(
      By.css("[test-id='test-field-error']"),
    );
  }

  function getToggleButton() {
    return hostFixture.debugElement.query(
      By.css("[test-id='form-input-toggle']"),
    );
  }
});
