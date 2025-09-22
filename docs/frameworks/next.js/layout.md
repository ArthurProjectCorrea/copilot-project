---
title: layout.js
description: API reference for the layout.js file.
---

The `layout` file is used to define a layout in your Next.js application.

```tsx filename="app/dashboard/layout.tsx" switcher

  children,
}: ) </section>
}
```

```jsx filename="app/dashboard/layout.js" switcher

  return <section></section>
}
```

A **root layout** is the top-most layout in the root `app` directory. It is used to define the `<html>` and `<body>` tags and other globally shared UI.

```tsx filename="app/layout.tsx" switcher

  children,
}: ) </body>
    </html>
  )
}
```

```jsx filename="app/layout.js" switcher

  return (
    <html lang="en">
      <body></body>
    </html>
  )
}
```

## Reference

### Props

#### `children` (required)

Layout components should accept and use a `children` prop. During rendering, `children` will be populated with the route segments the layout is wrapping. These will primarily be the component of a child [Layout](/docs/app/api-reference/file-conventions/page) (if it exists) or [Page](/docs/app/api-reference/file-conventions/page), but could also be other special files like [Loading](/docs/app/api-reference/file-conventions/loading) or [Error](/docs/app/getting-started/error-handling) when applicable.

#### `params` (optional)

A promise that resolves to an object containing the [dynamic route parameters](/docs/app/api-reference/file-conventions/dynamic-routes) object from the root segment down to that layout.

```tsx filename="app/dashboard/[team]/layout.tsx" switcher

  children,
  params,
}: >
})  = await params
}
```

```jsx filename="app/dashboard/[team]/layout.js" switcher

  const  = await params
}
```

| Example Route                     | URL            | `params`    |
| --------------------------------- | -------------- | ----------- |
| `app/dashboard/[team]/layout.js`  | `/dashboard/1` | `Promise<>` |
| `app/shop/[tag]/[item]/layout.js` | `/shop/1/2`    | `Promise<>` |
| `app/blog/[...slug]/layout.js`    | `/blog/1/2`    | `Promise<>` |

- Since the `params` prop is a promise. You must use `async/await` or React's [`use`](https://react.dev/reference/react/use) function to access the values.
  - In version 14 and earlier, `params` was a synchronous prop. To help with backwards compatibility, you can still access it synchronously in Next.js 15, but this behavior will be deprecated in the future.

### Layout Props Helper

You can type layouts with `LayoutProps` to get a strongly typed `params` and named slots inferred from your directory structure. `LayoutProps` is a globally available helper.

```tsx filename="app/dashboard/layout.tsx" switcher

  return (
    <section>

       */}
    </section>
  )
}
```

> **Good to know**:
>
> - Types are generated during `next dev`, `next build` or `next typegen`.

### Root Layout

The `app` directory **must** include a **root layout**, which is the top-most layout in the root `app` directory. Typically, the root layout is `app/layout.js`.

```tsx filename="app/layout.tsx" switcher

  children,
}: ) </body>
    </html>
  )
}
```

```jsx filename="app/layout.js" switcher

  return (
    <html>
      <body></body>
    </html>
  )
}
```

- The root layout **must** define `<html>` and `<body>` tags.
  - You should **not** manually add `<head>` tags such as `<title>` and `<meta>` to root layouts. Instead, you should use the [Metadata API](/docs/app/getting-started/metadata-and-og-images) which automatically handles advanced requirements such as streaming and de-duplicating `<head>` elements.
- You can use [route groups](/docs/app/api-reference/file-conventions/route-groups) to create **multiple root layouts**.
  - Navigating **across multiple root layouts** will cause a **full page load** (as opposed to a client-side navigation). For example, navigating from `/cart` that uses `app/(shop)/layout.js` to `/blog` that uses `app/(marketing)/layout.js` will cause a full page load. This **only** applies to multiple root layouts.
- The root layout can be under a **dynamic segment**, for example when implementing [internationalization](/docs/app/guides/internationalization) with `app/[lang]/layout.js`.

