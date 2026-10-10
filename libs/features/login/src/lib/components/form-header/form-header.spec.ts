import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe } from 'vitest-axe';

import { FormHeader } from './form-header';

describe('FormHeader', () => {
  let fixture: ComponentFixture<FormHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(FormHeader);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have no accessibility violations', async () => {
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });
});
