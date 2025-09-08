---
title: 'Upgrade from MongoDB Beta'
metaTitle: 'Upgrade from the Prisma 1 MongoDB Beta to Prisma ORM 2 or later'
metaDescription: 'Learn how to upgrade your MongoDB application running Prisma 1 to Prisma ORM 2 or later.'
---

## Introduction

This guide helps you migrate from the Prisma 1 MongoDB Beta to MongoDB on Prisma ORM 2 or later. To learn more about the differences between Prisma 1 and Prisma ORM 2.x and later, refer to [this document](/orm/more/upgrade-guides/upgrade-from-prisma-1/how-to-upgrade#main-differences-between-prisma-1-and-prisma-orm-version-2x-and-later).

The scope of this guide is to give you the workflow necessary to perform the migration and highlight some of the problems you might encounter.

We unfortunately can't cover all possible scenarios or changes required, but this guide should help you on your journey. Join [our Discord](https://pris.ly/discord?utm_source=docs&utm_medium=intro_text) or create an issue [on Github](https://github.com/prisma/prisma1/issues/new/choose) with any questions.

## Requirements

- Must be running MongoDB 4.2+ as a replica set (MongoDB Atlas does this for you automatically)
- Node.js: see [system requirements](/orm/reference/system-requirements)
- TypeScript: see [system requirements](/orm/reference/system-requirements)

## Installing Prisma ORM 3.12.0 or later

In your project directory run the following commands:

```terminal
npm install prisma@latest && npm install @prisma/client
npx prisma init --datasource-provider=mongodb
```

This should create the following files:

- `prisma/schema.prisma`: An initial Prisma schema
- `.env`: Environment file where you'll store your connection string

## Find the Connection String to your MongoDB Database

Next you'll want to find the connection string to your MongoDB database. You should be able to find it in your `docker-compose.yml` file or on MongoDB Atlas. It's what you'd pass to MongoDB Compass. The connection string should look something like this:

```bash
mongodb://<user>:<pass>@<host>:27017
```

The database that stores application data in Prisma 1 is called `default_default`, so we'll add that to the end of the connection string and update the `DATABASE_URL` key in the `.env` file

```bash file=.env
DATABASE_URL="mongodb://prisma:prisma@localhost:27017/default_default"
```

## Introspect your MongoDB Database

You're now ready to pull the structure of your database down into your Prisma Schema.

```bash
$ npx prisma db pull
```

And you should see your Prisma schema in `prisma/schema.prisma` populated with your models.

## Touching up your Prisma Schema

The generated Prisma Client from a freshly introspected Prisma 1 based MongoDB database may not have the best API. You can adjust the model names and fields, just be sure to `@map` and `@@map` the original name to the underlying database collection and field names:

```diff
- model posts 

- model users 
```

Take caution in doing these renames because you need to make sure the Prisma Schema still maps properly to the underlying database collections and field names.

Unlike SQL databases, MongoDB doesn't have an explicit understanding of relationships between data. This means that Prisma ORM's introspection is unable to infer those relationships for you.

We typically recommend adding the relationships by hand with the help of [this documentation](/orm/overview/databases/mongodb#how-to-add-in-missing-relations-after-introspection). However, Prisma 1 stores foreign keys is different than where Prisma ORM 2 and later expects foreign keys, so if you want to take advantage of relationships, you'll need to shift where the foreign keys are on your database before adding the relationships.

## Generating a Prisma Client

With the Prisma schema populated with the schema of your data, you're now ready to generate a Typescript Client to read and write to your MongoDB database.

```bash
$ npx prisma generate
```

## Testing Reads

Create a simple `test.ts` script to verify that Prisma Client can read and write to your application. Note that this guide is using the example in the [Prisma 1 examples repository](https://github.com/prisma/prisma1-examples/tree/master/typescript/docker-mongodb), but the code will change depending on your application.

```ts

const prisma = new PrismaClient()

async function main() 

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

Make sure `ts-node` is installed globally and run:

```bash
ts-node test.ts
```

You should see a list of your data:

```bash
[
  ,
  ,
  
]
```

## Testing Writes

You can then alter your `test.ts` to try writes:

```ts

const prisma = new PrismaClient()

async function main() ,
  })
  console.log(user)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

And you should see a user was created.

## Upgrading your Application

Now that you have a working Prisma Client, you can start replacing Prisma Client 1 queries with the latest Prisma Client queries. The [Prisma Client Reference](/orm/reference/prisma-client-reference#filter-conditions-and-operators) is a helpful resource for learning how to use the latest Prisma Client.

## Conclusion

I hope this brief guide was helpful in getting you started on the right path. Let us know if you have any questions or issues. We really appreciate your support over the years.