import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Core } from './core';
import { axe } from 'vitest-axe';

describe('Core', () => {
  let component: Core;
  let fixture: ComponentFixture<Core>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Core],
    }).compileComponents();

    fixture = TestBed.createComponent(Core);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have no accessibility violations', async () => {
    await fixture.whenStable();
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });
});
