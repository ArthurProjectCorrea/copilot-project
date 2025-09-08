---
title: Layouts and Pages
description: Learn how to create your first pages and layouts, and link between them with the Link component.
related:
  title: API Reference
  description: Learn more about the features mentioned in this page by reading the API Reference.
  links:
    - app/getting-started/linking-and-navigating
    - app/api-reference/file-conventions/layout
    - app/api-reference/file-conventions/page
    - app/api-reference/components/link
    - app/api-reference/file-conventions/dynamic-routes
---

Next.js uses **file-system based routing**, meaning you can use folders and files to define routes. This page will guide you through how to create layouts and pages, and link between them.

## Creating a page

A **page** is UI that is rendered on a specific route. To create a page, add a [`page` file](/docs/app/api-reference/file-conventions/page) inside the `app` directory and default export a React component. For example, to create an index page (`/`):

```tsx filename="app/page.tsx" switcher

  return <h1>Hello Next.js!</h1>
}
```

```jsx filename="app/page.js" switcher

  return <h1>Hello Next.js!</h1>
}
```

## Creating a layout

A layout is UI that is **shared** between multiple pages. On navigation, layouts preserve state, remain interactive, and do not rerender.

You can define a layout by default exporting a React component from a [`layout` file](/docs/app/api-reference/file-conventions/layout). The component should accept a `children` prop which can be a page or another [layout](#nesting-layouts).

For example, to create a layout that accepts your index page as child, add a `layout` file inside the `app` directory:

```tsx filename="app/layout.tsx" switcher

  children,
}: ) 
        
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

The layout above is called a [root layout](/docs/app/api-reference/file-conventions/layout#root-layout) because it's defined at the root of the `app` directory. The root layout is **required** and must contain `html` and `body` tags.

## Creating a nested route

A nested route is a route composed of multiple URL segments. For example, the `/blog/[slug]` route is composed of three segments:

- `/` (Root Segment)
- `blog` (Segment)
- `[slug]` (Leaf Segment)

In Next.js:

- **Folders** are used to define the route segments that map to URL segments.
- **Files** (like `page` and `layout`) are used to create UI that is shown for a segment.

To create nested routes, you can nest folders inside each other. For example, to add a route for `/blog`, create a folder called `blog` in the `app` directory. Then, to make `/blog` publicly accessible, add a `page.tsx` file:

```tsx filename="app/blog/page.tsx" switcher
// Dummy imports

  const posts = await getPosts()

  return (
    <ul>
      
    </ul>
  )
}
```

```jsx filename="app/blog/[slug]/page.js" switcher
// Dummy imports

  const posts = await getPosts()

  return (
    <ul>
      
    </ul>
  )
}
```

You can continue nesting folders to create nested routes. For example, to create a route for a specific blog post, create a new `[slug]` folder inside `blog` and add a `page` file:

```tsx filename="app/blog/[slug]/page.tsx" switcher
function generateStaticParams() 

  return <h1>Hello, Blog Post Page!</h1>
}
```

```jsx filename="app/blog/[slug]/page.js" switcher
function generateStaticParams() 

  return <h1>Hello, Blog Post Page!</h1>
}
```

Wrapping a folder name in square brackets (e.g. `[slug]`) creates a [dynamic route segment](/docs/app/api-reference/file-conventions/dynamic-routes) which is used to generate multiple pages from data. e.g. blog posts, product pages, etc.

## Nesting layouts

By default, layouts in the folder hierarchy are also nested, which means they wrap child layouts via their `children` prop. You can nest layouts by adding `layout` inside specific route segments (folders).

For example, to create a layout for the `/blog` route, add a new `layout` file inside the `blog` folder.

```tsx filename="app/blog/layout.tsx" switcher

  children,
}: ) </section>
}
```

```jsx filename="app/blog/layout.js" switcher

  return <section></section>
}
```

If you were to combine the two layouts above, the root layout (`app/layout.js`) would wrap the blog layout (`app/blog/layout.js`), which would wrap the blog (`app/blog/page.js`) and blog post page (`app/blog/[slug]/page.js`).

## Creating a dynamic segment

[Dynamic segments](/docs/app/api-reference/file-conventions/dynamic-routes) allow you to create routes that are generated from data. For example, instead of manually creating a route for each individual blog post, you can create a dynamic segment to generate the routes based on blog post data.

To create a dynamic segment, wrap the segment (folder) name in square brackets: `[segmentName]`. For example, in the `app/blog/[slug]/page.tsx` route, the `[slug]` is the dynamic segment.

```tsx filename="app/blog/[slug]/page.tsx" switcher

  params,
}: >
})  = await params
  const post = await getPost(slug)

  return (
    <div>
      <h1></h1>
      <p></p>
    </div>
  )
}
```

```jsx filename="app/blog/[slug]/page.js" switcher

  const  = await params
  const post = await getPost(slug)

  return (
    <div>
      <h1></h1>
      <p></p>
    </div>
  )
}
```

Learn more about [Dynamic Segments](/docs/app/api-reference/file-conventions/dynamic-routes) and the [`params`](/docs/app/api-reference/file-conventions/page#params-optional) props.

Nested [layouts within Dynamic Segments](/docs/app/api-reference/file-conventions/layout#params-optional), can also access the `params` props.

## Rendering with search params

In a Server Component **page**, you can access search parameters using the [`searchParams`](/docs/app/api-reference/file-conventions/page#searchparams-optional) prop:

```tsx filename="app/page.tsx" switcher

  searchParams,
}: >
}) 
```

```jsx filename="app/page.jsx" switcher

  const filters = (await searchParams).filters
}
```

Using `searchParams` opts your page into [**dynamic rendering**](/docs/app/getting-started/partial-prerendering#dynamic-rendering) because it requires a incoming request to read the search parameters from.

Client Components can read search params using the [`useSearchParams`](/docs/app/api-reference/functions/use-search-params) hook.

Learn more about `useSearchParams` in [statically rendered](/docs/app/api-reference/functions/use-search-params#static-rendering) and [dynamically rendered](/docs/app/api-reference/functions/use-search-params#dynamic-rendering) routes.

### What to use and when

- Use the `searchParams` prop when you need search parameters to **load data for the page** (e.g. pagination, filtering from a database).
- Use `useSearchParams` when search parameters are used **only on the client** (e.g. filtering a list already loaded via props).
- As a small optimization, you can use `new URLSearchParams(window.location.search)` in **callbacks or event handlers** to read search params without triggering re-renders.

## Linking between pages

You can use the [`
        </li>
      ))}
    </ul>
  )
}
```

```jsx filename="app/ui/post.js" highlight=  switcher

  const posts = await getPosts()

  return (
    <ul>
      >
          
        </li>
      ))}
    </ul>
  )
}
```

> **Good to know**: `<Link>` is the primary way to navigate between routes in Next.js. You can also use the [`useRouter` hook](/docs/app/api-reference/functions/use-router) for more advanced navigation.

## Route Props Helpers

Next.js exposes utility types that infer `params` and named slots from your route structure:

- [**PageProps**](/docs/app/api-reference/file-conventions/page#page-props-helper): Props for `page` components, including `params` and `searchParams`.
- [**LayoutProps**](/docs/app/api-reference/file-conventions/layout#layout-props-helper): Props for `layout` components, including `children` and any named slots (e.g. folders like `@analytics`).

These are globally available helpers, generated when running either `next dev`, `next build` or [`next typegen`](/docs/app/api-reference/cli/next#next-typegen-options).

```tsx filename="app/blog/[slug]/page.tsx"

  const  = await props.params
  return <h1>Blog post: </h1>
}
```

```tsx filename="app/dashboard/layout.tsx"

  return (
    <section>

       */}
    </section>
  )
}
```

> **Good to know**
>
> - Static routes resolve `params` to ``.
> - `PageProps`, `LayoutProps` are global helpers — no imports required.
> - Types are generated during `next dev`, `next build` or `next typegen`.