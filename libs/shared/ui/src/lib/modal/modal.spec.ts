import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe } from 'vitest-axe';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';

import { Modal } from './modal';

describe('Modal', () => {
  let component: Modal;
  let fixture: ComponentFixture<Modal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modal],
    }).compileComponents();

    fixture = TestBed.createComponent(Modal);
    component = fixture.componentInstance;
    await fixture.whenStable();

    const dialog = getDialog();
    dialog.showModal = vi.fn(() => {
      dialog.open = true;
    });
    dialog.close = vi.fn(() => {
      dialog.open = false;
    });
  });

  it('should render the dialog', () => {
    expect(getDialog()).toBeTruthy();
  });

  it('should open the dialog when open() is called', () => {
    component.open();
    expect(getDialog().open).toBe(true);
  });

  it('should close the dialog and emit closed when close() is called', async () => {
    component.open();
    let emitted = false;
    component.closed.subscribe(() => (emitted = true));

    component.close();
    await fixture.whenStable();

    expect(emitted).toBe(true);
    expect(getDialog().open).toBe(false);
  });

  it('should emit closed and close when clicking the backdrop', async () => {
    component.open();
    let emitted = false;
    component.closed.subscribe(() => (emitted = true));

    const dialog = getDialog();
    dialog.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await fixture.whenStable();

    expect(emitted).toBe(true);
    expect(dialog.open).toBe(false);
  });

  it('should not emit closed when click target is not the dialog', async () => {
    component.open();
    let emitted = false;
    component.closed.subscribe(() => (emitted = true));

    component.onBackdropClick(new MouseEvent('click'));
    await fixture.whenStable();

    expect(emitted).toBe(false);
    expect(getDialog().open).toBe(true);
  });

  it('should emit closed and close when pressing Escape', async () => {
    component.open();
    let emitted = false;
    component.closed.subscribe(() => (emitted = true));

    const dialog = getDialog();
    dialog.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
    );
    await fixture.whenStable();

    expect(emitted).toBe(true);
    expect(dialog.open).toBe(false);
  });

  it('should have no accessibility violations', async () => {
    await fixture.whenStable();
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });

  function getDialog(): HTMLDialogElement {
    return fixture.debugElement.query(By.css('dialog'))
      .nativeElement as HTMLDialogElement;
  }
});
