---
title: 'Computed fields'
metaTitle: 'Computed fields'
metaDescription: 'This page explains how to use client extensions to add computed fields to Prisma models.'
---

Computed fields allow you to derive a new field based on existing data. A common example is when you want to compute a full name. In your database, you may only store the first and last name, but you can define a function that computes a full name by combining the first and last name. Computed fields are read-only and stored in your application's memory, not in your database.

## Using a Prisma Client extension

The following example illustrates how to create a [Prisma Client extension](/orm/prisma-client/client-extensions) that adds a `fullName` computed field at runtime to the `User` model in a Prisma schema.

The computed fields are type-safe and can return anything from a concatenated value to complex objects or functions that can act as an instance method for your models.

<details>

<summary>Instructions prior to Prisma ORM 4.16.0</summary>

:::warning

With Prisma Client extensions Generally Available as of Prisma ORM version 4.16.0, the following steps are not recommended. Please use [a client extension](#using-a-prisma-client-extension) to accomplish this.

:::

Prisma Client does not yet natively support computed fields, but, you can define a function that accepts a generic type as an input then extend that generic to ensure it conforms to a specific structure. Finally, you can return that generic with additional computed fields. Let's see how that might look:

In the TypeScript example above, a `User` generic has been defined that extends the `FirstLastName` type. This means that whatever you pass into `computeFullName` must contain `firstName` and `lastName` keys.

A `WithFullName<User>` return type has also been defined, which takes whatever `User` is and tacks on a `fullName` string attribute.

With this function, any object that contains `firstName` and `lastName` keys can compute a `fullName`. Pretty neat, right?

</details>

### Going further

- Learn how you can use [Prisma Client extensions](/orm/prisma-client/client-extensions) to add a computed field to your schema — [example](https://github.com/prisma/prisma-client-extensions/tree/main/computed-fields).
- Learn how you can move the `computeFullName` function into [a custom model](/orm/prisma-client/queries/custom-models).
- There's an [open feature request](https://github.com/prisma/prisma/issues/3394) to add native support to Prisma Client. If you'd like to see that happen, make sure to upvote that issue and share your use case!