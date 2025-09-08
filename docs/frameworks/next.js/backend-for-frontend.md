---
title: How to use Next.js as a backend for your frontend
nav_title: Backend for Frontend
description: Learn how to use Next.js as a backend framework
related:
  title: API Reference
  description: Learn more about Route Handlers and Middleware
  links:
    - app/api-reference/file-conventions/route
    - app/api-reference/file-conventions/middleware
---

Next.js supports the "Backend for Frontend" pattern. This lets you create public endpoints to handle HTTP requests and return any content type—not just HTML. You can also access data sources and perform side effects like updating remote data.

If you are starting a new project, using `create-next-app` with the `--api` flag automatically includes an example `route.ts` in your new project’s `app/` folder, demonstrating how to create an API endpoint.

```bash filename="Terminal"
npx create-next-app@latest --api
```

> **Good to know**: Next.js backend capabilities are not a full backend replacement. They serve as an API layer that:
>
> - is publicly reachable
> - handles any HTTP request
> - can return any content type

To implement this pattern, use:

- [Route Handlers](/docs/app/api-reference/file-conventions/route)
- [`middleware`](/docs/app/api-reference/file-conventions/middleware)
- In Pages Router, [API Routes](/docs/pages/building-your-application/routing/api-routes)

## Public Endpoints

Route Handlers are public HTTP endpoints. Any client can access them.

Create a Route Handler using the `route.ts` or `route.js` file convention:

```ts filename="/app/api/route.ts" switcher

```

```js filename="/app/api/route.js" switcher

```

This handles `GET` requests sent to `/api`.

Use `try/catch` blocks for operations that may throw an exception:

```ts filename="/app/api/route.ts" switcher

  try )
  } catch (reason) )
  }
}
```

```js filename="/app/api/route.js" switcher

  try )
  } catch (reason) )
  }
}
```

Avoid exposing sensitive information in error messages sent to the client.

To restrict access, implement authentication and authorization. See [Authentication](/docs/app/guides/authentication).

## Content types

Route Handlers let you serve non-UI responses, including JSON, XML, images, files, and plain text.

Next.js uses file conventions for common endpoints:

- [`sitemap.xml`](/docs/app/api-reference/file-conventions/metadata/sitemap)
- [`opengraph-image.jpg`, `twitter-image`](/docs/app/api-reference/file-conventions/metadata/opengraph-image)
- [favicon, app icon, and apple-icon](/docs/app/api-reference/file-conventions/metadata/app-icons)
- [`manifest.json`](/docs/app/api-reference/file-conventions/metadata/manifest)
- [`robots.txt`](/docs/app/api-reference/file-conventions/metadata/robots)

You can also define custom ones, such as:

- `llms.txt`
- `rss.xml`
- `.well-known`

For example, `app/rss.xml/route.ts` creates a Route Handler for `rss.xml`.

```ts filename="/app/rss.xml/route.ts" switcher

  const rssResponse = await fetch(/* rss endpoint */)
  const rssData = await rssResponse.json()

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
 <title>$</title>
 <description>$</description>
 <link>$</link>
 <copyright>$</copyright>
 $</title>
    <description>$</description>
    <link>$</link>
    <pubDate>$</pubDate>
    <guid isPermaLink="false">$</guid>
 </item>`
 })}
</channel>
</rss>`

  const headers = new Headers()

  return new Response(rssFeed, )
}
```

```js filename="/app/rss.xml/route.js" switcher

  const rssResponse = await fetch(/* rss endpoint */)
  const rssData = await rssResponse.json()

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
 <title>$</title>
 <description>$</description>
 <link>$</link>
 <copyright>$</copyright>
 $</title>
    <description>$</description>
    <link>$</link>
    <pubDate>$</pubDate>
    <guid isPermaLink="false">$</guid>
 </item>`
 })}
</channel>
</rss>`

  const headers = new Headers()

  return new Response(rssFeed, )
}
```

Sanitize any input used to generate markup.

### Consuming request payloads

