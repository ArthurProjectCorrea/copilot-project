---
title: Forms and Mutations
nav_title: Forms and Mutations
description: Learn how to handle form submissions and data mutations with Next.js.
---

Forms enable you to create and update data in web applications. Next.js provides a powerful way to handle form submissions and data mutations using **API Routes**.

> **Good to know:**
>
> - We will soon recommend [incrementally adopting](/docs/app/guides/migrating/app-router-migration) the App Router and using [Server Actions](/docs/app/getting-started/updating-data) for handling form submissions and data mutations. Server Actions allow you to define asynchronous server functions that can be called directly from your components, without needing to manually create an API Route.
> - API Routes [do not specify CORS headers](https://developer.mozilla.org/docs/Web/HTTP/CORS), meaning they are same-origin only by default.
> - Since API Routes run on the server, we're able to use sensitive values (like API keys) through [Environment Variables](/docs/pages/guides/environment-variables) without exposing them to the client. This is critical for the security of your application.

## Examples

### Redirecting

If you would like to redirect the user to a different route after a mutation, you can [`redirect`](/docs/pages/building-your-application/routing/api-routes#response-helpers) to any absolute or relative URL:

```ts filename="pages/api/submit.ts" switcher

  req: NextApiRequest,
  res: NextApiResponse
) `)
}
```

```js filename="pages/api/submit.js" switcher

  const id = await addPost()
  res.redirect(307, `/post/$`)
}
```

### Setting cookies

You can set cookies inside an API Route using the `setHeader` method on the response:

```ts filename="pages/api/cookie.ts" switcher

  req: NextApiRequest,
  res: NextApiResponse
) 
```

```js filename="pages/api/cookie.js" switcher

  res.setHeader('Set-Cookie', 'username=lee; Path=/; HttpOnly')
  res.status(200).send('Cookie has been set.')
}
```

### Reading cookies

You can read cookies inside an API Route using the [`cookies`](/docs/pages/building-your-application/routing/api-routes#request-helpers) request helper:

```ts filename="pages/api/cookie.ts" switcher

  req: NextApiRequest,
  res: NextApiResponse
) 
```

```js filename="pages/api/cookie.js" switcher

  const auth = req.cookies.authorization
  // ...
}
```

### Deleting cookies

You can delete cookies inside an API Route using the `setHeader` method on the response:

```ts filename="pages/api/cookie.ts" switcher

  req: NextApiRequest,
  res: NextApiResponse
) 
```

```js filename="pages/api/cookie.js" switcher

  res.setHeader('Set-Cookie', 'username=; Path=/; HttpOnly; Max-Age=0')
  res.status(200).send('Cookie has been deleted.')
}
```