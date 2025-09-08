---
title: unauthorized
description: API Reference for the unauthorized function.
version: experimental
related:
  links:
    - app/api-reference/file-conventions/unauthorized
---

The `unauthorized` function throws an error that renders a Next.js 401 error page. It's useful for handling authorization errors in your application. You can customize the UI using the [`unauthorized.js` file](/docs/app/api-reference/file-conventions/unauthorized).

To start using `unauthorized`, enable the experimental [`authInterrupts`](/docs/app/api-reference/config/next-config-js/authInterrupts) configuration option in your `next.config.js` file:

```ts filename="next.config.ts" switcher

const nextConfig: NextConfig = ,
}

```

```js filename="next.config.js" switcher
module.exports = ,
}
```

`unauthorized` can be invoked in [Server Components](/docs/app/getting-started/server-and-client-components), [Server Actions](/docs/app/getting-started/updating-data), and [Route Handlers](/docs/app/api-reference/file-conventions/route).

```tsx filename="app/dashboard/page.tsx" switcher

  const session = await verifySession()

  if (!session) 

  // Render the dashboard for authenticated users
  return (
    <main>
      <h1>Welcome to the Dashboard</h1>
      <p>Hi, .</p>
    </main>
  )
}
```

```jsx filename="app/dashboard/page.js" switcher

  const session = await verifySession()

  if (!session) 

  // Render the dashboard for authenticated users
  return (
    <main>
      <h1>Welcome to the Dashboard</h1>
      <p>Hi, .</p>
    </main>
  )
}
```

## Good to know

- The `unauthorized` function cannot be called in the [root layout](/docs/app/api-reference/file-conventions/layout#root-layout).

## Examples

### Displaying login UI to unauthenticated users

You can use `unauthorized` function to display the `unauthorized.js` file with a login UI.

```tsx filename="app/dashboard/page.tsx" switcher

  const session = await verifySession()

  if (!session) 

  return <div>Dashboard</div>
}
```

```jsx filename="app/dashboard/page.js" switcher

  const session = await verifySession()

  if (!session) 

  return <div>Dashboard</div>
}
```

```tsx filename="app/unauthorized.tsx" switcher

  return (
    <main>
      <h1>401 - Unauthorized</h1>
      <p>Please log in to access this page.</p>
      
    </main>
  )
}
```

```jsx filename="app/unauthorized.js" switcher

  return (
    <main>
      <h1>401 - Unauthorized</h1>
      <p>Please log in to access this page.</p>
      
    </main>
  )
}
```

### Mutations with Server Actions

You can invoke `unauthorized` in Server Actions to ensure only authenticated users can perform specific mutations.

```ts filename="app/actions/update-profile.ts" switcher
'use server'

  const session = await verifySession()

  // If the user is not authenticated, return a 401
  if (!session) 

  // Proceed with mutation
  // ...
}
```

```js filename="app/actions/update-profile.js" switcher
'use server'

  const session = await verifySession()

  // If the user is not authenticated, return a 401
  if (!session) 

  // Proceed with mutation
  // ...
}
```

### Fetching data with Route Handlers

You can use `unauthorized` in Route Handlers to ensure only authenticated users can access the endpoint.

```tsx filename="app/api/profile/route.ts" switcher

  // Verify the user's session
  const session = await verifySession()

  // If no session exists, return a 401 and render unauthorized.tsx
  if (!session) 

  // Fetch data
  // ...
}
```

```jsx filename="app/api/profile/route.js" switcher

  const session = await verifySession()

  // If the user is not authenticated, return a 401 and render unauthorized.tsx
  if (!session) 

  // Fetch data
  // ...
}
```

## Version History

| Version   | Changes                    |
| --------- | -------------------------- |
| `v15.1.0` | `unauthorized` introduced. |