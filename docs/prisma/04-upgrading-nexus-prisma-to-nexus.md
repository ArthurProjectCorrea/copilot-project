---
title: 'Old to new Nexus'
metaTitle: 'Upgrade Prisma 1 with nexus-prisma to @nexus/schema'
metaDescription: 'Learn how to upgrade existing Prisma 1 projects with nexus-prisma to Prisma ORM 2 and Nexus.'
---

## Overview

:::info

This guide is not fully up-to-date as it currently uses the [deprecated](https://github.com/graphql-nexus/nexus-plugin-prisma/issues/1039) version of the [`nexus-plugin-prisma`](https://github.com/graphql-nexus/nexus-plugin-prisma). While this is still functional, it is recommended to use the new [`nexus-prisma`](https://github.com/graphql-nexus/nexus-prisma/) library or an alternative code-first GraphQL library like [Pothos](https://pothos-graphql.dev/) going forward. If you have any questions, feel free to share them on our [Discord](https://pris.ly/discord?utm_source=docs&utm_medium=intro_text).

:::

This upgrade guide describes how to upgrade a project that's based on [Prisma 1](https://github.com/prisma/prisma1) and uses [`nexus`](https://www.npmjs.com/package/nexus) (< v0.12.0) or [`@nexus/schema`](https://github.com/graphql-nexus/nexus) together with [`nexus-prisma`](https://www.npmjs.com/package/nexus-prisma) (< v4.0.0) to implement a GraphQL server.

The code will be upgraded to the latest version of `@nexus/schema`. Further, the `nexus-prisma` package will be replaced with the new [`nexus-plugin-prisma`](https://github.com/graphql-nexus/nexus-plugin-prisma).

The guide assumes that you already went through the [guide for upgrading the Prisma ORM layer](/orm/more/upgrade-guides/upgrade-from-prisma-1/upgrading-the-prisma-layer-postgresql). This means you already:

- installed the Prisma ORM 2 CLI
- created your Prisma ORM 2 schema
- introspected your database and resolved potential [schema incompatibilities](/orm/more/upgrade-guides/upgrade-from-prisma-1/schema-incompatibilities-postgresql)
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
    │   ├── nexus-prisma
    │   ├── nexus.ts
    │   ├── prisma-client
    │   └── schema.graphql
    ├── types.ts
    └── index.ts
```

The important parts are:

- A folder called with `prisma` with your Prisma ORM 2 schema
- A folder called `src` with your application code

If this is not what your project structure looks like, you'll need to adjust the instructions in the guide to match your own setup.

## 1. Upgrade Nexus dependencies

To get started, you can remove the old Nexus and Prisma 1 dependencies:

```copy
npm uninstall nexus nexus-prisma prisma-client-lib prisma1
```

Then, you can install the latest `@nexus/schema` dependency in your project:

```copy
npm install @nexus/schema
```

Next, install the Prisma ORM plugin for Nexus which will allow you to expose Prisma ORM models in your GraphQL API (this is the new equivalent of the former `nexus-prisma` package):

```copy
npm install nexus-plugin-prisma
```

The `nexus-plugin-prisma` dependency bundles all required Prisma ORM dependencies. You should therefore remove the dependencies that you added installed when you upgraded the Prisma ORM layer of your app:

```copy
npm uninstall @prisma/cli @prisma/client
```

Note however that you can still invoke the Prisma ORM 2 CLI with the familiar command:

```copy
npx prisma -v
```

> **Note**: If you see the output of the Prisma 1 CLI when running `npx prisma -v`, be sure to delete your `node_modules` folder and re-run `npm install`.

## 2. Update the configuration of Nexus and Prisma ORM

To get started, you can remove the old imports that are not needed any more with your new setup:

```ts line-number highlight=1-3;delete
//delete-start

//delete-end
```

Instead, you now import the following into your application:

```ts line-number highlight=1-3;add
//add-start

//add-end
```

Next you need to adjust the code where you currently create your `GraphQLSchema`, most likely this is currently happening via the `makePrismaSchema` function in your code. Since this function was imported from the removed `nexus-prisma` package, you'll need to replace it with the `makeSchema` function from the `@nexus/schema` package. The way how the Prisma ORM plugin for Nexus is used also changes in the latest version.

Here's an example for such a configuration:

```ts file=./src/index.ts line-number highlight=2,12-14;add|1,8-11;delete showLineNumbers
//delete-next-line
 const schema = makePrismaSchema(,
  //delete-end
  //add-start
  plugins: [nexusSchemaPrisma()],
  //add-end

  // Specify where Nexus should put the generated files
  outputs: ,

  // Configure nullability of input arguments: All arguments are non-nullable by default
  nonNullDefaults: ,

  // Configure automatic type resolution for the TS representations of the associated types
  typegenAutoConfig: ,
    ],
    contextType: 'types.Context',
  },
})
```

If you previously typed the GraphQL `context` object that's passed through your resolver chain, you need to adjust the type like so:

```ts file=./src/types.ts highlight=2,6;add|1,5;delete showLineNumbers
//delete-next-line

