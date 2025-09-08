---
title: Seeding
metaTitle: Seeding
metaDescription: Learn how to seed your database using Prisma ORM's integrated seeding functionality and Prisma Client
tocDepth: 3
---

## How to seed your database in Prisma ORM

Prisma ORM's integrated seeding functionality expects a command in the `"seed"` key in the `"prisma"` key of your `package.json` file. This can be any command, `prisma db seed` will just execute it. In this guide and as a default, we recommend writing a seed script inside your project's `prisma/` folder and starting it with the command.

## Integrated seeding with Prisma Migrate

Database seeding happens in two ways with Prisma ORM: manually with `prisma db seed` and automatically in `prisma migrate reset` and (in some scenarios) `prisma migrate dev`.

With `prisma db seed`, _you_ decide when to invoke the seed command. It can be useful for a test setup or to prepare a new development environment, for example.

Prisma Migrate also integrates seamlessly with your seeds, assuming you follow the steps in the section below. Seeding is triggered automatically when Prisma Migrate resets the development database.

Prisma Migrate resets the database and triggers seeding in the following scenarios:

- You manually run the `prisma migrate reset` CLI command.
- The database is reset interactively in the context of using `prisma migrate dev` - for example, as a result of migration history conflicts or database schema drift.
- The database is actually created by `prisma migrate dev`, because it did not exist before.

When you want to use `prisma migrate dev` or `prisma migrate reset` without seeding, you can pass the `--skip-seed` flag.

## Example seed scripts

Here we suggest some specific seed scripts for different situations. You are free to customize these in any way, but can also use them as presented here:

### Seeding your database with TypeScript or JavaScript

### Seeding your database via raw SQL queries

You can also make use of raw SQL queries in order to seed the database with data.

While you can use a plain-text `.sql` file (such as a data dump) for that, it is often
easier to place those raw queries, if they're of short size, into the `seed.js` file
because it saves you the hassle of working out database connection strings and creating
a dependency on a binary like `psql`.

To seed additional data to the `schema.prisma` above, add the following to the
`seed.js` (or `seed.ts`) file:

```js file=seed.js
async function rawSql() )
}
```

and chain this function to the promise calls, such as the following change towards
the end of the file:

```js file=seed.js
main()
  .then(rawSql)
  .then(async () => )
  .catch(async (e) => )
```

### Seeding your database via any language (with a Bash script)

In addition to TypeScript and JavaScript, you can also use a Bash script (`seed.sh`) to seed your database in another language such as Go, or plain SQL.

### User-defined arguments

> This feature is available from version 4.15.0 and later.

`prisma db seed` allows you to define custom arguments in your seed file that you can pass to the `prisma db seed` command. For example, you could define your own arguments to seed different data for different environments or partially seeding data in some tables.

Here is an example seed file that defines a custom argument to seed different data in different environments:

```js file="seed.js"

const options = ,
}

async function main() ,
  } = parseArgs()

  switch (environment) 
}

main()
  .then(async () => )
  .catch(async (e) => )
```

You can then provide the `environment` argument when using `prisma db seed` by adding a [delimiter](https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap12.html#tag_12_02) — `--` —, followed by your custom arguments:

```
npx prisma db seed -- --environment development
```

## Going further

Here's a non-exhaustive list of other tools you can integrate with Prisma ORM in your development workflow to seed your database:

- [Supabase community project](https://github.com/supabase-community/seed)
- [Replibyte](https://www.replibyte.com/docs/introduction/)