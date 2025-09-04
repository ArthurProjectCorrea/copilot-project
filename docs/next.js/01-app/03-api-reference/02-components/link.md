---
title: Link Component
description: Enable fast client-side navigation with the built-in `next/link` component.
---

{/_ The content of this doc is shared between the app and pages router. You can use the `<!-- PagesOnly -->Content` component to add content that is specific to the Pages Router. Any shared content should not be wrapped in a component. _/}

`<!-- Link -->` is a React component that extends the HTML `<!-- a -->` element to provide [prefetching](/docs/app/getting-started/linking-and-navigating#prefetching) and client-side navigation between routes. It is the primary way to navigate between routes in Next.js.

Basic usage:

<!-- AppOnly -->

```tsx filename="app/page.tsx" switcher


export default function Page() {
  return <!-- Link -->Dashboard
}
```

```jsx filename="app/page.js" switcher


export default function Page() {
  return <!-- Link -->Dashboard
}
```

<!-- PagesOnly -->

```tsx filename="pages/index.tsx" switcher


export default function Home() {
  return <!-- Link -->Dashboard
}
```

```jsx filename="pages/index.js" switcher


export default function Home() {
  return <!-- Link -->Dashboard
}
```

## Reference

The following props can be passed to the `<!-- Link -->` component:

<!-- PagesOnly -->

| Prop                        | Example                  | Type              | Required |
| --------------------------- | ------------------------ | ----------------- | -------- |
| [`href`](#href-required)    | `href="/dashboard"`      | String or Object  | Yes      |
| [`replace`](#replace)       | `replace={false}`        | Boolean           | -        |
| [`scroll`](#scroll)         | `scroll={false}`         | Boolean           | -        |
| [`prefetch`](#prefetch)     | `prefetch={false}`       | Boolean           | -        |
| [`shallow`](#shallow)       | `shallow={false}`        | Boolean           | -        |
| [`locale`](#locale)         | `locale="fr"`            | String or Boolean | -        |
| [`onNavigate`](#onnavigate) | `onNavigate={(e) => {}}` | Function          | -        |

<!-- AppOnly -->

| Prop                        | Example                  | Type             | Required |
| --------------------------- | ------------------------ | ---------------- | -------- |
| [`href`](#href-required)    | `href="/dashboard"`      | String or Object | Yes      |
| [`replace`](#replace)       | `replace={false}`        | Boolean          | -        |
| [`scroll`](#scroll)         | `scroll={false}`         | Boolean          | -        |
| [`prefetch`](#prefetch)     | `prefetch={false}`       | Boolean or null  | -        |
| [`onNavigate`](#onnavigate) | `onNavigate={(e) => {}}` | Function         | -        |

> **Good to know**: `<!-- a -->` tag attributes such as `className` or `target="_blank"` can be added to `<!-- Link -->` as props and will be passed to the underlying `<!-- a -->` element.

### `href` (required)

The path or URL to navigate to.

<!-- AppOnly -->

```tsx filename="app/page.tsx" switcher


// Navigate to /about?name=test
export default function Page() {
  return (
    <!-- Link -->
      About

  )
}
```

```jsx filename="app/page.js" switcher


// Navigate to /about?name=test
export default function Page() {
  return (
    <!-- Link -->
      About

  )
}
```

<!-- PagesOnly -->

```tsx filename="pages/index.tsx" switcher


// Navigate to /about?name=test
export default function Home() {
  return (
    <!-- Link -->
      About

  )
}
```

```jsx filename="pages/index.js" switcher


// Navigate to /about?name=test
export default function Home() {
  return (
    <!-- Link -->
      About

  )
}
```

### `replace`

**Defaults to `false`.** When `true`, `next/link` will replace the current history state instead of adding a new URL into the [browser's history](https://developer.mozilla.org/docs/Web/API/History_API) stack.

<!-- AppOnly -->

```tsx filename="app/page.tsx" switcher


export default function Page() {
  return (
    <!-- Link -->
      Dashboard

  )
}
```

```jsx filename="app/page.js" switcher


export default function Page() {
  return (
    <!-- Link -->
      Dashboard

  )
}
```

<!-- PagesOnly -->

```tsx filename="pages/index.tsx" switcher


export default function Home() {
  return (
    <!-- Link -->
      Dashboard

  )
}
```

```jsx filename="pages/index.js" switcher


export default function Home() {
  return (
    <!-- Link -->
      Dashboard

  )
}
```

### `scroll`

**Defaults to `true`.** The default scrolling behavior of `<!-- Link -->` in Next.js **is to maintain scroll position**, similar to how browsers handle back and forwards navigation. When you navigate to a new [Page](/docs/app/api-reference/file-conventions/page), scroll position will stay the same as long as the Page is visible in the viewport. However, if the Page is not visible in the viewport, Next.js will scroll to the top of the first Page element.

When `scroll = {false}`, Next.js will not attempt to scroll to the first Page element.

> **Good to know**: Next.js checks if `scroll: false` before managing scroll behavior. If scrolling is enabled, it identifies the relevant DOM node for navigation and inspects each top-level element. All non-scrollable elements and those without rendered HTML are bypassed, this includes sticky or fixed positioned elements, and non-visible elements such as those calculated with `getBoundingClientRect`. Next.js then continues through siblings until it identifies a scrollable element that is visible in the viewport.

<!-- AppOnly -->

```tsx filename="app/page.tsx" switcher


export default function Page() {
  return (
    <!-- Link -->
      Dashboard

  )
}
```

```jsx filename="app/page.js" switcher


export default function Page() {
  return (
    <!-- Link -->
      Dashboard

  )
}
```

<!-- PagesOnly -->

```tsx filename="pages/index.tsx" switcher


export default function Home() {
  return (
    <!-- Link -->
      Dashboard

  )
}
```

```jsx filename="pages/index.js" switcher


export default function Home() {
  return (
    <!-- Link -->
      Dashboard

  )
}
```

### `prefetch`

<!-- AppOnly -->

Prefetching happens when a `<!-- Link -->` component enters the user's viewport (initially or through scroll). Next.js prefetches and loads the linked route (denoted by the `href`) and its data in the background to improve the performance of client-side navigations. If the prefetched data has expired by the time the user hovers over a `<!-- Link -->`, Next.js will attempt to prefetch it again. **Prefetching is only enabled in production**.

The following values can be passed to the `prefetch` prop:

- **`"auto"` or `null` (default)**: Prefetch behavior depends on whether the route is static or dynamic. For static routes, the full route will be prefetched (including all its data). For dynamic routes, the partial route down to the nearest segment with a [`loading.js`](/docs/app/api-reference/file-conventions/loading#instant-loading-states) boundary will be prefetched.
- `true`: The full route will be prefetched for both static and dynamic routes.
- `false`: Prefetching will never happen both on entering the viewport and on hover.

```tsx filename="app/page.tsx" switcher


export default function Page() {
  return (
    <!-- Link -->
      Dashboard

  )
}
```

```jsx filename="app/page.js" switcher


export default function Page() {
  return (
    <!-- Link -->
      Dashboard

  )
}
```

<!-- PagesOnly -->

Prefetching happens when a `<!-- Link -->` component enters the user's viewport (initially or through scroll). Next.js prefetches and loads the linked route (denoted by the `href`) and data in the background to improve the performance of client-side navigation's. **Prefetching is only enabled in production**.

The following values can be passed to the `prefetch` prop:

- **`true` (default)**: The full route and its data will be prefetched.
- `false`: Prefetching will not happen when entering the viewport, but will happen on hover. If you want to completely remove fetching on hover as well, consider using an `<!-- a -->` tag or [incrementally adopting](/docs/app/guides/migrating/app-router-migration) the App Router, which enables disabling prefetching on hover too.

```tsx filename="pages/index.tsx" switcher


export default function Home() {
  return (
    <!-- Link -->
      Dashboard

  )
}
```

```jsx filename="pages/index.js" switcher


export default function Home() {
  return (
    <!-- Link -->
      Dashboard

  )
}
```

### `shallow`

Update the path of the current page without rerunning [`getStaticProps`](/docs/pages/building-your-application/data-fetching/get-static-props), [`getServerSideProps`](/docs/pages/building-your-application/data-fetching/get-server-side-props) or [`getInitialProps`](/docs/pages/api-reference/functions/get-initial-props). Defaults to `false`.

```tsx filename="pages/index.tsx" switcher


export default function Home() {
  return (
    <!-- Link -->
      Dashboard

  )
}
```

```jsx filename="pages/index.js" switcher


export default function Home() {
  return (
    <!-- Link -->
      Dashboard

  )
}
```

### `locale`

The active locale is automatically prepended. `locale` allows for providing a different locale. When `false` `href` has to include the locale as the default behavior is disabled.

```tsx filename="pages/index.tsx" switcher


export default function Home() {
  return (
    <>
      {/* Default behavior: locale is prepended */}
      <!-- Link -->Dashboard (with locale)

      {/* Disable locale prepending */}
      <!-- Link -->
        Dashboard (without locale)


      {/* Specify a different locale */}
      <!-- Link -->
        Dashboard (French)

    </>
  )
}
```

```jsx filename="pages/index.js" switcher


export default function Home() {
  return (
    <>
      {/* Default behavior: locale is prepended */}
      <!-- Link -->Dashboard (with locale)

      {/* Disable locale prepending */}
      <!-- Link -->
        Dashboard (without locale)


      {/* Specify a different locale */}
      <!-- Link -->
        Dashboard (French)

    </>
  )
}
```

### `onNavigate`

An event handler called during client-side navigation. The handler receives an event object that includes a `preventDefault()` method, allowing you to cancel the navigation if needed.

```tsx filename="app/page.tsx" switcher


export default function Page() {
  return (
    <!-- Link --> {
        // Only executes during SPA navigation
        console.log('Navigating...')

        // Optionally prevent navigation
        // e.preventDefault()
      }}
    >
      Dashboard

  )
}
```

```jsx filename="app/page.js" switcher


export default function Page() {
  return (
    <!-- Link --> {
        // Only executes during SPA navigation
        console.log('Navigating...')

        // Optionally prevent navigation
        // e.preventDefault()
      }}
    >
      Dashboard

  )
}
```

> **Good to know**: While `onClick` and `onNavigate` may seem similar, they serve different purposes. `onClick` executes for all click events, while `onNavigate` only runs during client-side navigation. Some key differences:
>
> - When using modifier keys (`Ctrl`/`Cmd` + Click), `onClick` executes but `onNavigate` doesn't since Next.js prevents default navigation for new tabs.
> - External URLs won't trigger `onNavigate` since it's only for client-side and same-origin navigations.
> - Links with the `download` attribute will work with `onClick` but not `onNavigate` since the browser will treat the linked URL as a download.

## Examples

The following examples demonstrate how to use the `<!-- Link -->` component in different scenarios.

<!-- AppOnly -->

### Linking to dynamic route segments

When linking to [dynamic segments](/docs/app/api-reference/file-conventions/dynamic-routes), you can use [template literals and interpolation](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Template_literals) to generate a list of links. For example, to generate a list of blog posts:

```tsx filename="app/blog/post-list.tsx" switcher


interface Post {
  id: number
  title: string
  slug: string
}

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <!-- ul -->
      {posts.map((post) => (
        <!-- li -->
          <!-- Link -->{post.title}

      ))}

  )
}
```

```jsx filename="app/blog/post-list.js" switcher


export default function PostList({ posts }) {
  return (
    <!-- ul -->
      {posts.map((post) => (
        <!-- li -->
          <!-- Link -->{post.title}

      ))}

  )
}
```

### Checking active links

You can use [`usePathname()`](/docs/app/api-reference/functions/use-pathname) to determine if a link is active. For example, to add a class to the active link, you can check if the current `pathname` matches the `href` of the link:

```tsx filename="app/ui/nav-links.tsx" switcher
'use client'




export function Links() {
  const pathname = usePathname()

  return (
    <!-- nav -->
      <!-- Link -->
        Home


      <!-- Link -->
        About


  )
}
```

```jsx filename="app/ui/nav-links.js" switcher
'use client'




export function Links() {
  const pathname = usePathname()

  return (
    <!-- nav -->
      <!-- Link -->
        Home


      <!-- Link -->
        About


  )
}
```

<!-- PagesOnly -->

### Linking to dynamic route segments

For [dynamic route segments](/docs/pages/building-your-application/routing/dynamic-routes#convention), it can be handy to use template literals to create the link's path.

For example, you can generate a list of links to the dynamic route `pages/blog/[slug].js`

```tsx filename="pages/blog/index.tsx" switcher


function Posts({ posts }) {
  return (
    <!-- ul -->
      {posts.map((post) => (
        <!-- li -->
          <!-- Link -->{post.title}

      ))}

  )
}
```

```jsx filename="pages/blog/index.js" switcher


function Posts({ posts }) {
  return (
    <!-- ul -->
      {posts.map((post) => (
        <!-- li -->
          <!-- Link -->{post.title}

      ))}

  )
}

export default Posts
```

### Scrolling to an `id`

If you'd like to scroll to a specific `id` on navigation, you can append your URL with a `#` hash link or just pass a hash link to the `href` prop. This is possible since `<!-- Link -->` renders to an `<!-- a -->` element.

```jsx
<!-- Link -->Settings

// Output
<!-- a -->Settings
```

<!-- AppOnly -->

> **Good to know**:
>
> - Next.js will scroll to the [Page](/docs/app/api-reference/file-conventions/page) if it is not visible in the viewport upon navigation.

<!-- PagesOnly -->

### Passing a URL Object

`Link` can also receive a URL object and it will automatically format it to create the URL string:

```tsx filename="pages/index.ts" switcher


function Home() {
  return (
    <!-- ul -->
      <!-- li -->
        <!-- Link -->
          About us


      <!-- li -->
        <!-- Link -->
          Blog Post



  )
}

export default Home
```

```jsx filename="pages/index.js" switcher


function Home() {
  return (
    <!-- ul -->
      <!-- li -->
        <!-- Link -->
          About us


      <!-- li -->
        <!-- Link -->
          Blog Post



  )
}

export default Home
```

The above example has a link to:

- A predefined route: `/about?name=test`
- A [dynamic route](/docs/pages/building-your-application/routing/dynamic-routes#convention): `/blog/my-post`

You can use every property as defined in the [Node.js URL module documentation](https://nodejs.org/api/url.html#url_url_strings_and_url_objects).

### Replace the URL instead of push

The default behavior of the `Link` component is to `push` a new URL into the `history` stack. You can use the `replace` prop to prevent adding a new entry, as in the following example:

<!-- AppOnly -->

```tsx filename="app/page.js" switcher


export default function Page() {
  return (
    <!-- Link -->
      About us

  )
}
```

```jsx filename="app/page.js" switcher


export default function Page() {
  return (
    <!-- Link -->
      About us

  )
}
```

<!-- PagesOnly -->

```tsx filename="pages/index.js" switcher


export default function Home() {
  return (
    <!-- Link -->
      About us

  )
}
```

```jsx filename="pages/index.js" switcher


export default function Home() {
  return (
    <!-- Link -->
      About us

  )
}
```

### Disable scrolling to the top of the page

<!-- AppOnly -->

The default scrolling behavior of `<!-- Link -->` in Next.js **is to maintain scroll position**, similar to how browsers handle back and forwards navigation. When you navigate to a new [Page](/docs/app/api-reference/file-conventions/page), scroll position will stay the same as long as the Page is visible in the viewport.

However, if the Page is not visible in the viewport, Next.js will scroll to the top of the first Page element. If you'd like to disable this behavior, you can pass `scroll={false}` to the `<!-- Link -->` component, or `scroll: false` to `router.push()` or `router.replace()`.

```jsx filename="app/page.js" switcher


export default function Page() {
  return (
    <!-- Link -->
      Disables scrolling to the top

  )
}
```

```tsx filename="app/page.tsx" switcher


export default function Page() {
  return (
    <!-- Link -->
      Disables scrolling to the top

  )
}
```

Using `router.push()` or `router.replace()`:

```jsx
// useRouter

const router = useRouter();

router.push('/dashboard', { scroll: false });
```

<!-- PagesOnly -->

The default behavior of `Link` is to scroll to the top of the page. When there is a hash defined it will scroll to the specific id, like a normal `<!-- a -->` tag. To prevent scrolling to the top / hash `scroll={false}` can be added to `Link`:

```jsx filename="pages/index.js" switcher


export default function Home() {
  return (
    <!-- Link -->
      Disables scrolling to the top

  )
}
```

```tsx filename="pages/index.tsx" switcher


export default function Home() {
  return (
    <!-- Link -->
      Disables scrolling to the top

  )
}
```

### Prefetching links in Middleware

It's common to use [Middleware](/docs/app/api-reference/file-conventions/middleware) for authentication or other purposes that involve rewriting the user to a different page. In order for the `<!-- Link -->` component to properly prefetch links with rewrites via Middleware, you need to tell Next.js both the URL to display and the URL to prefetch. This is required to avoid un-necessary fetches to middleware to know the correct route to prefetch.

For example, if you want to serve a `/dashboard` route that has authenticated and visitor views, you can add the following in your Middleware to redirect the user to the correct page:

```ts filename="middleware.ts" switcher
export function middleware(request: Request) {
  const nextUrl = request.nextUrl;
  if (nextUrl.pathname === '/dashboard') {
    if (request.cookies.authToken) {
      return NextResponse.rewrite(new URL('/auth/dashboard', request.url));
    } else {
      return NextResponse.rewrite(new URL('/public/dashboard', request.url));
    }
  }
}
```

```js filename="middleware.js" switcher
export function middleware(request) {
  const nextUrl = request.nextUrl;
  if (nextUrl.pathname === '/dashboard') {
    if (request.cookies.authToken) {
      return NextResponse.rewrite(new URL('/auth/dashboard', request.url));
    } else {
      return NextResponse.rewrite(new URL('/public/dashboard', request.url));
    }
  }
}
```

In this case, you would want to use the following code in your `<!-- Link -->` component:

<!-- AppOnly -->

```tsx filename="app/page.tsx" switcher
'use client'




export default function Page() {
  const isAuthed = useIsAuthed()
  const path = isAuthed ? '/auth/dashboard' : '/public/dashboard'
  return (
    <!-- Link -->
      Dashboard

  )
}
```

```js filename="app/page.js" switcher
'use client'




export default function Page() {
  const isAuthed = useIsAuthed()
  const path = isAuthed ? '/auth/dashboard' : '/public/dashboard'
  return (
    <!-- Link -->
      Dashboard

  )
}
```

<!-- PagesOnly -->

```tsx filename="pages/index.tsx" switcher
'use client'




export default function Home() {
  const isAuthed = useIsAuthed()
  const path = isAuthed ? '/auth/dashboard' : '/public/dashboard'
  return (
    <!-- Link -->
      Dashboard

  )
}
```

```js filename="pages/index.js" switcher
'use client'




export default function Home() {
  const isAuthed = useIsAuthed()
  const path = isAuthed ? '/auth/dashboard' : '/public/dashboard'
  return (
    <!-- Link -->
      Dashboard

  )
}
```

> **Good to know**: If you're using [Dynamic Routes](/docs/pages/building-your-application/routing/dynamic-routes#convention), you'll need to adapt your `as` and `href` props. For example, if you have a Dynamic Route like `/dashboard/authed/[user]` that you want to present differently via middleware, you would write: `<!-- Link -->Profile`.

<!-- AppOnly -->

### Blocking navigation

You can use the `onNavigate` prop to block navigation when certain conditions are met, such as when a form has unsaved changes. When you need to block navigation across multiple components in your app (like preventing navigation from any link while a form is being edited), React Context provides a clean way to share this blocking state. First, create a context to track the navigation blocking state:

```tsx filename="app/contexts/navigation-blocker.tsx" switcher
'use client'



interface NavigationBlockerContextType {
  isBlocked: boolean
  setIsBlocked: (isBlocked: boolean) => void
}

export const NavigationBlockerContext =
  createContext<!-- NavigationBlockerContextType -->({
    isBlocked: false,
    setIsBlocked: () => {},
  })

export function NavigationBlockerProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isBlocked, setIsBlocked] = useState(false)

  return (
    <!-- NavigationBlockerContext -->
      {children}
    </NavigationBlockerContext.Provider>
  )
}

export function useNavigationBlocker() {
  return useContext(NavigationBlockerContext)
}
```

```jsx filename="app/contexts/navigation-blocker.js" switcher
'use client'



export const NavigationBlockerContext = createContext({
  isBlocked: false,
  setIsBlocked: () => {},
})

export function NavigationBlockerProvider({ children }) {
  const [isBlocked, setIsBlocked] = useState(false)

  return (
    <!-- NavigationBlockerContext -->
      {children}
    </NavigationBlockerContext.Provider>
  )
}

export function useNavigationBlocker() {
  return useContext(NavigationBlockerContext)
}
```

Create a form component that uses the context:

```tsx filename="app/components/form.tsx" switcher
'use client'



export default function Form() {
  const { setIsBlocked } = useNavigationBlocker()

  return (
    <!-- form --> {
        e.preventDefault()
        setIsBlocked(false)
      }}
      onChange={() => setIsBlocked(true)}
    >
      <!-- input -->
      <!-- button -->Save

  )
}
```

```jsx filename="app/components/form.js" switcher
'use client'



export default function Form() {
  const { setIsBlocked } = useNavigationBlocker()

  return (
    <!-- form --> {
        e.preventDefault()
        setIsBlocked(false)
      }}
      onChange={() => setIsBlocked(true)}
    >
      <!-- input -->
      <!-- button -->Save

  )
}
```

Create a custom Link component that blocks navigation:

```tsx filename="app/components/custom-link.tsx" switcher
'use client'




interface CustomLinkProps extends React.ComponentProps<!-- typeof --> {
  children: React.ReactNode
}

export function CustomLink({ children, ...props }: CustomLinkProps) {
  const { isBlocked } = useNavigationBlocker()

  return (
    <!-- Link --> {
        if (
          isBlocked &&
          !window.confirm('You have unsaved changes. Leave anyway?')
        ) {
          e.preventDefault()
        }
      }}
      {...props}
    >
      {children}

  )
}
```

```jsx filename="app/components/custom-link.js" switcher
'use client'




export function CustomLink({ children, ...props }) {
  const { isBlocked } = useNavigationBlocker()

  return (
    <!-- Link --> {
        if (
          isBlocked &&
          !window.confirm('You have unsaved changes. Leave anyway?')
        ) {
          e.preventDefault()
        }
      }}
      {...props}
    >
      {children}

  )
}
```

Create a navigation component:

```tsx filename="app/components/nav.tsx" switcher
'use client'



export default function Nav() {
  return (
    <!-- nav -->
      <!-- Link -->Home
      <!-- Link -->About

  )
}
```

```jsx filename="app/components/nav.js" switcher
'use client'



export default function Nav() {
  return (
    <!-- nav -->
      <!-- Link -->Home
      <!-- Link -->About

  )
}
```

Finally, wrap your app with the `NavigationBlockerProvider` in the root layout and use the components in your page:

```tsx filename="app/layout.tsx" switcher


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <!-- html -->
      <!-- body -->
        <!-- NavigationBlockerProvider -->{children}


  )
}
```

```jsx filename="app/layout.js" switcher


export default function RootLayout({ children }) {
  return (
    <!-- html -->
      <!-- body -->
        <!-- NavigationBlockerProvider -->{children}


  )
}
```

Then, use the `Nav` and `Form` components in your page:

```tsx filename="app/page.tsx" switcher



export default function Page() {
  return (
    <!-- div -->
      <!-- Nav -->
      <!-- main -->
        <!-- h1 -->Welcome to the Dashboard
        <!-- Form -->


  )
}
```

```jsx filename="app/page.js" switcher



export default function Page() {
  return (
    <!-- div -->
      <!-- Nav -->
      <!-- main -->
        <!-- h1 -->Welcome to the Dashboard
        <!-- Form -->


  )
}
```

When a user tries to navigate away using `CustomLink` while the form has unsaved changes, they'll be prompted to confirm before leaving.

## Version history

| Version   | Changes                                                                                                                                                                             |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `v15.4.0` | Add `auto` as an alias to the default `prefetch` behavior.                                                                                                                          |
| `v15.3.0` | Add `onNavigate` API                                                                                                                                                                |
| `v13.0.0` | No longer requires a child `<!-- a -->` tag. A [codemod](/docs/app/guides/upgrading/codemods#remove-a-tags-from-link-components) is provided to automatically update your codebase. |
| `v10.0.0` | `href` props pointing to a dynamic route are automatically resolved and no longer require an `as` prop.                                                                             |
| `v8.0.0`  | Improved prefetching performance.                                                                                                                                                   |
| `v1.0.0`  | `next/link` introduced.                                                                                                                                                             |
