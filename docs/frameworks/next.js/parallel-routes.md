---
title: Parallel Routes
description: Simultaneously render one or more pages in the same view that can be navigated independently. A pattern for highly dynamic applications.
related:
  links:
    - app/api-reference/file-conventions/default
---

Parallel Routes allows you to simultaneously or conditionally render one or more pages within the same layout. They are useful for highly dynamic sections of an app, such as dashboards and feeds on social sites.

For example, considering a dashboard, you can use parallel routes to simultaneously render the `team` and `analytics` pages:

## Convention

### Slots

Parallel routes are created using named **slots**. Slots are defined with the `@folder` convention. For example, the following file structure defines two slots: `@analytics` and `@team`:

Slots are passed as props to the shared parent layout. For the example above, the component in `app/layout.js` now accepts the `@analytics` and `@team` slots props, and can render them in parallel alongside the `children` prop:

```tsx filename="app/layout.tsx" switcher

  children,
  team,
  analytics,
}: )

    </>
  )
}
```

```jsx filename="app/layout.js" switcher

  return (
    <>

    </>
  )
}
```

However, slots are **not** route segments and do not affect the URL structure. For example, for `/@analytics/views`, the URL will be `/views` since `@analytics` is a slot. Slots are combined with the regular [Page](/docs/app/api-reference/file-conventions/page) component to form the final page associated with the route segment. Because of this, you cannot have separate [static](/docs/app/getting-started/partial-prerendering#static-rendering) and [dynamic](/docs/app/getting-started/partial-prerendering#dynamic-rendering) slots at the same route segment level. If one slot is dynamic, all slots at that level must be dynamic.

> **Good to know**:
>
> - The `children` prop is an implicit slot that does not need to be mapped to a folder. This means `app/page.js` is equivalent to `app/@children/page.js`.

### `default.js`

You can define a `default.js` file to render as a fallback for unmatched slots during the initial load or full-page reload.

Consider the following folder structure. The `@team` slot has a `/settings` page, but `@analytics` does not.

When navigating to `/settings`, the `@team` slot will render the `/settings` page while maintaining the currently active page for the `@analytics` slot.

On refresh, Next.js will render a `default.js` for `@analytics`. If `default.js` doesn't exist, a `404` is rendered instead.

Additionally, since `children` is an implicit slot, you also need to create a `default.js` file to render a fallback for `children` when Next.js cannot recover the active state of the parent page.

## Behavior

By default, Next.js keeps track of the active _state_ (or subpage) for each slot. However, the content rendered within a slot will depend on the type of navigation:

- [**Soft Navigation**](/docs/app/getting-started/linking-and-navigating#client-side-transitions): During client-side navigation, Next.js will perform a [partial render](/docs/app/getting-started/linking-and-navigating#client-side-transitions), changing the subpage within the slot, while maintaining the other slot's active subpages, even if they don't match the current URL.
- **Hard Navigation**: After a full-page load (browser refresh), Next.js cannot determine the active state for the slots that don't match the current URL. Instead, it will render a [`default.js`](#defaultjs) file for the unmatched slots, or `404` if `default.js` doesn't exist.

> **Good to know**:
>
> - The `404` for unmatched routes helps ensure that you don't accidentally render a parallel route on a page that it was not intended for.

## Examples

### With `useSelectedLayoutSegment(s)`

Both [`useSelectedLayoutSegment`](/docs/app/api-reference/functions/use-selected-layout-segment) and [`useSelectedLayoutSegments`](/docs/app/api-reference/functions/use-selected-layout-segments) accept a `parallelRoutesKey` parameter, which allows you to read the active route segment within a slot.

```tsx filename="app/layout.tsx" switcher
'use client'

  const loginSegment = useSelectedLayoutSegment('auth')
  // ...
}
```

```jsx filename="app/layout.js" switcher
'use client'

  const loginSegment = useSelectedLayoutSegment('auth')
  // ...
}
```

When a user navigates to `app/@auth/login` (or `/login` in the URL bar), `loginSegment` will be equal to the string `"login"`.

### Conditional Routes

You can use Parallel Routes to conditionally render routes based on certain conditions, such as user role. For example, to render a different dashboard page for the `/admin` or `/user` roles:

```tsx filename="app/dashboard/layout.tsx" switcher

  user,
  admin,
}: )
```

```jsx filename="app/dashboard/layout.js" switcher

  const role = checkUserRole()
  return role === 'admin' ? admin : user
}
```

### Tab Groups

You can add a `layout` inside a slot to allow users to navigate the slot independently. This is useful for creating tabs.

For example, the `@analytics` slot has two subpages: `/page-views` and `/visitors`.

Within `@analytics`, create a [`layout`](/docs/app/api-reference/file-conventions/layout) file to share the tabs between the two pages:

```tsx filename="app/@analytics/layout.tsx" switcher

  return (
    <>
      <nav>

      </nav>
      <div></div>
    </>
  )
}
```

```jsx filename="app/@analytics/layout.js" switcher

  return (
    <>
      <nav>

      </nav>
      <div></div>
    </>
  )
}
```

### Modals

Parallel Routes can be used together with [Intercepting Routes](/docs/app/api-reference/file-conventions/intercepting-routes) to create modals that support deep linking. This allows you to solve common challenges when building modals, such as:

- Making the modal content **shareable through a URL**.
- **Preserving context** when the page is refreshed, instead of closing the modal.
- **Closing the modal on backwards navigation** rather than going to the previous route.
- **Reopening the modal on forwards navigation**.

Consider the following UI pattern, where a user can open a login modal from a layout using client-side navigation, or access a separate `/login` page:

To implement this pattern, start by creating a `/login` route that renders your **main** login page.

```tsx filename="app/login/page.tsx" switcher

  return
}
```

```jsx filename="app/login/page.js" switcher

  return
}
```

Then, inside the `@auth` slot, add [`default.js`](/docs/app/api-reference/file-conventions/default) file that returns `null`. This ensures that the modal is not rendered when it's not active.

```tsx filename="app/@auth/default.tsx" switcher

  return null
}
```

```jsx filename="app/@auth/default.js" switcher

  return null
}
```

Inside your `@auth` slot, intercept the `/login` route by importing the `
)
}

````

```jsx filename="app/@auth/(.)login/page.js" switcher

  return (

  )
}
````

> **Good to know:**
>
> - The convention `(.)` is used for intercepting routes. See [Intercepting Routes](/docs/app/api-reference/file-conventions/intercepting-routes#convention) docs for more information.
> - By separating the `<Modal>` functionality from the modal content (`<Login>`), you can ensure any content inside the modal, e.g. [forms](/docs/app/guides/forms), are Server Components. See [Interleaving Client and Server Components](/docs/app/getting-started/server-and-client-components#examples#supported-pattern-passing-server-components-to-client-components-as-props) for more information.

#### Opening the modal

Now, you can leverage the Next.js router to open and close the modal. This ensures the URL is correctly updated when the modal is open, and when navigating backwards and forwards.

To open the modal, pass the `@auth` slot as a prop to the parent layout and render it alongside the `children` prop.

```tsx filename="app/layout.tsx" switcher

  auth,
  children,
}: ) </div>
      <div></div>
    </>
  )
}
```

```jsx filename="app/layout.js" switcher

  return (
    <>
      <nav>

      </nav>
      <div></div>
      <div></div>
    </>
  )
}
```

When the user clicks the `

<div></div>
</>
)
}

````

```jsx filename="app/ui/modal.js" switcher

  return (
    <>

      <div></div>
    </>
  )
}
````

```tsx filename="app/@auth/page.tsx" switcher

  return null
}
```

```jsx filename="app/@auth/page.js" switcher

  return null
}
```

Or if navigating to any other page (such as `/foo`, `/foo/bar`, etc), you can use a catch-all slot:

```tsx filename="app/@auth/[...catchAll]/page.tsx" switcher

  return null
}
```

```jsx filename="app/@auth/[...catchAll]/page.js" switcher

  return null
}
```

> **Good to know:**
>
> - We use a catch-all route in our `@auth` slot to close the modal because of how parallel routes behave. Since client-side navigations to a route that no longer match the slot will remain visible, we need to match the slot to a route that returns `null` to close the modal.
> - Other examples could include opening a photo modal in a gallery while also having a dedicated `/photo/[id]` page, or opening a shopping cart in a side modal.
> - [View an example](https://github.com/vercel-labs/nextgram) of modals with Intercepted and Parallel Routes.

### Loading and Error UI

Parallel Routes can be streamed independently, allowing you to define independent error and loading states for each route:

See the [Loading UI](/docs/app/api-reference/file-conventions/loading) and [Error Handling](/docs/app/getting-started/error-handling) documentation for more information.
