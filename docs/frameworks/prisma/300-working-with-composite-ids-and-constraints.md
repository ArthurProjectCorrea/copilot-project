---
title: 'Working with compound IDs and unique constraints'
metaTitle: 'Working with compound IDs and unique constraints (Concepts)'
metaDescription: 'How to read, write, and filter by compound IDs and unique constraints.'
tocDepth: 2
---

## Where you can use compound IDs and unique constraints

Compound IDs and compound unique constraints can be used when working with _unique_ data.

Below is a list of Prisma Client functions that accept a compound ID or compound unique constraint in the `where` filter of the query:

- `findUnique()`
- `findUniqueOrThrow`
- `delete`
- `update`
- `upsert`

A composite ID and a composite unique constraint is also usable when creating relational data with `connect` and `connectOrCreate`.

## Filtering records by a compound ID or unique constraint

Although your query results will not display a compound ID or unique constraint as a field, you can use these compound values to filter your queries for unique records:

```ts highlight=3-6;normal
const like = await prisma.like.findUnique(,
  },
})
```

## Deleting records by a compound ID or unique constraint

A compound ID or compound unique constraint may be used in the `where` filter of a `delete` query:

```ts highlight=3-6;normal
const like = await prisma.like.delete(,
  },
})
```

## Updating and upserting records by a compound ID or unique constraint

A compound ID or compound unique constraint may be used in the `where` filter of an `update` query:

```ts highlight=3-6;normal
const like = await prisma.like.update(,
  },
  data: ,
})
```

They may also be used in the `where` filter of an `upsert` query:

```ts highlight=3-6;normal
await prisma.like.upsert(,
  },
  update: ,
  create: ,
})
```

## Filtering relation queries by a compound ID or unique constraint

Compound IDs and compound unique constraint can also be used in the `connect` and `connectOrCreate` keys used when connecting records to create a relationship.

For example, consider this query:

```ts highlight=6-9;normal
await prisma.user.create(,
      },
    },
  },
})
```

The `likeId` compound ID is used as the identifier in the `connect` object that is used to locate the `Like` table's record that will be linked to the new user: `"Alice"`.

Similarly, the `likeId` can be used in `connectOrCreate`'s `where` filter to attempt to locate an existing record in the `Like` table:

```ts highlight=10-13;normal
await prisma.user.create(,
        where: ,
        },
      },
    },
  },
})
```