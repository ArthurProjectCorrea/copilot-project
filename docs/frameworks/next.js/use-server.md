---
title: use server
description: Learn how to use the use server directive to execute code on the server.
---

The `use server` directive designates a function or file to be executed on the **server side**. It can be used at the top of a file to indicate that all functions in the file are server-side, or inline at the top of a function to mark the function as a [Server Function](https://19.react.dev/reference/rsc/server-functions). This is a React feature.

## Using `use server` at the top of a file

The following example shows a file with a `use server` directive at the top. All functions in the file are executed on the server.

```tsx filename="app/actions.ts" highlight= switcher
'use server'
import  from '@/lib/db' // Your database client

  const user = await db.user.create()
  return user
}
```

```jsx filename="app/actions.js" highlight= switcher
'use server'
import  from '@/lib/db' // Your database client

  const user = await db.user.create()
  return user
}
```

### Using Server Functions in a Client Component

To use Server Functions in Client Components you need to create your Server Functions in a dedicated file using the `use server` directive at the top of the file. These Server Functions can then be imported into Client and Server Components and executed.

Assuming you have a `fetchUsers` Server Function in `actions.ts`:

```tsx filename="app/actions.ts" highlight= switcher
'use server'
import  from '@/lib/db' // Your database client

  const users = await db.user.findMany()
  return users
}
```

```jsx filename="app/actions.js" highlight= switcher
'use server'
import  from '@/lib/db' // Your database client

  const users = await db.user.findMany()
  return users
}
```

Then you can import the `fetchUsers` Server Function into a Client Component and execute it on the client-side.

```tsx filename="app/components/my-button.tsx" highlight= switcher
'use client'

  return <button onClick=>Fetch Users</button>
}
```

```jsx filename="app/components/my-button.js" highlight= switcher
'use client'

  return <button onClick=>Fetch Users</button>
}
```

## Using `use server` inline

In the following example, `use server` is used inline at the top of a function to mark it as a [Server Function](https://19.react.dev/reference/rsc/server-functions):

```tsx filename="app/posts/[id]/page.tsx" switcher highlight=

  const post = await getPost(params.id)

  async function updatePost(formData: FormData) `)
  }

  return
}
```

```jsx filename="app/posts/[id]/page.js" switcher highlight=

  const post = await getPost(params.id)

  async function updatePost(formData) `)
  }

  return
}
```

## Security considerations

When using the `use server` directive, it's important to ensure that all server-side logic is secure and that sensitive data remains protected.

### Authentication and authorization

Always authenticate and authorize users before performing sensitive server-side operations.

```tsx filename="app/actions.ts" highlight= switcher
'use server'

import  from '@/lib/db' // Your database client
import  from '@/lib/auth' // Your authentication library

  data: ,
  token: string
)
  const newUser = await db.user.create()
  return newUser
}
```

```jsx filename="app/actions.js" highlight= switcher
'use server'

import  from '@/lib/db' // Your database client
import  from '@/lib/auth' // Your authentication library

  const user = authenticate(token)
  if (!user)
  const newUser = await db.user.create()
  return newUser
}
```

## Reference

See the [React documentation](https://react.dev/reference/rsc/use-server) for more information on `use server`.
