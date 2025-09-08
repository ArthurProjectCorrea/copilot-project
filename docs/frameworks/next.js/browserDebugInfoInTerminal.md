---
title: browserDebugInfoInTerminal
description: Forward browser console logs and errors to your terminal during development.
version: experimental
---

The `experimental.browserDebugInfoInTerminal` option forwards console output and runtime errors originating in the browser to the dev server terminal.

This option is disabled by default. When enabled it only works in development mode.

## Usage

Enable forwarding:

```ts filename="next.config.ts" switcher

const nextConfig: NextConfig = ,
}

```

```js filename="next.config.js" switcher
/** @type  */
const nextConfig = ,
}

module.exports = nextConfig
```

### Serialization limits

Deeply nested objects/arrays are truncated using **sensible defaults**. You can tweak these limits:

- **depthLimit**: (optional) Limit stringification depth for nested objects/arrays. Default: 5
- **edgeLimit**: (optional) Max number of properties or elements to include per object or array. Default: 100

```ts filename="next.config.ts" switcher

const nextConfig: NextConfig = ,
  },
}

```

```js filename="next.config.js" switcher
/** @type  */
const nextConfig = ,
  },
}

module.exports = nextConfig
```

### Source location

Source locations are included by default when this feature is enabled.

```tsx filename="app/page.tsx" highlight=
'use client'

  return (
    <button
      type="button"
      onClick=}
    >
      Click me
    </button>
  )
}
```

Clicking the button prints this message to the terminal.

```bash filename="Terminal"
[browser] Hello World (app/page.tsx:8:17)
```

To suppress them, set `showSourceLocation: false`.

- **showSourceLocation**: Include source location info when available.

```ts filename="next.config.ts" switcher

const nextConfig: NextConfig = ,
  },
}

```

```js filename="next.config.js" switcher
/** @type  */
const nextConfig = ,
  },
}

module.exports = nextConfig
```

| Version   | Changes                                              |
| --------- | ---------------------------------------------------- |
| `v15.4.0` | experimental `browserDebugInfoInTerminal` introduced |