## Caveats

### Request Object

Layouts are cached in the client during navigation to avoid unnecessary server requests.

[Layouts](/docs/app/api-reference/file-conventions/layout) do not rerender. They can be cached and reused to avoid unnecessary computation when navigating between pages. By restricting layouts from accessing the raw request, Next.js can prevent the execution of potentially slow or expensive user code within the layout, which could negatively impact performance.

To access the request object, you can use [`headers`](/docs/app/api-reference/functions/headers) and [`cookies`](/docs/app/api-reference/functions/cookies) APIs in [Server Components](/docs/app/getting-started/server-and-client-components) and Functions.

```tsx filename="app/shop/layout.tsx" switcher

  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')
  return '...'
}
```

```jsx filename="app/shop/layout.js" switcher

  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')
  return '...'
}
```

### Query params

Layouts do not rerender on navigation, so they cannot access search params which would otherwise become stale.

To access updated query parameters, you can use the Page [`searchParams`](/docs/app/api-reference/file-conventions/page#searchparams-optional) prop, or read them inside a Client Component using the [`useSearchParams`](/docs/app/api-reference/functions/use-search-params) hook. Since Client Components re-render on navigation, they have access to the latest query parameters.

```tsx filename="app/ui/search.tsx" switcher
'use client'

  const searchParams = useSearchParams()

  const search = searchParams.get('search')

  return '...'
}
```

```jsx filename="app/ui/search.js" switcher
'use client'

  const searchParams = useSearchParams()

  const search = searchParams.get('search')

  return '...'
}
```

```tsx filename="app/shop/layout.tsx" switcher

  return (
    <>

    </>
  )
}
```

```jsx filename="app/shop/layout.js" switcher

  return (
    <>

    </>
  )
}
```

### Pathname

Layouts do not re-render on navigation, so they do not access pathname which would otherwise become stale.

To access the current pathname, you can read it inside a Client Component using the [`usePathname`](/docs/app/api-reference/functions/use-pathname) hook. Since Client Components re-render during navigation, they have access to the latest pathname.

```tsx filename="app/ui/breadcrumbs.tsx" switcher
'use client'

// Simplified breadcrumbs logic

  const pathname = usePathname()
  const segments = pathname.split('/')

  return (
    <nav>
      >

        </span>
      ))}
    </nav>
  )
}
```

```jsx filename="app/ui/breadcrumbs.js" switcher
'use client'

// Simplified breadcrumbs logic

  const pathname = usePathname()
  const segments = pathname.split('/')

  return (
    <nav>
      >

        </span>
      ))}
    </nav>
  )
}
```

```tsx filename="app/docs/layout.tsx" switcher

  return (
    <>

      <main></main>
    </>
  )
}
```

```jsx filename="app/docs/layout.js" switcher

  return (
    <>

      <main></main>
    </>
  )
}
```

### Fetching Data

Layouts cannot pass data to their `children`. However, you can fetch the same data in a route more than once, and use React [`cache`](https://react.dev/reference/react/cache) to dedupe the requests without affecting performance.

Alternatively, when using [`fetch`](/docs/app/api-reference/functions/fetch)in Next.js, requests are automatically deduped.

```tsx filename="app/lib/data.ts" switcher

  const res = await fetch(`https://.../users/$`)
  return res.json()
}
```

```tsx filename="app/dashboard/layout.tsx" switcher

  const user = await getUser('1')

  return (
    <>
      <nav>

      </nav>

    </>
  )
}
```

```jsx filename="app/dashboard/layout.js" switcher

  const user = await getUser('1')

  return (
    <>
      <nav>

      </nav>

    </>
  )
}
```

```tsx filename="app/dashboard/page.tsx" switcher

  const user = await getUser('1')

  return (
    <div>
      <h1>Welcome </h1>
    </div>
  )
}
```

```jsx filename="app/dashboard/page.js" switcher

  const user = await getUser('1')

  return (
    <div>
      <h1>Welcome </h1>
    </div>
  )
}
```

### Accessing child segments

Layouts do not have access to the route segments below itself. To access all route segments, you can use [`useSelectedLayoutSegment`](/docs/app/api-reference/functions/use-selected-layout-segment) or [`useSelectedLayoutSegments`](/docs/app/api-reference/functions/use-selected-layout-segments) in a Client Component.

```tsx filename="app/ui/nav-link.tsx" switcher
'use client'

  slug,
  children,
}: )
```

```jsx filename="app/ui/nav-link.js" switcher
'use client'

  const segment = useSelectedLayoutSegment()
  const isActive = slug === segment

  return (

  )
}
```

```tsx filename="app/blog/layout.tsx" switcher

  children,
}: ) >

        </div>
      ))}
      <div></div>
    </div>
  )
}
```

```jsx filename="app/blog/layout.js" switcher

  const featuredPosts = await getPosts()
  return (
    <div>
      >

        </div>
      ))}
      <div></div>
    </div>
  )
}
```

## Examples

### Metadata

You can modify the `<head>` HTML elements such as `title` and `meta` using the [`metadata` object](/docs/app/api-reference/functions/generate-metadata#the-metadata-object) or [`generateMetadata` function](/docs/app/api-reference/functions/generate-metadata#generatemetadata-function).

```tsx filename="app/layout.tsx" switcher

  title: 'Next.js',
}

  return '...'
}
```

```jsx filename="app/layout.js" switcher

  title: 'Next.js',
}

  return '...'
}
```

> **Good to know**: You should **not** manually add `<head>` tags such as `<title>` and `<meta>` to root layouts. Instead, use the [Metadata APIs](/docs/app/api-reference/functions/generate-metadata) which automatically handles advanced requirements such as streaming and de-duplicating `<head>` elements.

### Active Nav Links

You can use the [`usePathname`](/docs/app/api-reference/functions/use-pathname) hook to determine if a nav link is active.

Since `usePathname` is a client hook, you need to extract the nav links into a Client Component, which can be imported into your layout:

```tsx filename="app/ui/nav-links.tsx" switcher
'use client'

  const pathname = usePathname()

  return (
    <nav>

    </nav>
  )
}
```

```jsx filename="app/ui/nav-links.js" switcher
'use client'

  const pathname = usePathname()

  return (
    <nav>

    </nav>
  )
}
```

```tsx filename="app/layout.tsx" switcher

  return (
    <html lang="en">
      <body>

        <main></main>
      </body>
    </html>
  )
}
```

```jsx filename="app/layout.js" switcher

  return (
    <html lang="en">
      <body>

        <main></main>
      </body>
    </html>
  )
}
```

### Displaying content based on `params`

Using [dynamic route segments](/docs/app/api-reference/file-conventions/dynamic-routes), you can display or fetch specific content based on the `params` prop.

```tsx filename="app/dashboard/layout.tsx" switcher

  children,
  params,
}: >
})  = await params

  return (
    <section>
      <header>
        <h1>Welcome to 's Dashboard</h1>
      </header>
      <main></main>
    </section>
  )
}
```

```jsx filename="app/dashboard/layout.js" switcher

  const  = await params

  return (
    <section>
      <header>
        <h1>Welcome to 's Dashboard</h1>
      </header>
      <main></main>
    </section>
  )
}
```

### Reading `params` in Client Components

To use `params` in a Client Component (which cannot be `async`), you can use React's [`use`](https://react.dev/reference/react/use) function to read the promise:

```tsx filename="app/page.tsx" switcher
'use client'

  params,
}: >
})  = use(params)
}
```

```js filename="app/page.js" switcher
'use client'

  const  = use(params)
}
```

## Version History

| Version      | Changes                                                                                       |
| ------------ | --------------------------------------------------------------------------------------------- |
| `v15.0.0-RC` | `params` is now a promise. A [codemod](/docs/app/guides/upgrading/codemods#150) is available. |
| `v13.0.0`    | `layout` introduced.                                                                          |
