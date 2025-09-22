---
title: Dynamic Route Segments
nav_title: Dynamic Segments
description: Dynamic Route Segments can be used to programmatically generate route segments from dynamic data.
related:
  title: Next Steps
  description: For more information on what to do next, we recommend the following sections
  links:
    - app/api-reference/functions/generate-static-params
---

When you don't know the exact route segment names ahead of time and want to create routes from dynamic data, you can use Dynamic Segments that are filled in at request time or prerendered at build time.

## Convention

A Dynamic Segment can be created by wrapping a folder's name in square brackets: `[folderName]`. For example, a blog could include the following route `app/blog/[slug]/page.js` where `[slug]` is the Dynamic Segment for blog posts.

```tsx filename="app/blog/[slug]/page.tsx" switcher

  params,
}: >
})  = await params
  return <div>My Post: </div>
}
```

```jsx filename="app/blog/[slug]/page.js" switcher

  const  = await params
  return <div>My Post: </div>
}
```

Dynamic Segments are passed as the `params` prop to [`layout`](/docs/app/api-reference/file-conventions/layout), [`page`](/docs/app/api-reference/file-conventions/page), [`route`](/docs/app/api-reference/file-conventions/route), and [`generateMetadata`](/docs/app/api-reference/functions/generate-metadata#generatemetadata-function) functions.

| Route                     | Example URL | `params` |
| ------------------------- | ----------- | -------- |
| `app/blog/[slug]/page.js` | `/blog/a`   | ``       |
| `app/blog/[slug]/page.js` | `/blog/b`   | ``       |
| `app/blog/[slug]/page.js` | `/blog/c`   | ``       |

### In Client Components

In a Client Component **page**, dynamic segments from props can be accessed using the [`use`](https://react.dev/reference/react/use) hook.

```tsx filename="app/blog/[slug]/page.tsx" switcher
'use client'

  params,
}: >
})  = use(params)

  return (
    <div>
      <p></p>
    </div>
  )
}
```

```jsx filename="app/blog/[slug]/page.js" switcher
'use client'

  const  = use(params)

  return (
    <div>
      <p></p>
    </div>
  )
}
```

Alternatively Client Components can use the [`useParams`](/docs/app/api-reference/functions/use-params) hook to access the `params` anywhere in the Client Component tree.

### Catch-all Segments

Dynamic Segments can be extended to **catch-all** subsequent segments by adding an ellipsis inside the brackets `[...folderName]`.

For example, `app/shop/[...slug]/page.js` will match `/shop/clothes`, but also `/shop/clothes/tops`, `/shop/clothes/tops/t-shirts`, and so on.

| Route                        | Example URL   | `params` |
| ---------------------------- | ------------- | -------- |
| `app/shop/[...slug]/page.js` | `/shop/a`     | ``       |
| `app/shop/[...slug]/page.js` | `/shop/a/b`   | ``       |
| `app/shop/[...slug]/page.js` | `/shop/a/b/c` | ``       |

### Optional Catch-all Segments

Catch-all Segments can be made **optional** by including the parameter in double square brackets: `[[...folderName]]`.

For example, `app/shop/[[...slug]]/page.js` will **also** match `/shop`, in addition to `/shop/clothes`, `/shop/clothes/tops`, `/shop/clothes/tops/t-shirts`.

The difference between **catch-all** and **optional catch-all** segments is that with optional, the route without the parameter is also matched (`/shop` in the example above).

| Route                          | Example URL   | `params` |
| ------------------------------ | ------------- | -------- |
| `app/shop/[[...slug]]/page.js` | `/shop`       | ``       |
| `app/shop/[[...slug]]/page.js` | `/shop/a`     | ``       |
| `app/shop/[[...slug]]/page.js` | `/shop/a/b`   | ``       |
| `app/shop/[[...slug]]/page.js` | `/shop/a/b/c` | ``       |

### TypeScript

When using TypeScript, you can add types for `params` depending on your configured route segment — use [`PageProps<'/route'>`](/docs/app/api-reference/file-conventions/page#page-props-helper), [`LayoutProps<'/route'>`](/docs/app/api-reference/file-conventions/layout#layout-props-helper), or [`RouteContext<'/route'>`](/docs/app/api-reference/file-conventions/route#route-context-helper) to type `params` in `page`, `layout`, and `route` respectively.

Route `params` values are typed as `string`, `string[]`, or `undefined` (for optional catch-all segments), because their values aren't known until runtime. Users can enter any URL into the address bar, and these broad types help ensure that your application code handles all these possible cases.

| Route                               | `params` Type Definition |
| ----------------------------------- | ------------------------ |
| `app/blog/[slug]/page.js`           | ``                       |
| `app/shop/[...slug]/page.js`        | ``                       |
| `app/shop/[[...slug]]/page.js`      | ``                       |
| `app/[categoryId]/[itemId]/page.js` | ``                       |

If you're working on a route where `params` can only have a fixed number of valid values, such as a `[locale]` param with a known set of language codes, you can use runtime validation to handle any invalid params a user may enter, and let the rest of your application work with the narrower type from your known set.

```tsx filename="/app/[locale]/page.tsx"

function assertValidLocale(value: string): asserts value is Locale

  const  = await props.params // locale is typed as string
  assertValidLocale(locale)
  // locale is now typed as Locale
}
```

## Behavior

- Since the `params` prop is a promise. You must use `async`/`await` or React's use function to access the values.
  - In version 14 and earlier, `params` was a synchronous prop. To help with backwards compatibility, you can still access it synchronously in Next.js 15, but this behavior will be deprecated in the future.

## Examples

### With `generateStaticParams`

The [`generateStaticParams`](/docs/app/api-reference/functions/generate-static-params) function can be used to [statically generate](/docs/app/getting-started/partial-prerendering#static-rendering) routes at build time instead of on-demand at request time.

```tsx filename="app/blog/[slug]/page.tsx" switcher

  const posts = await fetch('https://.../posts').then((res) => res.json())

  return posts.map((post) => ())
}
```

```jsx filename="app/blog/[slug]/page.js" switcher

  const posts = await fetch('https://.../posts').then((res) => res.json())

  return posts.map((post) => ())
}
```

When using `fetch` inside the `generateStaticParams` function, the requests are [automatically deduplicated](/docs/app/guides/caching#request-memoization). This avoids multiple network calls for the same data Layouts, Pages, and other `generateStaticParams` functions, speeding up build time.
