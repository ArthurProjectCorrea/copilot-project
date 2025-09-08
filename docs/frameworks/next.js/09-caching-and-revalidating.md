---
title: Caching and Revalidating
description: Learn how to cache and revalidate data in your application.
related:
  title: API Reference
  description: Learn more about the features mentioned in this page by reading the API Reference.
  links:
    - app/api-reference/functions/fetch
    - app/api-reference/functions/unstable_cache
    - app/api-reference/functions/revalidatePath
    - app/api-reference/functions/revalidateTag
---

Caching is a technique for storing the result of data fetching and other computations so that future requests for the same data can be served faster, without doing the work again. While revalidation allows you to update cache entries without having to rebuild your entire application.

Next.js provides a few APIs to handle caching and revalidation. This guide will walk you through when and how to use them.

- [`fetch`](#fetch)
- [`unstable_cache`](#unstable_cache)
- [`revalidatePath`](#revalidatepath)
- [`revalidateTag`](#revalidatetag)

## `fetch`

By default, [`fetch`](/docs/app/api-reference/functions/fetch) requests are not cached. You can cache individual requests by setting the `cache` option to `'force-cache'`.

```tsx filename="app/page.tsx" switcher

  const data = await fetch('https://...', )
}
```

```jsx filename="app/page.jsx" switcher

  const data = await fetch('https://...', )
}
```

> **Good to know**: Although `fetch` requests are not cached by default, Next.js will [prerender](/docs/app/getting-started/partial-prerendering#static-rendering) routes that have `fetch` requests and cache the HTML. If you want to guarantee a route is [dynamic](/docs/app/getting-started/partial-prerendering#dynamic-rendering), use the [`connection` API](/docs/app/api-reference/functions/connection).

To revalidate the data returned by a `fetch` request, you can use the `next.revalidate` option.

```tsx filename="app/page.tsx" switcher

  const data = await fetch('https://...',  })
}
```

```jsx filename="app/page.jsx" switcher

  const data = await fetch('https://...',  })
}
```

This will revalidate the data after a specified amount of seconds.

See the [`fetch` API reference](/docs/app/api-reference/functions/fetch) to learn more.

## `unstable_cache`

`unstable_cache` allows you to cache the result of database queries and other async functions. To use it, wrap `unstable_cache` around the function. For example:

```ts filename="app/lib/data.ts" switcher

  return db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .then((res) => res[0])
}
```

```jsx filename="app/lib/data.js" switcher

  return db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .then((res) => res[0])
}
```

```tsx filename="app/page.tsx" highlight= switcher

  params,
}: >
})  = await params

  const getCachedUser = unstable_cache(
    async () => ,
    [userId] // add the user ID to the cache key
  )
}
```

```jsx filename="app/page.js" highlight= switcher

  const  = await params

  const getCachedUser = unstable_cache(
    async () => ,
    [userId] // add the user ID to the cache key
  )
}
```

The function accepts a third optional object to define how the cache should be revalidated. It accepts:

- `tags`: an array of tags used by Next.js to revalidate the cache.
- `revalidate`: the number of seconds after cache should be revalidated.

```tsx filename="app/page.tsx" highlight= switcher
const getCachedUser = unstable_cache(
  async () => ,
  [userId],
  
)
```

```jsx filename="app/page.js" highlight= switcher
const getCachedUser = unstable_cache(
  async () => ,
  [userId],
  
)
```

See the [`unstable_cache` API reference](/docs/app/api-reference/functions/unstable_cache) to learn more.

## `revalidateTag`

`revalidateTag` is used to revalidate cache entries based on a tag and following an event. To use it with `fetch`, start by tagging the function with the `next.tags` option:

```tsx filename="app/lib/data.ts" highlight= switcher

  const data = await fetch(`https://...`, ,
  })
}
```

```jsx filename="app/lib/data.js" highlight= switcher

  const data = await fetch(`https://...`, ,
  })
}
```

Alternatively, you can mark an `unstable_cache` function with the `tags` option:

```tsx filename="app/lib/data.ts" highlight= switcher

  async (id: string) => )
  },
  ['user'], // Needed if variables are not passed as parameters
  
)
```

```jsx filename="app/lib/data.js" highlight= switcher

  async (id) => )
  },
  ['user'], // Needed if variables are not passed as parameters
  
)
```

Then, call `revalidateTag` in a [Route Handler](/docs/app/api-reference/file-conventions/route) or Server Action:

```tsx filename="app/lib/actions.ts" highlight= switcher

  // Mutate data
  revalidateTag('user')
}
```

```jsx filename="app/lib/actions.js" highlight= switcher

  // Mutate data
  revalidateTag('user')
}
```

You can reuse the same tag in multiple functions to revalidate them all at once.

See the [`revalidateTag` API reference](/docs/app/api-reference/functions/revalidateTag) to learn more.

## `revalidatePath`

`revalidatePath` is used to revalidate a route and following an event. To use it, call it in a [Route Handler](/docs/app/api-reference/file-conventions/route) or Server Action:

```tsx filename="app/lib/actions.ts" highlight= switcher

  // Mutate data
  revalidatePath('/profile')
```

```jsx filename="app/lib/actions.js" highlight= switcher

  // Mutate data
  revalidatePath('/profile')
```

See the [`revalidatePath` API reference](/docs/app/api-reference/functions/revalidatePath) to learn more.