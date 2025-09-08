---
title: 'How to use Prisma ORM with SolidStart'
metaTitle: 'How to use Prisma ORM and Prisma Postgres with SolidStart'
description: 'Learn how to use Prisma ORM in a SolidStart app'
sidebar_label: 'SolidStart'
image: '/img/guides/prisma-solid-start-cover.png'
completion_time: '10 min'
community_section: true
---

## Introduction

Prisma ORM streamlines database access with type-safe queries and a smooth developer experience. SolidStart, a modern framework for building reactive web apps with SolidJS, pairs well with Prisma and Postgres to create a clean and scalable full-stack architecture.

In this guide, you'll learn how to integrate Prisma ORM with a Prisma Postgres database in a SolidStart project from scratch. You can find a complete example of this guide on [GitHub](https://github.com/prisma/prisma-examples/tree/latest/orm/solid-start).

## Prerequisites
- [Node.js 18+](https://nodejs.org)

## 1. Set up your project

Begin by creating a new SolidStart app. In your terminal, run:

```terminal
npm init solid@latest 
```

Use the following options when prompted:

:::info

- *Project name:* `my-solid-prisma-app`
- *Is this a SolidStart project:* `Yes`
- *Template:* `bare`
- *Use TypeScript:* `Yes`

:::

Next, navigate into your new project, install dependencies, and start the development server:

```terminal
cd my-solid-prisma-app
npm install
npm run dev
```

Once the dev server is running, open `http://localhost:3000` in your browser. You should see the SolidStart welcome screen.

Clean up the default UI by editing the `app.tsx` file and replacing its content with the following code:

```typescript file=src/app.tsx
import "./app.css";

  return (
    <main>
      <h1>SolidStart + Prisma</h1>
    </main>
  );
}
```

## 2. Install and Configure Prisma

### 2.1. Install dependencies

To get started with Prisma, you'll need to install a few dependencies:

Once installed, initialize Prisma in your project:

```terminal
npx prisma init --db --output ../src/generated/prisma
```
:::info
You'll need to answer a few questions while setting up your Prisma Postgres database. Select the region closest to your location and a memorable name for your database like "My SolidStart Project"
:::

This will create:

- A `prisma` directory with a `schema.prisma` file.
- A Prisma Postgres database.
- A `.env` file containing the `DATABASE_URL` at the project root.
- An `output` directory for the generated Prisma Client as `src/generated/prisma`.

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
  "prisma": 
  //add-end
  "dependencies": ,
  "engines": ,
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

## 3. Integrate Prisma into SolidStart

### 3.1. Create a Prisma Client

At the root of your project, create a new `lib` folder and a `prisma.ts` file inside it:

```terminal
mkdir -p lib && touch lib/prisma.ts
```

Add the following code to create a Prisma Client instance:

:::warning
We recommend using a connection pooler (like [Prisma Accelerate](https://www.prisma.io/accelerate)) to manage database connections efficiently.

If you choose not to use one, **avoid** instantiating `PrismaClient` globally in long-lived environments. Instead, create and dispose of the client per request to prevent exhausting your database connections.
:::

### 3.2. Create an API Route

Now, let's fetch data from the database using an API route.

Create a new file at `src/routes/api/users.ts`:

```typescript file=src/routes/api/users.ts

  const users = await prisma.user.findMany(,
  });
  return new Response(JSON.stringify(users), ,
  });
}
```

### 3.3. Fetch Data in Your Component

In your `app.tsx` file, use `createResource` to fetch data from your new API route:

```typescript file=src/app.tsx
import "./app.css";
//add-start

type UserWithPosts = User & ;

const fetchUsers = async () => ;
//add-end

  //add-next-line
  const [users, ] = createResource<UserWithPosts[]>(fetchUsers);

  return (
    <main>
      <h1>SolidStart + Prisma</h1>
    </main>
  );
}
```

:::info
`createResource` is a SolidJS hook for managing async data. It tracks loading and error states automatically. [Learn more](https://docs.solidjs.com/reference/basic-reactivity/create-resource#createresource).
:::

### 3.4. Display the Data

To show the users and their posts, use SolidJS's `
          </div>
        )}
      </For>
      //add-end
    </main>
  );
}
```

:::info
`
              </div>
            )}
          </For>
          //add-start
        </Show>
      </Show>
      //add-end
    </main>
  );
}
```

:::info
`<Show>` conditionally renders content. It's similar to an `if` statement. [Learn more](https://docs.solidjs.com/reference/components/show)
:::

You're done! You've just created a SolidStart app connected to a Prisma Postgres database.

## Next Steps

Now that you have a working SolidStart app connected to a Prisma Postgres database, you can:

- Extend your Prisma schema with more models and relationships
- Add create/update/delete routes and forms
- Explore authentication, validation, and optimistic updates
- Enable query caching with [Prisma Postgres](/postgres/database/caching) for better performance

## More Info

- [Prisma ORM Docs](/orm/overview/introduction)
- [SolidStart Documentation](https://start.solidjs.com/)