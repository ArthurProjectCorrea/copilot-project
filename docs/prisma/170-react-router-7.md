---
title: 'How to use Prisma ORM with React Router 7'
metaTitle: 'How to use Prisma ORM and Prisma Postgres with React Router 7'
description: 'Learn how to use Prisma ORM and Prisma Postgres in a React Router 7 app.'
sidebar_label: 'React Router 7'
image: '/img/guides/prisma-react-router-7-cover.png'
completion_time: '10 min'
tags:
  - React Router
  - Framework
---

## Introduction

This guide shows you how to use Prisma ORM with [React Router 7](https://reactrouter.com/), a multi-strategy router that can be as minimal as declarative routing or as full-featured as a fullstack framework.

You'll learn how to set up Prisma ORM and Prisma Postgres with React Router 7 and handle migrations. You can find a [deployment-ready example on GitHub](https://github.com/prisma/prisma-examples/blob/latest/orm/react-router-7).

## Prerequisites

- [Node.js 20+](https://nodejs.org)

## 1. Set up your project

From the directory where you want to create your project, run `create-react-router` to create a new React Router app that you will be using for this guide.

```terminal
npx create-react-router@latest react-router-7-prisma
```

You'll be prompted to select the following, select `Yes` for both:

:::info

- _Initialize a new git repository?_ `Yes`
- _Install dependencies with npm?_ `Yes`
  :::

Now, navigate to the project directory:

```terminal
cd react-router-7-prisma
```

## 2. Install and Configure Prisma

### 2.1. Install dependencies

To get started with Prisma, you'll need to install a few dependencies:

Once installed, initialize Prisma in your project:

```terminal
npx prisma init --db --output ../app/generated/prisma
```

:::info
You'll need to answer a few questions while setting up your Prisma Postgres database. Select the region closest to your location and a memorable name for your database like "My React Router 7 Project"
:::

This will create:

- A `prisma` directory with a `schema.prisma` file.
- A Prisma Postgres database.
- A `.env` file containing the `DATABASE_URL` at the project root.
- An `output` directory for the generated Prisma Client as `app/generated/prisma`.

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

Add some seed data to populate the database with sample users and posts.

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

## 3. Integrate Prisma into React Router 7

### 3.1. Create a Prisma Client

Inside of your `app` directory, create a new `lib` directory and add a `prisma.ts` file to it. This file will be used to create and export your Prisma Client instance.

Set up the Prisma client like this:

:::warning
We recommend using a connection pooler (like [Prisma Accelerate](https://www.prisma.io/accelerate)) to manage database connections efficiently.

If you choose not to use one, **avoid** instantiating `PrismaClient` globally in long-lived environments. Instead, create and dispose of the client per request to prevent exhausting your database connections.
:::

You'll use this client in the next section to run your first queries.

### 3.2. Query your database with Prisma

Now that you have an initialized Prisma Client, a connection to your database, and some initial data, you can start querying your data with Prisma ORM.

In this example, you'll be making the "home" page of your application display all of your users.

Open the `app/routes/home.tsx` file and replace the existing code with the following:

```tsx file=app/routes/home.tsx

  return [
    ,
    ,
  ];
}

  return (
    <div className="min-h-screen flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)]">
        Superblog
      </h1>
      <ol className="list-decimal list-inside font-[family-name:var(--font-geist-sans)]">
        <li className="mb-2">Alice</li>
        <li>Bob</li>
      </ol>
    </div>
  );
}
```

:::note

If you see an error on the first line, `import type  from "./+types/home";`, make sure you run `npm run dev` so React Router generates needed types.

:::

This gives you a basic page with a title and a list of users. However, the list of users is static. Update the page to fetch the users from your database and make it dynamic.

```tsx file=app/routes/home.tsx

//add-start

//add-end

  return [
    ,
    ,
  ];
}

//add-start

  const users = await prisma.user.findMany();
  return ;
}
//add-end

  //add-start
  const  = loaderData;
  //add-end
  return (
    <div className="min-h-screen flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)]">
        Superblog
      </h1>
      <ol className="list-decimal list-inside font-[family-name:var(--font-geist-sans)]">
        //add-start
         className="mb-2">

          </li>
        ))}
        //add-end
      </ol>
    </div>
  );
}
```

You are now importing your client, using [a React Router loader](https://reactrouter.com/start/framework/data-loading#server-data-loading) to query the `User` model for all users, and then displaying them in a list.

Now your home page is dynamic and will display the users from your database.

### 3.4 Update your data (optional)

If you want to see what happens when data is updated, you could:

- update your `User` table via an SQL browser of your choice
- change your `seed.ts` file to add more users
- change the call to `prisma.user.findMany` to re-order the users, filter the users, or similar.

Just reload the page and you'll see the changes.

## 4. Add a new Posts list page

You have your home page working, but you should add a new page that displays all of your posts.

First, create a new `posts` directory under the `app/routes` directory and add a `home.tsx` file:

```terminal
mkdir -p app/routes/posts && touch app/routes/posts/home.tsx
```

Second, add the following code to the `app/routes/posts/home.tsx` file:

```tsx file=app/routes/posts/home.tsx

  return (
    <div className="min-h-screen flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)]">
        Posts
      </h1>
      <ul className="font-[family-name:var(--font-geist-sans)] max-w-2xl space-y-4">
          <li>My first post</li>
      </ul>
    </div>
  );
}
```

Second, update the `app/routes.ts` file so when you visit the `/posts` route, the `posts/home.tsx` page is shown:

```tsx file=app/routes.ts
// edit-start

// edit-end

  index("routes/home.tsx"),
  //add-start
  route("posts", "routes/posts/home.tsx"),
  //add-end
] satisfies RouteConfig;
```

Now `localhost:5173/posts` will load, but the content is static. Update it to be dynamic, similarly to the home page:

```tsx file=app/routes/posts/home.tsx

//add-start

  const posts = await prisma.post.findMany(,
  });
  return ;
}
//add-end

  //add-start
  const  = loaderData;
  //add-end
  return (
    <div className="min-h-screen flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)]">
        Posts
      </h1>
      <ul className="font-[family-name:var(--font-geist-sans)] max-w-2xl space-y-4">
        //add-start
        >
            <span className="font-semibold"></span>
            <span className="text-sm text-gray-600 ml-2">
              by
            </span>
          </li>
        ))}
        //add-end
      </ul>
    </div>
  );
}
```

This works similarly to the home page, but instead of displaying users, it displays posts. You can also see that you've used `include` in your Prisma Client query to fetch the author of each post so you can display the author's name.

This "list view" is one of the most common patterns in web applications. You're going to add two more pages to your application which you'll also commonly need: a "detail view" and a "create view".

## 5. Add a new Posts detail page

To complement the Posts list page, you'll add a Posts detail page.

In the `routes/posts` directory, create a new `post.tsx` file.

```terminal
touch app/routes/posts/post.tsx
```

This page will display a single post's title, content, and author. Just like your other pages, add the following code to the `app/routes/posts/post.tsx` file:

```tsx file=app/routes/posts/post.tsx

  return (
    <div className="min-h-screen flex flex-col items-center justify-center -mt-16">
      <article className="max-w-2xl space-y-4 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-4xl font-bold mb-8">My first post</h1>
        <p className="text-gray-600 text-center">by Anonymous</p>
        <div className="prose prose-gray mt-8">
          No content available.
        </div>
      </article>
    </div>
  );
}
```

And then add a new route for this page:

```tsx file=app/routes.ts

  index("routes/home.tsx"),
  route("posts", "routes/posts/home.tsx"),
  //add-start
  route("posts/:postId", "routes/posts/post.tsx"),
  //add-end
] satisfies RouteConfig;
```

As before, this page is static. Update it to be dynamic based on the `params` passed to the page:

```tsx file=app/routes/posts/post.tsx
//add-start

//add-end

//add-start

  const  = params;
  const post = await prisma.post.findUnique(,
    include: ,
  });

  if (!post) );
  }
  return ;
}
//add-end

  //add-start
  const  = loaderData;
  //add-end
  return (
    <div className="min-h-screen flex flex-col items-center justify-center -mt-16">
      <article className="max-w-2xl space-y-4 font-[family-name:var(--font-geist-sans)]">
        //add-start
        <h1 className="text-4xl font-bold mb-8"></h1>
        <p className="text-gray-600 text-center">by </p>
        <div className="prose prose-gray mt-8">

        </div>
        //add-end
      </article>
    </div>
  );
}
```

There's a lot of changes here, so break it down:

- You're using Prisma Client to fetch the post by its `id`, which you get from the `params` object.
- In case the post doesn't exist (maybe it was deleted or maybe you typed a wrong ID), you throw an error to display a 404 page.
- You then display the post's title, content, and author. If the post doesn't have content, you display a placeholder message.

It's not the prettiest page, but it's a good start. Try it out by navigating to `localhost:5173/posts/1` and `localhost:5173/posts/2`. You can also test the 404 page by navigating to `localhost:5173/posts/999`.

## 6. Add a new Posts create page

To round out your application, you'll add a "create" page for posts. This will allow you to write your own posts and save them to the database.

As with the other pages, you'll start with a static page and then update it to be dynamic.

```terminal
touch app/routes/posts/new.tsx
```

Now, add the following code to the `app/routes/posts/new.tsx` file:

```tsx file=app/routes/posts/new.tsx

  const formData = await request.formData();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
}

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>

    </div>
  );
}
```

You can't open the `posts/new` page in your app yet. To do that, you need to add it to `routes.tsx` again:

```tsx file=app/routes.ts

  index("routes/home.tsx"),
  route("posts", "routes/posts/home.tsx"),
  route("posts/:postId", "routes/posts/post.tsx"),
  //add-start
  route("posts/new", "routes/posts/new.tsx"),
  //add-end
] satisfies RouteConfig;
```

Now you can view the form at the new URL. It looks good, but it doesn't do anything yet. Update the `action` to save the post to the database:

```tsx file=app/routes/posts/new.tsx

//add-start

//add-end

  const formData = await request.formData();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  //add-start
  try ,
    });
  } catch (error) , );
  }

  return redirect("/posts");
  //add-end
}

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>

    </div>
  );
}
```

This page now has a functional form! When you submit the form, it will create a new post in the database and redirect you to the posts list page.

Try it out by navigating to `localhost:5173/posts/new` and submitting the form.

## 7. Next steps

Now that you have a working React Router application with Prisma ORM, here are some ways you can expand and improve your application:

- Add authentication to protect your routes
- Add the ability to edit and delete posts
- Add comments to posts
- Use [Prisma Studio](/orm/tools/prisma-studio) for visual database management

For more information and updates:

- [Prisma ORM documentation](/orm)
- [Prisma Client API reference](/orm/prisma-client)
- [React Router documentation](https://reactrouter.com/home)
- Join our [Discord community](https://pris.ly/discord)
- Follow us on [Twitter](https://twitter.com/prisma) and [YouTube](https://youtube.com/prismadata)
