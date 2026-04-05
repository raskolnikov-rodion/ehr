import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { axe } from 'vitest-axe';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title in the heading', async () => {
    const mockTitle = 'Patient Summary';
    fixture.componentRef.setInput('title', mockTitle);

    await fixture.whenStable();

    const heading = fixture.debugElement.query(
      By.css("[test-id='card-heading']"),
    ).nativeElement as HTMLElement;
    expect(heading.textContent).toContain(mockTitle);
  });

  it('should not render heading when no title is provided', async () => {
    await fixture.whenStable();

    const heading = fixture.debugElement.query(
      By.css("[test-id='card-heading']"),
    );
    expect(heading).toBe(null);
  });

  describe('Action', () => {
    it('should render the action', async () => {
      const mockAction = 'Review';
      fixture.componentRef.setInput('action', mockAction);

      await fixture.whenStable();

      const action = getActionElement();
      expect(action.textContent).toContain(mockAction);
    });

    it('should emit card id when action is clicked', async () => {
      let emitted = null;

      component.actionClick.subscribe((value) => (emitted = value));

      fixture.componentRef.setInput('action', 'Review');
      await fixture.whenStable();
      const action = getActionElement();
      action.click();

      expect(emitted).toContain(`card-${component.id()}`);
    });

    function getActionElement() {
      return fixture.debugElement.query(By.css("[test-id='card-action']"))
        .nativeElement as HTMLElement;
    }
  });

  it('should project card-content', async () => {
    const mockContent = 'Patient details';

    @Component({
      template: `
        <ehr-card>
          <card-content>{{ content }}</card-content>
        </ehr-card>
      `,
      imports: [CardComponent],
      changeDetection: ChangeDetectionStrategy.OnPush,
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    class HostComponent {
      readonly content = mockContent;
    }

    const hostFixture = TestBed.createComponent(HostComponent);
    await hostFixture.whenStable();

    const content = hostFixture.nativeElement as HTMLElement;
    expect(content.textContent).toContain(mockContent);
  });

  it('should have no accessibility violations', async () => {
    fixture.componentRef.setInput('title', 'Accessible Card');
    await fixture.whenStable();

    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });
});
