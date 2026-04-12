import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe } from 'vitest-axe';

import { SkeletonComponent } from './skeleton.component';

describe('SkeletonComponent', () => {
  let component: SkeletonComponent;
  let fixture: ComponentFixture<SkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkeletonComponent);
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
