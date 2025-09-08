---
title: 'CRUD'
metaTitle: 'CRUD (Reference)'
metaDescription: 'How to perform CRUD with Prisma Client.'
toc_max_heading_level: 4
---

## Example schema

All examples are based on the following schema:

<details>

<summary>Expand for sample schema</summary>

</details>

For **relational databases**, use `db push` command to push the example schema to your own database

```terminal
npx prisma db push
```

For **MongoDB**, ensure your data is in a uniform shape and matches the model defined in the Prisma schema.

## Create

### Create a single record

The following query creates ([`create()`](/orm/reference/prisma-client-reference#create)) a single user with two fields:

The user's `id` is auto-generated, and your schema determines [which fields are mandatory](/orm/prisma-schema/data-model/models#optional-and-mandatory-fields).

#### Create a single record using generated types

The following example produces an identical result, but creates a `UserCreateInput` variable named `user` _outside_ the context of the `create()` query. After completing a simple check ("Should posts be included in this `create()` query?"), the `user` variable is passed into the query:

```ts

const prisma = new PrismaClient()

async function main() ,
      },
    }
  } else
  }

  // Pass 'user' object into query
  const createUser = await prisma.user.create()
}

main()
```

For more information about working with generated types, see: [Generated types](/orm/prisma-client/type-safety).

### Create multiple records

Prisma Client supports bulk inserts as a GA feature in [2.20.0](https://github.com/prisma/prisma/releases/2.20.0) and later.

The following [`createMany()`](/orm/reference/prisma-client-reference#createmany) query creates multiple users and skips any duplicates (`email` must be unique):

`createMany()` uses a single `INSERT INTO` statement with multiple values, which is generally more efficient than a separate `INSERT` per row:

```sql
BEGIN
INSERT INTO "public"."User" ("id","name","email","profileViews","role","coinflips","testing","city","country") VALUES (DEFAULT,$1,$2,$3,$4,DEFAULT,DEFAULT,DEFAULT,$5), (DEFAULT,$6,$7,$8,$9,DEFAULT,DEFAULT,DEFAULT,$10), (DEFAULT,$11,$12,$13,$14,DEFAULT,DEFAULT,DEFAULT,$15), (DEFAULT,$16,$17,$18,$19,DEFAULT,DEFAULT,DEFAULT,$20) ON CONFLICT DO NOTHING
COMMIT
SELECT "public"."User"."country", "public"."User"."city", "public"."User"."email", SUM("public"."User"."profileViews"), COUNT(*) FROM "public"."User" WHERE 1=1 GROUP BY "public"."User"."country", "public"."User"."city", "public"."User"."email" HAVING AVG("public"."User"."profileViews") >= $1 ORDER BY "public"."User"."country" ASC OFFSET $2
```

> **Note**: Multiple `create()` statements inside a `$transaction` results in multiple `INSERT` statements.

The following video demonstrates how to use `createMany()` and [faker.js](https://github.com/faker-js/faker/) to seed a database with sample data:

<div class="videoWrapper">
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/QxyqR4yh1GI"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>

### Create records and connect or create related records

See [Working with relations > Nested writes](/orm/prisma-client/queries/relation-queries#nested-writes) for information about creating a record and one or more related records at the same time.

### Create and return multiple records

:::info

This feature is available in Prisma ORM version 5.14.0 and later for PostgreSQL, CockroachDB and SQLite.

:::

You can use `createManyAndReturn()` in order to create many records and return the resulting objects.

:::warning

`relationLoadStrategy: join` is not available when using `createManyAndReturn()`.

:::

## Read

### Get record by ID or unique identifier

The following queries return a single record ([`findUnique()`](/orm/reference/prisma-client-reference#findunique)) by unique identifier or ID:

```ts
// By unique identifier
const user = await prisma.user.findUnique(,
})

// By ID
const user = await prisma.user.findUnique(,
})
```

If you are using the MongoDB connector and your underlying ID type is `ObjectId`, you can use the string representation of that `ObjectId`:

```ts
// By ID
const user = await prisma.user.findUnique(,
})
```

### Get all records

The following [`findMany()`](/orm/reference/prisma-client-reference#findmany) query returns _all_ `User` records:

```ts
const users = await prisma.user.findMany();
```

You can also [paginate your results](/orm/prisma-client/queries/pagination).

### Get the first record that matches a specific criteria

The following [`findFirst()`](/orm/reference/prisma-client-reference#findfirst) query returns the _most recently created user_ with at least one post that has more than 100 likes:

1. Order users by descending ID (largest first) - the largest ID is the most recent
2. Return the first user in descending order with at least one post that has more than 100 likes

```ts
const findUser = await prisma.user.findFirst(,
      },
    },
  },
  orderBy: ,
})
```

### Get a filtered list of records

Prisma Client supports [filtering](/orm/prisma-client/queries/filtering-and-sorting) on record fields and related record fields.

#### Filter by a single field value

The following query returns all `User` records with an email that ends in `"prisma.io"`:

```ts
const users = await prisma.user.findMany(,
  },
})
```

#### Filter by multiple field values

The following query uses a combination of [operators](/orm/reference/prisma-client-reference#filter-conditions-and-operators) to return users whose name start with `E` _or_ administrators with at least 1 profile view:

```ts
const users = await prisma.user.findMany(,
      },
      ,
          role: ,
        },
      },
    ],
  },
})
```

#### Filter by related record field values

The following query returns users with an email that ends with `prisma.io` _and_ have at least _one_ post (`some`) that is not published:

```ts
const users = await prisma.user.findMany(,
    posts: ,
    },
  },
})
```

See [Working with relations](/orm/prisma-client/queries/relation-queries) for more examples of filtering on related field values.

### Select a subset of fields

The following `findUnique()` query uses `select` to return the `email` and `name` fields of a specific `User` record:

For more information about including relations, refer to:

- [Select fields](/orm/prisma-client/queries/select-fields)
- [Relation queries](/orm/prisma-client/queries/relation-queries)

#### Select a subset of related record fields

The following query uses a nested `select` to return:

- The user's `email`
- The `likes` field of each post

For more information about including relations, see [Select fields and include relations](/orm/prisma-client/queries/select-fields).

### Select distinct field values

See [Select `distinct`](/orm/prisma-client/queries/aggregation-grouping-summarizing#select-distinct) for information about selecting distinct field values.

### Include related records

The following query returns all `ADMIN` users and includes each user's posts in the result:

For more information about including relations, see [Select fields and include relations](/orm/prisma-client/queries/select-fields).

#### Include a filtered list of relations

See [Working with relations](/orm/prisma-client/queries/relation-queries#filter-a-list-of-relations) to find out how to combine [`include`](/orm/reference/prisma-client-reference#include) and `where` for a filtered list of relations - for example, only include a user's published posts.

## Update

### Update a single record

The following query uses [`update()`](/orm/reference/prisma-client-reference#update) to find and update a single `User` record by `email`:

### Update multiple records

The following query uses [`updateMany()`](/orm/reference/prisma-client-reference#updatemany) to update all `User` records that contain `prisma.io`:

### Update and return multiple records

:::info

This feature is available in Prisma ORM version 6.2.0 and later for PostgreSQL, CockroachDB, and SQLite.

:::

You can use `updateManyAndReturn()` in order to update many records and return the resulting objects.

:::warning

`relationLoadStrategy: join` is not available when using `updateManyAndReturn()`.

:::

### Update _or_ create records

The following query uses [`upsert()`](/orm/reference/prisma-client-reference#upsert) to update a `User` record with a specific email address, or create that `User` record if it does not exist:

Prisma Client does not have a `findOrCreate()` query. You can use `upsert()` as a workaround. To make `upsert()` behave like a `findOrCreate()` method, provide an empty `update` parameter to `upsert()`.

### Update a number field

Use [atomic number operations](/orm/reference/prisma-client-reference#atomic-number-operations) to update a number field **based on its current value** - for example, increment or multiply. The following query increments the `views` and `likes` fields by `1`:

```ts
const updatePosts = await prisma.post.updateMany(,
    likes: ,
  },
})
```

### Connect and disconnect related records

Refer to [Working with relations](/orm/prisma-client/queries/relation-queries) for information about disconnecting ([`disconnect`](/orm/reference/prisma-client-reference#disconnect)) and connecting ([`connect`](/orm/reference/prisma-client-reference#connect)) related records.

## Delete

### Delete a single record

The following query uses [`delete()`](/orm/reference/prisma-client-reference#delete) to delete a single `User` record:

```ts
const deleteUser = await prisma.user.delete(,
})
```

Attempting to delete a user with one or more posts result in an error, as every `Post` requires an author - see [cascading deletes](#cascading-deletes-deleting-related-records).

### Delete multiple records

The following query uses [`deleteMany()`](/orm/reference/prisma-client-reference#deletemany) to delete all `User` records where `email` contains `prisma.io`:

```ts
const deleteUsers = await prisma.user.deleteMany(,
  },
})
```

Attempting to delete a user with one or more posts result in an error, as every `Post` requires an author - see [cascading deletes](#cascading-deletes-deleting-related-records).

### Delete all records

The following query uses [`deleteMany()`](/orm/reference/prisma-client-reference#deletemany) to delete all `User` records:

```ts
const deleteUsers = await prisma.user.deleteMany();
```

Be aware that this query will fail if the user has any related records (such as posts). In this case, you need to [delete the related records first](#cascading-deletes-deleting-related-records).

### Cascading deletes (deleting related records)

The following query uses [`delete()`](/orm/reference/prisma-client-reference#delete) to delete a single `User` record:

```ts
const deleteUser = await prisma.user.delete(,
})
```

However, the example schema includes a **required relation** between `Post` and `User`, which means that you cannot delete a user with posts:

```
The change you are trying to make would violate the required relation 'PostToUser' between the `Post` and `User` models.
```

To resolve this error, you can:

- Make the relation optional:

  ```prisma highlight=3,4;add|5,6;delete
  model Post
  ```

- Change the author of the posts to another user before deleting the user.

- Delete a user and all their posts with two separate queries in a transaction (all queries must succeed):

  ```ts
  const deletePosts = prisma.post.deleteMany(,
  })

  const deleteUser = prisma.user.delete(,
  })

  const transaction = await prisma.$transaction([deletePosts, deleteUser])
  ```

### Delete all records from all tables

Sometimes you want to remove all data from all tables but keep the actual tables. This can be particularly useful in a development environment and whilst testing.

The following shows how to delete all records from all tables with Prisma Client and with Prisma Migrate.

#### Deleting all data with `deleteMany()`

When you know the order in which your tables should be deleted, you can use the [`deleteMany`](/orm/reference/prisma-client-reference#deletemany) function. This is executed synchronously in a [`$transaction`](/orm/prisma-client/queries/transactions) and can be used with all types of databases.

```ts
const deletePosts = prisma.post.deleteMany();
const deleteProfile = prisma.profile.deleteMany();
const deleteUsers = prisma.user.deleteMany();

// The transaction runs synchronously so deleteUsers must run last.
await prisma.$transaction([deleteProfile, deletePosts, deleteUsers]);
```

✅ **Pros**:

- Works well when you know the structure of your schema ahead of time
- Synchronously deletes each tables data

❌ **Cons**:

- When working with relational databases, this function doesn't scale as well as having a more generic solution which looks up and `TRUNCATE`s your tables regardless of their relational constraints. Note that this scaling issue does not apply when using the MongoDB connector.

> **Note**: The `$transaction` performs a cascading delete on each models table so they have to be called in order.

#### Deleting all data with raw SQL / `TRUNCATE`

If you are comfortable working with raw SQL, you can perform a `TRUNCATE` query on a table using [`$executeRawUnsafe`](/orm/prisma-client/using-raw-sql/raw-queries#executerawunsafe).

In the following examples, the first tab shows how to perform a `TRUNCATE` on a Postgres database by using a `$queryRaw` look up that maps over the table and `TRUNCATES` all tables in a single query.

The second tab shows performing the same function but with a MySQL database. In this instance the constraints must be removed before the `TRUNCATE` can be executed, before being reinstated once finished. The whole process is run as a `$transaction`

✅ **Pros**:

- Scalable
- Very fast

❌ **Cons**:

- Can't undo the operation
- Using reserved SQL key words as tables names can cause issues when trying to run a raw query

#### Deleting all records with Prisma Migrate

If you use Prisma Migrate, you can use `migrate reset`, this will:

1. Drop the database
2. Create a new database
3. Apply migrations
4. Seed the database with data

## Advanced query examples

### Create a deeply nested tree of records

- A single `User`
- Two new, related `Post` records
- Connect or create `Category` per post

```ts
const u = await prisma.user.create(,
    },
  },
  data: ,
                where: ,
              },
              ,
                where: ,
              },
            ],
          },
        },
        ,
                where: ,
              },
              ,
                where: ,
              },
            ],
          },
        },
      ],
    },
  },
})
```
