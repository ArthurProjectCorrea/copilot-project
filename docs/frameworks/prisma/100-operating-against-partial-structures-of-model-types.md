---
title: 'Operating against partial structures of your model types'
metaTitle: 'Operating against partial structures of your model types'
metaDescription: 'This page documents various scenarios for using the generated types from the Prisma namespace'
---

## Problem: Using variations of the generated model type

### Description

In some scenarios, you may need a _variation_ of the generated `User` type. For example, when you have a function that expects an instance of the `User` model that carries the `posts` relation. Or when you need a type to pass only the `User` model's `email` and `name` fields around in your application code.

### Solution

As a solution, you can customize the generated model type using Prisma Client's helper types.

The `User` type only contains the model's [scalar](/orm/prisma-schema/data-model/models#scalar-fields) fields, but doesn't account for any relations. That's because [relations are not included by default](/orm/prisma-client/queries/select-fields#return-the-default-fields) in Prisma Client queries.

However, sometimes it's useful to have a type available that **includes a relation** (i.e. a type that you'd get from an API call that uses [`include`](/orm/prisma-client/queries/select-fields#return-nested-objects-by-selecting-relation-fields)). Similarly, another useful scenario could be to have a type available that **includes only a subset of the model's scalar fields** (i.e. a type that you'd get from an API call that uses [`select`](/orm/prisma-client/queries/select-fields#select-specific-fields)).

One way of achieving this would be to define these types manually in your application code:

```ts
// 1: Define a type that includes the relation to `Post`
type UserWithPosts = 

// 2: Define a type that only contains a subset of the scalar fields
type UserPersonalData = 
```

While this is certainly feasible, this approach increases the maintenance burden upon changes to the Prisma schema as you need to manually maintain the types. A cleaner solution to this is to use the `UserGetPayload` type that is generated and exposed by Prisma Client under the `Prisma` namespace in combination with the [`validator`](/orm/prisma-client/type-safety/prisma-validator).

The following example uses the `Prisma.validator` to create two type-safe objects and then uses the `Prisma.UserGetPayload` utility function to create a type that can be used to return all users and their posts.

```ts

// 1: Define a type that includes the relation to `Post`
const userWithPosts = Prisma.validator<Prisma.UserDefaultArgs>()(,
})

// 2: Define a type that only contains a subset of the scalar fields
const userPersonalData = Prisma.validator<Prisma.UserDefaultArgs>()(,
})

// 3: This type will include a user and all their posts
type UserWithPosts = Prisma.UserGetPayload<typeof userWithPosts>
```

The main benefits of the latter approach are:

- Cleaner approach as it leverages Prisma Client's generated types
- Reduced maintenance burden and improved type safety when the schema changes

## Problem: Getting access to the return type of a function

### Description

When doing [`select`](/orm/reference/prisma-client-reference#select) or [`include`](/orm/reference/prisma-client-reference#include) operations on your models and returning these variants from a function, it can be difficult to gain access to the return type, e.g:

```ts
// Function definition that returns a partial structure
async function getUsersWithPosts()  })
  return users
}
```

Extracting the type that represents "users with posts" from the above code snippet requires some advanced TypeScript usage:

```ts
// Function definition that returns a partial structure
async function getUsersWithPosts()  })
  return users
}

// Extract `UsersWithPosts` type with
type ThenArg<T> = T extends PromiseLike<infer U> ? U : T
type UsersWithPosts = ThenArg<ReturnType<typeof getUsersWithPosts>>

// run inside `async` function
const usersWithPosts: UsersWithPosts = await getUsersWithPosts()
```

### Solution

You can use native the TypeScript utility type [`Awaited`](https://www.typescriptlang.org/docs/handbook/utility-types.html#awaitedtype) and [`ReturnType`](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype) to solve the problem elegantly:

```ts
type UsersWithPosts = Awaited<ReturnType<typeof getUsersWithPosts>>
```