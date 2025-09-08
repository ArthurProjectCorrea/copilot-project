---
title: 'Mongoose'
metaTitle: 'Prisma ORM vs Mongoose'
metaDescription: 'Learn how Prisma ORM compares to Mongoose.'
community_section: true
---

## Fetching single objects

**Prisma ORM**

```ts
const user = await prisma.user.findUnique(,
})
```

**Mongoose**

```ts
const result = await User.findById(1)
```

## Fetching selected scalars of single objects

**Prisma ORM**

```ts
const user = await prisma.user.findUnique(,
  select: ,
})
```

**Mongoose**

```ts
const user = await User.findById(1).select(['name'])
```

## Fetching relations

**Prisma ORM**

**Mongoose**

```ts
const userWithPost = await User.findById(2).populate('post')
```

## Filtering for concrete values

**Prisma ORM**

```ts
const posts = await prisma.post.findMany(,
  },
})
```

**Mongoose**

```ts
const posts = await Post.find()
```

## Other filter criteria

**Prisma ORM**

Prisma ORM generates many [additional filters](/orm/prisma-client/queries/filtering-and-sorting) that are commonly used in modern application development.

**Mongoose**

Mongoose exposes the [MongoDB query selectors](https://www.mongodb.com/docs/manual/reference/operator/query/#query-selectors) as filter criteria.

## Relation filters

**Prisma ORM**

Prisma ORM lets you filter a list based on a criteria that applies not only to the models of the list being retrieved, but to a _relation_ of that model.

For example, the following query returns users with one or more posts with "Hello" in the title:

```ts
const posts = await prisma.user.findMany(,
      },
    },
  },
})
```

**Mongoose**

Mongoose doesn't offer a dedicated API for relation filters. You can get similar functionality by adding an additional step to filter the results returned by the query.

## Pagination

**Prisma ORM**

Cursor-style pagination:

```ts
const page = prisma.post.findMany(,
  last: 20,
})
```

Offset pagination:

```ts
const cc = prisma.post.findMany()
```

**Mongoose**

```ts
const posts = await Post.find()
```

## Creating objects

**Prisma ORM**

```ts
const user = await prisma.user.create(,
})
```

**Mongoose**

## Updating objects

**Prisma ORM**

```ts
const user = await prisma.user.update(,
  where: ,
})
```

**Mongoose**

## Deleting objects

**Prisma ORM**

```ts
const user = prisma.user.delete(,
})
```

**Mongoose**

```ts
await User.deleteOne()
```

## Batch deletes

**Prisma ORM**

```ts
const users = await prisma.user.deleteMany(,
  },
})
```

**Mongoose**

```ts
await User.deleteMany( })
```