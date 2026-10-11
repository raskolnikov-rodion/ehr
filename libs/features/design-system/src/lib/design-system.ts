import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Theme } from '@ehr/theme';
import { ColorGroup, GroupItem, TypeSample } from './models';

@Component({
  selector: 'ehr-design-system',
  templateUrl: './design-system.html',
  styleUrl: './design-system.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.dark]': 'themeService.darkTheme()' },
})
export class DesignSystem {
  protected readonly themeService = inject(Theme);
  readonly groups: ColorGroup[] = [
    {
      title: 'Primary Colors',
      swatches: [
        { label: '100', var: '--color-primary-100' },
        { label: '300', var: '--color-primary-300' },
        { label: '500', var: '--color-primary-500' },
        { label: '700', var: '--color-primary-700' },
        { label: '900', var: '--color-primary-900' },
      ],
    },
    {
      title: 'Secondary Colors',
      swatches: [
        { label: '100', var: '--color-secondary-100' },
        { label: '300', var: '--color-secondary-300' },
        { label: '500', var: '--color-secondary-500' },
        { label: '700', var: '--color-secondary-700' },
        { label: '900', var: '--color-secondary-900' },
      ],
    },
    {
      title: 'Neutral Colors',
      swatches: [
        { label: '50', var: '--color-neutral-50' },
        { label: '100', var: '--color-neutral-100' },
        { label: '200', var: '--color-neutral-200' },
        { label: '300', var: '--color-neutral-300' },
        { label: '400', var: '--color-neutral-400' },
        { label: '500', var: '--color-neutral-500' },
        { label: '600', var: '--color-neutral-600' },
        { label: '700', var: '--color-neutral-700' },
        { label: '800', var: '--color-neutral-800' },
        { label: '900', var: '--color-neutral-900' },
      ],
    },
    {
      title: 'Semantic Colors',
      swatches: [
        { label: 'Success', var: '--color-success' },
        { label: 'Success BG', var: '--color-success-bg' },
        { label: 'Error', var: '--color-error' },
        { label: 'Error BG', var: '--color-error-bg' },
        { label: 'Warning', var: '--color-warning' },
        { label: 'Warning BG', var: '--color-warning-bg' },
        { label: 'Info', var: '--color-info' },
        { label: 'Info BG', var: '--color-info-bg' },
      ],
    },
    {
      title: 'Background Colors',
      swatches: [
        { label: 'App', var: '--color-bg-app' },
        { label: 'Surface', var: '--color-bg-surface' },
        { label: 'Muted', var: '--color-bg-muted' },
      ],
    },
    {
      title: 'Text Colors',
      swatches: [
        { label: 'Primary', var: '--color-text-primary' },
        { label: 'Secondary', var: '--color-text-secondary' },
        { label: 'Muted', var: '--color-text-muted' },
        { label: 'On Primary', var: '--color-text-on-primary' },
      ],
    },
    {
      title: 'Borders',
      swatches: [
        { label: 'Light', var: '--color-border-light' },
        { label: 'Default', var: '--color-border-default' },
        { label: 'Strong', var: '--color-border-strong' },
      ],
    },
    {
      title: 'Focus & Interaction',
      swatches: [
        { label: 'Focus Ring', var: '--color-focus-ring' },
        { label: 'Hover Overlay', var: '--color-hover-overlay' },
        { label: 'Active Overlay', var: '--color-active-overlay' },
      ],
    },
  ];

  readonly buttonVariants = [
    { label: 'Primary', class: 'btn-primary' },
    { label: 'Secondary', class: 'btn-secondary' },
    { label: 'Tertiary', class: 'btn-tertiary' },
  ];

  readonly shadows: GroupItem[] = [
    { label: 'Small', var: '--shadow-sm' },
    { label: 'Medium', var: '--shadow-md' },
    { label: 'Large', var: '--shadow-lg' },
  ];

  readonly typography: TypeSample[] = [
    {
      label: 'Heading',
      var: '--font-size-600',
      family: 'var(--font-family-heading)',
      weight: 'var(--font-weight-semibold)',
      sample: 'Patient care updates',
    },
    {
      label: 'Body',
      var: '--font-size-400',
      family: 'var(--font-family-body)',
      weight: 'var(--font-weight-regular)',
      sample: 'Annual check-up · 30 min',
    },
    {
      label: 'Caption',
      var: '--font-size-300',
      family: 'var(--font-family-body)',
      weight: 'var(--font-weight-regular)',
      sample: 'Abnormal CBC · flagged 18h ago',
    },
    {
      label: 'Mono (times, values)',
      var: '--font-family-mono',
      family: 'var(--font-family-mono)',
      weight: 'var(--font-weight-medium)',
      sample: '08:30  MRN 004821',
    },
  ];

  readonly radii: GroupItem[] = [
    { label: 'Small', var: '--border-radius-sm' },
    { label: 'Medium', var: '--border-radius-md' },
    { label: 'Large', var: '--border-radius-lg' },
  ];
}
