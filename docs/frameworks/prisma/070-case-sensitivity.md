---
title: 'Case sensitivity'
metaTitle: 'Case sensitivity (Reference)'
metaDescription: 'How Prisma Client handles case sensitivity when filtering and sorting.'
preview: false
---

## Database collation and case sensitivity

Collation specifies how data is **sorted and compared** in a database, which includes casing. Collation is something you choose when you set up a database.

The following example demonstrates how to view the collation of a MySQL database:

The example collation, [`utf8mb4_0900_ai_ci`](https://dev.mysql.com/doc/refman/8.0/en/charset-collation-names.html), is:

- Accent-insensitive (`ai`)
- Case-insensitive (`ci`).

This means that `prisMa` will match `prisma`, `PRISMA`, `priSMA`, and so on:

The same query with Prisma Client:

```ts
const users = await prisma.user.findMany(,
  },
  select: ,
})
```

## Options for case-insensitive filtering

The recommended way to support case-insensitive filtering with Prisma Client depends on your underlying provider.

### PostgreSQL provider

PostgreSQL uses [deterministic collation](https://www.postgresql.org/docs/current/collation.html#COLLATION-NONDETERMINISTIC) by default, which means that filtering is **case-sensitive**. To support case-insensitive filtering, use the `mode: 'insensitive'` property on a per-field basis.

Use the `mode` property on a filter as shown:

```ts highlight=5;normal
const users = await prisma.user.findMany(,
  },
})
```

See also: [Filtering (Case-insensitive filtering)](/orm/prisma-client/queries/filtering-and-sorting#case-insensitive-filtering)

#### Caveats

- You cannot use case-insensitive filtering with C collation
- [`citext`](https://www.postgresql.org/docs/12/citext.html) columns are always case-insensitive and are not affected by `mode`

#### Performance

If you rely heavily on case-insensitive filtering, consider [creating indexes in the PostgreSQL database](https://www.postgresql.org/docs/current/indexes.html) to improve performance:

- [Create an expression index](https://www.postgresql.org/docs/current/indexes-expressional.html) for Prisma Client queries that use `equals` or `not`
- Use the `pg_trgm` module to [create a trigram-based index](https://www.postgresql.org/docs/12/pgtrgm.html#id-1.11.7.40.7) for Prisma Client queries that use `startsWith`, `endsWith`, `contains` (maps to`LIKE` / `ILIKE` in PostgreSQL)

### MySQL provider

MySQL uses **case-insensitive collation** by default. Therefore, filtering with Prisma Client and MySQL is case-insensitive by default.

`mode: 'insensitive'` property is not required and therefore not available in the generated Prisma Client API.

#### Caveats

- You _must_ use a case-insensitive (`_ci`) collation in order to support case-insensitive filtering. Prisma Client does no support the `mode` filter property for the MySQL provider.

### MongoDB provider

To support case-insensitive filtering, use the `mode: 'insensitive'` property on a per-field basis:

```ts highlight=5;normal
const users = await prisma.user.findMany(,
  },
})
```

The MongoDB uses a RegEx rule for case-insensitive filtering.

### SQLite provider

By default, text fields created by Prisma Client in SQLite databases do not support case-insensitive filtering. In SQLite, only [case-insensitive comparisons of ASCII characters](https://www.sqlite.org/faq.html#q18) are possible.

To enable limited support (ASCII only) for case-insensitive filtering on a per-column basis, you will need to add `COLLATE NOCASE` when you define a text column.

#### Adding case-insensitive filtering to a new column.

To add case-insensitive filtering to a new column, you will need to modify the migration file that is created by Prisma Client.

Taking the following Prisma Schema model:

```prisma
model User 
```

and using `prisma migrate dev --create-only` to create the following migration file:

```sql
-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL
);
```

You would need to add `COLLATE NOCASE` to the `email` column in order to make case-insensitive filtering possible:

```sql
-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    //highlight-next-line
    "email" TEXT NOT NULL COLLATE NOCASE
);
```

#### Adding case-insensitive filtering to an existing column.

Since columns cannot be updated in SQLite, `COLLATE NOCASE` can only be added to an existing column by creating a blank migration file and migrating data to a new table.

Taking the following Prisma Schema model:

```prisma
model User 
```

and using `prisma migrate dev --create-only` to create an empty migration file, you will need to rename the current `User` table and create a new `User` table with `COLLATE NOCASE`.

```sql
-- UpdateTable
ALTER TABLE "User" RENAME TO "User_old";

CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL COLLATE NOCASE
);

INSERT INTO "User" (id, email)
SELECT id, email FROM "User_old";

DROP TABLE "User_old";
```

### Microsoft SQL Server provider

Microsoft SQL Server uses **case-insensitive collation** by default. Therefore, filtering with Prisma Client and Microsoft SQL Server is case-insensitive by default.

`mode: 'insensitive'` property is not required and therefore not available in the generated Prisma Client API.