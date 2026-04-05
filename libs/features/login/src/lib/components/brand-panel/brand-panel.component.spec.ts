import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe } from 'vitest-axe';

import { BrandPanelComponent } from './brand-panel.component';

describe('BrandPanelComponent', () => {
  let fixture: ComponentFixture<BrandPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandPanelComponent);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have no accessibility violations', async () => {
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });
});
