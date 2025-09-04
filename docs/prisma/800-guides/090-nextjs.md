---
title: 'How to use Prisma ORM with Next.js'
metaTitle: 'How to use Prisma ORM and Prisma Postgres with Next.js 15 and Vercel'
description: 'Learn how to use Prisma ORM in a Next.js app and deploy it to Vercel'
sidebar_label: 'Next.js'
image: '/img/guides/prisma-nextjs-cover.png'
completion_time: '20 min'
tags:
  - Next.js
  - Vercel
community_section: true
---

## Introduction

This guide shows you how to use Prisma with Next.js 15, a fullstack React framework. You'll learn how to create a [Prisma Postgres](/postgres/) instance, set up Prisma ORM with Next.js, handle migrations, and deploy your application to Vercel.

You can find a [deployment-ready example on GitHub](https://github.com/prisma/prisma-examples/blob/latest/orm/nextjs).

## Prerequisites

- [Node.js 18+](https://nodejs.org)
- A Vercel account (if you want to deploy your application)

## 1. Set up your project

From the directory where you want to create your project, run `create-next-app` to create a new Next.js app that you will be using for this guide.

```terminal
npx create-next-app@latest nextjs-prisma
```

You will be prompted to answer a few questions about your project. Select all of the defaults.

:::info

For reference, those are:

- TypeScript
- ESLint
- Tailwind CSS
- No `src` directory
- App Router
- Turbopack
- No customized import alias

:::

Then, navigate to the project directory:

```terminal
cd nextjs-prisma
```

## 2. Install and Configure Prisma

### 2.1. Install dependencies

To get started with Prisma, you'll need to install a few dependencies:

<!-- TabbedContent -->
<!-- TabItem -->

```terminal
npm install prisma tsx --save-dev
npm install @prisma/extension-accelerate @prisma/client
```

<!-- TabItem -->

```terminal
npm install prisma tsx --save-dev
npm install @prisma/client
```

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

In the `prisma/schema.prisma` file, add the following models:

```prisma file=prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
  output   = "../app/generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

//add-start
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  authorId  Int
  author    User    @relation(fields: [authorId], references: [id])
}
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
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    posts: {
      create: [
        {
          title: 'Join the Prisma Discord',
          content: 'https://pris.ly/discord',
          published: true,
        },
        {
          title: 'Prisma on YouTube',
          content: 'https://pris.ly/youtube',
        },
      ],
    },
  },
  {
    name: 'Bob',
    email: 'bob@prisma.io',
    posts: {
      create: [
        {
          title: 'Follow Prisma on Twitter',
          content: 'https://www.twitter.com/prisma',
          published: true,
        },
      ],
    },
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();
```

Now, tell Prisma how to run this script by updating your `package.json`:

```json file=package.json
{
  "name": "nextjs-prisma",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  // add-start
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  },
  // add-end
  "dependencies": {
    "@prisma/client": "^6.7.0",
    "@prisma/extension-accelerate": "^1.3.0",
    "next": "15.3.1",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.3.1",
    "prisma": "^6.7.0",
    "tailwindcss": "^4",
    "tsx": "^4.19.4",
    "typescript": "^5"
  }
}
```

:::warning

Before starting the development server, note that if you are using Next.js v15.2.0 or v15.2.1, do not use Turbopack as there is a known [issue](https://github.com/vercel/next.js/issues/76497). Remove Turbopack from your dev script by updating your `package.json`

```json file=package.json
"script":{
    //delete-start
    "dev": "next dev --turbopack",
    //delete-end
    //add-start
    "dev": "next dev",
    //add-end
}
```

This change is not needed on any versions before or after.

:::

Finally, run `prisma db seed` to seed your database with the initial data we defined in the `seed.ts` file.

Run the seed script:

```terminal
npx prisma db seed
```

And open Prisma Studio to inspect your data:

```terminal
npx prisma studio
```

### 2.5 Set up Prisma Client

Now that you have a database with some initial data, you can set up Prisma Client and connect it to your database.

At the root of your project, create a new `lib` directory and add a `prisma.ts` file to it.

```terminal
mkdir -p lib && touch lib/prisma.ts
```

Now, add the following code to your `lib/prisma.ts` file:

<!-- TabbedContent -->
<!-- TabItem -->

```typescript file=lib/prisma.ts showLineNumbers
//add-start

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prisma = globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
//add-end
```

<!-- TabItem -->

```typescript file=lib/prisma.ts showLineNumbers
//add-start

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
//add-end
```

This file creates a Prisma Client and attaches it to the global object so that only one instance of the client is created in your application. This helps resolve issues with hot reloading that can occur when using Prisma ORM with Next.js in development mode.

You'll use this client in the next section to run your first queries.

## 3. Query your database with Prisma ORM

Now that you have an initialized Prisma Client, a connection to your database, and some initial data, you can start querying your data with Prisma ORM.

In this example, you'll make the "home" page of your application display all of your users.

Open the `app/page.tsx` file and replace the existing code with the following:

```tsx file=app/page.tsx
export default async function Home() {
  return (
    <!-- div -->
      <!-- h1 -->
        Superblog

      <!-- ol -->
        <!-- li -->Alice
        <!-- li -->Bob


  );
}
```

This gives you a basic page with a title and a list of users. However, that list is static with hardcoded values. Let's update the page to fetch the users from your database and make it dynamic.

```tsx file=app/page.tsx


export default async function Home() {
  const users = await prisma.user.findMany();
  return (
    <!-- div -->
      <!-- h1 -->
        Superblog

      <!-- ol -->
        {users.map((user) => (
          <!-- li -->
            {user.name}

        ))}


  );
}
```

You are now importing your client, querying the `User` model for all users, and then displaying them in a list.

Now your home page is dynamic and will display the users from your database.

### 3.1 Update your data (optional)

If you want to see what happens when data is updated, you could:

- update your `User` table via a SQL browser of your choice
- change your `seed.ts` file to add more users
- change the call to `prisma.user.findMany` to re-order the users, filter the users, or similar.

Just reload the page and you'll see the changes.

## 4. Add a new Posts list page

You have your home page working, but you should add a new page that displays all of your posts.

First create a new `posts` directory in the `app` directory and create a new `page.tsx` file inside of it.

```terminal
mkdir -p app/posts && touch app/posts/page.tsx
```

Second, add the following code to the `app/posts/page.tsx` file:

```tsx file=app/posts/page.tsx


export default async function Posts() {
  return (
    <!-- div -->
      <!-- h1 -->
        Posts

      <!-- ul -->
          <!-- li -->My first post


  );
}
```

Now `localhost:3000/posts` will load, but the content is hardcoded again. Let's update it to be dynamic, similarly to the home page:

```tsx file=app/posts/page.tsx


export default async function Posts() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });

  return (
    <!-- div -->
      <!-- h1 -->
        Posts

      <!-- ul -->
        {posts.map((post) => (
          <!-- li -->
            <!-- span -->{post.title}
            <!-- span -->
              by {post.author.name}


        ))}


  );
}
```

This works similarly to the home page, but instead of displaying users, it displays posts. You can also see that you've used `include` in your Prisma Client query to fetch the author of each post so you can display the author's name.

This "list view" is one of the most common patterns in web applications. You're going to add two more pages to your application which you'll also commonly need: a "detail view" and a "create view".

## 5. Add a new Posts detail page

To complement the Posts list page, you'll add a Posts detail page.

In the `posts` directory, create a new `[id]` directory and a new `page.tsx` file inside of that.

```terminal
mkdir -p app/posts/[id] && touch app/posts/[id]/page.tsx
```

This page will display a single post's title, content, and author. Just like your other pages, add the following code to the `app/posts/new/page.tsx` file:

```tsx file=app/posts/[id]/page.tsx


export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  return (
    <!-- div -->
      <!-- article -->
        <!-- h1 -->My first post
        <!-- p -->by Anonymous
        <!-- div -->
          No content available.



  );
}
```

As before, this page is static with hardcoded content. Let's update it to be dynamic based on the `params` passed to the page:

```tsx file=app/posts/[id]/page.tsx



export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
    include: {
      author: true,
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <!-- div -->
      <!-- article -->
        <!-- h1 -->{post.title}
        <!-- p -->by {post.author.name}
        <!-- div -->
          {post.content || "No content available."}



  );
}
```

There's a lot of changes here, so let's break it down:

- You're using Prisma Client to fetch the post by its `id`, which you get from the `params` object.
- In case the post doesn't exist (maybe it was deleted or maybe you typed a wrong ID), you call `notFound()` to display a 404 page.
- You then display the post's title, content, and author. If the post doesn't have content, you display a placeholder message.

It's not the prettiest page, but it's a good start. Try it out by navigating to `localhost:3000/posts/1` and `localhost:3000/posts/2`. You can also test the 404 page by navigating to `localhost:3000/posts/999`.

## 6. Add a new Posts create page

To round out your application, you'll add a "create" page for posts. This will let you write your own posts and save them to the database.

As with the other pages, you'll start with a static page and then update it to be dynamic.

```terminal
mkdir -p app/posts/new && touch app/posts/new/page.tsx
```

Now, add the following code to the `app/posts/new/page.tsx` file:

```tsx file=app/posts/new/page.tsx


export default function NewPost() {
  async function createPost(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
  }

  return (
    <!-- div -->
      <!-- h1 -->Create New Post
      <!-- Form -->
        <!-- div -->
          <!-- label -->
            Title

          <!-- input -->

        <!-- div -->
          <!-- label -->
            Content

          <!-- textarea -->

        <!-- button -->
          Create Post



  );
}
```

This form looks good, but it doesn't do anything yet. Let's update the `createPost` function to save the post to the database:

```tsx file=app/posts/new/page.tsx





export default function NewPost() {
  async function createPost(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    await prisma.post.create({
      data: {
        title,
        content,
        authorId: 1,
      },
    });

    revalidatePath("/posts");
    redirect("/posts");
  }

  return (
    <!-- div -->
      <!-- h1 -->Create New Post
      <!-- Form -->
        <!-- div -->
          <!-- label -->
            Title

          <!-- input -->

        <!-- div -->
          <!-- label -->
            Content

          <!-- textarea -->

        <!-- button -->
          Create Post



  );
}
```

This page now has a functional form! When you submit the form, it will create a new post in the database and redirect you to the posts list page.

You also added a `revalidatePath` call to revalidate the posts list page so that it will be updated with the new post. That way everyone can read the new post immediately.

Try it out by navigating to `localhost:3000/posts/new` and submitting the form.

## 7. Deploy your application to Vercel (Optional)

The quickest way to deploy your application to Vercel is to use the [Vercel CLI](https://vercel.com/docs/cli).

First, install the Vercel CLI:

```terminal
npm install -g vercel
```

Then, run `vercel login` to log in to your Vercel account.

```terminal
vercel login
```

Before you deploy, you also need to tell Vercel to make sure that the Prisma Client is generated. You can do this by adding a `postinstall` script to your `package.json` file.

```json file=package.json
{
  "name": "nextjs-prisma",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "postinstall": "prisma generate --no-engine",
    "start": "next start",
    "lint": "next lint"
  },
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  },
  "dependencies": {
    "@prisma/client": "^6.2.1",
    "@prisma/extension-accelerate": "^1.2.1",
    "next": "15.1.4",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.1.4",
    "postcss": "^8",
    "prisma": "^6.2.1",
    "tailwindcss": "^3.4.1",
    "tsx": "^4.19.2",
    "typescript": "^5"
  }
}
```

:::note
If you're not using Prisma Postgres, you need to remove the `--no-engine` flag from the command.
:::

After this change, you can deploy your application to Vercel by running `vercel`.

```terminal
vercel
```

After the deployment is complete, you can visit your application at the URL that Vercel provides. Congratulations, you've just deployed a Next.js application with Prisma ORM!

## 8. Next steps

Now that you have a working Next.js application with Prisma ORM, here are some ways you can expand and improve your application:

- Add authentication to protect your routes
- Add the ability to edit and delete posts
- Add comments to posts
- Use [Prisma Studio](/orm/tools/prisma-studio) for visual database management

For more information:

- [Prisma ORM documentation](/orm)
- [Prisma Client API reference](/orm/prisma-client)
- [Next.js documentation](https://nextjs.org/docs)
