---
title: Customizing migrations
metaTitle: Customizing migrations
metaDescription: How to edit a migration file before applying it to avoid data loss in production.
tocDepth: 3
---

## How to edit a migration file

To edit a migration file before applying it, the general procedure is the following:

1. Make a schema change that requires custom SQL (for example, to preserve existing data)
1. Create a draft migration using:

   ```terminal
   npx prisma migrate dev --create-only
   ```

1. Modify the generated SQL file.
1. Apply the modified SQL by running:

   ```terminal
   npx prisma migrate dev
   ```

### Example: Rename a field

By default, renaming a field in the schema results in a migration that will:

- `CREATE` a new column (for example, `fullname`)
- `DROP` the existing column (for example, `name`) and the data in that column

To actually **rename** a field and avoid data loss when you run the migration in production, you need to modify the generated migration SQL before applying it to the database. Consider the following schema fragment - the `biograpy` field is spelled wrong.

```prisma highlight=3;normal;
model Profile 
```

To rename the `biograpy` field to `biography`:

1. Rename the field in the schema:

   ```prisma highlight=3;delete|4;add;
   model Profile 
   ```

1. Run the following command to create a **draft migration** that you can edit before applying to the database:

   ```terminal
   npx prisma migrate dev --name rename-migration --create-only
   ```

1. Edit the draft migration as shown, changing `DROP` / `DELETE` to a single `RENAME COLUMN`:

1. Save and apply the migration:

   ```terminal
   npx prisma migrate dev
   ```

You can use the same technique to rename a `model` - edit the generated SQL to _rename_ the table rather than drop and re-create it.

### Example: Use the expand and contract pattern to evolve the schema without downtime

Making schema changes to existing fields, e.g., renaming a field can lead to downtime. It happens in the time frame between applying a migration that modifies an existing field, and deploying a new version of the application code which uses the modified field.

You can prevent downtime by breaking down the steps required to alter a field into a series of discrete steps designed to introduce the change gradually. This pattern is known as the _expand and contract pattern_.

The pattern involves two components: your application code accessing the database and the database schema you intend to alter.

With the _expand and contract_ pattern, renaming the field `bio` to `biography` would look as follows with Prisma:

1. Add the new `biography` field to your Prisma schema and create a migration

   ```prisma highlight=4;add;
   model Profile 
   ```

2. _Expand_: update the application code and write to both the `bio` and `biography` fields, but continue reading from the `bio` field, and deploy the code
3. Create an empty migration and copy existing data from the `bio` to the `biography` field

   ```terminal
   npx prisma migrate dev --name copy_biography --create-only
   ```

   ```sql file=prisma/migrations/20210420000000_copy_biography/migration.sql
   UPDATE "Profile" SET biography = bio;
   ```

4. Verify the integrity of the `biography` field in the database
5. Update application code to **read** from the new `biography` field
6. Update application code to **stop writing** to the `bio` field
7. _Contract_: remove the `bio` from the Prisma schema, and create a migration to remove the `bio` field

   ```prisma highlight=3;delete;
   model Profile 
   ```

   ```terminal
   npx prisma migrate dev --name remove_bio
   ```

By using this approach, you avoid potential downtime that altering existing fields that are used in the application code are prone to, and reduce the amount of coordination required between applying the migration and deploying the updated application code.

Note that this pattern is applicable in any situation involving a change to a column that has data and is in use by the application code. Examples include combining two fields into one, or transforming a `1:n` relation to a `m:n` relation.

To learn more, check out the Data Guide article on [the expand and contract pattern](https://www.prisma.io/dataguide/types/relational/expand-and-contract-pattern)

### Example: Change the direction of a 1-1 relation

To change the direction of a 1-1 relation:

1. Make the change in the schema:

   ```prisma
   model User 
   
   model Profile 
   ```

1. Run the following command to create a **draft migration** that you can edit before applying to the database:

1. Edit the draft migration as shown:

1. Save and apply the migration:

   ```terminal
   npx prisma migrate dev
   ```