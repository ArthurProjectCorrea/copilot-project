---
title: Native database types
metaTitle: Native database types
metaDescription: Native database types
toc_max_heading_level: 2
---

## Mapping fields to a specific native type

Each Prisma ORM type maps to a default underlying database type - for example, the PostgreSQL connector maps `String` to `text` by default. [Native database type attributes](/orm/prisma-schema/data-model/models#native-types-mapping) determines which _specific_ native type should be created in the database.

In the following example, the `name` and `title` fields have a `@db.VarChar(X)` type attribute:

```prisma highlight=8,14;normal
datasource db 

model User 

model Post 
```

Prisma Migrate uses the specified types when it creates a migration:

```sql highlight=4,10;normal
  -- CreateTable
CREATE TABLE "User" (
    "id" SERIAL,
    "name" VARCHAR(200) NOT NULL,
    PRIMARY KEY ("id")
);
  -- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL,
    "title" VARCHAR(150) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "authorId" INTEGER NOT NULL,
    PRIMARY KEY ("id")
);

  -- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
```

### Mappings by Prisma ORM type

For type mappings organized by Prisma ORM type, refer to the [Prisma schema reference](/orm/reference/prisma-schema-reference#model-field-scalar-types) documentation.

### Mappings by database provider

For type mappings organized by database provider, see:

- [PostgreSQL mappings](/orm/overview/databases/postgresql#type-mapping-between-postgresql-and-prisma-schema)
- [MySQL mappings](/orm/overview/databases/mysql#native-type-mappings)
- [Microsoft SQL Server mappings](/orm/overview/databases/sql-server#type-mapping-between-microsoft-sql-server-to-prisma-schema)
- [SQLite mappings](/orm/overview/databases/sqlite#type-mapping-between-sqlite-to-prisma-schema)

## Handling unsupported database features

Prisma Migrate cannot automatically create database features that have no equivalent in Prisma Schema Language (PSL). For example, there is currently no way to define a stored procedure or a partial index in PSL. However, there are ways to add unsupported features to your database with Prisma Migrate:

- [Handle unsupported field types](/orm/prisma-schema/data-model/unsupported-database-features#unsupported-field-types) (like `circle`)
- [Handle unsupported features](/orm/prisma-schema/data-model/unsupported-database-features#unsupported-database-features), like stored procedures
- [How to use native database functions](/orm/prisma-schema/data-model/unsupported-database-features#native-database-functions)