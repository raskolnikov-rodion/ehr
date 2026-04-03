# Color Palette

The EHR app uses a CSS custom-property-based color system defined in
`apps/EHR/src/styles/_colors.scss`. All variables are set on `:root`
(light mode) and overridden inside `[data-theme="dark"]` (dark mode).

---

## Variable Reference

### Primary (Blue)

| Variable              | Light     | Dark      | Purpose                     |
| --------------------- | --------- | --------- | --------------------------- |
| `--color-primary-100` | `#dbeafe` | `#1e3a5f` | Tinted backgrounds, badges  |
| `--color-primary-300` | `#93bbfd` | `#2b5ea7` | Hover states, progress bars |
| `--color-primary-500` | `#2563eb` | `#2563eb` | **Main** buttons, links     |
| `--color-primary-700` | `#1d4ed8` | `#93bbfd` | Active / pressed states     |
| `--color-primary-900` | `#1e3a8a` | `#dbeafe` | Headings, high-emphasis     |

### Secondary (Teal)

| Variable                | Light     | Dark      | Purpose                  |
| ----------------------- | --------- | --------- | ------------------------ |
| `--color-secondary-100` | `#ccfbf1` | `#134e4a` | Tinted backgrounds, tags |
| `--color-secondary-300` | `#5eead4` | `#0f766e` | Decorative accents       |
| `--color-secondary-500` | `#14b8a6` | `#2dd4bf` | **Main** accent buttons  |
| `--color-secondary-700` | `#0f766e` | `#5eead4` | Active / pressed states  |
| `--color-secondary-900` | `#134e4a` | `#ccfbf1` | High-emphasis accents    |

### Neutrals (Gray)

| Variable              | Light     | Dark      | Purpose                        |
| --------------------- | --------- | --------- | ------------------------------ |
| `--color-neutral-50`  | `#f9fafb` | `#111827` | Page canvas / lightest surface |
| `--color-neutral-100` | `#f3f4f6` | `#1f2937` | Subtle section fill            |
| `--color-neutral-200` | `#e5e7eb` | `#374151` | Dividers, borders              |
| `--color-neutral-300` | `#d1d5db` | `#4b5563` | Muted borders, input strokes   |
| `--color-neutral-400` | `#9ca3af` | `#6b7280` | Placeholder / disabled text    |
| `--color-neutral-500` | `#6b7280` | `#9ca3af` | Secondary icons / captions     |
| `--color-neutral-600` | `#4b5563` | `#d1d5db` | Supporting text                |
| `--color-neutral-700` | `#374151` | `#e5e7eb` | Primary supporting text        |
| `--color-neutral-800` | `#1f2937` | `#f3f4f6` | Body text                      |
| `--color-neutral-900` | `#111827` | `#f9fafb` | Headings / high-emphasis       |

> **Note:** The neutral scale inverts in dark mode — `--color-neutral-50` is the darkest and `--color-neutral-900` is the lightest.

### Semantic States

| Variable             | Light     | Dark      | Usage                      |
| -------------------- | --------- | --------- | -------------------------- |
| `--color-success`    | `#15803d` | `#4ade80` | Success text / icons       |
| `--color-success-bg` | `#dcfce7` | `#14532d` | Success banner backgrounds |
| `--color-error`      | `#b91c1c` | `#f87171` | Error text / icons         |
| `--color-error-bg`   | `#fee2e2` | `#4a0e0e` | Error banner backgrounds   |
| `--color-warning`    | `#b45309` | `#fbbf24` | Warning text / icons       |
| `--color-warning-bg` | `#fef3c7` | `#78350f` | Warning banner backgrounds |
| `--color-info`       | `#2563eb` | `#60a5fa` | Info text / icons          |
| `--color-info-bg`    | `#dbeafe` | `#1e3a5f` | Info banner backgrounds    |

### Backgrounds

| Variable             | Light     | Dark      | Usage                        |
| -------------------- | --------- | --------- | ---------------------------- |
| `--color-bg-app`     | `#f9fafb` | `#0f172a` | Page / app canvas            |
| `--color-bg-surface` | `#fff`    | `#1e293b` | Cards, dialogs, panels       |
| `--color-bg-muted`   | `#f3f4f6` | `#334155` | Disabled areas, empty states |

### Text

