---
title: '`client`: Add methods to Prisma Client'
metaTitle: 'Prisma Client extensions: client component'
metaDescription: 'Extend the functionality of Prisma Client, client component'
toc_max_heading_level: 4
---

## Extend Prisma Client

Use the `$extends` [client-level method](/orm/reference/prisma-client-reference#client-methods) to create an _extended client_. An extended client is a variant of the standard Prisma Client that is wrapped by one or more extensions. Use the `client` extension component to add top-level methods to Prisma Client.

To add a top-level method to Prisma Client, use the following structure:

```ts
const prisma = new PrismaClient().$extends(
})
```

### Example

The following example uses the `client` component to add two methods to Prisma Client:

- `$log` outputs a message.
- `$totalQueries` returns the number of queries executed by the current client instance. It uses the [metrics](/orm/prisma-client/observability-and-logging/metrics) feature to collect this information.

```ts
const prisma = new PrismaClient().$extends(,
  },
})

async function main() 
```