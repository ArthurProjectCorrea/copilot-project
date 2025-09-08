---
title: Prefetching
description: Learn how to configure prefetching in Next.js
---

Prefetching makes navigating between different routes in your application feel instant. Next.js tries to intelligently prefetch by default, based on the links used in your application code.

This guide will explain how prefetching works and show common implementation patterns:

- [Automatic prefetch](#automatic-prefetch)
- [Manual prefetch](#manual-prefetch)
- [Hover-triggered prefetch](#hover-triggered-prefetch)
- [Extending or ejecting link](#extending-or-ejecting-link)
- [Disabled prefetch](#disabled-prefetch)

## How does prefetching work?

When navigating between routes, the browser requests assets for the page like HTML and JavaScript files. Prefetching is the process of fetching these resources _ahead_ of time, before you navigate to a new route.

Next.js automatically splits your application into smaller JavaScript chunks based on routes. Instead of loading all the code upfront like traditional SPAs, only the code needed for the current route is loaded. This reduces the initial load time while other parts of the app are loaded in the background. By the time you click the link, the resources for the new route have already been loaded into the browser cache.

When navigating to the new page, there's no full page reload or browser loading spinner. Instead, Next.js performs a [client-side transition](/docs/app/getting-started/linking-and-navigating#client-side-transitions), making the page navigation feel instant.

## Prefetching static vs. dynamic routes

|                                                                   | **Static page** | **Dynamic page**                                                                                               |
| ----------------------------------------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------- |
| **Prefetched**                                                    | Yes, full route | No, unless [`loading.js`](/docs/app/api-reference/file-conventions/loading)                                    |
| [**Client Cache TTL**](/docs/app/guides/caching#full-route-cache) | 5 min (default) | Off, unless [enabled](/docs/app/api-reference/config/next-config-js/staleTimes)                                |
| **Server roundtrip on click**                                     | No              | Yes, streamed after [shell](/docs/app/getting-started/partial-prerendering#how-does-partial-prerendering-work) |

> **Good to know:** During the initial navigation, the browser fetches the HTML, JavaScript, and React Server Components (RSC) Payload. For subsequent navigations, the browser will fetch the RSC Payload for Server Components and JS bundle for Client Components.

## Automatic prefetch

```tsx filename="app/ui/nav-link.tsx" switcher

  return
}
```

```jsx filename="app/ui/nav-link.js" switcher

  return
}
```

| **Context**       | **Prefetched payload**           | **Client Cache TTL**                                                           |
| ----------------- | -------------------------------- | ------------------------------------------------------------------------------ |
| No `loading.js`   | Entire page                      | Until app reload                                                               |
| With `loading.js` | Layout to first loading boundary | 30s ([configurable](/docs/app/api-reference/config/next-config-js/staleTimes)) |

Automatic prefetching runs only in production. Disable with `prefetch=` or use the wrapper in [Disabled Prefetch](#disabled-prefetch).

## Manual prefetch

```tsx
'use client';

const router = useRouter();
router.prefetch('/pricing');
```

Call `router.prefetch()` to warm routes outside the viewport or in response to analytics, hover, scroll, etc.

## Hover-triggered prefetch

> **Proceed with caution:** Extending `Link` opts you into maintaining prefetching, cache invalidation, and accessibility concerns. Proceed only if defaults are insufficient.

Next.js tries to do the right prefetching by default, but power users can eject and modify based on their needs. You have the control between performance and resource consumption.

For example, you might have to only trigger prefetches on hover, instead of when entering the viewport (the default behavior):

```tsx
'use client'

  href,
  children,
}: )
```

`prefetch=` restores default (static) prefetching once the user shows intent.

## Extending or ejecting link

You can extend the `

````

However, this means static routes will only be fetched on click, and dynamic routes will wait for the server to render before navigating.

To reduce resource usage without disabling prefetch entirely, you can defer prefetching until the user hovers over a link. This targets only links the user is likely to visit.

```tsx filename="app/ui/hover-prefetch-link.tsx" switcher
'use client'

  href,
  children,
}: )
````

```jsx filename="app/ui/hover-prefetch-link.js" switcher
'use client'

  const [active, setActive] = useState(false)

  return (

  )
}
```
