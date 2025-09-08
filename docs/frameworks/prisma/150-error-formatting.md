---
title: 'Configuring error formatting'
metaTitle: 'Configuring error formatting (Concepts)'
metaDescription: 'This page explains how to configure the formatting of errors when using Prisma Client.'
---

## Formatting levels

There are 3 error formatting levels:

1. **Pretty Error** (default): Includes a full stack trace with colors, syntax highlighting of the code and extended error message with a possible solution for the problem.
2. **Colorless Error**: Same as pretty errors, just without colors.
3. **Minimal Error**: The raw error message.

In order to configure these different error formatting levels, there are two options:

- Setting the config options via environment variables
- Providing the config options to the `PrismaClient` constructor

## Formatting via environment variables

- [`NO_COLOR`](/orm/reference/environment-variables-reference#no_color): If this env var is provided, colors are stripped from the error messages. Therefore you end up with a **colorless error**. The `NO_COLOR` environment variable is a standard described [here](https://no-color.org/).
- `NODE_ENV=production`: If the env var `NODE_ENV` is set to `production`, only the **minimal error** will be printed. This allows for easier digestion of logs in production environments.

### Formatting via the `PrismaClient` constructor

Alternatively, use the `PrismaClient` [`errorFormat`](/orm/reference/prisma-client-reference#errorformat) parameter to set the error format:

```ts
const prisma = new PrismaClient()
```