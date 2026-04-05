# @ehr/layout

Shared layout library. Provides the application shell and its structural components. Import alias: `@ehr/layout`.

`ShellLayoutComponent` is used as a layout route wrapper in the router config — it renders the header and footer around a `<router-outlet>`, so all authenticated pages share a consistent shell without each page needing to declare it.

## Components

| Component              | Selector           | Description                                                                                                    |
| ---------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------- |
| `ShellLayoutComponent` | `ehr-shell-layout` | Top-level route wrapper: renders `HeaderComponent`, `<router-outlet>`, and `FooterComponent`                   |
| `HeaderComponent`      | `ehr-header`       | App bar with home link, `LogoutButtonComponent` from `@ehr/core`, and `ThemeToggleComponent` from `@ehr/theme` |
| `FooterComponent`      | `ehr-footer`       | Bottom bar with site-wide navigation links                                                                     |

## Usage

```typescript
import { ShellLayoutComponent } from '@ehr/layout';

// In your route config:
{
  path: '',
  component: ShellLayoutComponent,
  children: [
    { path: 'dashboard', canActivate: [authGuard], loadComponent: () => ... },
  ],
}
```

## Running unit tests

```bash
npx nx test layout
```
