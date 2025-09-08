---
title: 'Unit testing'
metaTitle: 'Unit testing with Prisma ORM'
metaDescription: 'Learn how to setup and run unit tests with Prisma Client'
tocDepth: 3
---

> **Note**: This [blog post](https://www.prisma.io/blog/testing-series-2-xPhjjmIEsM) provides a comprehensive guide to implementing unit testing in your Express project with Prisma ORM. If you're looking to delve into this topic, be sure to give it a read!

## Prerequisites

This guide assumes you have the JavaScript testing library [`Jest`](https://jestjs.io/) and [`ts-jest`](https://github.com/kulshekhar/ts-jest) already setup in your project.

## Mocking Prisma Client

To ensure your unit tests are isolated from external factors you can mock Prisma Client, this means you get the benefits of being able to use your schema (**_type-safety_**), without having to make actual calls to your database when your tests are run.

This guide will cover two approaches to mocking Prisma Client, a singleton instance and dependency injection. Both have their merits depending on your use cases. To help with mocking Prisma Client the [`jest-mock-extended`](https://github.com/marchaos/jest-mock-extended) package will be used.

```terminal
npm install jest-mock-extended@2.0.4 --save-dev
```

### Singleton

The following steps guide you through mocking Prisma Client using a singleton pattern.

1. Create a file at your projects root called `client.ts` and add the following code. This will instantiate a Prisma Client instance.

   ```ts file=client.ts
   import  from '@prisma/client'

   const prisma = new PrismaClient()
   export default prisma
   ```

2. Next create a file named `singleton.ts` at your projects root and add the following:

   ```ts file=singleton.ts
   import  from '@prisma/client'
   import  from 'jest-mock-extended'

   import prisma from './client'

   jest.mock('./client', () => ())

   beforeEach(() => )

   export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>
   ```

The singleton file tells Jest to mock a default export (the Prisma Client instance in `./client.ts`), and uses the `mockDeep` method from `jest-mock-extended` to enable access to the objects and methods available on Prisma Client. It then resets the mocked instance before each test is run.

Next, add the `setupFilesAfterEnv` property to your `jest.config.js` file with the path to your `singleton.ts` file.

```js file=jest.config.js highlight=5;add showLineNumbers
module.exports =
```

### Dependency injection

Another popular pattern that can be used is dependency injection.

1. Create a `context.ts` file and add the following:

   ```ts file=context.ts
   import  from '@prisma/client'
   import  from 'jest-mock-extended'

   export type Context =

   export type MockContext =

   export const createMockContext = (): MockContext =>
   }
   ```

:::tip

If you find that you're seeing a circular dependency error highlighted through mocking Prisma Client, try adding `"strictNullChecks": true`
to your `tsconfig.json`.

:::

2. To use the context, you would do the following in your test file:

   ```ts
   import  from '../context'

   let mockCtx: MockContext
   let ctx: Context

   beforeEach(() => )
   ```

This will create a new context before each test is run via the `createMockContext` function. This (`mockCtx`) context will be used to make a mock call to Prisma Client and run a query to test. The `ctx` context will be used to run a scenario query that is tested against.

## Example unit tests

A real world use case for unit testing Prisma ORM might be a signup form. Your user fills in a form which calls a function, which in turn uses Prisma Client to make a call to your database.

All of the examples that follow use the following schema model:

```prisma file=schema.prisma showLineNumbers
model User
```

The following unit tests will mock the process of

- Creating a new user
- Updating a users name
- Failing to create a user if terms are not accepted

The functions that use the dependency injection pattern will have the context injected (passed in as a parameter) into them, whereas the functions that use the singleton pattern will use the singleton instance of Prisma Client.

```ts file=functions-with-context.ts

interface CreateUser

  if (user.acceptTermsAndConditions) )
  } else
}

interface UpdateUser

  return await ctx.prisma.user.update(,
    data: user,
  })
}
```

```ts file=functions-without-context.ts

interface CreateUser

  if (user.acceptTermsAndConditions) )
  } else
}

interface UpdateUser

  return await prisma.user.update(,
    data: user,
  })
}
```

The tests for each methodology are fairly similar, the difference is how the mocked Prisma Client is used.

The **_dependency injection_** example passes the context through to the function that is being tested as well as using it to call the mock implementation.

The **_singleton_** example uses the singleton client instance to call the mock implementation.

```ts file=__tests__/with-singleton.ts

test('should create new user ', async () =>

  prismaMock.user.create.mockResolvedValue(user)

  await expect(createUser(user)).resolves.toEqual()
})

test('should update a users name ', async () =>

  prismaMock.user.update.mockResolvedValue(user)

  await expect(updateUsername(user)).resolves.toEqual()
})

test('should fail if user does not accept terms', async () =>

  prismaMock.user.create.mockImplementation()

  await expect(createUser(user)).resolves.toEqual(
    new Error('User must accept terms!')
  )
})
```

```ts file=__tests__/with-dependency-injection.ts

let mockCtx: MockContext
let ctx: Context

beforeEach(() => )

test('should create new user ', async () =>
  mockCtx.prisma.user.create.mockResolvedValue(user)

  await expect(createUser(user, ctx)).resolves.toEqual()
})

test('should update a users name ', async () =>
  mockCtx.prisma.user.update.mockResolvedValue(user)

  await expect(updateUsername(user, ctx)).resolves.toEqual()
})

test('should fail if user does not accept terms', async () =>

  mockCtx.prisma.user.create.mockImplementation()

  await expect(createUser(user, ctx)).resolves.toEqual(
    new Error('User must accept terms!')
  )
})
```
