---
title: 'prisma-binding to SDL-first'
metaTitle: 'Upgrading from Prisma 1 with prisma-binding to SDL-first'
metaDescription: 'Learn how to upgrade existing Prisma 1 projects with prisma-binding to Prisma ORM 2 (SDL-first).'
---

## Overview

This upgrade guide describes how to migrate a Node.js project that's based on [Prisma 1](https://github.com/prisma/prisma1) and uses `prisma-binding` to implement a GraphQL server.

The code will keep the [SDL-first approach](https://www.prisma.io/blog/the-problems-of-schema-first-graphql-development-x1mn4cb0tyl3) for constructing the GraphQL schema. When migrating from `prisma-binding` to Prisma Client, the main difference is that the `info` object can't be used to resolve relations automatically any more, instead you'll need to implement your _type resolvers_ to ensure that relations get resolved properly.

The guide assumes that you already went through the [guide for upgrading the Prisma ORM layer](/orm/more/upgrade-guides/upgrade-from-prisma-1/upgrading-the-prisma-layer-postgresql). This means you already:

- installed the Prisma ORM 2 CLI
- created your Prisma ORM 2 schema
- introspected your database and resolved potential schema incompatibilities
- installed and generated Prisma Client

The guide further assumes that you have a file setup that looks similar to this:

```
.
├── README.md
├── package.json
├── prisma
│   └── schema.prisma
├── prisma1
│   ├── datamodel.prisma
│   └── prisma.yml
└── src
    ├── generated
    │   └── prisma.graphql
    ├── index.js
    └── schema.graphql
```

The important parts are:

- A folder called with `prisma` with your Prisma ORM 2 schema
- A folder called `src` with your application code and a schema called `schema.graphql`

If this is not what your project structure looks like, you'll need to adjust the instructions in the guide to match your own setup.

## 1. Adjusting your GraphQL schema

With `prisma-binding`, your approach for defining your GraphQL schema (sometimes called [application schema](https://v1.prisma.io/docs/1.20/data-model-and-migrations/data-model-knul/#a-note-on-the-application-schema)) is based on _importing_ GraphQL types from the generated `prisma.graphql` file (in Prisma 1, this is typically called [Prisma GraphQL schema](https://v1.prisma.io/docs/1.20/data-model-and-migrations/data-model-knul/#the-prisma-graphql-schema)). These types mirror the types from your Prisma 1 datamodel and serve as foundation for your GraphQL API.

With Prisma ORM 2, there's no `prisma.graphql` file any more that you could import from. Therefore, you have to spell out all the types of your GraphQL schema directly inside your `schema.graphql` file.

The easiest way to do so is by downloading the full GraphQL schema from the GraphQL Playground. To do so, open the **SCHEMA** tab and click the **DOWNLOAD** button in the top-right corner, then select **SDL**:

![Downloading the GraphQL schema with GraphQL Playground](./images/download-graphql-schema.png)

Alternatively, you can use the `get-schema` command of the [GraphQL CLI](https://github.com/Urigo/graphql-cli) to download your full schema:

```
npx graphql get-schema --endpoint __GRAPHQL_YOGA_ENDPOINT__ --output schema.graphql --no-all
```

> **Note**: With the above command, you need to replace the `__GRAPHQL_YOGA_ENDPOINT__` placeholder with the actual endpoint of your GraphQL Yoga server.

Once you obtained the `schema.graphql` file, replace your current version in `src/schema.graphql` with the new contents. Note that the two schemas are 100% equivalent, except that the new one doesn't use [`graphql-import`](https://github.com/ardatan/graphql-import) for importing types from a different file. Instead, it spells out all types in a single file.

Here's a comparison of these two versions of the sample GraphQL schema that we'll migrate in this guide (you can use the tabs to switch between the two versions):

You'll notice that the new version of your GraphQL schema not only defines the _models_ that were imported directly, but also additional types (e.g. `input` types) that were not present in the schema before.

## 2. Set up your `PrismaClient` instance

`PrismaClient` is your new interface to the database in Prisma ORM 2. It lets you invoke various methods which build SQL queries and send them to the database, returning the results as plain JavaScript objects.

The `PrismaClient` query API is inspired by the initial `prisma-binding` API, so a lot of the queries you send with Prisma Client will feel familiar.

Similar to the `prisma-binding` instance from Prisma 1, you also want to attach your `PrismaClient` from Prisma ORM 2 to GraphQL's `context` so that in can be accessed inside your resolvers:

```js line-number highlight=10-13;delete|14;add
const  = require('@prisma/client')

// ...

const server = new GraphQLServer(),
    //delete-end
    //add-next-line
    prisma: new PrismaClient(),
  }),
})
```

In the code block above, the _red_ lines are the lines to be removed from your current setup, the _green_ lines are the ones that you should add. Of course, it's possible that your previous setup differed from this one (e.g. it's unlikely that your Prisma ORM `endpoint` was `http://localhost:4466` if you're running your API in production), this is just a sample to indicate what it _could_ look like.

When you're now accessing `context.prisma` inside of a resolver, you now have access to Prisma Client queries.

## 2. Write your GraphQL type resolvers

`prisma-binding` was able to _magically_ resolve relations in your GraphQL schema. When not using `prisma-binding` though, you need to explicitly resolve your relations using so-called _type resolvers_.

> **Note** You can learn more about the concept of type resolvers and why they're necessary in this article: [GraphQL Server Basics: GraphQL Schemas, TypeDefs & Resolvers Explained](https://www.prisma.io/blog/graphql-server-basics-the-schema-ac5e2950214e)

### 2.1. Implementing the type resolver for the `User` type

The `User` type in our sample GraphQL schema is defined as follows:

```graphql
type User implements Node 
```

This type has two relations:

- The `posts` field denotes a 1-n relation to `Post`
- The `profile` field denotes a 1-1 relation to `Profile`

Since you're not using `prisma-binding` any more, you now need to resolve these relations "manually" in type resolvers.

You can do so by adding a `User` field to your _resolver map_ and implement the resolvers for the `posts` and `profile` relations as follows:

```js line-number highlight=8-23;add
const resolvers = ,
  Mutation: ,
  //add-start
  User: ,
        })
        .posts()
    },
    profile: (parent, args, context) => ,
        })
        .profile()
    },
  },
  //add-end
}
```

Inside of these resolvers, you're using your new `PrismaClient` to perform a query against the database. Inside the `posts` resolver, the database query loads all `Post` records from the specified `author` (whose `id` is carried in the `parent` object). Inside the `profile` resolver, the database query loads the `Profile` record from the specified `user` (whose `id` is carried in the `parent` object).

Thanks to these extra resolvers, you'll now be able to nest relations in your GraphQL queries/mutations whenever you're requesting information about the `User` type in a query, e.g.:

```graphql

    profile 
  }
}
```

### 2.2. Implementing the type resolver for the `Post` type

The `Post` type in our sample GraphQL schema is defined as follows:

```graphql
type Post implements Node 
```

This type has two relations:

- The `author` field denotes a 1-n relation to `User`
- The `categories` field denotes a m-n relation to `Category`

Since you're not using `prisma-binding` any more, you now need to resolve these relations "manually" in type resolvers.

You can do so by adding a `Post` field to your _resolver map_ and implement the resolvers for the `author` and `categories` relations as follows:

```js line-number highlight=11-26;add
const resolvers = ,
  Mutation: ,
  User: ,
  //add-start
  Post: ,
        })
        .author()
    },
    categories: (parent, args, context) => ,
        })
        .categories()
    },
  },
  //add-end
}
```

Inside of these resolvers, you're using your new `PrismaClient` to perform a query against the database. Inside the `author` resolver, the database query loads the `User` record that represents the `author` of the `Post`. Inside the `categories` resolver, the database query loads all `Category` records from the specified `post` (whose `id` is carried in the `parent` object).

Thanks to these extra resolvers, you'll now be able to nest relations in your GraphQL queries/mutations whenever you're requesting information about the `User` type in a query, e.g.:

```graphql

    categories 
  }
}
```

### 2.3. Implementing the type resolver for the `Profile` type

The `Profile` type in our sample GraphQL schema is defined as follows:

```graphql
type Profile implements Node 
```

This type has one relation: The `user` field denotes a 1-n relation to `User`.

Since you're not using `prisma-binding` any more, you now need to resolve this relation "manually" in type resolvers.

You can do so by adding a `Profile` field to your _resolver map_ and implement the resolvers for the `owner` relation as follows:

```js line-number highlight=14-22;add
const resolvers = ,
  Mutation: ,
  User: ,
  Post: ,
  //add-start
  Profile: ,
        })
        .owner()
    },
  },
  //add-end
}
```

Inside of this resolver, you're using your new `PrismaClient` to perform a query against the database. Inside the `user` resolver, the database query loads the `User` records from the specified `profile` (whose `id` is carried in the `parent` object).

Thanks to this extra resolver, you'll now be able to nest relations in your GraphQL queries/mutations whenever you're requesting information about the `Profile` type in a query.

### 2.4. Implementing the type resolver for the `Category` type

The `Category` type in our sample GraphQL schema is defined as follows:

```graphql
type Category implements Node 
```

This type has one relation: The `posts` field denotes a m-n relation to `Post`.

Since you're not using `prisma-binding` any more, you now need to resolve this relation "manually" in type resolvers.

You can do so by adding a `Category` field to your _resolver map_ and implement the resolvers for the `posts` and `profile` relations as follows:

```js line-number highlight=17-25;add
const resolvers = ,
  Mutation: ,
  User: ,
  Post: ,
  Profile: ,
  //add-start
  Category: ,
        })
        .posts()
    },
  },
  //add-end
}
```

Inside of this resolver, you're using your new `PrismaClient` to perform a query against the database. Inside the `posts` resolver, the database query loads all `Post` records from the specified `categories` (whose `id` is carried in the `parent` object).

Thanks to this extra resolver, you'll now be able to nest relations in your GraphQL queries/mutations whenever you're requesting information about a `Category` type in a query.

With all your type resolvers in place, you can start migrating the actual GraphQL API operations.

## 3. Migrate GraphQL operations

### 3.1. Migrate GraphQL queries

In this section, you'll migrate all GraphQL _queries_ from `prisma-binding` to Prisma Client.

#### 3.1.1. Migrate the `users` query (which uses `forwardTo`)

In our sample API, the `users` query from the sample GraphQL schema is defined and implemented as follows.

##### SDL schema definition with `prisma-binding`

```graphql
type Query 
```

##### Resolver implementation with `prisma-binding`

```js
const resolvers = ,
}
```

##### Implementing the `users` resolver with Prisma Client

To re-implement queries that were previously using `forwardTo`, the idea is to pass the incoming filtering, ordering and pagination arguments to `PrismaClient`:

```js
const resolvers =  = args
      return context.prisma.user.findMany()
    },
    // ... other resolvers
  },
}
```

Note that this approach does **not** work yet because the _structures_ of the incoming arguments is different from the ones expected by `PrismaClient`. To ensure the structures are compatible, you can use the `@prisma/binding-argument-transform` npm package which ensures compatibility:

```copy
npm install @prisma/binding-argument-transform
```

You can now use this package as follows:

```js
const  = require('@prisma/binding-argument-transform')

const resolvers =  = args
      const prisma2Where = makeWherePrisma2Compatible(where)
      const prisma2OrderBy = makeOrderByPrisma2Compatible(orderBy)
      return context.prisma.user.findMany()
    },
    // ... other resolvers
  },
}
```

The last remaining issue with this are the pagination arguments. Prisma ORM 2 introduces a [new pagination API](https://github.com/prisma/prisma/releases/tag/2.0.0-beta.7):

- The `first`, `last`, `before` and `after` arguments are removed
- The new `cursor` argument replaces `before` and `after`
- The new `take` argument replaces `first` and `last`

Here is how you can adjust the call to make it compliant with the new Prisma Client pagination API:

```js
const  = require('@prisma/binding-argument-transform')

const resolvers =  = args
      const prisma2Where = makeWherePrisma2Compatible(where)
      const prisma2OrderBy = makeOrderByPrisma2Compatible(orderBy)
      const skipValue = skip || 0
      const prisma2Skip = Boolean(before) ? skipValue + 1 : skipValue
      const prisma2Take = Boolean(last) ? -last : first
      const prisma2Before = 
      const prisma2After = 
      const prisma2Cursor =
        !Boolean(before) && !Boolean(after)
          ? undefined
          : Boolean(before)
          ? prisma2Before
          : prisma2After
      return context.prisma.user.findMany()
    },
    // ... other resolvers
  },
}
```

The calculations are needed to ensure the incoming pagination arguments map properly to the ones from the Prisma Client API.

#### 3.1.2. Migrate the `posts(searchString: String): [Post!]!` query

The `posts` query is defined and implemented as follows.

##### SDL schema definition with `prisma-binding`

```graphql
type Query 
```

##### Resolver implementation with `prisma-binding`

```js
const resolvers = ,
              ,
            ],
          },
        },
        info
      )
    },
    // ... other resolvers
  },
}
```

##### Implementing the `posts` resolver with Prisma Client

To get the same behavior with the new Prisma Client, you'll need to adjust your resolver implementation:

```js line-number highlight=3-11;normal
const resolvers =  },
             },
          ],
        },
      })
      //highlight-end
    },
    // ... other resolvers
  },
}
```

You can now send the respective query in the GraphQL Playground:

```graphql

  }
}
```

#### 3.1.3. Migrate the `user(uniqueInput: UserUniqueInput): User` query

In our sample app, the `user` query is defined and implemented as follows.

##### SDL schema definition with `prisma-binding`

```graphql
type Query 

input UserUniqueInput 
```

##### Resolver implementation with `prisma-binding`

```js
const resolvers = ,
        info
      )
    },
    // ... other resolvers
  },
}
```

##### Implementing the `user` resolver with Prisma Client

To get the same behavior with the new Prisma Client, you'll need to adjust your resolver implementation:

```js line-number highlight=3-7;normal
const resolvers = )
    },
    //highlight-end
    // ... other resolvers
  },
}
```

You can now send the respective query via the GraphQL Playground:

```graphql
) 
}
```

### 3.1. Migrate GraphQL mutations

In this section, you'll migrate the GraphQL mutations from the sample schema.

#### 3.1.2. Migrate the `createUser` mutation (which uses `forwardTo`)

In the sample app, the `createUser` mutation from the sample GraphQL schema is defined and implemented as follows.

##### SDL schema definition with `prisma-binding`

```graphql
type Mutation 
```

##### Resolver implementation with `prisma-binding`

```js
const resolvers = ,
}
```

##### Implementing the `createUser` resolver with Prisma Client

To get the same behavior with the new Prisma Client, you'll need to adjust your resolver implementation:

```js line-number highlight=3-7;normal
const resolvers = )
    },
    //highlight-end
    // ... other resolvers
  },
}
```

You can now write your first mutation against the new API, e.g.:

```graphql
mutation ) 
}
```

#### 3.1.3. Migrate the `createDraft(title: String!, content: String, authorId: String!): Post!` query

In the sample app, the `createDraft` mutation is defined and implemented as follows.

##### SDL schema definition with `prisma-binding`

```graphql
type Mutation 
```

##### Resolver implementation with `prisma-binding`

```js
const resolvers = ,
            },
          },
        },
        info
      )
    },
    // ... other resolvers
  },
}
```

##### Implementing the `createDraft` resolver with Prisma Client

To get the same behavior with the new Prisma Client, you'll need to adjust your resolver implementation:

```js line-number highlight=3-15;normal
const resolvers = ,
          },
        },
      })
    },
    //highlight-end
    // ... other resolvers
  },
}
```

You can now send the respective mutation via the GraphQL Playground:

```graphql
mutation 
  }
}
```

#### 3.1.4. Migrate the `updateBio(bio: String, userUniqueInput: UserUniqueInput!): User` mutation

In the sample app, the `updateBio` mutation is defined and implemented as follows.

##### SDL schema definition with `prisma-binding`

```graphql
type Mutation 
```

##### Resolver implementation with `prisma-binding`

```js
const resolvers = ,
            },
          },
          where: ,
        },
        info
      )
    },
    // ... other resolvers
  },
}
```

##### Implementing the `updateBio` resolver with Prisma Client

To get the same behavior with Prisma Client, you'll need to adjust your resolver implementation:

```js line-number highlight=3-12;normal
const resolvers = ,
          },
        },
        where: args.userUniqueInput,
      })
    },
    //highlight-end
    // ... other resolvers
  },
}
```

You can now send the respective mutation via the GraphQL Playground :

```graphql
mutation 
    bio: "I like turtles"
  ) 
  }
}
```

#### 3.1.5. Migrate the `addPostToCategories(postId: String!, categoryIds: [String!]!): Post` mutation

In our sample app, the `addPostToCategories` mutation is defined and implemented as follows.

##### SDL schema definition with `prisma-binding`

```graphql
type Mutation 
```

##### Resolver implementation with `prisma-binding`

```js
const resolvers = ))
      return context.prisma.mutation.updatePost(
        ,
          },
          where: ,
        },
        info
      )
    },
    // ... other resolvers
  },
}
```

##### Implementing the `addPostToCategories` resolver with Prisma Client

To get the same behavior with Prisma Client, you'll need to adjust your resolver implementation:

```js line-number highlight=3-13;normal
const resolvers = ))
      return context.prisma.post.update(,
        data: ,
        },
      })
    },
    //highlight-end
    // ... other resolvers
  },
}
```

You can now send the respective query via the GraphQL Playground:

```graphql
mutation 
  }
}
```

## 4. Cleaning up

Since the entire app has now been upgraded to Prisma ORM 2, you can delete all unnecessary files and remove the no longer needed dependencies.

### 4.1. Clean up npm dependencies

You can start by removing npm dependencies that were related to the Prisma 1 setup:

```copy
npm uninstall graphql-cli prisma-binding prisma1
```

### 4.2. Delete unused files

Next, delete the files of your Prisma 1 setup:

```copy
rm prisma1/datamodel.prisma prisma1/prisma.yml
```

### 4.3. Stop the Prisma ORM server

Finally, you can stop running your Prisma ORM server.