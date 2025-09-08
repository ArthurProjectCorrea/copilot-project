---
title: Linking and Navigating
description: Learn how the built-in navigation optimizations work, including prefetching, prerendering, and client-side navigation, and how to optimize navigation for dynamic routes and slow networks.
related:
  links:
    - app/api-reference/components/link
    - app/api-reference/file-conventions/loading
    - app/guides/prefetching
---

In Next.js, routes are rendered on the server by default. This often means the client has to wait for a server response before a new route can be shown. Next.js comes with built-in [prefetching](#prefetching), [streaming](#streaming), and [client-side transitions](#client-side-transitions) ensuring navigation stays fast and responsive.

This guide explains how navigation works in Next.js and how you can optimize it for [dynamic routes](#dynamic-routes-without-loadingtsx) and [slow networks](#slow-networks).

## How navigation works

To understand how navigation works in Next.js, it helps to be familiar with the following concepts:

- [Server Rendering](#server-rendering)
- [Prefetching](#prefetching)
- [Streaming](#streaming)
- [Client-side transitions](#client-side-transitions)

### Server Rendering

In Next.js, [Layouts and Pages](/docs/app/getting-started/layouts-and-pages) are [React Server Components](https://react.dev/reference/rsc/server-components) by default. On initial and subsequent navigations, the [Server Component Payload](/docs/app/getting-started/server-and-client-components#how-do-server-and-client-components-work-in-nextjs) is generated on the server before being sent to the client.

There are two types of server rendering, based on _when_ it happens:

- **Static Rendering (or Prerendering)** happens at build time or during [revalidation](/docs/app/getting-started/caching-and-revalidating) and the result is cached.
- **Dynamic Rendering** happens at request time in response to a client request.

The trade-off of server rendering is that the client must wait for the server to respond before the new route can be shown. Next.js addresses this delay by [prefetching](#prefetching) routes the user is likely to visit and performing [client-side transitions](#client-side-transitions).

> **Good to know**: HTML is also generated for the initial visit.

### Prefetching

Prefetching is the process of loading a route in the background before the user navigates to it. This makes navigation between routes in your application feel instant, because by the time a user clicks on a link, the data to render the next route is already available client side.

Next.js automatically prefetches routes linked with the [`

          <a href="/contact">Contact</a>
        </nav>

      </body>
    </html>

)
}

````

```jsx filename="app/layout.js" switcher

  return (
    <html>
      <body>
        <nav>

          <a href="/contact">Contact</a>
        </nav>

      </body>
    </html>
  )
}
````

How much of the route is prefetched depends on whether it's static or dynamic:

- **Static Route**: the full route is prefetched.
- **Dynamic Route**: prefetching is skipped, or the route is partially prefetched if [`loading.tsx`](/docs/app/api-reference/file-conventions/loading) is present.

By skipping or partially prefetching dynamic routes, Next.js avoids unnecessary work on the server for routes the users may never visit. However, waiting for a server response before navigation can give the users the impression that the app is not responding.

To improve the navigation experience to dynamic routes, you can use [streaming](#streaming).

### Streaming

Streaming allows the server to send parts of a dynamic route to the client as soon as they're ready, rather than waiting for the entire route to be rendered. This means users see something sooner, even if parts of the page are still loading.

For dynamic routes, it means they can be **partially prefetched**. That is, shared layouts and loading skeletons can be requested ahead of time.

To use streaming, create a `loading.tsx` in your route folder:

```tsx filename="app/dashboard/loading.tsx" switcher

  // Add fallback UI that will be shown while the route is loading.
  return
}
```

```jsx filename="app/dashboard/loading.js" switcher

  // Add fallback UI that will be shown while the route is loading.
  return
}
```

Behind the scenes, Next.js will automatically wrap the `page.tsx` contents in a `<Suspense>` boundary. The prefetched fallback UI will be shown while the route is loading, and swapped for the actual content once ready.

> **Good to know**: You can also use [`<Suspense>`](https://react.dev/reference/react/Suspense) to create loading UI for nested components.

Benefits of `loading.tsx`:

- Immediate navigation and visual feedback for the user.
- Shared layouts remain interactive and navigation is interruptible.
- Improved Core Web Vitals: [TTFB](https://web.dev/articles/ttfb), [FCP](https://web.dev/articles/fcp), and [TTI](https://web.dev/articles/tti).

To further improve the navigation experience, Next.js performs a [client-side transition](#client-side-transitions) with the `

````

However, disabling prefetching comes with trade-offs:

- **Static routes** will only be fetched when the user clicks the link.
- **Dynamic routes** will need to be rendered on the server first before the client can navigate to it.

To reduce resource usage without fully disabling prefetch, you can prefetch only on hover. This limits prefetching to routes the user is more _likely_ to visit, rather than all links in the viewport.

```tsx filename="app/ui/hover-prefetch-link.tsx" switcher
'use client'

function HoverPrefetchLink(: )
````

```jsx filename="app/ui/hover-prefetch-link.js" switcher
'use client'

function HoverPrefetchLink()
```

### Hydration not completed

`<Link>` is a Client Component and must be hydrated before it can prefetch routes. On the initial visit, large JavaScript bundles can delay hydration, preventing prefetching from starting right away.

React mitigates this with Selective Hydration and you can further improve this by:

- Using the [`@next/bundle-analyzer`](/docs/app/guides/package-bundling#analyzing-javascript-bundles) plugin to identify and reduce bundle size by removing large dependencies.
- Moving logic from the client to the server where possible. See the [Server and Client Components](/docs/app/getting-started/server-and-client-components) docs for guidance.

## Examples

### Native History API

Next.js allows you to use the native [`window.history.pushState`](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState) and [`window.history.replaceState`](https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState) methods to update the browser's history stack without reloading the page.

`pushState` and `replaceState` calls integrate into the Next.js Router, allowing you to sync with [`usePathname`](/docs/app/api-reference/functions/use-pathname) and [`useSearchParams`](/docs/app/api-reference/functions/use-search-params).

#### `window.history.pushState`

Use it to add a new entry to the browser's history stack. The user can navigate back to the previous state. For example, to sort a list of products:

```tsx fileName="app/ui/sort-products.tsx" switcher
'use client'

  const searchParams = useSearchParams()

  function updateSorting(sortOrder: string) `)
  }

  return (
    <>
      <button onClick=>Sort Ascending</button>
      <button onClick=>Sort Descending</button>
    </>
  )
}
```

```jsx fileName="app/ui/sort-products.js" switcher
'use client'

  const searchParams = useSearchParams()

  function updateSorting(sortOrder) `)
  }

  return (
    <>
      <button onClick=>Sort Ascending</button>
      <button onClick=>Sort Descending</button>
    </>
  )
}
```

#### `window.history.replaceState`

Use it to replace the current entry on the browser's history stack. The user is not able to navigate back to the previous state. For example, to switch the application's locale:

```tsx fileName="app/ui/locale-switcher.tsx" switcher
'use client'

  const pathname = usePathname()

  function switchLocale(locale: string) $`
    window.history.replaceState(null, '', newPath)
  }

  return (
    <>
      <button onClick=>English</button>
      <button onClick=>French</button>
    </>
  )
}
```

```jsx fileName="app/ui/locale-switcher.js" switcher
'use client'

  const pathname = usePathname()

  function switchLocale(locale) $`
    window.history.replaceState(null, '', newPath)
  }

  return (
    <>
      <button onClick=>English</button>
      <button onClick=>French</button>
    </>
  )
}
```
