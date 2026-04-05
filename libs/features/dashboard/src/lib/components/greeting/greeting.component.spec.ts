import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe } from 'vitest-axe';

import { GreetingComponent } from './greeting.component';

describe('GreetingComponent', () => {
  let fixture: ComponentFixture<GreetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreetingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GreetingComponent);
    fixture.componentRef.setInput('name', 'Dr. Smith');
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the name', async () => {
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('Dr. Smith');
  });

  it('should display "Good morning" before noon', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-04-05T09:00:00'));

    fixture = TestBed.createComponent(GreetingComponent);
    fixture.componentRef.setInput('name', 'Dr. Smith');
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Good morning');
  });

  it('should display "Good afternoon" between noon and 18:00', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-04-05T14:00:00'));

    fixture = TestBed.createComponent(GreetingComponent);
    fixture.componentRef.setInput('name', 'Dr. Smith');
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Good afternoon');
  });

  it('should display "Good evening" from 18:00 onwards', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-04-05T20:00:00'));

    fixture = TestBed.createComponent(GreetingComponent);
    fixture.componentRef.setInput('name', 'Dr. Smith');
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Good evening');
  });

  it("should display today's date", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-04-05T10:00:00'));

    fixture = TestBed.createComponent(GreetingComponent);
    fixture.componentRef.setInput('name', 'Dr. Smith');
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Sunday, 5 April 2026');
  });

  it('should have no accessibility violations', async () => {
    await fixture.whenStable();
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });
});
