---
title: 'Autocompletion in GraphQL resolvers with JavaScript'
metaTitle: 'Autocompletion in GraphQL resolvers with JavaScript'
metaDescription: 'Learn how you can get autocompletion for Prisma Client queries in GraphQL resolvers with plain JavaScript'
---

## Problem

When using GraphQL with TypeScript, you always get autocompletion for the Prisma Client instance in your GraphQL resolvers because then the `context` object can be typed – no matter if folks are using Nexus, TypeGraphQL or SDL first. This immensely helps with autocompletion and preventing unwanted errors.

Unfortunately, this needs a little more effort when you're working in plain JavaScript. Suppose we have a resolver like this:

```js
filterPosts: (parent, args, ctx) =>  },
         },
      ],
    },
  })
}
```

Now whenever you type `ctx.` VS Code will provide unnecessary options in the autocomplete which is undesirable.

![Unwanted autocomplete values by VSCode](/img/orm/unwanted-autocomplete-values-in-vscode.png)

VS Code doesn't know the _type_ of the `context` object so it can't provide any intellisense for it, which is why unwanted suggestions are displayed.

## Solution

To overcome this, you need to add a [JSDoc](https://jsdoc.app/) comment named `typedef` to "import" the correct type of your `PrismaClient` instance.

```js
// Add this to the top of the file

/**
 * @typedef  Prisma
 */
```

> **Note**: You can learn more about JSDoc [here](https://devhints.io/jsdoc).

Finally, you need to type your resolver arguments. For simplicity, ignore the `parent` and `args` parameters. So the resolver should now look like this:

```js
/**
 * @param  parent
 * @param } args
 * @param } ctx
 */
filterPosts: (parent, args, ctx) =>  },
         },
      ],
    },
  })
}
```

This will tell VS Code that the `context` has a property named `prisma` and the type is `Prisma` which was defined in the `@typedef` above.

And voilà, autocompletion in plain JavaScript.

![The correct parameters for context are obtained](/img/orm/prisma-autocompletion-in-js.png)

The final file should look something like:

```js
/**
 * @typedef  Prisma
 * @typedef  UserCreateArgs
 */

const  = require('graphql-tools')

const typeDefs = `
type User

type Post

type Query

type Mutation

input PostWhereUniqueInput

input UserCreateInput

input PostCreateManyWithoutPostsInput

input PostCreateWithoutAuthorInput
`

const resolvers =  parent
     * @param  args
     * @param } ctx
     */
    feed: (parent, args, ctx) => ,
      })
    },
    /**
     * @param  parent
     * @param } args
     * @param } ctx
     */
    filterPosts: (parent, args, ctx) =>  },
             },
          ],
        },
      })
    },
    /**
     * @param  parent
     * @param }} args
     * @param } ctx
     */
    post: (parent, args, ctx) => ,
      })
    },
  },
  Mutation:  parent
     * @param } args
     * @param } ctx
     */
    createDraft: (parent, args, ctx) => ,
          },
        },
      })
    },
    /**
     * @param  parent
     * @param }} args
     * @param } ctx
     */
    deleteOnePost: (parent, args, ctx) => ,
      })
    },
    /**
     * @param  parent
     * @param } args
     * @param } ctx
     */
    publish: (parent, args, ctx) => ,
        data: ,
      })
    },
    /**
     * @param  parent
     * @param  args
     * @param } ctx
     */
    signupUser: (parent, args, ctx) => ,
  },
  User: } parent
     * @param  args
     * @param } ctx
     */
    posts: (parent, args, ctx) => ,
        })
        .posts()
    },
  },
  Post: } parent
     * @param  args
     * @param } ctx
     */
    author: (parent, args, ctx) => ,
        })
        .author()
    },
  },
}

const schema = makeExecutableSchema()

module.exports =
```