| Variable                  | Light     | Dark      | Usage                      |
| ------------------------- | --------- | --------- | -------------------------- |
| `--color-text-primary`    | `#111827` | `#f1f5f9` | Body text, headings        |
| `--color-text-secondary`  | `#4b5563` | `#cbd5e1` | Supporting / label text    |
| `--color-text-muted`      | `#6b7280` | `#94a3b8` | Placeholders, captions     |
| `--color-text-on-primary` | `#fff`    | `#fff`    | Text on primary-colored bg |

### Borders

| Variable                 | Light     | Dark      | Usage                        |
| ------------------------ | --------- | --------- | ---------------------------- |
| `--color-border-light`   | `#e5e7eb` | `#334155` | Subtle dividers              |
| `--color-border-default` | `#d1d5db` | `#475569` | Input borders, card outlines |
| `--color-border-strong`  | `#9ca3af` | `#64748b` | Emphasized / active borders  |

### Focus & Interaction

| Variable                 | Light             | Dark                     | Usage                  |
| ------------------------ | ----------------- | ------------------------ | ---------------------- |
| `--color-focus-ring`     | `#2563eb`         | `#3b82f6`                | Keyboard focus outline |
| `--color-hover-overlay`  | `rgb(0 0 0 / 4%)` | `rgb(255 255 255 / 6%)`  | Hover state overlay    |
| `--color-active-overlay` | `rgb(0 0 0 / 8%)` | `rgb(255 255 255 / 12%)` | Press / active overlay |

### Shadows / Elevation

| Variable      | Usage                             |
| ------------- | --------------------------------- |
| `--shadow-sm` | Subtle lift — tooltips, dropdowns |
| `--shadow-md` | Cards, popovers                   |
| `--shadow-lg` | Modals, dialogs                   |

Shadow opacity is raised in dark mode to compensate for the darker surface colors (e.g. `--shadow-sm` uses `rgb(0 0 0 / 5%)` in light and `rgb(0 0 0 / 30%)` in dark).

---

### Dark mode

Toggle dark mode by setting `data-theme="dark"` on the `<html>` element.
All variables resolve automatically — no extra class names needed.

```ts
document.documentElement.setAttribute('data-theme', 'dark');
```

---

## WCAG Accessibility Notes

### Light mode

| Foreground                           | Background                        | Contrast | Rating |
| ------------------------------------ | --------------------------------- | -------- | ------ |
| `--color-text-primary` (`#111827`)   | `--color-bg-surface` (`#fff`)     | 17.74:1  | AAA    |
| `--color-text-secondary` (`#4b5563`) | `--color-bg-surface` (`#fff`)     | 7.56:1   | AAA    |
| `--color-text-muted` (`#6b7280`)     | `--color-bg-surface` (`#fff`)     | 4.83:1   | AA     |
| `--color-text-on-primary` (`#fff`)   | `--color-primary-500` (`#2563eb`) | 5.17:1   | AA     |
| `--color-error` (`#b91c1c`)          | `--color-error-bg` (`#fee2e2`)    | 5.30:1   | AA     |
| `--color-success` (`#15803d`)        | `--color-success-bg` (`#dcfce7`)  | 4.57:1   | AA     |
| `--color-warning` (`#b45309`)        | `--color-warning-bg` (`#fef3c7`)  | 4.51:1   | AA     |

### Dark mode

| Foreground                           | Background                        | Contrast | Rating |
| ------------------------------------ | --------------------------------- | -------- | ------ |
| `--color-text-primary` (`#f1f5f9`)   | `--color-bg-surface` (`#1e293b`)  | 13.35:1  | AAA    |
| `--color-text-secondary` (`#cbd5e1`) | `--color-bg-surface` (`#1e293b`)  | 9.85:1   | AAA    |
| `--color-text-muted` (`#94a3b8`)     | `--color-bg-surface` (`#1e293b`)  | 5.71:1   | AA     |
| `--color-text-on-primary` (`#fff`)   | `--color-primary-500` (`#2563eb`) | 5.17:1   | AA     |
| `--color-error` (`#f87171`)          | `--color-error-bg` (`#4a0e0e`)    | 5.58:1   | AA     |
| `--color-success` (`#4ade80`)        | `--color-success-bg` (`#14532d`)  | 5.23:1   | AA     |
