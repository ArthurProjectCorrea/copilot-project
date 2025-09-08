---
title: turbopackPersistentCaching
description: Learn how to enable Persistent Caching for Turbopack builds
version: canary
---

## Usage

Turbopack Persistent Caching enables Turbopack to reduce work across `next dev` or `next build` commands. When enabled, Turbopack will save and restore data to the `.next` folder between builds, which can greatly speed up subsequent builds and dev sessions.

> **Warning:** Persistent Caching is still under development and is not yet stable. Users adopting should expect some stability issues.

> **Good to know**: Note that while `next dev` and `next build` can share cached data with each other, most cache entries are command-specific due to different configuration and environment variables.

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

## Version Changes

| Version   | Changes                                     |
| --------- | ------------------------------------------- |
| `v15.5.0` | Persistent caching released as experimental |
