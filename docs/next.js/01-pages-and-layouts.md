---
title: Pages and Layouts
description: Create your first page and shared layout with the Pages Router.
---

The Pages Router has a file-system based router built on the concept of pages.

When a file is added to the `pages` directory, it's automatically available as a route.

In Next.js, a **page** is a [React Component](https://react.dev/learn/your-first-component) exported from a `.js`, `.jsx`, `.ts`, or `.tsx` file in the `pages` directory. Each page is associated with a route based on its file name.

**Example**: If you create `pages/about.js` that exports a React component like below, it will be accessible at `/about`.

```jsx

  return <div>About</div>
}
```

## Index routes

The router will automatically route files named `index` to the root of the directory.

- `pages/index.js` → `/`
- `pages/blog/index.js` → `/blog`

## Nested routes

The router supports nested files. If you create a nested folder structure, files will automatically be routed in the same way still.

- `pages/blog/first-post.js` → `/blog/first-post`
- `pages/dashboard/settings/username.js` → `/dashboard/settings/username`

## Pages with Dynamic Routes

Next.js supports pages with dynamic routes. For example, if you create a file called `pages/posts/[id].js`, then it will be accessible at `posts/1`, `posts/2`, etc.

> To learn more about dynamic routing, check the [Dynamic Routing documentation](/docs/pages/building-your-application/routing/dynamic-routes).

## Layout Pattern

The React model allows us to deconstruct a [page](/docs/pages/building-your-application/routing/pages-and-layouts) into a series of components. Many of these components are often reused between pages. For example, you might have the same navigation bar and footer on every page.

```jsx filename="components/layout.js"

  return (
    <>

      <main></main>

    </>
  )
}
```

## Examples

### Single Shared Layout with Custom App

If you only have one layout for your entire application, you can create a [Custom App](/docs/pages/building-your-application/routing/custom-app) and wrap your application with the layout. Since the `
)
}

````

### Per-Page Layouts

If you need multiple layouts, you can add a property `getLayout` to your page, allowing you to return a React component for the layout. This allows you to define the layout on a _per-page basis_. Since we're returning a function, we can have complex nested layouts if desired.

```jsx filename="pages/index.js"

  return (
    /** Your content */
  )
}

Page.getLayout = function getLayout(page)
````

```jsx filename="pages/_app.js"

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout()
}
```

When navigating between pages, we want to _persist_ page state (input values, scroll position, etc.) for a Single-Page Application (SPA) experience.

This layout pattern enables state persistence because the React component tree is maintained between page transitions. With the component tree, React can understand which elements have changed to preserve state.

> **Good to know**: This process is called [reconciliation](https://react.dev/learn/preserving-and-resetting-state), which is how React understands which elements have changed.

### With TypeScript

When using TypeScript, you must first create a new type for your pages which includes a `getLayout` function. Then, you must create a new type for your `AppProps` which overrides the `Component` property to use the previously created type.

```tsx filename="pages/index.tsx" switcher

const Page: NextPageWithLayout = () =>

Page.getLayout = function getLayout(page: ReactElement)

```

```jsx filename="pages/index.js" switcher

const Page = () =>

Page.getLayout = function getLayout(page)

```

```tsx filename="pages/_app.tsx" switcher

  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps &

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout()
}
```

```jsx filename="pages/_app.js" switcher

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout()
}
```

### Data Fetching

Inside your layout, you can fetch data on the client-side using `useEffect` or a library like [SWR](https://swr.vercel.app/). Because this file is not a [Page](/docs/pages/building-your-application/routing/pages-and-layouts), you cannot use `getStaticProps` or `getServerSideProps` currently.

```jsx filename="components/layout.js"

  const  = useSWR('/api/navigation', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <>

      <main></main>

    </>
  )
}
```
