---
title: forbidden
description: API Reference for the forbidden function.
version: experimental
related:
  links:
    - app/api-reference/file-conventions/forbidden
---

The `forbidden` function throws an error that renders a Next.js 403 error page. It's useful for handling authorization errors in your application. You can customize the UI using the [`forbidden.js` file](/docs/app/api-reference/file-conventions/forbidden).

To start using `forbidden`, enable the experimental [`authInterrupts`](/docs/app/api-reference/config/next-config-js/authInterrupts) configuration option in your `next.config.js` file:

```ts filename="next.config.ts" switcher

const nextConfig: NextConfig = ,
}

```

```js filename="next.config.js" switcher
module.exports = ,
}
```

`forbidden` can be invoked in [Server Components](/docs/app/getting-started/server-and-client-components), [Server Actions](/docs/app/getting-started/updating-data), and [Route Handlers](/docs/app/api-reference/file-conventions/route).

```tsx filename="app/auth/page.tsx" switcher

  const session = await verifySession()

  // Check if the user has the 'admin' role
  if (session.role !== 'admin')

  // Render the admin page for authorized users
  return <></>
}
```

```jsx filename="app/auth/page.js" switcher

  const session = await verifySession()

  // Check if the user has the 'admin' role
  if (session.role !== 'admin')

  // Render the admin page for authorized users
  return <></>
}
```

## Good to know

- The `forbidden` function cannot be called in the [root layout](/docs/app/api-reference/file-conventions/layout#root-layout).

## Examples

### Role-based route protection

You can use `forbidden` to restrict access to certain routes based on user roles. This ensures that users who are authenticated but lack the required permissions cannot access the route.

```tsx filename="app/admin/page.tsx" switcher

  const session = await verifySession()

  // Check if the user has the 'admin' role
  if (session.role !== 'admin')

  // Render the admin page for authorized users
  return (
    <main>
      <h1>Admin Dashboard</h1>
      <p>Welcome, !</p>
    </main>
  )
}
```

```jsx filename="app/admin/page.js" switcher

  const session = await verifySession()

  // Check if the user has the 'admin' role
  if (session.role !== 'admin')

  // Render the admin page for authorized users
  return (
    <main>
      <h1>Admin Dashboard</h1>
      <p>Welcome, !</p>
    </main>
  )
}
```

### Mutations with Server Actions

When implementing mutations in Server Actions, you can use `forbidden` to only allow users with a specific role to update sensitive data.

```ts filename="app/actions/update-role.ts" switcher
'use server'

  const session = await verifySession()

  // Ensure only admins can update roles
  if (session.role !== 'admin')

  // Perform the role update for authorized users
  // ...
}
```

```js filename="app/actions/update-role.js" switcher
'use server'

  const session = await verifySession()

  // Ensure only admins can update roles
  if (session.role !== 'admin')

  // Perform the role update for authorized users
  // ...
}
```

## Version History

| Version   | Changes                 |
| --------- | ----------------------- |
| `v15.1.0` | `forbidden` introduced. |
