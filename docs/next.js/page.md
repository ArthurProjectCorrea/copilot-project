---
title: page.js
description: API reference for the page.js file.
---

The `page` file allows you to define UI that is **unique** to a route. You can create a page by default exporting a component from the file:

```tsx filename="app/blog/[slug]/page.tsx" switcher

  params,
  searchParams,
}: >
  searchParams: Promise<>
})
```

```jsx filename="app/blog/[slug]/page.js" switcher

  return <h1>My Page</h1>
}
```

## Good to know

- The `.js`, `.jsx`, or `.tsx` file extensions can be used for `page`.
- A `page` is always the **leaf** of the route subtree.
- A `page` file is required to make a route segment **publicly accessible**.
- Pages are [Server Components](https://react.dev/reference/rsc/server-components) by default, but can be set to a [Client Component](https://react.dev/reference/rsc/use-client).

## Reference

### Props

#### `params` (optional)

A promise that resolves to an object containing the [dynamic route parameters](/docs/app/api-reference/file-conventions/dynamic-routes) from the root segment down to that page.

```tsx filename="app/shop/[slug]/page.tsx" switcher

  params,
}: >
})  = await params
}
```

```jsx filename="app/shop/[slug]/page.js" switcher

  const  = await params
}
```

| Example Route                        | URL         | `params`    |
| ------------------------------------ | ----------- | ----------- |
| `app/shop/[slug]/page.js`            | `/shop/1`   | `Promise<>` |
| `app/shop/[category]/[item]/page.js` | `/shop/1/2` | `Promise<>` |
| `app/shop/[...slug]/page.js`         | `/shop/1/2` | `Promise<>` |

- Since the `params` prop is a promise, you must use `async/await` or React's [`use`](https://react.dev/reference/react/use) function to access the values.
  - In version 14 and earlier, `params` was a synchronous prop. To help with backwards compatibility, you can still access it synchronously in Next.js 15, but this behavior will be deprecated in the future.

#### `searchParams` (optional)

A promise that resolves to an object containing the [search parameters](https://developer.mozilla.org/docs/Learn/Common_questions/What_is_a_URL#parameters) of the current URL. For example:

```tsx filename="app/shop/page.tsx" switcher

  searchParams,
}: >
})
```

```jsx filename="app/shop/page.js" switcher

  const filters = (await searchParams).filters
}
```

Client Component **pages** can also access `searchParams` using React’s [`use`](https://react.dev/reference/react/use) hook:

```tsx filename="app/shop/page.tsx" switcher
'use client'

  searchParams,
}: >
})
```

```jsx filename="app/page.jsx" switcher
'use client'

  const filters = use(searchParams).filters
}
```

| Example URL     | `searchParams` |
| --------------- | -------------- |
| `/shop?a=1`     | `Promise<>`    |
| `/shop?a=1&b=2` | `Promise<>`    |
| `/shop?a=1&a=2` | `Promise<>`    |

- Since the `searchParams` prop is a promise. You must use `async/await` or React's [`use`](https://react.dev/reference/react/use) function to access the values.
  - In version 14 and earlier, `searchParams` was a synchronous prop. To help with backwards compatibility, you can still access it synchronously in Next.js 15, but this behavior will be deprecated in the future.
- `searchParams` is a **[Dynamic API](/docs/app/getting-started/partial-prerendering#dynamic-rendering)** whose values cannot be known ahead of time. Using it will opt the page into **[dynamic rendering](/docs/app/getting-started/partial-prerendering#dynamic-rendering)** at request time.
- `searchParams` is a plain JavaScript object, not a `URLSearchParams` instance.

### Page Props Helper

You can type pages with `PageProps` to get strongly typed `params` and `searchParams` from the route literal. `PageProps` is a globally available helper.

```tsx filename="app/blog/[slug]/page.tsx" switcher

  const  = await props.params
  const query = await props.searchParams
  return <h1>Blog Post: </h1>
}
```

> **Good to know**
>
> - Using a literal route (e.g. `'/blog/[slug]'`) enables autocomplete and strict keys for `params`.
> - Static routes resolve `params` to ``.
> - Types are generated during `next dev`, `next build`, or with `next typegen`.

## Examples

### Displaying content based on `params`

Using [dynamic route segments](/docs/app/api-reference/file-conventions/dynamic-routes), you can display or fetch specific content for the page based on the `params` prop.

```tsx filename="app/blog/[slug]/page.tsx" switcher

  params,
}: >
})  = await params
  return <h1>Blog Post: </h1>
}
```

```jsx filename="app/blog/[slug]/page.js" switcher

  const  = await params
  return <h1>Blog Post: </h1>
}
```

### Handling filtering with `searchParams`

You can use the `searchParams` prop to handle filtering, pagination, or sorting based on the query string of the URL.

```tsx filename="app/shop/page.tsx" switcher

  searchParams,
}: >
})  = await searchParams

  return (
    <div>
      <h1>Product Listing</h1>
      <p>Search query: </p>
      <p>Current page: </p>
      <p>Sort order: </p>
    </div>
  )
}
```

```jsx filename="app/shop/page.js" switcher

  const  = await searchParams

  return (
    <div>
      <h1>Product Listing</h1>
      <p>Search query: </p>
      <p>Current page: </p>
      <p>Sort order: </p>
    </div>
  )
}
```

### Reading `searchParams` and `params` in Client Components

To use `searchParams` and `params` in a Client Component (which cannot be `async`), you can use React's [`use`](https://react.dev/reference/react/use) function to read the promise:

```tsx filename="app/page.tsx" switcher
'use client'

  params,
  searchParams,
}: >
  searchParams: Promise<>
})  = use(params)
  const  = use(searchParams)
}
```

```js filename="app/page.js" switcher
'use client'

  const  = use(params)
  const  = use(searchParams)
}
```

## Version History

| Version      | Changes                                                                                                          |
| ------------ | ---------------------------------------------------------------------------------------------------------------- |
| `v15.0.0-RC` | `params` and `searchParams` are now promises. A [codemod](/docs/app/guides/upgrading/codemods#150) is available. |
| `v13.0.0`    | `page` introduced.                                                                                               |