//add-next-line

  //delete-next-line
  prisma: Prisma
  //add-next-line
  prisma: PrismaClient
}
```

## 3. Migrate your GraphQL types

Here's a quick overview of the main differences between the two approaches of creating GraphQL types with the latest versions of `@nexus/schema` and `nexus-plugin-prisma`.

- The `prismaObjectType` function is not available any more, all types are created with Nexus' `objectType` function.
- To expose Prisma models via Nexus, you can use the `t.model` property which is added to the `t` argument that's passed into Nexus' `definition` functions. `t.model` gives you access to the properties of a Prisma model and lets you expose them.
- Exposing CRUD operations for Prisma models via Nexus follows a similar approach. These are exposed via `t.crud` in the `definition` functions of your `queryType` and `mutationType` types.

### 3.1. Migrating the `Post` type

#### Type definition with the previous `nexus-prisma` package

In the sample app, the `User` type is defined as follows:

```ts
const User = prismaObjectType(,
    ])
  },
})
```

#### Type definition with the latest version of `@nexus/schema` and the `nexus-plugin-prisma`

With the latest version of `@nexus/schema`, you can now access the `objectType` function on your main `schema` instance and expose all fields from the Prisma model like so:

```ts
const User = objectType()
    t.model.profile()
  },
})
```

Note that `t.model` looks at the `name` attribute in the object that's passed as an argument to the `objectType` function and matches it against the models in your Prisma schema. In this case, it's matched against the `User` model. Therefore, `t.model` exposes functions that are named after the fields of the `User` model.

At this point, you might see errors on the relation fields `posts` and `profile`, e.g.:

```bash highlight=1;delete
//delete-next-line
Missing type Post, did you forget to import a type to the root query?
```

This is because you didn't add the `Post` and `Profile` types to the GraphQL schema yet, the errors will go away once these types are part of the GraphQL schema as well!

### 3.2. Migrating the `Post` type

#### Type definition with the previous `nexus-prisma` package

In the sample app, the `Post` type is defined as follows:

```ts
const Post = prismaObjectType(,
})
```

The asterisk in `prismaFields` means that _all_ Prisma fields are exposed.

#### Type definition with the latest version of `@nexus/schema` and the `nexus-plugin-prisma`

With the latest version of `@nexus/schema`, you need to expose all fields explicitly, there's no option to just expose everything from a Prisma model.

Therefore, the new definition of `Post` must explicitly list all its fields:

```ts
const Post = objectType(,
})
```

Note that `t.model` looks at the `name` attribute and matches it against the models in your Prisma schema. In this case, it's matched against the `Post` model. Therefore, `t.model` exposes functions that are named after the fields of the `Post` model.

### 3.3. Migrating the `Profile` type

#### Type definition with the previous `nexus-prisma` package

In the sample app, the `Profile` type is defined as follows:

```ts
const Profile = prismaObjectType(,
})
```

The asterisk in `prismaFields` means that _all_ Prisma fields are exposed.

#### Type definition with the latest version of `@nexus/schema` and the `nexus-plugin-prisma`

With the latest version of `@nexus/schema`, you need to expose all fields explicitly, there's no option to just expose everything from a Prisma model.

Therefore, the new definition of `Profile` must explicitly list all its fields:

```ts
const Profile = objectType(,
})
```

Note that `t.model` looks at the `name` attribute and matches it against the models in your Prisma schema. In this case, it's matched against the `Profile` model. Therefore, `t.model` exposes functions that are named after the fields of the `Profile` model.

### 3.4. Migrating the `Category` type

#### Type definition with the previous `nexus-prisma` package

In the sample app, the `Category` type is defined as follows:

```ts
const Category = prismaObjectType(,
})
```

The asterisk in `prismaFields` means that _all_ Prisma ORM fields are exposed.

#### Type definition with the latest version of `@nexus/schema` and the `nexus-plugin-prisma`

With the latest version of `@nexus/schema`, you need to expose all fields explicitly, there's no option to just expose everything from a Prisma model.

Therefore, the new definition of `Category` must explicitly list all its fields:

```ts
const Category = objectType()
  },
})
```

Note that `t.model` looks at the `name` attribute and matches it against the models in your Prisma schema. In this case, it's matched against the `Category` model. Therefore, `t.model` exposes functions that are named after the fields of the `Category` model.

## 4. Migrate GraphQL operations

As a next step, you can start migrating all the GraphQL _queries_ and _mutations_ from the "previous" GraphQL API to the new one.

For this guide, the following sample GraphQL operations will be used:

```graphql
input UserUniqueInput

type Query

