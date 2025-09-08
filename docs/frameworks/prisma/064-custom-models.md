---
title: 'Custom models'
metaTitle: 'Custom models'
metaDescription: 'This page explains how to wrap Prisma Client in custom models'
---

## Static methods with Prisma Client extensions

The following example demonstrates how to create a Prisma Client extension that adds a `signUp` and `findManyByDomain` methods to a User model.

## Wrap a model in a class

In the example below, you'll see how you can wrap the `user` model in the Prisma Client within a `Users` class.

```tsx

type Signup =

class Users

  // Signup a new user
  async signup(data: Signup): Promise<User> )
  }
}

async function main() )
}
```

With this new `Users` class, you can define custom functions like `signup`:

Note that in the example above, you're only exposing a `signup` method from Prisma Client. The Prisma Client is hidden within the `Users` class, so you're no longer be able to call methods like `findMany` and `upsert`.

This approach works well when you have a large application and you want to intentionally limit what your models can do.

## Extending Prisma Client model object

But what if you don't want to hide existing functionality but still want to group custom functions together? In this case, you can use `Object.assign` to extend Prisma Client without limiting its functionality:

```tsx

type Signup =

function Users(prismaUser: PrismaClient['user']) )
    },
  })
}

async function main() )
  const numUsers = await users.count()
  console.log(user, numUsers)
}
```

Now you can use your custom `signup` method alongside `count`, `updateMany`, `groupBy()` and all of the other wonderful methods that Prisma Client provides. Best of all, it's all type-safe!

## Going further

We recommend using [Prisma Client extensions](/orm/prisma-client/client-extensions) to extend your models with [custom model methods](https://github.com/prisma/prisma-client-extensions/tree/main/instance-methods).
