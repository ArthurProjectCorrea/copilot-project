---
title: Fetching Data
description: Learn how to fetch data and stream content that depends on data.
related:
  title: API Reference
  description: Learn more about the features mentioned in this page by reading the API Reference.
  links:
    - app/guides/data-security
    - app/api-reference/functions/fetch
    - app/api-reference/file-conventions/loading
    - app/api-reference/config/next-config-js/logging
    - app/api-reference/config/next-config-js/taint
---

This page will walk you through how you can fetch data in [Server and Client Components](/docs/app/getting-started/server-and-client-components), and how to [stream](#streaming) components that depend on data.

## Fetching data

### Server Components

You can fetch data in Server Components using:

1. The [`fetch` API](#with-the-fetch-api)
2. An [ORM or database](#with-an-orm-or-database)

#### With the `fetch` API

To fetch data with the `fetch` API, turn your component into an asynchronous function, and await the `fetch` call. For example:

```tsx filename="app/blog/page.tsx" switcher

  const data = await fetch('https://api.vercel.app/blog')
  const posts = await data.json()
  return (
    <ul>
      ></li>
      ))}
    </ul>
  )
}
```

```jsx filename="app/blog/page.js" switcher

  const data = await fetch('https://api.vercel.app/blog')
  const posts = await data.json()
  return (
    <ul>
      ></li>
      ))}
    </ul>
  )
}
```

> **Good to know:**
>
> - `fetch` responses are not cached by default. However, Next.js will [prerender](/docs/app/getting-started/partial-prerendering#static-rendering) the route and the output will be cached for improved performance. If you'd like to opt into [dynamic rendering](/docs/app/getting-started/partial-prerendering#dynamic-rendering), use the `` option. See the [`fetch` API Reference](/docs/app/api-reference/functions/fetch).
> - During development, you can log `fetch` calls for better visibility and debugging. See the [`logging` API reference](/docs/app/api-reference/config/next-config-js/logging).

#### With an ORM or database

Since Server Components are rendered on the server, you can safely make database queries using an ORM or database client. Turn your component into an asynchronous function, and await the call:

```tsx filename="app/blog/page.tsx" switcher

  const allPosts = await db.select().from(posts)
  return (
    <ul>
      ></li>
      ))}
    </ul>
  )
}
```

```jsx filename="app/blog/page.js" switcher

  const allPosts = await db.select().from(posts)
  return (
    <ul>
      ></li>
      ))}
    </ul>
  )
}
```

### Client Components

There are two ways to fetch data in Client Components, using:

1. React's [`use` hook](https://react.dev/reference/react/use)
2. A community library like [SWR](https://swr.vercel.app/) or [React Query](https://tanstack.com/query/latest)

#### Streaming data with the `use` hook

You can use React's [`use` hook](https://react.dev/reference/react/use) to [stream](#streaming) data from the server to client. Start by fetching data in your Server component, and pass the promise to your Client Component as prop:

```tsx filename="app/blog/page.tsx" switcher

  // Don't await the data fetching function
  const posts = getPosts()

  return (

  )
}
```

```jsx filename="app/blog/page.js" switcher

  // Don't await the data fetching function
  const posts = getPosts()

  return (

  )
}
```

Then, in your Client Component, use the `use` hook to read the promise:

```tsx filename="app/ui/posts.tsx" switcher
'use client'

  posts,
}: []>
}) ></li>
      ))}
    </ul>
  )
}
```

```jsx filename="app/ui/posts.js" switcher
'use client'

  const allPosts = use(posts)

  return (
    <ul>
      ></li>
      ))}
    </ul>
  )
}
```

In the example above, the `<Posts>` component is wrapped in a [`

</main>
</div>
)
}

````

```jsx filename="app/blog/page.js" switcher

  return (
    <div>

      <header>
        <h1>Welcome to the Blog</h1>
        <p>Read the latest posts below.</p>
      </header>
      <main>

````

### Creating meaningful loading states

An instant loading state is fallback UI that is shown immediately to the user after navigation. For the best user experience, we recommend designing loading states that are meaningful and help users understand the app is responding. For example, you can use skeletons and spinners, or a small but meaningful part of future screens such as a cover photo, title, etc.

In development, you can preview and inspect the loading state of your components using the [React Devtools](https://react.dev/learn/react-developer-tools).

## Examples

### Sequential data fetching

Sequential data fetching happens when nested components in a tree each fetch their own data and the requests are not [deduplicated](/docs/app/guides/caching#request-memoization), leading to longer response times.

There may be cases where you want this pattern because one fetch depends on the result of the other.

For example, the `<Playlists>` component will only start fetching data once the `<Artist>` component has finished fetching data because `<Playlists>` depends on the `artistID` prop:

```tsx filename="app/artist/[username]/page.tsx" switcher

  params,
}: >
})  = await params
  // Get artist information
  const artist = await getArtist(username)

  return (
    <>
      <h1></h1>

    </>
  )
}

async function Playlists(: ) ></li>
      ))}
    </ul>
  )
}
```

```jsx filename="app/artist/[username]/page.js" switcher

  const  = await params
  // Get artist information
  const artist = await getArtist(username)

  return (
    <>
      <h1></h1>

    </>
  )
}

async function Playlists() ></li>
      ))}
    </ul>
  )
}
```

To improve the user experience, you should use [React `<Suspense>`](/docs/app/getting-started/linking-and-navigating#streaming) to show a `fallback` while data is being fetch. This will enable [streaming](#streaming) and prevent the whole route from being blocked by the sequential data requests.

### Parallel data fetching

Parallel data fetching happens when data requests in a route are eagerly initiated and start at the same time.

By default, [layouts and pages](/docs/app/getting-started/layouts-and-pages) are rendered in parallel. So each segment starts fetching data as soon as possible.

However, within _any_ component, multiple `async`/`await` requests can still be sequential if placed after the other. For example, `getAlbums` will be blocked until `getArtist` is resolved:

```tsx filename="app/artist/[username]/page.tsx" switcher

  // These requests will be sequential
  const  = await params
  const artist = await getArtist(username)
  const albums = await getAlbums(username)
  return <div></div>
}
```

Start multiple requests by calling `fetch`, then await them with [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all). Requests begin as soon as `fetch` is called.

```tsx filename="app/artist/[username]/page.tsx" highlight= switcher

async function getArtist(username: string) `)
  return res.json()
}

async function getAlbums(username: string) /albums`)
  return res.json()
}

  params,
}: >
})  = await params

  // Initiate requests
  const artistData = getArtist(username)
  const albumsData = getAlbums(username)

  const [artist, albums] = await Promise.all([artistData, albumsData])

  return (
    <>
      <h1></h1>

    </>
  )
}
```

```jsx filename="app/artist/[username]/page.js" highlight= switcher

async function getArtist(username) `)
  return res.json()
}

async function getAlbums(username) /albums`)
  return res.json()
}

  const  = await params

  // Initiate requests
  const artistData = getArtist(username)
  const albumsData = getAlbums(username)

  const [artist, albums] = await Promise.all([artistData, albumsData])

  return (
    <>
      <h1></h1>

    </>
  )
}
```

> **Good to know:** If one request fails when using `Promise.all`, the entire operation will fail. To handle this, you can use the [`Promise.allSettled`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) method instead.

### Preloading data

You can preload data by creating an utility function that you eagerly call above blocking requests. `<Item>` conditionally renders based on the `checkIsAvailable()` function.

You can call `preload()` before `checkIsAvailable()` to eagerly initiate `data dependencies. By the time` is rendered, its data has already been fetched.

```tsx filename="app/item/[id]/page.tsx" switcher

  params,
}: >
})  = await params
  // starting loading item data
  preload(id)
  // perform another asynchronous task
  const isAvailable = await checkIsAvailable()

  return isAvailable ?  : null
}

  // void evaluates the given expression and returns undefined
  // https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/void
  void getItem(id)
}

  const result = await getItem(id)
  // ...
}
```

```jsx filename="app/item/[id]/page.js" switcher

  const  = await params
  // starting loading item data
  preload(id)
  // perform another asynchronous task
  const isAvailable = await checkIsAvailable()

  return isAvailable ?  : null
}

  // void evaluates the given expression and returns undefined
  // https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/void
  void getItem(id)
}

  const result = await getItem(id)
  // ...
```

Additionally, you can use React's [`cache` function](https://react.dev/reference/react/cache) and the [`server-only` package](https://www.npmjs.com/package/server-only) to create a reusable utility function. This approach allows you to cache the data fetching function and ensure that it's only executed on the server.

```ts filename="utils/get-item.ts" switcher

import 'server-only'

  void getItem(id)
}

  // ...
})
```

```js filename="utils/get-item.js" switcher

import 'server-only'

  void getItem(id)
}

  // ...
})
```
