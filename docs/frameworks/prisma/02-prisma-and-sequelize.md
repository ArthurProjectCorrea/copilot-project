---
title: 'Sequelize'
metaTitle: 'Prisma ORM vs Sequelize'
metaDescription: 'Learn how Prisma ORM compares to Sequelize.'
community_section: true
---

## Sequelize vs Prisma ORM

While Prisma ORM and Sequelize solve similar problems, they work in very different ways.

**Sequelize** is a traditional ORM which maps _tables_ to _model classes_. Instances of the model classes then provide an interface for CRUD queries to an application at runtime.

**Prisma ORM** is a new kind of ORM that mitigates many problems of traditional ORMs, such as bloated model instances, mixing business with storage logic, lack of type-safety or unpredictable queries caused e.g. by lazy loading.

It uses the [Prisma schema](/orm/prisma-schema) to define application models in a declarative way. Prisma Migrate then allows to generate SQL migrations from the Prisma schema and executes them against the database. CRUD queries are provided by Prisma Client, a lightweight and entirely type-safe database client for Node.js and TypeScript.

## API comparison

### Fetching single objects

**Prisma ORM**

```ts
const user = await prisma.user.findUnique(,
})
```

**Sequelize**

```ts
const user = await User.findByPk(id)
```

### Fetching selected scalars of single objects

**Prisma ORM**

```ts
const user = await prisma.user.findUnique(,
  select: ,
})
```

**Sequelize**

```ts
const user = await User.findByPk(1, )
```

:::tip

Use the `raw: true` query option to return plain JavaScript objects.

:::

### Fetching relations

**Prisma ORM**

> **Note**: `select` returns a `user` object that includes a `post` array, whereas the fluent API only returns a `post` array.

**Sequelize**

```ts
const user = await User.findByPk(id, ,
  ],
})
```

:::tip

Use `model: Post as "Post"` if you used an alias to define the relationship between `User` and `Post` - for example: `User.hasMany(Post, );`

:::

### Filtering for concrete values

**Prisma ORM**

```ts
const posts = await prisma.post.findMany(,
  },
})
```

**Sequelize**

```ts
const post = await Post.findAll(,
  },
})
```

### Other filter criteria

**Prisma ORM**

Prisma ORM generates many [additional filters](/orm/prisma-client/queries/filtering-and-sorting) that are commonly used in modern application development.

**Sequelize**

Sequelize has an [extensive set of operators](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators).

### Relation filters

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

**Sequelize**

Sequelize [doesn't offer a dedicated API for relation filters](https://github.com/sequelize/sequelize/issues/10943). You can get similar functionality by sending a raw SQL query to the database.

### Pagination

**Prisma ORM**

Cursor-style pagination:

```ts
const page = await prisma.post.findMany(,
  last: 20,
})
```

Offset pagination:

```ts
const cc = await prisma.post.findMany()
```

**Sequelize**

Cursor pagination:

```ts
const posts = await Post.findAll(,
  },
})
```

> **Note**: Sequelize use the [Sequelize operators](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators) to perform cursor pagination.

Offset pagination:

```ts
const posts = await Post.findAll()
```

### Creating objects

**Prisma ORM**

```ts
const user = await prisma.user.create(,
})
```

**Sequelize**

### Updating objects

**Prisma ORM**

```ts
const user = await prisma.user.update(,
  where: ,
})
```

**Sequelize**

### Deleting objects

**Prisma ORM**

```ts
const user = await prisma.user.delete(,
})
```

**Sequelize**

```ts
await user.destroy()
```

### Batch updates

**Prisma ORM**

```ts
const user = await prisma.user.updateMany(,
  where: ,
  },
})
```

**Sequelize**

```ts
const updatedUsers = await User.update(,
  where: 
  },
})
```

### Batch deletes

**Prisma ORM**

```ts
const users = await prisma.user.deleteMany(,
  },
})
```

**Sequelize**

```ts
await User.destroy(,
  },
})
```

### Transactions

**Prisma ORM**

```ts
const user = await prisma.user.create(,
        ,
      ],
    },
  },
})
```

**Sequelize**