Use Request [instance methods](https://developer.mozilla.org/en-US/docs/Web/API/Request#instance_methods) like `.json()`, `.formData()`, or `.text()` to access the request body.

`GET` and `HEAD` requests don’t carry a body.

```ts filename="/app/api/echo-body/route.ts" switcher

  const res = await request.json()
  return Response.json()
}
```

```js filename="/app/api/echo-body/route.js" switcher

  const res = await request.json()
  return Response.json()
}
```

> **Good to know**: Validate data before passing it to other systems

```ts filename="/app/api/send-email/route.ts" switcher

  const formData = await request.formData()
  const email = formData.get('email')
  const contents = formData.get('contents')

  try )
    const info = await sendMail()

    return Response.json()
  } catch (reason) )
  }
}
```

```js filename="/app/api/send-email/route.js" switcher

  const formData = await request.formData()
  const email = formData.get('email')
  const contents = formData.get('contents')

  try )
    const info = await sendMail()

    return Response.json()
  } catch (reason) )
  }
}
```

You can only read the request body once. Clone the request if you need to read it again:

```ts filename="/app/api/clone/route.ts" switcher

  try )
  } catch )
  }
}
```

```js filename="/app/api/clone/route.js" switcher

  try )
  } catch )
  }
}
```

## Manipulating data

Route Handlers can transform, filter, and aggregate data from one or more sources. This keeps logic out of the frontend and avoids exposing internal systems.

You can also offload heavy computations to the server and reduce client battery and data usage.

```ts file="/app/api/weather/route.ts" switcher

  const body = await request.json()
  const searchParams = new URLSearchParams()

  try ?$`)

    if (!weatherResponse.ok)

    const weatherData = await weatherResponse.text()
    const payload = parseWeatherData.asJSON(weatherData)

    return new Response(payload, )
  } catch (reason) )
  }
}
```

```js file="/app/api/weather/route.js" switcher

  const body = await request.json()
  const searchParams = new URLSearchParams()

  try ?$`)

    if (!weatherResponse.ok)

    const weatherData = await weatherResponse.text()
    const payload = parseWeatherData.asJSON(weatherData)

    return new Response(payload, )
  } catch (reason) )
  }
}
```

> **Good to know**: This example uses `POST` to avoid putting geo-location data in the URL. `GET` requests may be cached or logged, which could expose sensitive info.

## Proxying to a backend

You can use a Route Handler as a proxy to another backend. Add validation logic before forwarding the request.

```ts filename="/app/api/[...slug]/route.ts" switcher

  const clonedRequest = request.clone()
  const isValid = await isValidRequest(clonedRequest)

  if (!isValid) )
  }

  const  = await params
  const pathname = slug.join('/')
  const proxyURL = new URL(pathname, 'https://nextjs.org')
  const proxyRequest = new Request(proxyURL, request)

  try  catch (reason) )
  }
}
```

```js filename="/app/api/[...slug]/route.js" switcher

  const clonedRequest = request.clone()
  const isValid = await isValidRequest(clonedRequest)

  if (!isValid) )
  }

  const  = await params
  const pathname = slug.join('/')
  const proxyURL = new URL(pathname, 'https://nextjs.org')
  const proxyRequest = new Request(proxyURL, request)

  try  catch (reason) )
  }
}
```

Or use:

