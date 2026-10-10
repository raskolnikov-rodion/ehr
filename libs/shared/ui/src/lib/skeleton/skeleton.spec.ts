import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe } from 'vitest-axe';

import { Skeleton } from './skeleton';

describe('Skeleton', () => {
  let component: Skeleton;
  let fixture: ComponentFixture<Skeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Skeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(Skeleton);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply default width and height', async () => {
    await fixture.whenStable();

    const el = fixture.nativeElement.querySelector('.skeleton') as HTMLElement;
    expect(el.style.width).toBe('100%');
    expect(el.style.height).toBe('1rem');
  });

  it('should apply custom width', async () => {
    fixture.componentRef.setInput('width', '200px');
    await fixture.whenStable();

    const el = fixture.nativeElement.querySelector('.skeleton') as HTMLElement;
    expect(el.style.width).toBe('200px');
  });

  it('should apply custom height', async () => {
    fixture.componentRef.setInput('height', '2.5rem');
    await fixture.whenStable();

    const el = fixture.nativeElement.querySelector('.skeleton') as HTMLElement;
    expect(el.style.height).toBe('2.5rem');
  });

  it('should have no accessibility violations', async () => {
    await fixture.whenStable();

    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });
});
