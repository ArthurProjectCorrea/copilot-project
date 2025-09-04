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


export default function NavLink() {
  return <!-- Link -->About
}
```

```jsx filename="app/ui/nav-link.js" switcher


export default function NavLink() {
  return <!-- Link -->About
}
```

| **Context**       | **Prefetched payload**           | **Client Cache TTL**                                                           |
| ----------------- | -------------------------------- | ------------------------------------------------------------------------------ |
| No `loading.js`   | Entire page                      | Until app reload                                                               |
| With `loading.js` | Layout to first loading boundary | 30s ([configurable](/docs/app/api-reference/config/next-config-js/staleTimes)) |

Automatic prefetching runs only in production. Disable with `prefetch={false}` or use the wrapper in [Disabled Prefetch](#disabled-prefetch).

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




export function HoverPrefetchLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const [active, setActive] = useState(false)

  return (
    <!-- Link --> setActive(true)}
    >
      {children}

  )
}
```

`prefetch={null}` restores default (static) prefetching once the user shows intent.

## Extending or ejecting link

You can extend the `<!-- Link -->` component to create your own custom prefetching strategy. For example, using the [ForesightJS](https://foresightjs.com/docs/integrations/nextjs) library which prefetches links by predicting the direction of the user's cursor.

Alternatively, you can use [`useRouter`](/docs/app/api-reference/functions/use-router) to recreate some of the native `<!-- Link -->` behavior. However, be aware this opts you into maintaining prefetching and cache invalidation.

```tsx
'use client'




function ManualPrefetchLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    let cancelled = false
    const poll = () => {
      if (!cancelled) router.prefetch(href, { onInvalidate: poll })
    }
    poll()
    return () => {
      cancelled = true
    }
  }, [href, router])

  return (
    <!-- a --> {
        event.preventDefault()
        router.push(href)
      }}
    >
      {children}

  )
}
```

[`onInvalidate`](/docs/app/api-reference/functions/use-router#userouter) is invoked when Next.js suspects cached data is stale, allowing you to refresh the prefetch.

> **Good to know:** Using an `a` tag will cause a full page navigation to the destination route, you can use `onClick` to prevent the full page navigation, and then invoke `router.push` to navigate to the destination.

## Disabled prefetch

You can fully disable prefetching for certain routes for more fine-grained control over resource consumption.

```tsx
'use client'



function NoPrefetchLink({
  prefetch,
  ...rest
}: LinkProps & { children: React.ReactNode }) {
  return <!-- Link -->
}
```

For example, you may still want to have consistent usage of `<!-- Link -->` in your application, but links in your footer might not need to be prefetched when entering the viewport.

## Prefetching optimizations

> **Good to know:** Layout deduplication and prefetch scheduling are part of upcoming optimizations. Currently available in Next.js canary via the `experimental.clientSegmentCache` flag.

### Client cache

Next.js stores prefetched React Server Component payloads in memory, keyed by route segments. When navigating between sibling routes (e.g. `/dashboard/settings` → `/dashboard/analytics`), it reuses the parent layout and only fetches the updated leaf page. This reduces network traffic and improves navigation speed.

### Prefetch scheduling

Next.js maintains a small task queue, which prefetches in the following order:

1. Links in the viewport
2. Links showing user intent (hover or touch)
3. Newer links replace older ones
4. Links scrolled off-screen are discarded

The scheduler prioritizes likely navigations while minimizing unused downloads.

### Partial Prerendering (PPR)

When PPR is enabled, a page is divided into a static shell and a streamed dynamic section:

- The shell, which can be prefetched, streams immediately
- Dynamic data streams when ready
- Data invalidations (`revalidateTag`, `revalidatePath`) silently refresh associated prefetches

## Troubleshooting

### Triggering unwanted side-effects during prefetching

If your layouts or pages are not [pure](https://react.dev/learn/keeping-components-pure#purity-components-as-formulas) and have side-effects (e.g. tracking analytics), these might be triggered when the route is prefetched, not when the user visits the page.

To avoid this, you should move side-effects to a `useEffect` hook or a Server Action triggered from a Client Component.

**Before**:

```tsx filename="app/dashboard/layout.tsx" switcher


export default function Layout({ children }: { children: React.ReactNode }) {
  // This runs during prefetch
  trackPageView()

  return <!-- div -->{children}
}
```

```jsx filename="app/dashboard/layout.js" switcher


export default function Layout({ children }) {
  // This runs during prefetch
  trackPageView()

  return <!-- div -->{children}
}
```

**After**:

```tsx filename="app/ui/analytics-tracker.tsx" switcher
'use client';

export function AnalyticsTracker() {
  useEffect(() => {
    trackPageView();
  }, []);

  return null;
}
```

```jsx filename="app/ui/analytics-tracker.js" switcher
'use client';

export function AnalyticsTracker() {
  useEffect(() => {
    trackPageView();
  }, []);

  return null;
}
```

```tsx filename="app/dashboard/layout.tsx" switcher


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <!-- div -->
      <!-- AnalyticsTracker -->
      {children}

  )
}
```

```jsx filename="app/dashboard/layout.js" switcher


export default function Layout({ children }) {
  return (
    <!-- div -->
      <!-- AnalyticsTracker -->
      {children}

  )
}
```

### Preventing too many prefetches

Next.js automatically prefetches links in the viewport when using the `<!-- Link -->` component.

There may be cases where you want to prevent this to avoid unnecessary usage of resources, such as when rendering a large list of links (e.g. an infinite scroll table).

You can disable prefetching by setting the `prefetch` prop of the `<!-- Link -->` component to `false`.

```tsx filename="app/ui/no-prefetch-link.tsx" switcher
<!-- Link -->
  {post.title}

```

However, this means static routes will only be fetched on click, and dynamic routes will wait for the server to render before navigating.

To reduce resource usage without disabling prefetch entirely, you can defer prefetching until the user hovers over a link. This targets only links the user is likely to visit.

```tsx filename="app/ui/hover-prefetch-link.tsx" switcher
'use client'




export function HoverPrefetchLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const [active, setActive] = useState(false)

  return (
    <!-- Link --> setActive(true)}
    >
      {children}

  )
}
```

```jsx filename="app/ui/hover-prefetch-link.js" switcher
'use client'




export function HoverPrefetchLink({ href, children }) {
  const [active, setActive] = useState(false)

  return (
    <!-- Link --> setActive(true)}
    >
      {children}

  )
}
```
