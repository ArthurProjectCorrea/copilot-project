---
title: transpilePackages
description: Automatically transpile and bundle dependencies from local packages (like monorepos) or from external dependencies (`node_modules`).
---

Next.js can automatically transpile and bundle dependencies from local packages (like monorepos) or from external dependencies (`node_modules`). This replaces the `next-transpile-modules` package.

```js filename="next.config.js"
/** @type  */
const nextConfig = (module.exports = nextConfig);
```

## Version History

| Version   | Changes                    |
| --------- | -------------------------- |
| `v13.0.0` | `transpilePackages` added. |