- `middleware` [rewrites](#middleware)
- [`rewrites`](/docs/app/api-reference/config/next-config-js/rewrites) in `next.config.js`.

## NextRequest and NextResponse

Next.js extends the [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) and [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) Web APIs with methods that simplify common operations. These extensions are available in both Route Handlers and Middleware.

Both provide methods for reading and manipulating cookies.

`NextRequest` includes the [`nextUrl`](/docs/app/api-reference/functions/next-request#nexturl) property, which exposes parsed values from the incoming request, for example, it makes it easier to access request pathname and search params.

`NextResponse` provides helpers like `next()`, `json()`, `redirect()`, and `rewrite()`.

You can pass `NextRequest` to any function expecting `Request`. Likewise, you can return `NextResponse` where a `Response` is expected.

```ts filename="/app/echo-pathname/route.ts" switcher

  const nextUrl = request.nextUrl

  if (nextUrl.searchParams.get('redirect'))

  if (nextUrl.searchParams.get('rewrite'))

  return NextResponse.json()
}
```

```js filename="/app/echo-pathname/route.js" switcher

  const nextUrl = request.nextUrl

  if (nextUrl.searchParams.get('redirect'))

  if (nextUrl.searchParams.get('rewrite'))

  return NextResponse.json()
}
```

Learn more about [`NextRequest`](/docs/app/api-reference/functions/next-request) and [`NextResponse`](/docs/app/api-reference/functions/next-response).

## Webhooks and callback URLs

Use Route Handlers to receive event notifications from third-party applications.

For example, revalidate a route when content changes in a CMS. Configure the CMS to call a specific endpoint on changes.

```ts filename="/app/webhook/route.ts" switcher

  const token = request.nextUrl.searchParams.get('token')

  if (token !== process.env.REVALIDATE_SECRET_TOKEN) , )
  }

  const tag = request.nextUrl.searchParams.get('tag')

  if (!tag) , )
  }

  revalidateTag(tag)

  return NextResponse.json()
}
```

```js filename="/app/webhook/route.js" switcher

  const token = request.nextUrl.searchParams.get('token')

  if (token !== process.env.REVALIDATE_SECRET_TOKEN) , )
  }

  const tag = request.nextUrl.searchParams.get('tag')

  if (!tag) , )
  }

  revalidateTag(tag)

  return NextResponse.json()
}
```

Callback URLs are another use case. When a user completes a third-party flow, the third party sends them to a callback URL. Use a Route Handler to verify the response and decide where to redirect the user.

```ts filename="/app/auth/callback/route.ts" switcher

  const token = request.nextUrl.searchParams.get('session_token')
  const redirectUrl = request.nextUrl.searchParams.get('redirect_url')

  const response = NextResponse.redirect(new URL(redirectUrl, request.url))

  response.cookies.set()

  return response
}
```

```js filename="/app/auth/callback/route.js" switcher

  const token = request.nextUrl.searchParams.get('session_token')
  const redirectUrl = request.nextUrl.searchParams.get('redirect_url')

  const response = NextResponse.redirect(new URL(redirectUrl, request.url))

  response.cookies.set()

  return response
}
```

## Redirects

```ts filename="app/api/route.ts" switcher

  redirect('https://nextjs.org/')
}
```

```js filename="app/api/route.js" switcher

  redirect('https://nextjs.org/')
}
```

Learn more about redirects in [`redirect`](/docs/app/api-reference/functions/redirect) and [`permanentRedirect`](/docs/app/api-reference/functions/permanentRedirect)

## Middleware

Only one middleware file is allowed per project. Use `config.matcher` to target specific paths. Learn more about [middleware](/docs/app/api-reference/file-conventions/middleware).

Use `middleware` to generate a response before the request reaches a route path.

```ts filename="middleware.ts" switcher

  matcher: '/api/:function*',
}

  if (!isAuthenticated(request)) ,

    )
  }
}
```

```js filename="middleware.js" switcher

  matcher: '/api/:function*',
}

  if (!isAuthenticated(request)) ,

    )
  }
}
```

You can also proxy requests using `middleware`:

```ts filename="middleware.ts" switcher

  if (request.nextUrl.pathname === '/proxy-this-path')
}
```

```js filename="middleware.js" switcher

  if (request.nextUrl.pathname === '/proxy-this-path')
}
```

Another type of response `middleware` can produce are redirects:

```ts filename="middleware.ts" switcher

  if (request.nextUrl.pathname === '/v1/docs')
}
```

```js filename="middleware.js" switcher

  if (request.nextUrl.pathname === '/v1/docs')
}
```

## Security

### Working with headers

Be deliberate about where headers go, and avoid directly passing incoming request headers to the outgoing response.

- **Upstream request headers**: In Middleware, `NextResponse.next( })` modifies the headers your server receives and does not expose them to the client.
- **Response headers**: `new Response(..., )`, `NextResponse.json(..., )`, `NextResponse.next()`, or `response.headers.set(...)` send headers back to the client. If sensitive values were appended to these headers, they will be visible to clients.

Learn more in [NextResponse headers in Middleware](/docs/app/api-reference/functions/next-response#next).

### Rate limiting

You can implement rate limiting in your Next.js backend. In addition to code-based checks, enable any rate limiting features provided by your host.

```ts filename="/app/resource/route.ts" switcher

  const  = await checkRateLimit(request)

  if (rateLimited) , )
  }

  return new Response(null, )
}
```

```js filename="/app/resource/route.js" switcher

  const  = await checkRateLimit(request)

  if (rateLimited) , )
  }

  return new Response(null, )
}
```

### Verify payloads

Never trust incoming request data. Validate content type and size, and sanitize against XSS before use.

Use timeouts to prevent abuse and protect server resources.

Store user-generated static assets in dedicated services. When possible, upload them from the browser and store the returned URI in your database to reduce request size.

### Access to protected resources

Always verify credentials before granting access. Do not rely on middleware alone for authentication and authorization.

Remove sensitive or unnecessary data from responses and backend logs.

Rotate credentials and API keys regularly.

## Preflight Requests

Preflight requests use the `OPTIONS` method to ask the server if a request is allowed based on origin, method, and headers.

If `OPTIONS` is not defined, Next.js adds it automatically and sets the `Allow` header based on the other defined methods.

- [CORS](/docs/app/api-reference/file-conventions/route#cors)

## Library patterns

Community libraries often use the factory pattern for Route Handlers.

```ts filename="/app/api/[...path]/route.ts"
const handler = createHandler();

// or
```

This creates a shared handler for `GET` and `POST` requests. The library customizes behavior based on the `method` and `pathname` in the request.

Libraries can also provide a `middleware` factory.

```ts filename="middleware.ts"

```

## More examples

See more examples on using [Router Handlers](/docs/app/api-reference/file-conventions/route#examples) and the [`middleware`](/docs/app/api-reference/file-conventions/middleware#examples) API references.

These examples include, working with [Cookies](/docs/app/api-reference/file-conventions/route#cookies), [Headers](/docs/app/api-reference/file-conventions/route#headers), [Streaming](/docs/app/api-reference/file-conventions/route#streaming), Middleware [negative matching](/docs/app/api-reference/file-conventions/middleware#negative-matching), and other useful code snippets.

## Caveats

### Server Components

Fetch data in Server Components directly from its source, not via Route Handlers.

For Server Components pre-rendered at build time, using Route Handlers will fail the build step. This is because, while building there is no server listening for these requests.

For Server Components rendered on demand, fetching from Route Handlers is slower due to the extra HTTP round trip between the handler and the render process.

> A server side `fetch` request uses absolute URLs. This implies an HTTP round trip, to an external server. During development, your own development server acts as the external server. At build time there is no server, and at runtime, the server is available through your public facing domain.

Server Components cover most data-fetching needs. However, fetching data client side might be necessary for:

- Data that depends on client-only Web APIs:
  - Geo-location API
  - Storage API
  - Audio API
  - File API
- Frequently polled data

For these, use community libraries like [`swr`](https://swr.vercel.app/) or [`react-query`](https://tanstack.com/query/latest/docs/framework/react/overview).

### Server Actions

Server Actions let you run server-side code from the client. Their primary purpose is to mutate data from your frontend client.

Server Actions are queued. Using them for data fetching introduces sequential execution.

### `export` mode

`export` mode outputs a static site without a runtime server. Features that require the Next.js runtime are [not supported](/docs/app/guides/static-exports#unsupported-features), because this mode produces a static site, and no runtime server.

In `export mode`, only `GET` Route Handlers are supported, in combination with the [`dynamic`](/docs/app/api-reference/file-conventions/route-segment-config#dynamic) route segment config, set to `'force-static'`.

This can be used to generate static HTML, JSON, TXT, or other files.

```js filename="app/hello-world/route.ts"

  return new Response('Hello World', )
}
```

### Deployment environment

Some hosts deploy Route Handlers as lambda functions. This means:

- Route Handlers cannot share data between requests.
- The environment may not support writing to File System.
- Long-running handlers may be terminated due to timeouts.
- WebSockets won’t work because the connection closes on timeout, or after the response is generated.
