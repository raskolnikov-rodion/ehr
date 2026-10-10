import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe } from 'vitest-axe';

import { BrandPanel } from './brand-panel';

describe('BrandPanel', () => {
  let fixture: ComponentFixture<BrandPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandPanel);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have no accessibility violations', async () => {
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });
});
