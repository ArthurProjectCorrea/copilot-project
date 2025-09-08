---
title: 'Fullstack'
metaTitle: 'Building fullstack applications with Prisma ORM'
metaDescription: 'This page gives explains how to build fullstack applications with Prisma. It shows how Prisma fits in with fullstack frameworks and provides practical examples'
---

## Supported frameworks

Here's a non-exhaustive list of frameworks and libraries you can use with Prisma ORM:

- [Next.js](https://nextjs.org/)
- [Remix](https://remix.run)
- [SvelteKit](https://svelte.dev/)
- [Nuxt](https://nuxt.com/)
- [Redwood](https://rwsdk.com/)
- [t3 stack — using tRPC](https://create.t3.gg/)
- [Wasp](https://wasp-lang.dev/)

## Fullstack app example (e.g. Next.js)

:::tip

If you want to learn how to build an app with Next.js and Prisma ORM, check out this comprehensive [video tutorial](https://www.youtube.com/watch?v=QXxy8Uv1LnQ&ab_channel=ByteGrad).

:::

Assume you have a Prisma schema that looks similar to this:

```prisma
datasource db

generator client

model Post

model User
```

You can now implement the logic for querying your database using [Prisma Client API](/orm/prisma-client) inside `getServerSideProps`, `getStaticProps`, API routes, or using API libraries such as [tRPC](https://trpc.io/) and [GraphQL](https://graphql.org/).

### `getServerSideProps`

```ts
// (in /pages/index.tsx)

// Alternatively, you can use `getStaticProps`
// in place of `getServerSideProps`.

  const feed = await prisma.post.findMany(,
  })
  return  }
}
```

Next.js will pass the props to your React component where you can display the data from your database.

### API Routes

```ts
// Fetch all posts (in /pages/api/posts.ts)
const prisma = new PrismaClient()

  const posts = await prisma.post.findMany(,
  })
  res.json(posts)
}
```

Note that you can use Prisma ORM inside of Next.js API routes to send queries to your database – with REST, GraphQL, and tRPC.

You can then fetch data and display it in your frontend.

## Ready-to-run fullstack example projects

You can find several ready-to-run examples that show how to fullstack apps with Prisma Client in the [`prisma-examples`](https://github.com/prisma/prisma-examples/) repository.

| **Example**                                              | **Description**                                                   |
| :------------------------------------------------------- | :---------------------------------------------------------------- |
| [Next.js](https://pris.ly/e/orm/nextjs)                  | Fullstack Next.js 15 app                                          |
| [Next.js (GraphQL)](https://pris.ly/e/ts/graphql-nextjs) | Fullstack Next.js app using GraphQL Yoga, Pothos, & Apollo Client |
| [Remix](https://pris.ly/e/ts/remix)                      | Fullstack Remix app using actions and loaders                     |
| [SvelteKit](https://pris.ly/e/ts/sveltekit)              | Fullstack Sveltekit app using actions and loaders                 |
| [Nuxt](https://pris.ly/e/ts/rest-nuxtjs)                 | Fullstack Nuxt app using API routes                               |
