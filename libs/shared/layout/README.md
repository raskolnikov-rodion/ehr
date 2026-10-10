# @ehr/layout

Shared layout library. Provides the application shell and its structural components. Import alias: `@ehr/layout`.

`ShellLayout` is used as a layout route wrapper in the router config — it renders the header and footer around a `<router-outlet>`, so all authenticated pages share a consistent shell without each page needing to declare it.

## Components

| Component     | Selector           | Description                                                                                                          |
| ------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `ShellLayout` | `ehr-shell-layout` | Top-level route wrapper: renders `Header`, `<router-outlet>`, and `Footer`; projects `[headerActions]` into `Header` |
| `Header`      | `ehr-header`       | App bar with home link, `ThemeToggle` from `@ehr/theme`, and a `[headerActions]` slot                                |
| `Footer`      | `ehr-footer`       | Bottom bar with site-wide navigation links                                                                           |

## Usage

```typescript
import { ShellLayout } from '@ehr/layout';

// In your route config:
{
  path: '',
  component: ShellLayout,
  children: [
    { path: 'dashboard', canActivate: [authGuard], loadComponent: () => ... },
  ],
}
```

## Running unit tests

```bash
npx nx test layout
```