type Mutation
```

### 4.1. Migrate GraphQL queries

In this section, you'll migrate all GraphQL _queries_ from the previous version of `nexus` and `nexus-prisma` to the latest version of `@nexus/schema` and the `nexus-plugin-prisma`.

#### 4.1.1. Migrate the `users` query

In our sample API, the `users` query from the sample GraphQL schema is implemented as follows.

```ts
const Query = prismaObjectType(,
})
```

To get the same behavior with the new Nexus, you need to call the `users` function on `t.crud`:

```ts
schema.queryType()
  },
})
```

Recall that the `crud` property is added to `t` by the `nexus-plugin-prisma` (using the same mechanism as for `t.model`).

#### 4.1.2. Migrate the `posts(searchString: String): [Post!]!` query

In the sample API, the `posts` query is implemented as follows:

```ts
queryType(),
      },
      resolve: (parent, , context) => ,
              ,
            ],
          },
        })
      },
    })
  },
})
```

The only thing that needs to be updated for this query is the call to Prisma ORM since the new Prisma Client API looks a bit different from the one used in Prisma 1.

```ts line-number highlight=6,9,12,13;normal
queryType(),
      },
      resolve: (parent, , context) =>  },
               },
            ],
          },
        })
      },
    })
  },
})
```

Notice that the `db` object is automatically attached to the `context` by the `nexus-plugin-prisma`. It represents an instance of your `PrismaClient` which enables you to send queries to your database inside your resolvers.

#### 4.1.3. Migrate the `user(uniqueInput: UserUniqueInput): User` query

In the sample API, the `user` query is implemented as follows:

```ts
inputObjectType(,
})

queryType(),
      },
      resolve: (_, args, context) => )
      },
    })
  },
})
```

You now need to adjust the call to your `prisma` instance since the new Prisma Client API looks a bit different from the one used in Prisma 1.

```ts line-number highlight=6,12-17;normal
const Query = queryType(),
      },
      resolve: (_, args, context) => ,
        })
        //highlight-end
      },
    })
  },
})
```

### 4.2. Migrate GraphQL mutations

In this section, you'll migrate the GraphQL mutations from the sample schema to the latest versions of `@nexus/schema` and the `nexus-plugin-prisma`.

#### 4.2.1. Migrate the `createUser` mutation

In our sample API, the `createUser` mutation from the sample GraphQL schema is implemented as follows.

```ts
const Mutation = prismaObjectType(,
})
```

To get the same behavior with the latest versions of `@nexus/schema` and the `nexus-plugin-prisma`, you need to call the `createOneUser` function on `t.crud` and pass an `alias` in order to rename the field in your GraphQL schema to `createUser` (otherwise it would be called `createOneUser`, after the function that's used):

```ts
const Query = queryType()
  },
})
```

Recall that the `crud` property is added to `t` by the `nexus-plugin-prisma` (using the same mechanism as for `t.model`).

#### 4.2.2. Migrate the `createDraft(title: String!, content: String, authorId: String!): Post!` query

In the sample app, the `createDraft` mutation implemented as follows.

```ts line-number
mutationType(),
        content: stringArg(),
        authorId: stringArg(),
      },
      resolve: (_, args, context) => ,
          },
        })
      },
    })
  },
})
```

You now need to adjust the call to your `prisma` instance since the new Prisma Client API looks a bit different from the one used in Prisma 1.

```ts line-number highlight=11-19;normal
const Mutation = mutationType(),
        content: stringArg(),
        authorId: stringArg(),
      },
      resolve: (_, args, context) => ,
            },
          },
        })
        //highlight-end
      },
    })
  },
})
```

#### 4.2.3. Migrate the `updateBio(bio: String, userUniqueInput: UserUniqueInput!): User` mutation

In the sample API, the `updateBio` mutation is defined and implemented as follows.

```ts
mutationType(),
        bio: stringArg(),
      },
      resolve: (_, args, context) => ,
          data: ,
            },
          },
        })
      },
    })
  },
})
```

You now need to adjust the call to your `prisma` instance since the new Prisma Client API looks a bit different from the one used in Prisma 1.

```ts highlight=13-23;normal
const Mutation = mutationType(),
        bio: stringArg(),
      },
      resolve: (_, args, context) => ,
          data: ,
            },
          },
        })
        //highlight-end
      },
    })
  },
})
```

#### 4.2.4. Migrate the `addPostToCategories(postId: String!, categoryIds: [String!]!): Post` mutation

In the sample API, the `addPostToCategories` mutation is defined and implemented as follows.

```ts line-number
mutationType(),
        categoryIds: stringArg(),
      },
      resolve: (_, args, context) => ))
        return context.prisma.updatePost(,
          data: ,
          },
        })
      },
    })
  },
})
```

You now need to adjust the call to your `prisma` instance since the new Prisma Client API looks a bit different from the one used in Prisma 1.

```ts line-number highlight=14-21;normal
const Mutation = mutationType(),
        categoryIds: stringArg(),
      },
      resolve: (_, args, context) => ))
        //highlight-start
        return context.prisma.post.update(,
          data: ,
          },
        })
        //highlight-end
      },
    })
  },
})
```

## 5. Cleaning up

### 5.1. Clean up npm dependencies

If you haven't already, you can now uninstall dependencies that were related to the Prisma 1 setup:

```
npm uninstall prisma1 prisma-client-lib
```

### 5.2. Delete unused files

Next, delete the files of your Prisma 1 setup:

```
rm -rf src/generated
rm -rf prisma1
```

### 5.3. Stop the Prisma ORM server

Finally, you can stop running your Prisma ORM server.
