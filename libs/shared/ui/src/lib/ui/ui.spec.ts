import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ui } from './ui';
import { axe } from 'vitest-axe';

describe('Ui', () => {
  let component: Ui;
  let fixture: ComponentFixture<Ui>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ui],
    }).compileComponents();

    fixture = TestBed.createComponent(Ui);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have no accessibility violations', async () => {
    const fixture = TestBed.createComponent(Ui);
    await fixture.whenStable();
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });
});
