---
title: 'Type utilities'
metaTitle: 'Prisma Client Extensions: Type utilities'
metaDescription: 'Advanced type safety: improve type safety in your custom model methods'
---

## Type Utilities

[Prisma Client type utilities](/orm/prisma-client/type-safety) are utilities available within your application and Prisma Client extensions and provide useful ways of constructing safe and extendable types for your extension.

The type utilities available are:

- `Exact<Input, Shape>`: Enforces strict type safety on `Input`. `Exact` makes sure that a generic type `Input` strictly complies with the type that you specify in `Shape`. It [narrows](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) `Input` down to the most precise types.
- `Args<Type, Operation>`: Retrieves the input arguments for any given model and operation. This is particularly useful for extension authors who want to do the following:
  - Re-use existing types to extend or modify them.
  - Benefit from the same auto-completion experience as on existing operations.
- `Result<Type, Arguments, Operation>`: Takes the input arguments and provides the result for a given model and operation. You would usually use this in conjunction with `Args`. As with `Args`, `Result` helps you to re-use existing types to extend or modify them.
- `Payload<Type, Operation>`: Retrieves the entire structure of the result, as scalars and relations objects for a given model and operation. For example, you can use this to determine which keys are scalars or objects at a type level.

The following example creates a new operation, `exists`, based on `findFirst`. It has all of the arguments that `findFirst`.

```ts
const prisma = new PrismaClient().$extends()
        return result !== null
      },
    },
  },
})

async function main() )
  const post = await prisma.post.exists( },
       },
    ],
  })
}
```

## Add a custom property to a method

The following example illustrates how you can add custom arguments, to a method in an extension:

```ts highlight=16
type CacheStrategy = 

const prisma = new PrismaClient().$extends(,
    },
  },
})

async function main() ,
  })
}
```

The example here is only conceptual. For the actual caching to work, you will have to implement the logic. If you're interested in a caching extension/ service, we recommend taking a look at [Prisma Accelerate](https://www.prisma.io/accelerate).