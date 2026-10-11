import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe } from 'vitest-axe';

import { DashboardSkeleton } from './skeleton';

describe('DashboardSkeleton', () => {
  let fixture: ComponentFixture<DashboardSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardSkeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardSkeleton);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render all skeleton placeholders', () => {
    const placeholders = fixture.nativeElement.querySelectorAll('ehr-skeleton');
    expect(placeholders.length).toBe(1 + 4 + 9 + 5 + 5);
  });

  it('should have no accessibility violations', async () => {
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });
});
