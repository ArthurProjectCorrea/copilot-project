---
title: 'Custom model and field names'
metaTitle: 'Custom model and field names'
metaDescription: 'Learn how you can decouple the naming of Prisma models from database tables to improve the ergonomics of the generated Prisma Client API.'
---

## Example: Relational database

Assume you have a PostgreSQL relational database schema looking similar to this:

```sql
CREATE TABLE users (
	user_id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(256),
	email VARCHAR(256) UNIQUE NOT NULL
);
CREATE TABLE posts (
	post_id SERIAL PRIMARY KEY NOT NULL,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	title VARCHAR(256) NOT NULL,
	content TEXT,
	author_id INTEGER REFERENCES users(user_id)
);
CREATE TABLE profiles (
	profile_id SERIAL PRIMARY KEY NOT NULL,
	bio TEXT,
	user_id INTEGER NOT NULL UNIQUE REFERENCES users(user_id)
);
CREATE TABLE categories (
	category_id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(256)
);
CREATE TABLE post_in_categories (
	post_id INTEGER NOT NULL REFERENCES posts(post_id),
	category_id INTEGER NOT NULL REFERENCES categories(category_id)
);
CREATE UNIQUE INDEX post_id_category_id_unique ON post_in_categories(post_id int4_ops,category_id int4_ops);
```

When introspecting a database with that schema, you'll get a Prisma schema looking similar to this:

```prisma
model categories

model post_in_categories

model posts

model profiles

model users
```

There are a few "issues" with this Prisma schema when the Prisma Client API is generated:

**Adhering to Prisma ORM's naming conventions**

Prisma ORM has a [naming convention](/orm/reference/prisma-schema-reference#naming-conventions) of **camelCasing** and using the **singular form** for Prisma models. If these naming conventions are not met, the Prisma schema can become harder to interpret and the generated Prisma Client API will feel less natural. Consider the following, generated model:

```prisma
model users
```

Although `profiles` refers to a 1:1 relation, its type is currently called `profiles` in plural, suggesting that there might be many `profiles` in this relation. With Prisma ORM conventions, the models and fields were _ideally_ named as follows:

```prisma
model User
```

Because these fields are "Prisma ORM-level" [relation fields](/orm/prisma-schema/data-model/relations#relation-fields) that do not manifest you can manually rename them in your Prisma schema.

**Naming of annotated relation fields**

Foreign keys are represented as a combination of a [annotated relation fields](/orm/prisma-schema/data-model/relations#relation-fields) and its corresponding relation scalar field in the Prisma schema. Here's how all the relations from the SQL schema are currently represented:

```prisma
model categories

model post_in_categories

model posts

model profiles

model users
```

## Using `@map` and `@@map` to rename fields and models in the Prisma Client API

You can "rename" fields and models that are used in Prisma Client by mapping them to the "original" names in the database using the `@map` and `@@map` attributes. For the example above, you could e.g. annotate your models as follows.

_After_ you introspected your database with `prisma db pull`, you can manually adjust the resulting Prisma schema as follows:

```prisma
model Category

model PostInCategories

model Post

model Profile

model User
```

With these changes, you're now adhering to Prisma ORM's naming conventions and the generated Prisma Client API feels more "natural":

```ts
// Nested writes
const profile = await prisma.profile.create(,
    },
  },
})

// Fluent API
const userByProfile = await prisma.profile
  .findUnique(,
  })
  .users()
```

:::info

`prisma db pull` preserves the custom names you defined via `@map` and `@@map` in your Prisma schema on re-introspecting your database.

:::

## Renaming relation fields

Prisma ORM-level [relation fields](/orm/prisma-schema/data-model/relations#relation-fields) (sometimes referred to as "virtual relation fields") only exist in the Prisma schema, but do not actually manifest in the underlying database. You can therefore name these fields whatever you want.

Consider the following example of an ambiguous relation in a SQL database:

```sql
CREATE TABLE "User" (
    id SERIAL PRIMARY KEY
);
CREATE TABLE "Post" (
    id SERIAL PRIMARY KEY,
    "author" integer NOT NULL,
    "favoritedBy" INTEGER,
    FOREIGN KEY ("author") REFERENCES "User"(id),
    FOREIGN KEY ("favoritedBy") REFERENCES "User"(id)
);
```

Prisma ORM's introspection will output the following Prisma schema:

```prisma
model Post

model User
```

Because the names of the virtual relation fields `Post_Post_authorToUser` and `Post_Post_favoritedByToUser` are based on the generated relation names, they don't look very friendly in the Prisma Client API. In that case, you can rename the relation fields. For example:

```prisma highlight=11-12;edit
model Post

model User
```

:::info

`prisma db pull` preserves custom relation fields defined in your Prisma schema on re-introspecting your database.

:::
