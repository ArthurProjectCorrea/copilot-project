---
title: 'rejectOnNotFound changes'
metaTitle: 'How to handle removal of rejectOnNotFound in Prisma ORM 5'
metaDescription: 'Sub-guide explaining how to update your code due to the removal of rejectOnNotFound in Prisma ORM 5'
tocDepth: 2
toc: true
---

## Replacing `rejectOnNotFound` enabled at the query level

If you previously enabled `rejectOnNotFound` on a per-query basis, you will need to replace your usage at the _query level_. You can use our `*OrThrow` query variants, `findFirstOrThrow` or `findUniqueOrThrow` instead of supplying the parameter to `findFirst` and `findUnique()`.

### Simple `rejectOnNotFound` usage

The following example:

```js
prisma.user.findFirst(,
  rejectOnNotFound: true,
})
```

needs to be converted to:

```js
prisma.user.findFirstOrThrow(,
})
```

### `rejectOnNotFound` usage with custom error handler

If you use a custom error handler like the following:

```js
prisma.user.findFirst(,
  rejectOnNotFound: () => new UserNotFoundError(),
})
```

You will need to modify your code to handle the errors thrown by `...OrThrow` methods.

```js
try ,
  })
} catch (err) 
  throw err
}
```

If your error handler is used in multiple places, you can also create a reusable error adapter which could then be used within a `.catch()` called on your function.

```js
const adaptError = (customThrowFn) => (error) => 
  throw error
}

const user = await prisma.user.findFirstOrThrow(,
}).catch(adaptError(() => new MyCustomError())
```

## Replacing `rejectOnNotFound` enabled at the Client level

### `rejectOnNotFound` via Prisma Client Constructor

If you previously enabled `rejectOnNotFound` globally via configuration in the Prisma Client constructor, like in these examples:

```js
// Example 1
const prisma = new PrismaClient()

// Example 2
const prisma = new PrismaClient(,
})
```

You will need to update your codebase to use `findUniqueOrThrow` and `findFirstOrThrow` instead of `findUnique()` and `findFirst`, depending on which calls you would like to throw.

### `rejectOnNotFound` via Prisma Client Constructor with custom error handler

If instead you use a custom error handler with the `rejectOnNotFound` property, like these examples:

```js
// Example 3
const prisma = new PrismaClient()

// Example 4
const prisma = new PrismaClient(,
})

// Example 5
const prisma = new PrismaClient(,
    findUnique: ,
  },
})
```

You will need to update your method usage to `...OrThrow` and then use a [Client Extension](/orm/prisma-client/client-extensions) in order to get the same behavior.

As an example, the following extension would give the same behavior in Prisma ORM 5 that `Example 5` gave in Prisma ORM 4 and lower.

```js

const customErrorFunc = async (model, query, args) =>  catch (error: any)  error`)
    }
    throw error;
  }
}

const prisma = (new PrismaClient()).$extends() ,
      async findUniqueOrThrow() ,
    },
    post: ) ,
      async findUniqueOrThrow() ,
    },
  },
})
```