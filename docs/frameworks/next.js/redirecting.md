---
title: How to handle redirects in Next.js
nav_title: Redirecting
description: Learn the different ways to handle redirects in Next.js.
related:
  links:
    - app/api-reference/functions/redirect
    - app/api-reference/functions/permanentRedirect
    - app/api-reference/file-conventions/middleware
    - app/api-reference/config/next-config-js/redirects
---

There are a few ways you can handle redirects in Next.js. This page will go through each available option, use cases, and how to manage large numbers of redirects.

## `useRouter()` hook

> **Good to know**:
>
> - If you don't need to programmatically navigate a user, you should use a [`<Link>`](/docs/app/api-reference/components/link) component.

## `redirects` in `next.config.js`

The `redirects` option in the `next.config.js` file allows you to redirect an incoming request path to a different destination path. This is useful when you change the URL structure of pages or have a list of redirects that are known ahead of time.

`redirects` supports [path](/docs/app/api-reference/config/next-config-js/redirects#path-matching), [header, cookie, and query matching](/docs/app/api-reference/config/next-config-js/redirects#header-cookie-and-query-matching), giving you the flexibility to redirect users based on an incoming request.

To use `redirects`, add the option to your `next.config.js` file:

```ts filename="next.config.ts" switcher

const nextConfig: NextConfig = ,
      // Wildcard path matching
      ,
    ]
  },
}

```

```js filename="next.config.js" switcher
module.exports = ,
      // Wildcard path matching
      ,
    ]
  },
}
```

See the [`redirects` API reference](/docs/app/api-reference/config/next-config-js/redirects) for more information.

> **Good to know**:
>
> - `redirects` can return a 307 (Temporary Redirect) or 308 (Permanent Redirect) status code with the `permanent` option.
> - `redirects` may have a limit on platforms. For example, on Vercel, there's a limit of 1,024 redirects. To manage a large number of redirects (1000+), consider creating a custom solution using [Middleware](/docs/app/api-reference/file-conventions/middleware). See [managing redirects at scale](#managing-redirects-at-scale-advanced) for more.
> - `redirects` runs **before** Middleware.

## `NextResponse.redirect` in Middleware

Middleware allows you to run code before a request is completed. Then, based on the incoming request, redirect to a different URL using `NextResponse.redirect`. This is useful if you want to redirect users based on a condition (e.g. authentication, session management, etc) or have [a large number of redirects](#managing-redirects-at-scale-advanced).

For example, to redirect the user to a `/login` page if they are not authenticated:

```ts filename="middleware.ts" switcher

  const isAuthenticated = authenticate(request)

  // If the user is authenticated, continue as normal
  if (isAuthenticated)

  // Redirect to login page if not authenticated
  return NextResponse.redirect(new URL('/login', request.url))
}

  matcher: '/dashboard/:path*',
}
```

```js filename="middleware.js" switcher

  const isAuthenticated = authenticate(request)

  // If the user is authenticated, continue as normal
  if (isAuthenticated)

  // Redirect to login page if not authenticated
  return NextResponse.redirect(new URL('/login', request.url))
}

  matcher: '/dashboard/:path*',
}
```

> **Good to know**:
>
> - Middleware runs **after** `redirects` in `next.config.js` and **before** rendering.

See the [Middleware](/docs/app/api-reference/file-conventions/middleware) documentation for more information.

## Managing redirects at scale (advanced)

To manage a large number of redirects (1000+), you may consider creating a custom solution using Middleware. This allows you to handle redirects programmatically without having to redeploy your application.

To do this, you'll need to consider:

1. Creating and storing a redirect map.
2. Optimizing data lookup performance.

> **Next.js Example**: See our [Middleware with Bloom filter](https://redirects-bloom-filter.vercel.app/) example for an implementation of the recommendations below.

### 1. Creating and storing a redirect map

A redirect map is a list of redirects that you can store in a database (usually a key-value store) or JSON file.

Consider the following data structure:

```json
,
  "/blog/post-old":
}
```

In [Middleware](/docs/app/api-reference/file-conventions/middleware), you can read from a database such as Vercel's [Edge Config](https://vercel.com/docs/edge-config/get-started) or [Redis](https://vercel.com/docs/redis), and redirect the user based on the incoming request:

```ts filename="middleware.ts" switcher

type RedirectEntry =

  const pathname = request.nextUrl.pathname
  const redirectData = await get(pathname)

  if (redirectData && typeof redirectData === 'string')

  // No redirect found, continue without redirecting
  return NextResponse.next()
}
```

```js filename="middleware.js" switcher

  const pathname = request.nextUrl.pathname
  const redirectData = await get(pathname)

  if (redirectData)

  // No redirect found, continue without redirecting
  return NextResponse.next()
}
```

### 2. Optimizing data lookup performance

Reading a large dataset for every incoming request can be slow and expensive. There are two ways you can optimize data lookup performance:

- Use a database that is optimized for fast reads
- Use a data lookup strategy such as a [Bloom filter](https://en.wikipedia.org/wiki/Bloom_filter) to efficiently check if a redirect exists **before** reading the larger redirects file or database.

Considering the previous example, you can import a generated bloom filter file into Middleware, then, check if the incoming request pathname exists in the bloom filter.

If it does, forward the request to a which will check the actual file and redirect the user to the appropriate URL. This avoids importing a large redirects file into Middleware, which can slow down every incoming request.

```ts filename="middleware.ts" switcher

type RedirectEntry =

// Initialize bloom filter from a generated JSON file
const bloomFilter = ScalableBloomFilter.fromJSON(GeneratedBloomFilter as any)

  // Get the path for the incoming request
  const pathname = request.nextUrl.pathname

  // Check if the path is in the bloom filter
  if (bloomFilter.has(pathname)) `,
      request.nextUrl.origin
    )

    try
      }
    } catch (error)
  }

  // No redirect found, continue the request without redirecting
  return NextResponse.next()
}
```

```js filename="middleware.js" switcher

// Initialize bloom filter from a generated JSON file
const bloomFilter = ScalableBloomFilter.fromJSON(GeneratedBloomFilter)

  // Get the path for the incoming request
  const pathname = request.nextUrl.pathname

  // Check if the path is in the bloom filter
  if (bloomFilter.has(pathname)) `,
      request.nextUrl.origin
    )

    try
      }
    } catch (error)
  }

  // No redirect found, continue the request without redirecting
  return NextResponse.next()
}
```

> **Good to know:**
>
> - To generate a bloom filter, you can use a library like [`bloom-filters`](https://www.npmjs.com/package/bloom-filters).
> - You should validate requests made to your Route Handler to prevent malicious requests.
