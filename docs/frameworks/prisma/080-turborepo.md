---
title: 'How to use Prisma ORM with Turborepo'
metaTitle: 'How to use Prisma ORM with Turborepo'
description: 'Learn step-by-step how to integrate Prisma ORM with Turborepo to build modular, scalable monorepo architectures efficiently.'
sidebar_label: 'Turborepo'
completion_time: '15 min'
image: '/img/guides/prisma-turborepo-setup.png'
tags:
  - Turborepo
  - Monorepo
  - Vercel
community_section: true
---

Prisma is a powerful ORM for managing databases, and [Turborepo](https://turbo.build/) simplifies monorepo workflows. By combining these tools, you can create a scalable, modular architecture for your projects. 

This guide will show you how to set up Prisma as a standalone package in a Turborepo monorepo, enabling efficient configuration, type sharing, and database management across multiple apps.

#### What you'll learn:

- How to set up Prisma in a Turborepo monorepo.
- Steps to generate and reuse PrismaClient across packages.
- Integrating the Prisma package into other applications in the monorepo.

### Prerequisites
- [Node.js 18+](https://nodejs.org/)

## 1. Set up your project

To set up a Turborepo monorepo named `turborepo-prisma`, run the following command:

```terminal
npx create-turbo@latest turborepo-prisma
```

You'll be prompted to select your package manager, this guide will use `npm`:

:::info

- *Which package manager do you want to use?* `npm`

:::

After the setup, choose a package manager for the project. Navigate to the project root directory and install Turborepo as a development dependency:

For more information about installing Turborepo, refer to the [official Turborepo guide](https://turbo.build/repo/docs/getting-started/installation).

## 2. Add a new `database` package to the monorepo

### 2.1 Create the package and install Prisma

Create a `database` package within the `packages` directory. Then, create a `package.json` file for the package by running:

```terminal
cd packages/
mkdir database
cd database
touch package.json
```

Define the `package.json` file as follows:

```json file=packages/database/package.json

```

Next, install the required dependencies to use Prisma ORM. Use your preferred package manager:

:::note

If using [Prisma Postgres](https://prisma.io/postgres), install the `@prisma/extension-accelerate` package:

:::

### 2.2. Initialize Prisma and define models

Inside the `database` directory, initialize prisma by running:

This will create several files inside `packages/database`:

- A `prisma` directory with a `schema.prisma` file.
- A Prisma Postgres database.
- A `.env` file containing the `DATABASE_URL` at the project root.
- An `output` directory for the generated Prisma Client as `generated/prisma`.

In the `packages/database/prisma/schema.prisma` file, add the following models:

```prisma file=packages/database/prisma/schema.prisma
generator client 

datasource db 

//add-start
model User 

model Post 
//add-end
```

:::warning

It is recommended to add `../generated/prisma` to the `.gitignore` file because it contains platform-specific binaries that can cause compatibility issues across different environments.

:::

#### The importance of generating Prisma types in a custom directory

In the `schema.prisma` file, we specify a custom [`output`](/orm/prisma-client/setup-and-configuration/generating-prisma-client#using-a-custom-output-path) path where Prisma will generate its types. This ensures Prisma's types are resolved correctly across different package managers.

:::info

In this guide, the types will be generated in the `database/generated/prisma` directory.

:::

### 2.3. Add scripts and run migrations

Let's add some scripts to the `package.json` inside `packages/database`:

```json file=packages/database/package.json
,
  //add-end
  "devDependencies": ,
  "dependencies": 
}

```

Let's also add these scripts to `turbo.json` in the root and ensure that `DATABASE_URL` is added to the environment:

```json file=turbo.json
,
  "lint": ,
  "check-types": ,
  "dev": ,
  //add-start
  "db:generate": ,
  "db:migrate": ,
  "db:deploy": 
  //add-end
}
```

Migrate your `prisma.schema` and generate types

Navigate to the project root and run the following command to automatically migrate our database:

Generate your `prisma.schema`

To generate the types from Prisma schema, from the project root run:

### 2.4. Export the Prisma client and types

Next, export the generated types and an instance of `PrismaClient` so it can used in your applications. 

In the `packages/database` directory, create a `src` folder and add a `client.ts` file. This file will define an instance of `PrismaClient`:

Then create an `index.ts` file in the `src` folder to re-export the generated prisma types and the `PrismaClient` instance:

```ts file=packages/database/src/index.ts

```

Follow the [Just-in-Time packaging pattern](https://turbo.build/repo/docs/core-concepts/internal-packages#just-in-time-packages) and create an entrypoint to the package inside `packages/database/package.json`:

:::warning

If you're not using a bundler, use the [Compiled Packages](https://turborepo.com/docs/core-concepts/internal-packages#compiled-packages) strategy instead.

:::

```json file=packages/database/package.json
,
  "devDependencies": ,
  "dependencies": ,
  //add-start
  "exports": 
  //add-end
}

```

By completing these steps, you'll make the Prisma types and `PrismaClient` instance accessible throughout the monorepo.

## 3. Import the `database` package in the web app
The `turborepo-prisma` project should have an app called `web` at `apps/web`. Add the `database` dependency to `apps/web/package.json`:

Run your package manager's install command inside the `apps/web` directory:

Let's import the intantiated `prisma` client from the `database` package in the `web` app.

In the `apps/web/app` directory, open the `page.tsx` file and add the following code:

```tsx file=apps/web/app/page.tsx

  const user = await prisma.user.findFirst() 
  return (
    <div className=>
      
    </div>
  );
}
```

Then, create a `.env` file in the `web` directory and copy into it the contents of the `.env` file from the `/database` directory containing the `DATABASE_URL`:

```env file=apps/web/.env
//add-next-line
DATABASE_URL="Same database url as used in the database directory"
```

:::note

If you want to use a single `.env` file in the root directory across your apps and packages in a Turborepo setup, consider using a package like [`dotenvx`](https://dotenvx.com/docs/monorepos/turborepo).

To implement this, update the `package.json` files for each package or app to ensure they load the required environment variables from the shared `.env` file. For detailed instructions, refer to the [`dotenvx` guide for Turborepo](https://dotenvx.com/docs/monorepos/turborepo).

Keep in mind that Turborepo [recommends using separate `.env` files for each package](https://turbo.build/repo/docs/crafting-your-repository/using-environment-variables#use-env-files-in-packages) to promote modularity and avoid potential conflicts.

:::

## 4. Configure task dependencies in Turborepo

The `db:generate` and `db:deploy` scripts are not yet optimized for the monorepo setup but are essential for the `dev` and `build` tasks. 

If a new developer runs `turbo dev` on an application without first running `db:generate`, they will encounter errors. 

To prevent this, ensure that `db:generate` is always executed before running `dev` or `build`. Additionally, make sure both `db:deploy` and `db:generate` are executed before `db:build`. Here's how to configure this in your `turbo.json` file:

```json file=turbo.json
,
    "lint": ,
    "check-types": ,
    "dev": ,
    "db:generate": ,
    "db:migrate": ,
    "db:deploy": 
  }
}

```

## 5. Run the project in development

:::warning

Before starting the development server, note that if you are using Next.js v15.2.0, do not use Turbopack as there is a known [issue](https://github.com/vercel/next.js/issues/76497). Remove Turbopack from your dev script by updating your `apps/web/package.json`
```json file=apps/web/package.json
"script":
```

:::

Then from the project root run the project:

Navigate to the `http://localhost:3000` and you should see the message:

```
No user added yet
```

:::note

You can add users to your database by creating a seed script or manually by using [Prisma Studio](/orm/tools/prisma-studio). 

To use Prisma Studio to add manually data via a GUI, navigate inside the `packages/database` directory and run `prisma studio` using your package manager:

This command starts a server with a GUI at http://localhost:5555, allowing you to view and modify your data.

:::

Congratulations, you're done setting up Prisma for Turborepo!

## Next Steps

- Expand your Prisma models to handle more complex data relationships.
- Implement additional CRUD operations to enhance your application's functionality.
- Check out [Prisma Postgres](https://www.prisma.io/postgres) to see how you can scale your application.

### More Info

- [Turborepo Docs](https://turbo.build/repo/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma ORM Docs](/orm/overview/introduction)