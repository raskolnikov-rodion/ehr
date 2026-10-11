import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { axe } from 'vitest-axe';
import { NavItem } from '../models';
import { SidebarNav } from './sidebar-nav';

const items: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', iconUrl: '/icons/a.svg' },
  { label: 'Patients', path: '/patients', iconUrl: '/icons/b.svg' },
];

describe('SidebarNav', () => {
  let fixture: ComponentFixture<SidebarNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarNav],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(SidebarNav);
    fixture.componentRef.setInput('items', items);
  });

  it('should render a link for each destination', async () => {
    await fixture.whenStable();
    const links = fixture.debugElement.queryAll(By.css("[test-id='nav-link']"));
    expect(
      links.map((l) => (l.nativeElement as HTMLElement).textContent?.trim()),
    ).toEqual(['Dashboard', 'Patients']);
  });

  it('should expose a labelled primary navigation landmark', async () => {
    await fixture.whenStable();
    const nav = fixture.debugElement.query(By.css('nav'))
      .nativeElement as HTMLElement;
    expect(nav.getAttribute('aria-label')).toBe('Primary');
  });

  it('should have no accessibility violations', async () => {
    await fixture.whenStable();
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });
});
