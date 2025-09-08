---
title: 'Query optimization using Prisma Optimize'
sidebar_label: 'Query optimization'
metaTitle: 'Query optimization using Prisma Optimize'
metaDescription: 'How Prisma optimizes queries under the hood'
tocDepth: 3
---

This guide shows how to identify and optimize query performance, debug performance issues, and address common challenges.

## Debugging performance issues

Several common practices can lead to slow queries and performance problems, such as:

- Over-fetching data
- Missing indexes
- Not caching repeated queries
- Performing full table scans

:::info

For more potential causes of performance issues, visit [this page](/optimize/recommendations).

:::

[Prisma Optimize](/optimize) offers [recommendations](/optimize/recommendations) to identify and address the inefficiencies listed above and more, helping to improve query performance.

To get started, follow the [integration guide](/optimize/getting-started) and add Prisma Optimize to your project to begin diagnosing slow queries.

<div class="videoWrapper">
  <iframe
    width="660"
    height="315"
    src="https://www.youtube.com/embed/gWROOjjEiM0"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>

:::tip

You can also [log query events at the client level](/orm/prisma-client/observability-and-logging/logging#event-based-logging) to view the generated queries, their parameters, and execution times.

If you are particularly focused on monitoring query duration, consider using [logging middleware](/orm/prisma-client/client-extensions/middleware/logging-middleware).

:::

## Using bulk queries

It is generally more performant to read and write large amounts of data in bulk - for example, inserting `50,000` records in batches of `1000` rather than as `50,000` separate inserts. `PrismaClient` supports the following bulk queries:

- [`createMany()`](/orm/reference/prisma-client-reference#createmany)
- [`createManyAndReturn()`](/orm/reference/prisma-client-reference#createmanyandreturn)
- [`deleteMany()`](/orm/reference/prisma-client-reference#deletemany)
- [`updateMany()`](/orm/reference/prisma-client-reference#updatemany)
- [`updateManyAndReturn()`](/orm/reference/prisma-client-reference#updatemanyandreturn)
- [`findMany()`](/orm/reference/prisma-client-reference#findmany)

## Reuse `PrismaClient` or use connection pooling to avoid database connection pool exhaustion

Creating multiple instances of `PrismaClient` can exhaust your database connection pool, especially in serverless or edge environments, potentially slowing down other queries. Learn more in the [serverless challenge](/orm/prisma-client/setup-and-configuration/databases-connections#the-serverless-challenge).

For applications with a traditional server, instantiate `PrismaClient` once and reuse it throughout your app instead of creating multiple instances. For example, instead of:

```ts file=query.ts
async function getPosts() 

async function getUsers() 
```

Define a single `PrismaClient` instance in a dedicated file and re-export it for reuse:

```ts file=db.ts

```

Then import the shared instance:

```ts file=query.ts

async function getPosts() 

async function getUsers() 
```

For serverless development environments with frameworks that use HMR (Hot Module Replacement), ensure you properly handle a [single instance of Prisma in development](/orm/more/help-and-troubleshooting/nextjs-help#best-practices-for-using-prisma-client-in-development).

## Solving the n+1 problem

The n+1 problem occurs when you loop through the results of a query and perform one additional query **per result**, resulting in `n` number of queries plus the original (n+1). This is a common problem with ORMs, particularly in combination with GraphQL, because it is not always immediately obvious that your code is generating inefficient queries.

### Solving n+1 in GraphQL with `findUnique()` and Prisma Client's dataloader

<div class="videoWrapper">

<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/7oMfBGEdwsc"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>

</div>

The Prisma Client dataloader automatically _batches_ `findUnique()` queries that occur in the same [tick](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick#processnexttick) and have the same `where` and `include` parameters if:

- All criteria of the `where` filter are on scalar fields (unique or non-unique) of the same model you're querying.
- All criteria use the `equal` filter, whether that's via the shorthand or explicit syntax `(where:  })`.
- No boolean operators or relation filters are present.

Automatic batching of `findUnique()` is particularly useful in a **GraphQL context**. GraphQL runs a separate resolver function for every field, which can make it difficult to optimize a nested query.

For example - the following GraphQL runs the `allUsers` resolver to get all users, and the `posts` resolver **once per user** to get each user's posts (n+1):

```js
query 
  }
}
```

The `allUsers` query uses `user.findMany(..)` to return all users:

```ts highlight=7;normal
const Query = objectType(,
    })
  },
})
```

This results in a single SQL query:

```js

```

However, the resolver function for `posts` is then invoked **once per user**. This results in a `findMany()` query **✘ per user** rather than a single `findMany()` to return all posts by all users (expand CLI output to see queries).

#### Solution 1: Batching queries with the fluent API

Use `findUnique()` in combination with [the fluent API](/orm/prisma-client/queries/relation-queries#fluent-api) (`.posts()`) as shown to return a user's posts. Even though the resolver is called once per user, the Prisma dataloader in Prisma Client **✔ batches the `findUnique()` queries**.

:::info

It may seem counterintitive to use a `prisma.user.findUnique(...).posts()` query to return posts instead of `prisma.posts.findMany()` - particularly as the former results in two queries rather than one.

The **only** reason you need to use the fluent API (`user.findUnique(...).posts()`) to return posts is that the dataloader in Prisma Client batches `findUnique()` queries and does not currently [batch `findMany()` queries](https://github.com/prisma/prisma/issues/1477).

When the dataloader batches `findMany()` queries or your query has the `relationStrategy` set to `join`, you no longer need to use `findUnique()` with the fluent API in this way.

::: 

If the `posts` resolver is invoked once per user, the dataloader in Prisma Client groups `findUnique()` queries with the same parameters and selection set. Each group is optimized into a single `findMany()`.

#### Solution 2: Using JOINs to perform queries

You can perform the query with a [database join](/orm/prisma-client/queries/relation-queries#relation-load-strategies-preview) by setting `relationLoadStrategy` to `"join"`, ensuring that only **one** query is executed against the database.

```ts
const User = objectType(,
        })
      },
    })
  },
})
```

### n+1 in other contexts

The n+1 problem is most commonly seen in a GraphQL context because you have to find a way to optimize a single query across multiple resolvers. However, you can just as easily introduce the n+1 problem by looping through results with `forEach` in your own code.

The following code results in n+1 queries - one `findMany()` to get all users, and one `findMany()` **per user** to get each user's posts:

This is not an efficient way to query. Instead, you can:

- Use nested reads ([`include`](/orm/reference/prisma-client-reference#include) ) to return users and related posts
- Use the [`in`](/orm/reference/prisma-client-reference#in) filter
- Set the [`relationLoadStrategy`](/orm/prisma-client/queries/relation-queries#relation-load-strategies-preview) to `"join"`

#### Solving n+1 with `include`

You can use `include` to return each user's posts. This only results in **two** SQL queries - one to get users, and one to get posts. This is known as a [nested read](/orm/prisma-client/queries/relation-queries#nested-reads).

#### Solving n+1 with `in`

If you have a list of user IDs, you can use the `in` filter to return all posts where the `authorId` is `in` that list of IDs:

#### Solving n+1 with `relationLoadStrategy: "join"`

You can perform the query with a [database join](/orm/prisma-client/queries/relation-queries#relation-load-strategies-preview) by setting `relationLoadStrategy` to `"join"`, ensuring that only **one** query is executed against the database.

```ts
const users = await prisma.user.findMany()

const userIds = users.map((x) => x.id)

const posts = await prisma.post.findMany(,
  },
})
```