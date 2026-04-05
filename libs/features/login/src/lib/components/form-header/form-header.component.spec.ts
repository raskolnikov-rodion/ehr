import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe } from 'vitest-axe';

import { FormHeaderComponent } from './form-header.component';

describe('FormHeaderComponent', () => {
  let fixture: ComponentFixture<FormHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormHeaderComponent);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have no accessibility violations', async () => {
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });
});
