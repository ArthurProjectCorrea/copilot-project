---
title: 'How to use Prisma ORM with TanStack Start'
metaTitle: 'How to use Prisma ORM and Prisma Postgres with TanStack Start'
description: 'Learn how to use Prisma ORM in a TanStack Start app'
sidebar_label: 'TanStack Start'
image: '/img/guides/prisma-tanstack-start-cover.png'
completion_time: '10 min'
community_section: true
---

## Introduction

Prisma ORM simplifies database interactions, and [TanStack Start](https://tanstack.com/start/latest/docs/framework/react/overview) offers a robust framework for building modern React applications. Together with [Prisma Postgres](https://www.prisma.io/postgres), they provide a seamless full-stack development experience with type-safe queries and efficient data management.

This guide will walk you through integrating Prisma ORM with a Prisma Postgres database in a TanStack Start project from scratch.

## Prerequisites

- [Node.js 18+](https://nodejs.org)

## 1. Set up your project

To begin, create a new TanStack Start project.

:::note

For the purpose of this guide, we're using the same setup instructions that you can find in the [TanStart Start docs](https://tanstack.com/start/latest/docs/framework/react/build-from-scratch).

:::

In the directory where you'd like to create your project, run the following commands:

```terminal
mkdir tanstack-start-prisma
cd tanstack-start-prisma
npm init -y
```

This will create a new folder called `tanstack-start-prisma`, navigate into it, and initialize a new Node.js project.

Open the directory in your IDE and create a `tsconfig.json` file with the following configuration:

```json file=tsconfig.json

}
```

We also need a `.gitignore` file, so let's set that up now:

```txt file=.gitignore
node_modules
.env
app/generated
```

Next, install TanStack Router and Vinxi, as TanStack Start currently requires them:

```terminal
npm install @tanstack/react-start @tanstack/react-router vinxi
```

We also need React, the Vite React plugin, and TypeScript:

```terminal
npm install react react-dom
npm install --save-dev @vitejs/plugin-react vite-tsconfig-paths
npm install --save-dev typescript @types/react @types/react-dom
```

Update your `package.json` to use Vinxi's CLI. Add `"type": "module"` and modify the scripts to use Vinxi's CLI:

```json file=package.json
,
  // add-end
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": ,
  "devDependencies":
}
```

Then, create and configure TanStack Start's `app.config.ts` file:

```typescript file=app.config.ts

  vite: ),
    ],
  },
})
```

For TanStack Start to function, we need 5 files in `~/app/`:

- `router.tsx` (The router configuration)
- `ssr.tsx` (The server entry point)
- `client.tsx` (The client entry point)
- `routes/__root.tsx` (The root of the app)
- `routes/index.tsx` (The home page)

You can create them with these commands:

```terminal
mkdir app
touch app/router.tsx
touch app/ssr.tsx
touch app/client.tsx
mkdir app/routes
touch app/routes/__root.tsx
touch app/routes/index.tsx
```

`router.tsx` configures the application's main router with route definitions and settings:

```typescript file=app/router.tsx

  const router = createTanStackRouter()

  return router
}

declare module '@tanstack/react-router'
}
```

:::note

You should be seeing an error about `routeTree.gen.ts` not existing. This is expected. It will be generated when you run TanStack Start for the first time.

:::

`ssr.tsx` allows us to know what routes and loaders we need to execute when the user hits a given route:

```typescript file=app/ssr.tsx
import  from '@tanstack/react-start/server'

  createRouter,
  getRouterManifest,
})(defaultStreamHandler)
```

`client.tsx` initializes the client-side logic to handle routes in the browser:

```typescript file=app/client.tsx
const router = createRouter();

hydrateRoot(document);
```

`routes/__root.tsx` defines the root route and global HTML layout for the entire application:

```typescript file=app/routes/__root.tsx

import  from "@tanstack/react-router";

  head: () => (,
      ,
      ,
    ],
  }),
  component: RootComponent,
});

function RootComponent()

function RootDocument(: Readonly<>)

      </body>
    </html>
  );
}
```

`routes/index.tsx` is the home page of the application:

```typescript file=app/routes/index.tsx

  component: Home,
});

function Home()
```

Now, run:

```terminal
npm run dev
```

This will generate the `routeTree.gen.ts` file and resolve any routing errors.

Your file tree should look like this (without `node_modules`):

```
.
├── app
│   ├── client.tsx
│   ├── routeTree.gen.ts
│   ├── router.tsx
│   ├── routes
│   │   ├── __root.tsx
│   │   └── index.tsx
│   └── ssr.tsx
├── app.config.ts
├── package-lock.json
├── package.json
└── tsconfig.json
```

## 2. Install and Configure Prisma

### 2.1. Install dependencies

To get started with Prisma, you'll need to install a few dependencies:

Once installed, initialize Prisma in your project:

```terminal
npx prisma init --db --output ../app/generated/prisma
```

:::info
You'll need to answer a few questions while setting up your Prisma Postgres database. Select the region closest to your location and a memorable name for your database like "My \***\*\_\_\*\*** Project"
:::

This will create:

- A `prisma` directory with a `schema.prisma` file.
- A Prisma Postgres database.
- A `.env` file containing the `DATABASE_URL` at the project root.
- An `output` directory for the generated Prisma Client as `app/generated/prisma`.

### 2.2. Define your Prisma Schema

In `schema.prisma`, create a model for our posts and change the generator to use the [`prisma-client`](/orm/prisma-schema/overview/generators#prisma-client-preview) provider:

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
//add-next-line

//add-next-line
const prisma = new PrismaClient();

//add-start
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
//add-end

//add-start

  for (const u of userData) );
  }
}
//add-end

