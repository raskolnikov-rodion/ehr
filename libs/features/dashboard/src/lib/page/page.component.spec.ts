import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe } from 'vitest-axe';

import { PageComponent } from './page.component';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have no accessibility violations', async () => {
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });

  it('should render the alert initially', () => {
    expect(fixture.nativeElement.querySelector('ehr-alert')).toBeTruthy();
  });

  it('should hide the alert when dismissed', () => {
    component.alertDismissed.set(true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('ehr-alert')).toBeNull();
  });

  it('should render 4 stat cards', () => {
    expect(
      fixture.nativeElement.querySelectorAll('ehr-stat-card'),
    ).toHaveLength(4);
  });

  it('should render all 9 appointments', () => {
    expect(
      fixture.nativeElement.querySelectorAll('ehr-appointment-item'),
    ).toHaveLength(9);
  });

  it('should render all 5 pending actions', () => {
    expect(
      fixture.nativeElement.querySelectorAll('ehr-action-item'),
    ).toHaveLength(5);
  });

  it('should render all 5 recent patients', () => {
    expect(
      fixture.nativeElement.querySelectorAll('ehr-patient-item'),
    ).toHaveLength(5);
  });
});
