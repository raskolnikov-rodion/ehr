# @ehr/layout

Shared layout library. Provides the application shell and its structural components. Import alias: `@ehr/layout`.

`ShellLayout` is used as a layout route wrapper in the router config — it renders a top app bar, a left navigation rail, the `<router-outlet>` canvas and a slim footer (single column below 768px, with the nav as a horizontal strip), so all authenticated pages share a consistent shell without each page needing to declare it.

## Components

| Component     | Selector           | Description                                                                                                                                                                         |
| ------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ShellLayout` | `ehr-shell-layout` | Top-level route wrapper: renders `Header`, `SidebarNav`, `<router-outlet>`, and `Footer`; takes a required `navItems: NavItem[]` input and projects `[headerActions]` into `Header` |
| `Header`      | `ehr-header`       | Dark top app bar (`--color-chrome-*` tokens) with brand link, `ThemeToggle` from `@ehr/theme`, and a `[headerActions]` slot                                                         |
| `SidebarNav`  | `ehr-sidebar-nav`  | Primary navigation rail rendered from a required `items: NavItem[]` input (`{ label, path, iconUrl }`), with active-route highlighting and `aria-current="page"`                    |
| `Footer`      | `ehr-footer`       | Slim status bar with site-wide links                                                                                                                                                |

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
