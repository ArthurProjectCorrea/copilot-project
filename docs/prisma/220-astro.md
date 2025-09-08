---
title: 'How to use Prisma ORM with Astro'
metaTitle: 'How to use Prisma ORM and Prisma Postgres with Astro'
description: 'Learn how to use Prisma ORM in an Astro app'
sidebar_label: 'Astro'
image: '/img/guides/prisma-astro-cover.png'
completion_time: '15 min'
community_section: true
---

## Introduction

Prisma ORM offers type-safe database access, and [Astro](https://astro.build/) is built for performance. Together with [Prisma Postgres](https://www.prisma.io/postgres), you get a fast, content-first stack with zero cold starts and end-to-end speed.

In this guide, you'll learn to integrate Prisma ORM with a Prisma Postgres database in an Astro project from scratch. You can find a complete example of this guide on [GitHub](https://github.com/prisma/prisma-examples/tree/latest/orm/astro).

## Prerequisites

- [Node.js 18+](https://nodejs.org)
- [Astro VSCode extension (recommended)](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode)

## 1. Set up your project

Create a new Astro project:

```terminal
npx create-astro@latest
```

:::info

- _Where should we create your new project?_ `astro-prisma`
- _How would you like to start your new project?_ `Use minimal (empty) template `
- _Install dependencies? (recommended)_ `Yes`
- _Initialize a new git repository? (optional)_ `Yes`

:::

## 2. Install and Configure Prisma

### 2.1. Install dependencies

To get started with Prisma, you'll need to install a few dependencies:

Once installed, initialize Prisma in your project:

```terminal
npx prisma init --db --output ../src/generated/prisma
```

:::info
You'll need to answer a few questions while setting up your Prisma Postgres database. Select the region closest to your location and a memorable name for your database like "My Astro Project"
:::
This will create:

- A `prisma/` directory with a `schema.prisma` file
- A `.env` file with a `DATABASE_URL` already set

### 2.2. Define your Prisma Schema

In the `prisma/schema.prisma` file, add the following models and change the generator to use the `prisma-client` provider:

```prisma file=prisma/schema.prisma
generator client

datasource db

//add-start
model User

model Post
//add-end
```

This creates two models: `User` and `Post`, with a one-to-many relationship between them.

### 2.3. Configure the Prisma Client generator

Now, run the following command to create the database tables and generate the Prisma Client:

```terminal
npx prisma migrate dev --name init
```

### 2.4. Seed the database

Let's add some seed data to populate the database with sample users and posts.

Create a new file called `seed.ts` in the `prisma/` directory:

```typescript file=prisma/seed.ts

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  ,
        ,
      ],
    },
  },
  ,
      ],
    },
  },
];

  for (const u of userData) );
  }
}

main();
```

Now, tell Prisma how to run this script by updating your `package.json`:

```json file=package.json
,
  //add-start
  "prisma": ,
  //add-end
  "dependencies": ,
  "devDependencies":
}
```

Run the seed script:

```terminal
npx prisma db seed
```

And open Prisma Studio to inspect your data:

```terminal
npx prisma studio
```

## 3. Integrate Prisma into Astro

### 3.1. Create a Prisma Client

Inside of `/src`, create a `lib` directory and a `prisma.ts` file inside it. This file will be used to create and export your Prisma Client instance.

```terminal
mkdir src/lib
touch src/lib/prisma.ts
```

Set up the Prisma client like this:

:::warning
We recommend using a connection pooler (like [Prisma Accelerate](https://www.prisma.io/accelerate)) to manage database connections efficiently.

If you choose not to use one, **avoid** instantiating `PrismaClient` globally in long-lived environments. Instead, create and dispose of the client per request to prevent exhausting your database connections.
:::

### 3.2. Create an API route

An API route is the best way to fetch data from your database in an Astro app.

Create a new file called `api/users.ts` in the `src/pages` directory:

```terminal
mkdir src/pages/api
touch src/pages/api/users.ts
```

Now, create a GET route that fetches the `Users` data from your database, making sure to include each user's `Posts` by adding them to the `include` field:

```ts file=src/pages/api/users.ts

  const users = await prisma.user.findMany(,
  });

  return new Response(JSON.stringify(users), ,
  });
};
```

Next, you'll call this route from the `index.astro` file and display it.

### 3.3. Fetch the data from the API route

Start by create a new type that combines the `User` and `Post` models called `UserWithPosts`:

```tsx file=src/pages/index.astro
---
//add-start

type UserWithPosts = User & ;
//add-end
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content= />
    <title>Astro</title>
  </head>
  <body>
    <h1>Astro</h1>
  </body>
</html>
```

Fetch the data from the API route and set it's type to the `UserWithPosts` type you just created:

```tsx file=src/pages/index.astro
---

type UserWithPosts = User & ;
//add-start
const response = await fetch("http://localhost:4321/api/users");
const users: UserWithPosts[] = await response.json();
//add-end
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content= />
    <title>Astro</title>
  </head>
  <body>
    <h1>Astro</h1>
  </body>
</html>
```

### 3.4. Display the data

With the variables from the frontmatter now available throughout your file, you can display the list of users.

Just below the `<h1>` tag, map through the `users` array, add the `UserWithPosts` type to the users, and display the names of the users:

```tsx file=src/pages/index.astro
---

type UserWithPosts = User & ;
const response = await fetch("http://localhost:4321/api/users");
const users: UserWithPosts[] = await response.json();
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content= />
    <title>Astro</title>
  </head>
  <body>
    //edit-next-line
    <h1>Astro + Prisma</h1>
    //add-start
      </h2>
        </li>
      ))}
    //add-end
  </body>
</html>
```

Finally, display the `Posts` below the respective `User` and set the `Post` type:

```tsx file=src/pages/index.astro
---

type UserWithPosts = User & ;
const response = await fetch("http://localhost:4321/api/users");
const users: UserWithPosts[] = await response.json();
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content= />
    <title>Astro</title>
  </head>
  <body>
  <h1>Astro + Prisma</h1>
    <ul>
      </h2>
          //add-start
          <ul>
            </li>
            ))}
          </ul>
          //add-end
        </li>
      ))}
    </ul>
  </body>
</html>
```

You're done! You've just created an Astro app with Prisma that's connected to a Prisma Postgres database. Below are some next steps to explore, as well as some more resources to help you get started expanding your project.

## Next Steps

Now that you have a working Astro app connected to a Prisma Postgres database, you can:

- Extend your Prisma schema with more models and relationships
- Add create/update/delete routes and forms
- Explore authentication and validation
- Enable query caching with [Prisma Postgres](/postgres/database/caching) for better performance

### More Info

- [Prisma Documentation](/orm/overview/introduction)
- [Astro Documentation](https://astro.build/docs)
