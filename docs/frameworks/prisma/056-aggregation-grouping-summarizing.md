---
title: 'Aggregation, grouping, and summarizing'
metaTitle: 'Aggregation, grouping, and summarizing (Concepts)'
metaDescription: 'Use Prisma Client to aggregate, group by, count, and select distinct.'
tocDepth: 4
toc_max_heading_level: 4
---

## Aggregate

Prisma Client allows you to [`aggregate`](/orm/reference/prisma-client-reference#aggregate) on the **number** fields (such as `Int` and `Float`) of a model. The following query returns the average age of all users:

```ts
const aggregations = await prisma.user.aggregate(,
})

console.log('Average age:' + aggregations._avg.age)
```

You can combine aggregation with filtering and ordering. For example, the following query returns the average age of users:

- Ordered by `age` ascending
- Where `email` contains `prisma.io`
- Limited to the 10 users

```ts
const aggregations = await prisma.user.aggregate(,
  where: ,
  },
  orderBy: ,
  take: 10,
})

console.log('Average age:' + aggregations._avg.age)
```

### Aggregate values are nullable

In [2.21.0](https://github.com/prisma/prisma/releases/tag/2.21.0) and later, aggregations on **nullable fields** can return a `number` or `null`. This excludes `count`, which always returns 0 if no records are found.

Consider the following query, where `age` is nullable in the schema:

The query returns ` }` in either of the following scenarios:

- There are no users
- The value of every user's `age` field is `null`

This allows you to differentiate between the true aggregate value (which could be zero) and no data.

## Group by

Prisma Client's [`groupBy()`](/orm/reference/prisma-client-reference#groupby) allows you to **group records** by one or more field values - such as `country`, or `country` and `city` and **perform aggregations** on each group, such as finding the average age of people living in a particular city. `groupBy()` is a GA in [2.20.0](https://github.com/prisma/prisma/releases/2.20.0) and later.

The following video uses `groupBy()` to summarize total COVID-19 cases by continent:

<div class="videoWrapper">

<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/BdlCPdPaorY"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>

</div>

The following example groups all users by the `country` field and returns the total number of profile views for each country:

If you have a single element in the `by` option, you can use the following shorthand syntax to express your query:

```ts
const groupUsers = await prisma.user.groupBy();
```

### `groupBy()` and filtering

`groupBy()` supports two levels of filtering: `where` and `having`.

#### Filter records with `where`

Use `where` to filter all records **before grouping**. The following example groups users by country and sums profile views, but only includes users where the email address contains `prisma.io`:

```ts highlight=3-7;normal
const groupUsers = await prisma.user.groupBy(,
  },
  //highlight-end
  _sum: ,
})
```

#### Filter groups with `having`

Use `having` to filter **entire groups** by an aggregate value such as the sum or average of a field, not individual records - for example, only return groups where the _average_ `profileViews` is greater than 100:

```ts highlight=11-17;normal
const groupUsers = await prisma.user.groupBy(,
  },
  _sum: ,
  //highlight-start
  having: ,
    },
  },
  //highlight-end
})
```

##### Use case for `having`

The primary use case for `having` is to filter on aggregations. We recommend that you use `where` to reduce the size of your data set as far as possible _before_ grouping, because doing so ✔ reduces the number of records the database has to return and ✔ makes use of indices.

For example, the following query groups all users that are _not_ from Sweden or Ghana:

```ts highlight=4-6;normal
const fd = await prisma.user.groupBy(,
    //highlight-end
  },
  _sum: ,
  having: ,
    },
  },
})
```

The following query technically achieves the same result, but excludes users from Ghana _after_ grouping. This does not confer any benefit and is not recommended practice.

```ts highlight=4-6,12-14;normal
const groupUsers = await prisma.user.groupBy(,
    //highlight-end
  },
  _sum: ,
  having: ,
    //highlight-end
    profileViews: ,
    },
  },
})
```

> **Note**: Within `having`, you can only filter on aggregate values _or_ fields available in `by`.

### `groupBy()` and ordering

The following constraints apply when you combine `groupBy()` and `orderBy`:

- You can `orderBy` fields that are present in `by`
- You can `orderBy` aggregate (Preview in 2.21.0 and later)
- If you use `skip` and/or `take` with `groupBy()`, you must also include `orderBy` in the query

#### Order by aggregate group

You can **order by aggregate group**. Prisma ORM added support for using `orderBy` with aggregated groups in relational databases in version [2.21.0](https://github.com/prisma/prisma/releases/2.21.0) and support for MongoDB in [3.4.0](https://github.com/prisma/prisma/releases/3.4.0).

The following example sorts each `city` group by the number of users in that group (largest group first):

#### Order by field

The following query orders groups by country, skips the first two groups, and returns the 3rd and 4th group:

```ts
const groupBy = await prisma.user.groupBy(,
  orderBy: ,
  skip: 2,
  take: 2,
})
```

### `groupBy()` FAQ

#### Can I use `select` with `groupBy()`?

You cannot use `select` with `groupBy()`. However, all fields included in `by` are automatically returned.

#### What is the difference between using `where` and `having` with `groupBy()`?

`where` filters all records before grouping, and `having` filters entire groups and supports filtering on an aggregate field value, such as the average or sum of a particular field in that group.

#### What is the difference between `groupBy()` and `distinct`?

Both `distinct` and `groupBy()` group records by one or more unique field values. `groupBy()` allows you to aggregate data within each group - for example, return the average number of views on posts from Denmark - whereas distinct does not.

## Count

### Count records

Use [`count()`](/orm/reference/prisma-client-reference#count) to count the number of records or non-`null` field values. The following example query counts all users:

```ts
const userCount = await prisma.user.count();
```

### Count relations

To return a count of relations (for example, a user's post count), use the `_count` parameter with a nested `select` as shown:

The `_count` parameter:

- Can be used inside a top-level `include` _or_ `select`
- Can be used with any query that returns records (including `delete`, `update`, and `findFirst`)
- Can return [multiple relation counts](#return-multiple-relation-counts)
- Can [filter relation counts](#filter-the-relation-count) (from version 4.3.0)

#### Return a relations count with `include`

The following query includes each user's post count in the results:

#### Return a relations count with `select`

The following query uses `select` to return each user's post count _and no other fields_:

#### Return multiple relation counts

The following query returns a count of each user's `posts` and `recipes` and no other fields:

#### Filter the relation count

Use `where` to filter the fields returned by the `_count` output type. You can do this on [scalar fields](/orm/prisma-schema/data-model/models#scalar-fields), [relation fields](/orm/prisma-schema/data-model/models#relation-fields) and fields of a [composite type](/orm/prisma-schema/data-model/models#defining-composite-types).

For example, the following query returns all user posts with the title "Hello!":

```ts
// Count all user posts with the title "Hello!"
await prisma.user.findMany( },
      },
    },
  },
})
```

The following query finds all user posts with comments from an author named "Alice":

```ts
// Count all user posts that have comments
// whose author is named "Alice"
await prisma.user.findMany( } } } },
        },
      },
    },
  },
})
```

### Count non-`null` field values

In [2.15.0](https://github.com/prisma/prisma/releases/2.15.0) and later, you can count all records as well as all instances of non-`null` field values. The following query returns a count of:

- All `User` records (`_all`)
- All non-`null` `name` values (not distinct values, just values that are not `null`)

### Filtered count

`count` supports filtering. The following example query counts all users with more than 100 profile views:

```ts
const userCount = await prisma.user.count(,
  },
})
```

The following example query counts a particular user's posts:

```ts
const postCount = await prisma.post.count(,
})
```

## Select distinct

Prisma Client allows you to filter duplicate rows from a Prisma Query response to a [`findMany`](/orm/reference/prisma-client-reference#findmany) query using [`distinct`](/orm/reference/prisma-client-reference#distinct) . `distinct` is often used in combination with [`select`](/orm/reference/prisma-client-reference#select) to identify certain unique combinations of values in the rows of your table.

The following example returns all fields for all `User` records with distinct `name` field values:

```ts
const result = await prisma.user.findMany(,
  distinct: ['name'],
})
```

The following example returns distinct `role` field values (for example, `ADMIN` and `USER`):

### `distinct` under the hood

Prisma Client's `distinct` option does not use SQL `SELECT DISTINCT`. Instead, `distinct` uses:

- A `SELECT` query
- In-memory post-processing to select distinct

It was designed in this way in order to **support `select` and `include`** as part of `distinct` queries.

The following example selects distinct on `gameId` and `playerId`, ordered by `score`, in order to return **each player's highest score per game**. The query uses `include` and `select` to include additional data:

- Select `score` (field on `Play`)
- Select related player name (relation between `Play` and `User`)
- Select related game name (relation between `Play` and `Game`)

<details>

<summary>Expand for sample schema</summary>

```prisma
model User

model Game

model Play
```

</details>

Without `select` and `distinct`, the query would return:

```
[
  ,

]
```
