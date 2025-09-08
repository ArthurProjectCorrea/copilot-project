---
title: 'Unsupported database features (Prisma Migrate)'
sidebar_label: 'Unsupported database features'
metaTitle: 'Prisma Migrate: Unsupported database features'
metaDescription: 'How to include unsupported database features for projects that use Prisma Migrate.'
---

## Customize a migration to include an unsupported feature

To customize a migration to include an unsupported feature:

1. Use the `--create-only` flag to generate a new migration without applying it:

   ```terminal
   npx prisma migrate dev --create-only
   ```

1. Open the generated `migration.sql` file and add the unsupported feature - for example, a partial index:

   ```sql
   CREATE UNIQUE INDEX tests_success_constraint
     ON posts (subject, target)
     WHERE success;
   ```

1. Apply the migration:

   ```terminal
   npx prisma migrate dev
   ```

1. Commit the modified migration to source control.