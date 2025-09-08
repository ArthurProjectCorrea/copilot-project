---
title: How to upgrade to version 15
nav_title: Version 15
description: Upgrade your Next.js Application from Version 14 to 15.
---

## Upgrading from 14 to 15

To update to Next.js version 15, you can use the `upgrade` codemod:

```bash filename="Terminal"
npx @next/codemod@canary upgrade latest
```

If you prefer to do it manually, ensure that you're installing the latest Next & React versions:

```bash filename="Terminal"
npm i next@latest react@latest react-dom@latest eslint-config-next@latest
```

> **Good to know:**
>
> - If you see a peer dependencies warning, you may need to update `react` and `react-dom` to the suggested versions, or use the `--force` or `--legacy-peer-deps` flag to ignore the warning. This won't be necessary once both Next.js 15 and React 19 are stable.

## React 19

- The minimum versions of `react` and `react-dom` is now 19.
- `useFormState` has been replaced by `useActionState`. The `useFormState` hook is still available in React 19, but it is deprecated and will be removed in a future release. `useActionState` is recommended and includes additional properties like reading the `pending` state directly. [Learn more](https://react.dev/reference/react/useActionState).
- `useFormStatus` now includes additional keys like `data`, `method`, and `action`. If you are not using React 19, only the `pending` key is available. [Learn more](https://react.dev/reference/react-dom/hooks/useFormStatus).
- Read more in the [React 19 upgrade guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

> **Good to know:** If you are using TypeScript, ensure you also upgrade `@types/react` and `@types/react-dom` to their latest versions.

## Async Request APIs (Breaking change)

Previously synchronous Dynamic APIs that rely on runtime information are now **asynchronous**:

- [`cookies`](/docs/app/api-reference/functions/cookies)
- [`headers`](/docs/app/api-reference/functions/headers)
- [`draftMode`](/docs/app/api-reference/functions/draft-mode)
- `params` in [`layout.js`](/docs/app/api-reference/file-conventions/layout), [`page.js`](/docs/app/api-reference/file-conventions/page), [`route.js`](/docs/app/api-reference/file-conventions/route), [`default.js`](/docs/app/api-reference/file-conventions/default), [`opengraph-image`](/docs/app/api-reference/file-conventions/metadata/opengraph-image), [`twitter-image`](/docs/app/api-reference/file-conventions/metadata/opengraph-image), [`icon`](/docs/app/api-reference/file-conventions/metadata/app-icons), and [`apple-icon`](/docs/app/api-reference/file-conventions/metadata/app-icons).
- `searchParams` in [`page.js`](/docs/app/api-reference/file-conventions/page)

To ease the burden of migration, a [codemod is available](/docs/app/guides/upgrading/codemods#150) to automate the process and the APIs can temporarily be accessed synchronously.

### `cookies`

#### Recommended Async Usage

```tsx

// Before
const cookieStore = cookies()
const token = cookieStore.get('token')

// After
const cookieStore = await cookies()
const token = cookieStore.get('token')
```

#### Temporary Synchronous Usage

```tsx filename="app/page.tsx" switcher

// Before
const cookieStore = cookies()
const token = cookieStore.get('token')

// After
const cookieStore = cookies() as unknown as UnsafeUnwrappedCookies
// will log a warning in dev
const token = cookieStore.get('token')
```

```jsx filename="app/page.js" switcher

// Before
const cookieStore = cookies()
const token = cookieStore.get('token')

// After
const cookieStore = cookies()
// will log a warning in dev
const token = cookieStore.get('token')
```

### `headers`

#### Recommended Async Usage

```tsx

// Before
const headersList = headers()
const userAgent = headersList.get('user-agent')

// After
const headersList = await headers()
const userAgent = headersList.get('user-agent')
```

#### Temporary Synchronous Usage

```tsx filename="app/page.tsx" switcher

// Before
const headersList = headers()
const userAgent = headersList.get('user-agent')

// After
const headersList = headers() as unknown as UnsafeUnwrappedHeaders
// will log a warning in dev
const userAgent = headersList.get('user-agent')
```

```jsx filename="app/page.js" switcher

// Before
const headersList = headers()
const userAgent = headersList.get('user-agent')

// After
const headersList = headers()
// will log a warning in dev
const userAgent = headersList.get('user-agent')
```

### `draftMode`

#### Recommended Async Usage

```tsx

// Before
const  = draftMode()

// After
const  = await draftMode()
```

#### Temporary Synchronous Usage

```tsx filename="app/page.tsx" switcher

// Before
const  = draftMode()

// After
// will log a warning in dev
const  = draftMode() as unknown as UnsafeUnwrappedDraftMode
```

```jsx filename="app/page.js" switcher

// Before
const  = draftMode()

// After
// will log a warning in dev
const  = draftMode()
```

### `params` & `searchParams`

#### Asynchronous Layout

```tsx filename="app/layout.tsx" switcher
// Before
type Params = 

  const  = params
}

  children,
  params,
}: )  = params
}

// After
type Params = Promise<>

  const  = await params
}

  children,
  params,
}: )  = await params
}
```

```jsx filename="app/layout.js" switcher
// Before

  const  = params
}

  const  = params
}

// After

  const  = await params
}

  const  = await params
}
```

#### Synchronous Layout

```tsx filename="app/layout.tsx" switcher
// Before
type Params = 

  children,
  params,
}: )  = params
}

// After

type Params = Promise<>

  children: React.ReactNode
  params: Params
}) 
```

```jsx filename="app/layout.js" switcher
// Before

  const  = params
}

// After

  const params = use(props.params)
  const slug = params.slug
}

```

#### Asynchronous Page

```tsx filename="app/page.tsx" switcher
// Before
type Params = 
type SearchParams = 

  params,
  searchParams,
}: )  = params
  const  = searchParams
}

  params,
  searchParams,
}: )  = params
  const  = searchParams
}

// After
type Params = Promise<>
type SearchParams = Promise<>

  params: Params
  searchParams: SearchParams
}) 

  params: Params
  searchParams: SearchParams
}) 
```

```jsx filename="app/page.js" switcher
// Before

  const  = params
  const  = searchParams
}

  const  = params
  const  = searchParams
}

// After

  const params = await props.params
  const searchParams = await props.searchParams
  const slug = params.slug
  const query = searchParams.query
}

  const params = await props.params
  const searchParams = await props.searchParams
  const slug = params.slug
  const query = searchParams.query
}
```

#### Synchronous Page

```tsx
'use client'

// Before
type Params = 
type SearchParams = 

  params,
  searchParams,
}: )  = params
  const  = searchParams
}

// After

type Params = Promise<>
type SearchParams = Promise<>

  params: Params
  searchParams: SearchParams
}) 
```

```jsx
// Before

  const  = params
  const  = searchParams
}

// After

  const params = use(props.params)
  const searchParams = use(props.searchParams)
  const slug = params.slug
  const query = searchParams.query
}

```

#### Route Handlers

```tsx filename="app/api/route.ts" switcher
// Before
type Params = 

  const params = segmentData.params
  const slug = params.slug
}

// After
type Params = Promise<>

  const params = await segmentData.params
  const slug = params.slug
}
```

```js filename="app/api/route.js" switcher
// Before

  const params = segmentData.params
  const slug = params.slug
}

// After

  const params = await segmentData.params
  const slug = params.slug
}
```

## `fetch` requests

[`fetch` requests](/docs/app/api-reference/functions/fetch) are no longer cached by default.

To opt specific `fetch` requests into caching, you can pass the `cache: 'force-cache'` option.

```js filename="app/layout.js"

  const a = await fetch('https://...') // Not Cached
  const b = await fetch('https://...', ) // Cached

  // ...
}
```

To opt all `fetch` requests in a layout or page into caching, you can use the `export const fetchCache = 'default-cache'` [segment config option](/docs/app/api-reference/file-conventions/route-segment-config). If individual `fetch` requests specify a `cache` option, that will be used instead.

```js filename="app/layout.js"
// Since this is the root layout, all fetch requests in the app
// that don't set their own cache option will be cached.

  const a = await fetch('https://...') // Cached
  const b = await fetch('https://...', ) // Not cached

  // ...
}
```

## Route Handlers

`GET` functions in [Route Handlers](/docs/app/api-reference/file-conventions/route) are no longer cached by default. To opt `GET` methods into caching, you can use a [route config option](/docs/app/api-reference/file-conventions/route-segment-config) such as `export const dynamic = 'force-static'` in your Route Handler file.

```js filename="app/api/route.js"

```

## Client-side Router Cache

When navigating between pages via `<Link>` or `useRouter`, [page](/docs/app/api-reference/file-conventions/page) segments are no longer reused from the client-side router cache. However, they are still reused during browser backward and forward navigation and for shared layouts.

To opt page segments into caching, you can use the [`staleTimes`](/docs/app/api-reference/config/next-config-js/staleTimes) config option:

```js filename="next.config.js"
/** @type  */
const nextConfig = ,
  },
}

module.exports = nextConfig
```

[Layouts](/docs/app/api-reference/file-conventions/layout) and [loading states](/docs/app/api-reference/file-conventions/loading) are still cached and reused on navigation.

## `next/font`

The `@next/font` package has been removed in favor of the built-in [`next/font`](/docs/app/api-reference/components/font). A [codemod is available](/docs/app/guides/upgrading/codemods#built-in-next-font) to safely and automatically rename your imports.

```js filename="app/layout.js"
// Before

// After

```

## bundlePagesRouterDependencies

`experimental.bundlePagesExternals` is now stable and renamed to `bundlePagesRouterDependencies`.

```js filename="next.config.js"
/** @type  */
const nextConfig = ,

  // After
  bundlePagesRouterDependencies: true,
}

module.exports = nextConfig
```

## serverExternalPackages

`experimental.serverComponentsExternalPackages` is now stable and renamed to `serverExternalPackages`.

```js filename="next.config.js"
/** @type  */
const nextConfig = ,

  // After
  serverExternalPackages: ['package-name'],
}

module.exports = nextConfig
```

## Speed Insights

Auto instrumentation for Speed Insights was removed in Next.js 15.

To continue using Speed Insights, follow the [Vercel Speed Insights Quickstart](https://vercel.com/docs/speed-insights/quickstart) guide.

## `NextRequest` Geolocation

The `geo` and `ip` properties on `NextRequest` have been removed as these values are provided by your hosting provider. A [codemod](/docs/app/guides/upgrading/codemods#150) is available to automate this migration.

If you are using Vercel, you can alternatively use the `geolocation` and `ipAddress` functions from [`@vercel/functions`](https://vercel.com/docs/functions/vercel-functions-package) instead:

```ts filename="middleware.ts"

  const  = geolocation(request)

  // ...
}
```

```ts filename="middleware.ts"

  const ip = ipAddress(request)

  // ...
}
```