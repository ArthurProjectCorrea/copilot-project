---
title: "Cache API"
metaTitle: "Prisma Postgres: Cache API Reference"
metaDescription: "Cache API reference documentation for Prisma Postgres."
---

## Overview

The Prisma Postgres API reference documentation is based on the following schema:

```prisma
model User 
```

All example are based on the `User` model.

## `cacheStrategy`

With [the Prisma client extension for Prisma Postgres](https://www.npmjs.com/package/@prisma/extension-accelerate), you can use the `cacheStrategy` parameter for model queries and use the [`ttl`](/postgres/database/caching#time-to-live-ttl) and [`swr`](/postgres/database/caching#stale-while-revalidate-swr) parameters to define a cache strategy for your Prisma Postgres queries. The client extension requires that you install Prisma Client version `4.10.0`.

### Options

The `cacheStrategy` parameter takes an option with the following keys:

| Option | Example    | Type       | Required | Description                                                                                                                                                                                                                       |
| ------ | ---------- | ---------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `swr`  | `60`       | `Int`      | No       | The stale-while-revalidate time in seconds.                                                                                                                                                                                       |
| `ttl`  | `60`       | `Int`      | No       | The time-to-live time in seconds.                                                                                                                                                                                                 |
| `tags` | `["user"]` | `String[]` | No       | The `tag` array can control the [invalidation](/accelerate/api-reference#accelerateinvalidate) of cached query results. Each tag can only contain alphanumeric characters and underscores with a maximum length of 64 characters. |

|

### Examples

Add a caching strategy to the query, defining a 60-second stale-while-revalidate (SWR) value, a 60-second time-to-live (TTL) value, and a cache tag of `"emails_with_alice"`:

```ts
await prisma.user.findMany(,
  },
  // highlight-start
  cacheStrategy: ,
  // highlight-end
});
```

### Supported Prisma Client operations

The following is a list of all read query operations that support `cacheStrategy`:

- [`findUnique()`](/orm/reference/prisma-client-reference#findunique)
- [`findUniqueOrThrow()`](/orm/reference/prisma-client-reference#finduniqueorthrow)
- [`findFirst()`](/orm/reference/prisma-client-reference#findfirst)
- [`findFirstOrThrow()`](/orm/reference/prisma-client-reference#findfirstorthrow)
- [`findMany()`](/orm/reference/prisma-client-reference#findmany)
- [`count()`](/orm/reference/prisma-client-reference#count)
- [`aggregate()`](/orm/reference/prisma-client-reference#aggregate)
- [`groupBy()`](/orm/reference/prisma-client-reference#groupby)

## `withAccelerateInfo`

Any query that supports the `cacheStrategy` can append `withAccelerateInfo()` to wrap the response data and include additional information about the cached response.

To retrieve the status of the response, use:

```ts
const  = await prisma.user
  .count(,
    where: ,
  })
  .withAccelerateInfo();

console.dir(info);
```

:::info
Notice the `info` property of the response object. This is where the request information is stored.
:::

### Return type

The `info` object is of type `AccelerateInfo` and follows the interface below:

```ts
interface AccelerateInfo 
```

| Property       | Type                                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| -------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cacheStatus`  | `"ttl" \| "swr" \| "miss" \| "none" ` | The cache status of the response.<br/><ul><li>`ttl` indicates a cache hit within the `ttl` duration and no database query was executed</li><li>`swr` indicates a cache hit within the `swr` duration and the data is being refreshed by Prisma Postgres in the background </li><li>`miss` indicates that both `ttl` and `swr` have expired and the database query was executed by the request </li><li> `none` indicates that no cache strategy was specified and the database query was executed by the request</li></ul> |
| `lastModified` | `Date`                                | The date the response was last refreshed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `region`       | `String`                              | The data center region that received the request.                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `requestId`    | `String`                              | Unique identifier of the request. Useful for troubleshooting.                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `signature`    | `String`                              | The unique signature of the Prisma operation.                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

## `$accelerate.invalidate`

You can invalidate the cache using the [`$accelerate.invalidate` API](/accelerate/).

:::note

To invalidate cached query results on-demand, a paid plan is required. Each plan has specific limits on the number of cache tag-based invalidations allowed per day, though there are no limits on calling the `$accelerate.invalidate` API itself. See our [pricing for more details](https://www.prisma.io/pricing#accelerate).

:::

### Example

To invalidate the query below:

```ts
await prisma.user.findMany(,
  },
  cacheStrategy: ,
});
```

You need to provide the cache tag in the `$accelerate.invalidate` API:

```ts
try );
  // highlight-end
} catch (e) 
  }
  throw e;
}
```

:::note
You can invalidate up to 5 tags per call.
:::

## `$accelerate.invalidateAll`

You can invalidate the entire cache using the `$accelerate.invalidateAll` API.

### Example

To invalidate the query below:

```ts
await prisma.user.findMany(,
  },
  cacheStrategy: ,
});
```

Just call the `$accelerate.invalidateAll` API:

```ts
try  catch (e) 
  }
  throw e;
}
```

### Why use `$accelerate.invalidateAll`?

This method offers better editor support (e.g. IntelliSense) than alternatives like `invalidate("all")`.

:::warning

This clears cache for the entire environment—use with care.

:::

## Errors

Prisma Postgres-related errors start with `P6xxx`.

You can find the full error code reference for Prisma Postgres [here](/postgres/database/api-reference/error-reference).