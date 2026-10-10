import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { axe } from 'vitest-axe';

import { PatientProfile } from './patient-profile';

describe('PatientProfile', () => {
  let fixture: ComponentFixture<PatientProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientProfile],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientProfile);
    await fixture.whenStable();
  });

  it('renders the page heading', () => {
    const heading = fixture.debugElement.query(
      By.css("[test-id='patient-profile-heading']"),
    );
    expect(heading.nativeElement.textContent.trim()).toBe('Patient profile');
  });

  it('should have no accessibility violations', async () => {
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });
});
