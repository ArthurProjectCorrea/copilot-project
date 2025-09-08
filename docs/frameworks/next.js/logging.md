---
title: logging
description: Configure how data fetches are logged to the console when running Next.js in development mode.
---

## Options

### Fetching

You can configure the logging level and whether the full URL is logged to the console when running Next.js in development mode.

Currently, `logging` only applies to data fetching using the `fetch` API. It does not yet apply to other logs inside of Next.js.

```js filename="next.config.js"
module.exports = ,
  },
}
```

Any `fetch` requests that are restored from the [Server Components HMR cache](/docs/app/api-reference/config/next-config-js/serverComponentsHmrCache) are not logged by default. However, this can be enabled by setting `logging.fetches.hmrRefreshes` to `true`.

```js filename="next.config.js"
module.exports = ,
  },
}
```

### Incoming Requests

By default all the incoming requests will be logged in the console during development. You can use the `incomingRequests` option to decide which requests to ignore.
Since this is only logged in development, this option doesn't affect production builds.

```js filename="next.config.js"
module.exports = ,
  },
}
```

Or you can disable incoming request logging by setting `incomingRequests` to `false`.

```js filename="next.config.js"
module.exports = ,
}
```

### Disabling Logging

In addition, you can disable the development logging by setting `logging` to `false`.

```js filename="next.config.js"
module.exports =
```
