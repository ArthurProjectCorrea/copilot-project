---
title: useSearchParams
description: API Reference for the useSearchParams hook.
---

`useSearchParams` is a **Client Component** hook that lets you read the current URL's **query string**.

`useSearchParams` returns a **read-only** version of the [`URLSearchParams`](https://developer.mozilla.org/docs/Web/API/URLSearchParams) interface.

```tsx filename="app/dashboard/search-bar.tsx" switcher
'use client'

  const searchParams = useSearchParams()

  const search = searchParams.get('search')

  // URL -> `/dashboard?search=my-project`
  // `search` -> 'my-project'
  return <>Search: </>
}
```

```jsx filename="app/dashboard/search-bar.js" switcher
'use client'

  const searchParams = useSearchParams()

  const search = searchParams.get('search')

  // URL -> `/dashboard?search=my-project`
  // `search` -> 'my-project'
  return <>Search: </>
}
```

## Parameters

```tsx
const searchParams = useSearchParams()
```

`useSearchParams` does not take any parameters.

## Returns

`useSearchParams` returns a **read-only** version of the [`URLSearchParams`](https://developer.mozilla.org/docs/Web/API/URLSearchParams) interface, which includes utility methods for reading the URL's query string:

- [`URLSearchParams.get()`](https://developer.mozilla.org/docs/Web/API/URLSearchParams/get): Returns the first value associated with the search parameter. For example:

  | URL                  | `searchParams.get("a")`                                                                                         |
  | -------------------- | --------------------------------------------------------------------------------------------------------------- |
  | `/dashboard?a=1`     | `'1'`                                                                                                           |
  | `/dashboard?a=`      | `''`                                                                                                            |
  | `/dashboard?b=3`     | `null`                                                                                                          |
  | `/dashboard?a=1&a=2` | `'1'` _- use [`getAll()`](https://developer.mozilla.org/docs/Web/API/URLSearchParams/getAll) to get all values_ |

- [`URLSearchParams.has()`](https://developer.mozilla.org/docs/Web/API/URLSearchParams/has): Returns a boolean value indicating if the given parameter exists. For example:

  | URL              | `searchParams.has("a")` |
  | ---------------- | ----------------------- |
  | `/dashboard?a=1` | `true`                  |
  | `/dashboard?b=3` | `false`                 |

- Learn more about other **read-only** methods of [`URLSearchParams`](https://developer.mozilla.org/docs/Web/API/URLSearchParams), including the [`getAll()`](https://developer.mozilla.org/docs/Web/API/URLSearchParams/getAll), [`keys()`](https://developer.mozilla.org/docs/Web/API/URLSearchParams/keys), [`values()`](https://developer.mozilla.org/docs/Web/API/URLSearchParams/values), [`entries()`](https://developer.mozilla.org/docs/Web/API/URLSearchParams/entries), [`forEach()`](https://developer.mozilla.org/docs/Web/API/URLSearchParams/forEach), and [`toString()`](https://developer.mozilla.org/docs/Web/API/URLSearchParams/toString).

> **Good to know**:
>
> - `useSearchParams` is a [Client Component](/docs/app/getting-started/server-and-client-components) hook and is **not supported** in [Server Components](/docs/app/getting-started/server-and-client-components) to prevent stale values during [partial rendering](/docs/app/getting-started/linking-and-navigating#client-side-transitions).
> - If you want to fetch data in a Server Component based on search params, it's often a better option to read the [`searchParams` prop](/docs/app/api-reference/file-conventions/page#searchparams-optional) of the corresponding Page. You can then pass it down by props to any component (Server or Client) within that Page.
> - If an application includes the `/pages` directory, `useSearchParams` will return `ReadonlyURLSearchParams | null`. The `null` value is for compatibility during migration since search params cannot be known during pre-rendering of a page that doesn't use `getServerSideProps`

## Behavior

### Static Rendering

If a route is [statically rendered](/docs/app/getting-started/partial-prerendering#static-rendering), calling `useSearchParams` will cause the Client Component tree up to the closest [`Suspense` boundary](/docs/app/api-reference/file-conventions/loading#examples) to be client-side rendered.

This allows a part of the route to be statically rendered while the dynamic part that uses `useSearchParams` is client-side rendered.

We recommend wrapping the Client Component that uses `useSearchParams` in a `
      </nav>
      <h1>Dashboard</h1>
    </>
  )
}
```

```jsx filename="app/dashboard/page.js" switcher

// This component passed as a fallback to the Suspense boundary
// will be rendered in place of the search bar in the initial HTML.
// When the value is available during React hydration the fallback
// will be replaced with the `<SearchBar>` component.
function SearchBarFallback() 

  return (
    <>
      <nav>
        
      </nav>
      <h1>Dashboard</h1>
    </>
  )
}
```

> **Good to know**:
>
> - In development, routes are rendered on-demand, so `useSearchParams` doesn't suspend and things may appear to work without `Suspense`.
> - During production builds, a [static page](/docs/app/getting-started/partial-prerendering#static-rendering) that calls `useSearchParams` from a Client Component must be wrapped in a `Suspense` boundary, otherwise the build fails with the [Missing Suspense boundary with useSearchParams](/docs/messages/missing-suspense-with-csr-bailout) error.
> - If you intend the route to be dynamically rendered, prefer using the [`connection`](/docs/app/api-reference/functions/connection) function first in a Server Component to wait for an incoming request, this excludes everything below from prerendering. See what makes a route dynamic in the [Dynamic Rendering guide](/docs/app/getting-started/partial-prerendering#dynamic-rendering).
> - If you're already in a Server Component Page, consider using the [`searchParams` prop](/docs/app/api-reference/file-conventions/page#searchparams-optional) and passing the values to Client Components.
> - You can also pass the Page [`searchParams` prop](/docs/app/api-reference/file-conventions/page#searchparams-optional) directly to a Client Component and unwrap it with React's `use()`. Although this will suspend, so the Client Component should be wrapped with a `Suspense` boundary.

### Dynamic Rendering

If a route is [dynamically rendered](/docs/app/getting-started/partial-prerendering#dynamic-rendering), `useSearchParams` will be available on the server during the initial server render of the Client Component.

For example:

```tsx filename="app/dashboard/search-bar.tsx" switcher
'use client'

  const searchParams = useSearchParams()

  const search = searchParams.get('search')

  // This will be logged on the server during the initial render
  // and on the client on subsequent navigations.
  console.log(search)

  return <>Search: </>
}
```

```jsx filename="app/dashboard/search-bar.js" switcher
'use client'

  const searchParams = useSearchParams()

  const search = searchParams.get('search')

  // This will be logged on the server during the initial render
  // and on the client on subsequent navigations.
  console.log(search)

  return <>Search: </>
}
```

```tsx filename="app/dashboard/page.tsx" switcher

  await connection()
  return (
    <>
      <nav>
        
      </nav>
      <h1>Dashboard</h1>
    </>
  )
}
```

```jsx filename="app/dashboard/page.js" switcher

  await connection()
  return (
    <>
      <nav>
        
      </nav>
      <h1>Dashboard</h1>
    </>
  )
}
```

> **Good to know**:
>
> - Previously, setting `export const dynamic = 'force-dynamic'` on the page was used to force dynamic rendering. Prefer using [`connection()`](/docs/app/api-reference/functions/connection) instead, as it semantically ties dynamic rendering to the incoming request.

### Server Components

#### Pages

To access search params in [Pages](/docs/app/api-reference/file-conventions/page) (Server Components), use the [`searchParams`](/docs/app/api-reference/file-conventions/page#searchparams-optional) prop.

#### Layouts

Unlike Pages, [Layouts](/docs/app/api-reference/file-conventions/layout) (Server Components) **do not** receive the `searchParams` prop. This is because a shared layout is [not re-rendered during navigation](/docs/app/getting-started/linking-and-navigating#client-side-transitions) which could lead to stale `searchParams` between navigations. View [detailed explanation](/docs/app/api-reference/file-conventions/layout#query-params).

Instead, use the Page [`searchParams`](/docs/app/api-reference/file-conventions/page) prop or the [`useSearchParams`](/docs/app/api-reference/functions/use-search-params) hook in a Client Component, which is re-rendered on the client with the latest `searchParams`.

## Examples

### Updating `searchParams`

You can use [`useRouter`](/docs/app/api-reference/functions/use-router) or [`Link`](/docs/app/api-reference/components/link) to set new `searchParams`. After a navigation is performed, the current [`page.js`](/docs/app/api-reference/file-conventions/page) will receive an updated [`searchParams` prop](/docs/app/api-reference/file-conventions/page#searchparams-optional).

```tsx filename="app/example-client-component.tsx" switcher
'use client'

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => ,
    [searchParams]
  )

  return (
    <>
      <p>Sort By</p>

      <button
        onClick=}
      >
        ASC
      </button>

```

```jsx filename="app/example-client-component.js" switcher
'use client'

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name, value) => ,
    [searchParams]
  )

  return (
    <>
      <p>Sort By</p>

      <button
        onClick=}
      >
        ASC
      </button>

```

## Version History

| Version   | Changes                       |
| --------- | ----------------------------- |
| `v13.0.0` | `useSearchParams` introduced. |