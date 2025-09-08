---
title: 'Custom validation'
metaTitle: 'Custom validation'
metaDescription: 'This page explains how to add custom validation to Prisma Client'
---

## Input validation with Prisma Client extensions

This example adds runtime validation when creating and updating values using a Zod schema to check that the data passed to Prisma Client is valid.

The above example uses a Zod schema to validate and parse data provided in a query at runtime before a record is written to the database.

## Input validation with a custom validation function

Here's an example using [Superstruct](https://github.com/ianstormtaylor/superstruct) to validate that the data needed to signup a new user is correct:

```tsx

const prisma = new PrismaClient()

// Runtime validation
const Signup = object()

type Signup = Omit<Prisma.UserCreateArgs['data'], 'id'>

// Signup function
async function signup(input: Signup): Promise<User> )
}
```

The example above shows how you can create a custom type-safe `signup` function that ensures the input is valid before creating a user.

## Going further

- Learn how you can use [Prisma Client extensions](/orm/prisma-client/client-extensions) to add input validation for your queries — [example](https://github.com/prisma/prisma-client-extensions/tree/main/input-validation).
- Learn how you can organize your code better by moving the `signup` function into [a custom model](/orm/prisma-client/queries/custom-models).
- There's an [outstanding feature request](https://github.com/prisma/prisma/issues/3528) to bake user validation into Prisma Client. If you'd like to see that happen, make sure to upvote that issue and share your use case!
