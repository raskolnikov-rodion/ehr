import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe } from 'vitest-axe';

import { AlertComponent } from './alert.component';
import { AlertType } from './models';
import { By } from '@angular/platform-browser';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  const mockMessage = 'Something went wrong.';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('message', mockMessage);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the message', async () => {
    await fixture.whenStable();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.textContent).toContain(mockMessage);
  });

  it('should render title', async () => {
    const mockTitle = 'Alert!';
    fixture.componentRef.setInput('title', mockTitle);

    await fixture.whenStable();
    const host = fixture.nativeElement as HTMLElement;
    expect(host.textContent).toContain(mockTitle);
  });

  it('should expose the alert via test-id', async () => {
    await fixture.whenStable();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('test-id')).toContain('alert-');
  });

  it('should default to the error type', async () => {
    await fixture.whenStable();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.classList).toContain('alert--error');
  });

  it('should apply the correct class for each type', async () => {
    const host = fixture.nativeElement as HTMLElement;

    for (const type of [
      AlertType.ERROR,
      AlertType.WARNING,
      AlertType.SUCCESS,
      AlertType.INFO,
    ] as const) {
      fixture.componentRef.setInput('type', type);
      await fixture.whenStable();
      expect(host.classList).toContain(`alert--${type}`);
    }
  });

  it('should use role="alert" and aria-live="assertive" for error and warning', async () => {
    const host = fixture.nativeElement as HTMLElement;

    for (const type of [AlertType.ERROR, AlertType.WARNING] as const) {
      fixture.componentRef.setInput('type', type);
      await fixture.whenStable();
      expect(host.getAttribute('role')).toBe('alert');
      expect(host.getAttribute('aria-live')).toBe('assertive');
    }
  });

  it('should use role="status" and aria-live="polite" for success and information', async () => {
    const host = fixture.nativeElement as HTMLElement;

    for (const type of [AlertType.INFO, AlertType.SUCCESS] as const) {
      fixture.componentRef.setInput('type', type);
      await fixture.whenStable();
      expect(host.getAttribute('role')).toBe('status');
      expect(host.getAttribute('aria-live')).toBe('polite');
    }
  });

  describe('Dismiss button', () => {
    it('should display the dismiss button when alert is dismissable', async () => {
      fixture.componentRef.setInput('dismissible', true);
      await fixture.whenStable();
      const dismissButton = getDismissButton();
      expect(dismissButton).toBeTruthy();
    });

    it('should emit alert id when dismiss button is clicked', async () => {
      let emitted = null;

      component.dismissed.subscribe((value) => (emitted = value));

      fixture.componentRef.setInput('dismissible', true);
      await fixture.whenStable();
      const dismissButton = getDismissButton();
      dismissButton.click();

      expect(emitted).toContain(`alert-${component.id()}`);
    });

    function getDismissButton() {
      return fixture.debugElement.query(
        By.css("[test-id='alert-dismiss-button']"),
      ).nativeElement;
    }
  });

  it('should have no accessibility violations', async () => {
    await fixture.whenStable();

    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });
});
