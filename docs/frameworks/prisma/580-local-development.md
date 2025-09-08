---
title: 'Local development for Prisma Accelerate'
sidebar_label: 'Local development'
metaTitle: 'Accelerate: Local development'
metaDescription: 'Learn how to use Prisma Accelerate in a development environment.'
tocDepth: 3
toc: true
---

## Using Prisma Accelerate client extension in development and production

<br />

![Using Prisma Accelerate client extension in development](/img/accelerate/accelerate-in-dev.png)

Accelerate does not work with a local database. However, in a development environment, you can still use Prisma Client with the Accelerate client extension. This setup will not provide Accelerate's connection pooling and caching features.

The following steps outline how to use Prisma ORM and Prisma Accelerate with a local PostgreSQL database.

1. Update the `DATABASE_URL` environment variable with your local database's connection string:

   ```.env
   DATABASE_URL="postgres://username:password@127.0.0.1:5432/localdb"
   ```

2. Generate a Prisma Client:

   ```bash
   npx prisma generate
   ```

   > Note: The `--no-engine` flag should only be used in preview and production environments. The command generates Prisma Client artifacts without a [Query Engine](/orm/more/under-the-hood/engines) file, which requires an Accelerate connection string.

3. Set up Prisma Client with the Accelerate client extension:

   ```typescript
   import  from '@prisma/client'
   import  from '@prisma/extension-accelerate'

   const prisma = new PrismaClient().$extends(withAccelerate())
   ```

   > The extended instance of Prisma Client will use the local database. Hence, Prisma Accelerate will not be used in your development environment to respond to your Prisma Client queries.

![Using Prisma Accelerate client extension in production](/img/accelerate/accelerate-in-prod.png)

If an Accelerate connection string is used as the `DATABASE_URL` environment variable, Prisma Client will route your queries through Accelerate.

## Using Prisma Accelerate locally in an edge function

When using an edge function, e.g., [Vercel's edge runtime](https://vercel.com/docs/functions/runtimes/edge-runtime), for your development environment, update your Prisma Client import as follows:

```typescript

```

Generally, edge function environments lack native support for existing APIs enabling TCP-based database connections. Prisma Accelerate provides a connection string that allows querying your database over HTTP, a protocol supported in all edge runtimes.