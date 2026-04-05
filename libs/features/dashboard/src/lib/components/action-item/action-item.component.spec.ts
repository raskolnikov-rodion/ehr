import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe } from 'vitest-axe';

import { ActionItemComponent } from './action-item.component';
import { ActionSeverity, Action } from './models';

const BASE: Action = {
  severity: ActionSeverity.INFO,
  title: 'Test action',
  meta: 'Some context',
  actionLabel: 'Review',
};

describe('ActionItemComponent', () => {
  let fixture: ComponentFixture<ActionItemComponent>;

  function createComponent(overrides: Partial<Action> = {}) {
    fixture = TestBed.createComponent(ActionItemComponent);
    fixture.componentRef.setInput('action', { ...BASE, ...overrides });
    return fixture;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionItemComponent],
    }).compileComponents();
  });

  it('should create', async () => {
    createComponent();
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the title', async () => {
    createComponent({ title: 'Lab results — Jane Doe' });
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain(
      'Lab results — Jane Doe',
    );
  });

  it('should render the meta', async () => {
    createComponent({ meta: 'Abnormal CBC · flagged 18h ago' });
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain(
      'Abnormal CBC · flagged 18h ago',
    );
  });

  it('should render the action label', async () => {
    createComponent({ actionLabel: 'Authorise' });
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('Authorise');
  });

  it('should apply urgent dot class for urgent severity', async () => {
    createComponent({ severity: ActionSeverity.URGENT });
    await fixture.whenStable();
    const dot = fixture.nativeElement.querySelector('.action-item__dot');
    expect(dot.classList).toContain('action-item__dot--urgent');
  });

  it('should apply warning dot class for warning severity', async () => {
    createComponent({ severity: ActionSeverity.WARNING });
    await fixture.whenStable();
    const dot = fixture.nativeElement.querySelector('.action-item__dot');
    expect(dot.classList).toContain('action-item__dot--warning');
  });

  it('should apply info dot class for info severity', async () => {
    createComponent({ severity: ActionSeverity.INFO });
    await fixture.whenStable();
    const dot = fixture.nativeElement.querySelector('.action-item__dot');
    expect(dot.classList).toContain('action-item__dot--info');
  });

  it('should have no accessibility violations', async () => {
    createComponent();
    await fixture.whenStable();
    // Parent-context rules disabled: component is always used inside a <ul> (role="list"),
    // verified in PageComponent's accessibility test.
    expect(
      await axe(fixture.nativeElement, {
        rules: {
          'aria-required-parent': { enabled: false },
        },
      }),
    ).toHaveNoViolations();
  });
});
