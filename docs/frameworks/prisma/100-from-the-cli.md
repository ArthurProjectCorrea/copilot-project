---
title: 'From the CLI'
metaTitle: 'From the CLI'
metaDescription: 'Start building a Prisma application with a Prisma Postgres database from the CLI'
staticLink: true
tocDepth: 3
toc: true
community_section: true
---

This page provides a step-by-step guide for Prisma Postgres after setting it up with `prisma init --db`:

1. Set up a TypeScript app with Prisma ORM
1. Migrate the schema of your database
1. Query your database from TypeScript

## Prerequisites

This guide assumes you set up [Prisma Postgres](/postgres) instance with `prisma init --db`:

Once this command terminated:

- You're logged into Prisma Data Platform.
- A new Prisma Postgres instance was created.
- The `prisma/` folder was created with an empty `schema.prisma` file.
- The `DATABASE_URL` env var was set in a  `.env` file.

## 1. Organize your project directory

:::note

If you ran the `prisma init --db` command inside a folder where you want your project to live, you can skip this step and [proceed to the next section](/getting-started/prisma-postgres/from-the-cli#2-set-up-your-project).

:::

If you ran the command outside your intended project directory (e.g., in your home folder or another location), you need to move the generated `prisma` folder and the `.env` file into a dedicated project directory.

Create a new folder (e.g. `hello-prisma`) where you want your project to live and move the necessary files into it:

```terminal
mkdir hello-prisma
mv .env ./hello-prisma/
mv prisma ./hello-prisma/
```

Navigate into your project folder:

```terminal
cd ./hello-prisma
```

Now that your project is in the correct location, continue with the setup.

## 2. Set up your project

### 2.1. Set up TypeScript

Initialize a TypeScript project and add the Prisma CLI as a development dependency:

```terminal
npm init -y
npm install typescript tsx @types/node --save-dev
```

This creates a `package.json` file with an initial setup for your TypeScript app.

Next, initialize TypeScript with a `tsconfig.json` file in the project:

```terminal
npx tsc --init
```

### 2.2. Set up Prisma ORM

Install the required dependencies to use Prisma Postgres:

```terminal
npm install prisma --save-dev
npm install @prisma/extension-accelerate
```

### 2.3. Create a TypeScript script

Create an `index.ts` file in the root directory, this will be used to query your application with Prisma ORM: 

```terminal
touch index.ts
```

## 3. Migrate the database schema

Update your `prisma/schema.prisma` file to include a simple `User` model:

```prisma file=prisma/schema.prisma
model User 

model Post 
```

After adding the models, migrate your database using [Prisma Migrate](/orm/prisma-migrate):

```terminal
npx prisma migrate dev --name init
```

## 4. Send queries with Prisma ORM

Paste the following boilerplate into `index.ts`:

```ts file=index.ts

const prisma = new PrismaClient().$extends(withAccelerate())

async function main() 

main()
  .then(async () => )
  .catch(async (e) => )
```

This code contains a `main` function that's invoked at the end of the script. It also instantiates `PrismaClient` which you'll use to send queries to your database.

### 4.1. Create a new `User` record

Let's start with a small query to create a new `User` record in the database and log the resulting object to the console. Add the following code to your `index.ts` file:

```ts file=index.ts

const prisma = new PrismaClient().$extends(withAccelerate())

async function main() ,
  })
  console.log(user)
  // add-end
}

main()
  .then(async () => )
  .catch(async (e) => )
```

Next, execute the script with the following command:

Great job, you just created your first database record with Prisma Postgres! 🎉

### 4.2. Retrieve all `User` records

Prisma ORM offers various queries to read data from your database. In this section, you'll use the `findMany` query that returns _all_ the records in the database for a given model.

Delete the previous Prisma ORM query and add the new `findMany` query instead:

```ts file=index.ts

const prisma = new PrismaClient().$extends(withAccelerate())

async function main() 

main()
  .then(async () => )
  .catch(async (e) => )
```

Execute the script again:

Notice how the single `User` object is now enclosed with square brackets in the console. That's because the `findMany` returned an array with a single object inside.

### 4.3. Explore relation queries

One of the main features of Prisma ORM is the ease of working with [relations](/orm/prisma-schema/data-model/relations). In this section, you'll learn how to create a `User` and a `Post` record in a nested write query. Afterwards, you'll see how you can retrieve the relation from the database using the `include` option.

First, adjust your script to include the nested query:

```ts file=index.ts

const prisma = new PrismaClient().$extends(withAccelerate())

async function main() ,
          
        ],
      },
    },
  })
  console.log(user)
  // add-end
}

main()
  .then(async () => )
  .catch(async (e) => )
```

Run the query by executing the script again:

In order to also retrieve the `Post` records that belong to a `User`, you can use the `include` option via the `posts` relation field:

```ts file=index.ts

const prisma = new PrismaClient().$extends(withAccelerate())

async function main() ,
  })
  console.dir(usersWithPosts, )
  // add-end
}

main()
  .then(async () => )
  .catch(async (e) => )
```

Run the script again to see the results of the nested read query:

This time, you're seeing two `User` objects being printed. Both of them have a `posts` field (which is empty for `"Alice"` and populated with two `Post` objects for `"Bob"`) that represents the `Post` records associated with them.

## Next steps

You just got your feet wet with a basic Prisma Postgres setup. If you want to explore more complex queries, such as adding caching functionality, check out the official [Quickstart](/getting-started/quickstart-prismaPostgres).

### View and edit data in Prisma Studio

Prisma ORM comes with a built-in GUI to view and edit the data in your database. You can open it using the following command:

```terminal
npx prisma studio
```

With Prisma Postgres, you can also directly use Prisma Studio inside the [Console](https://console.prisma.io) by selecting the **Studio** tab in your project. 

### Build a fullstack app with Next.js

Learn how to use Prisma Postgres in a fullstack app:

- [Build a fullstack app with Next.js 15](/guides/nextjs)
- [Next.js 15 example app](https://github.com/prisma/nextjs-prisma-postgres-demo) (including authentication)

### Explore ready-to-run examples

Check out the [`prisma-examples`](https://github.com/prisma/prisma-examples/) repository on GitHub to see how Prisma ORM can be used with your favorite library. The repo contains examples with Express, NestJS, GraphQL as well as fullstack examples with Next.js and Vue.js, and a lot more.

These examples use SQLite by default but you can follow the instructions in the project README to switch to Prisma Postgres in a few simple steps.