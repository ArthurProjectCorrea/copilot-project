---
title: unauthorized.js
description: API reference for the unauthorized.js special file.
related:
  links:
    - app/api-reference/functions/unauthorized
version: experimental
---

The **unauthorized** file is used to render UI when the [`unauthorized`](/docs/app/api-reference/functions/unauthorized) function is invoked during authentication. Along with allowing you to customize the UI, Next.js will return a `401` status code.

```tsx filename="app/unauthorized.tsx" switcher


export default function Unauthorized() {
  return (
    <!-- main -->
      <!-- h1 -->401 - Unauthorized
      <!-- p -->Please log in to access this page.
      <!-- Login -->

  )
}
```

```jsx filename="app/unauthorized.js" switcher


export default function Unauthorized() {
  return (
    <!-- main -->
      <!-- h1 -->401 - Unauthorized
      <!-- p -->Please log in to access this page.
      <!-- Login -->

  )
}
```

## Reference

### Props

`unauthorized.js` components do not accept any props.

## Examples

### Displaying login UI to unauthenticated users

You can use [`unauthorized`](/docs/app/api-reference/functions/unauthorized) function to render the `unauthorized.js` file with a login UI.

```tsx filename="app/dashboard/page.tsx" switcher



export default async function DashboardPage() {
  const session = await verifySession()

  if (!session) {
    unauthorized()
  }

  return <!-- div -->Dashboard
}
```

```jsx filename="app/dashboard/page.js" switcher



export default async function DashboardPage() {
  const session = await verifySession()

  if (!session) {
    unauthorized()
  }

  return <!-- div -->Dashboard
}
```

```tsx filename="app/unauthorized.tsx" switcher


export default function UnauthorizedPage() {
  return (
    <!-- main -->
      <!-- h1 -->401 - Unauthorized
      <!-- p -->Please log in to access this page.
      <!-- Login -->

  )
}
```

```jsx filename="app/unauthorized.js" switcher


export default function UnauthorizedPage() {
  return (
    <!-- main -->
      <!-- h1 -->401 - Unauthorized
      <!-- p -->Please log in to access this page.
      <!-- Login -->

  )
}
```

## Version History

| Version   | Changes                       |
| --------- | ----------------------------- |
| `v15.1.0` | `unauthorized.js` introduced. |
