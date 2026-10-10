import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { axe } from 'vitest-axe';

import { PatientList } from './patient-list';

describe('PatientList', () => {
  let fixture: ComponentFixture<PatientList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientList],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientList);
    await fixture.whenStable();
  });

  it('renders the page heading', () => {
    const heading = fixture.debugElement.query(
      By.css("[test-id='patient-list-heading']"),
    );
    expect(heading.nativeElement.textContent.trim()).toBe('Patient list');
  });

  it('should have no accessibility violations', async () => {
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });
});
