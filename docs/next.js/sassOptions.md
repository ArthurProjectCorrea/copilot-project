---
title: sassOptions
description: Configure Sass options.
---

`sassOptions` allow you to configure the Sass compiler.

```ts filename="next.config.ts" switcher

const sassOptions =

const nextConfig: NextConfig = ,
}

```

```js filename="next.config.js" switcher
/** @type  */

const sassOptions =

const nextConfig = ,
}

module.exports = nextConfig
```

> **Good to know:** `sassOptions` are not typed outside of `implementation` because Next.js does not maintain the other possible properties.
