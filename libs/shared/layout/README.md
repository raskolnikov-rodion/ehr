# @ehr/layout

Shared layout library for the EHR application. Provides the application shell and its structural components.

## Components

| Component              | Selector           | Description                                                |
| ---------------------- | ------------------ | ---------------------------------------------------------- |
| `ShellLayoutComponent` | `ehr-shell-layout` | Top-level route wrapper: header, `<router-outlet>`, footer |
| `HeaderComponent`      | `ehr-header`       | App bar with home link, sign-out button, and theme toggle  |
| `FooterComponent`      | `ehr-footer`       | Bottom bar with site-wide navigation links                 |

## Usage

Import from `@ehr/layout`:

```typescript
import { ShellLayoutComponent } from '@ehr/layout';
```

`ShellLayoutComponent` is typically used as a layout route wrapper in the router config:

```typescript
{
  path: '',
  component: ShellLayoutComponent,
  children: [...],
}
```

## Running unit tests

```bash
npx nx test layout
```