//add-next-line
main();
```

Now, tell Prisma how to run this script by updating your `package.json`:

```json file=package.json
//add-start
"prisma":
//add-end
```

Run the seed script:

```terminal
npx prisma db seed
```

And open Prisma Studio to inspect your data:

```terminal
npx prisma studio
```

## 3. Integrate Prisma into TanStack Start

### 3.1 Create a Prisma Client

Instead of creating a new Prisma Client instance in each file, create a single instance in a shared file to be used globally.

Create a `/lib` directory and a `prisma.ts` file inside it. This file will be used to create and export your Prisma Client instance.

Set up the Prisma client like this:

:::warning
We recommend using a connection pooler (like [Prisma Accelerate](https://www.prisma.io/accelerate)) to manage database connections efficiently.

If you choose not to use one, **avoid** instantiating `PrismaClient` globally in long-lived environments. Instead, create and dispose of the client per request to prevent exhausting your database connections.
:::

### 3.2 Fetch users and posts on load

First, import the necessary modules. Then, create a server function using the [`createServerFn`](https://tanstack.com/start/latest/docs/framework/react/server-functions#defining-server-functions) function. This function will fetch the users from the database using the `.findMany()` method. Use the [`include`](/orm/prisma-client/queries/relation-queries#include-a-relation) option to fetch the related posts:

```typescript file=app/routes/index.tsx
// add-start

// add-end

  component: Home,
});

// add-start
const getUsers = createServerFn().handler(async () => ,
  });
});
// add-end

function Home()
```

TanStack Start allows functions to run on load with loader functions in the [`createFileRoute`](https://tanstack.com/router/latest/docs/framework/react/api/router/createFileRouteFunction) function. Fetch the users and their posts on load with this code:

```typescript file=app/routes/index.tsx

  component: Home,
  // add-start
  loader: () => ,
  // add-end
});

const getUsers = createServerFn().handler(async () => ,
  });
});

function Home()
```

Store the response from the loader in the main component using [`Route.useLoaderData()`](https://tanstack.com/router/latest/docs/framework/react/api/router/useLoaderDataHook):

```typescript file=app/routes/index.tsx

  component: Home,
  loader: () => ,
});

const getUsers = createServerFn().handler(async () => ,
  });
});

function Home()
```

### 3.3 Display the users and posts

Next, you'll update the home page to display the users and posts retrieved from your database.

Map over the `users` and display them in a list along with their `posts`:

```typescript file=app/routes/index.tsx

  component: Home,
  loader: () => ,
});

const getUsers = createServerFn().handler(async () => ,
  });
});

function Home() >

            <ul>
              ></li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      // add-end
    </div>
  );
}
```

This setup will display the posts on your page, fetched directly from your database.

## Next steps

You've successfully integrated Prisma ORM with TanStack Start, creating a seamless full-stack application. Here are a few suggestions for what you can do next:

- Expand your Prisma models to handle more complex data relationships.
- Implement additional CRUD operations to enhance your application's functionality.
- Explore more features of Prisma and TanStack Start to deepen your understanding.
- Check out [Prisma Postgres](https://www.prisma.io/postgres) to see how you can scale your application.

## More info

- [Prisma ORM Documentation](/orm/overview/introduction)
- [TanStack Start Documentation](https://tanstack.com/start/latest/docs/framework/react/overview)
