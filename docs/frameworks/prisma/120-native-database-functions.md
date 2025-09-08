---
title: Native database functions
metaTitle: Native database functions
metaDescription: How to enable PostgreSQL native database functions for projects that use Prisma Migrate.
---

## How to install a PostgreSQL extension as part of a migration

This section describes how to add a SQL command to a migration file to activate a PostgreSQL extension. If you manage PostgreSQL extensions in your Prisma Schema with the `postgresqlExtensions` preview feature instead, see [How to migrate PostgreSQL extensions](/orm/prisma-schema/postgresql-extensions#how-to-migrate-postgresql-extensions).

The following example demonstrates how to install the `pgcrypto` extension as part of a migration:

1. Add the field with the native database function to your schema:

   ```prisma
   model User
   ```

   If you include a cast operator (such as `::TEXT`), you must surround the entire function with parentheses:

   ```prisma
   @default(dbgenerated("(gen_random_uuid()::TEXT)"))
   ```

1. Use the `--create-only` flag to generate a new migration without applying it:

   ```terminal
   npx prisma migrate dev --create-only
   ```

1. Open the generated `migration.sql` file and enable the `pgcrypto` module:

   ```sql
   CREATE EXTENSION IF NOT EXISTS pgcrypto;

   ADD COLUMN "id" UUID NOT NULL DEFAULT gen_random_uuid(),
   ADD PRIMARY KEY ("id");
   ```

1. Apply the migration:

   ```terminal
   npx prisma migrate dev
   ```

Each time you reset the database or add a new member to your team, all required functions are part of the migration history.
