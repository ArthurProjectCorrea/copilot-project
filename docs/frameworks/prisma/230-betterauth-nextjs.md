---
title: 'How to use Prisma ORM with Better-Auth and Next.js'
metaTitle: 'How to use Prisma ORM and Prisma Postgres with Better-Auth and Next.js'
description: 'Learn how to use Prisma ORM in a Next.js app with Better-Auth'
sidebar_label: 'Better-Auth (with Next.js)'
image: '/img/guides/prisma-betterauth-nextjs-cover.png'
completion_time: '25 min'
community_section: true
---

## Introduction

[Better-Auth](https://better-auth.com/) is a modern, open-source authentication solution for web applications. It's built with TypeScript, React, and Prisma to provide a simple and extensible auth experience.

In this guide, you'll wire Better-Auth into a brand-new [Next.js](https://nextjs.org/) app and persist users in a [Prisma Postgres](https://prisma.io/postgres) database. You can find a complete example of this guide on [GitHub](https://github.com/prisma/prisma-examples/tree/latest/orm/betterauth-nextjs).

## Prerequisites

- [Node.js 18+](https://nodejs.org)
- Basic familiarity with Next.js App Router and Prisma

## 1. Set up your project

Create a new Next.js application:

```terminal
npx create-next-app@latest betterauth-nextjs-prisma
```

It will prompt you to customize your setup. Choose the defaults:

:::info

- _Would you like to use TypeScript?_ `Yes`
- _Would you like to use ESLint?_ `Yes`
- _Would you like to use Tailwind CSS?_ `Yes`
- _Would you like your code inside a `src/` directory?_ `Yes`
- _Would you like to use App Router?_ `Yes`
- _Would you like to use Turbopack?_ `Yes`
- _Would you like to customize the import alias (`@/_`by default)?*`No`

:::

Navigate to the project directory:

```terminal
cd betterauth-nextjs-prisma
```

These selections will create a modern Next.js project with TypeScript for type safety, ESLint for code quality, and Tailwind CSS for styling. Using the `src/` directory and the App Router are common conventions for new Next.js applications.

## 2. Set up Prisma

Next, you'll add Prisma to your project to manage your database.

### 2.1. Install Prisma and dependencies

Install the necessary Prisma packages. The dependencies differ slightly depending on whether you use Prisma Postgres with Accelerate or another database.

Once installed, initialize Prisma in your project:

```terminal
npx prisma init --db --output ../src/generated/prisma
```

:::info
You'll need to answer a few questions while setting up your Prisma Postgres database. Select the region closest to your location and a memorable name for your database like "My Better-Auth Project"
:::

This will create:

- A `prisma` directory with a `schema.prisma` file.
- A Prisma Postgres database.
- A `.env` file containing the `DATABASE_URL` at the project root.
- An `output` directory for the generated Prisma Client as `better-auth/generated/prisma`.

### 2.2. Configure the Prisma client generator

Run the following command to create the database tables and generate the Prisma Client:

```terminal
npx prisma generate
```

### 2.3. Set up a global Prisma client

Create a `/lib` directory and a `prisma.ts` file inside it. This file will be used to create and export your Prisma Client instance.

```terminal
mkdir -p src/lib
touch src/lib/prisma.ts
```

Set up the Prisma client like this:

:::warning
We recommend using a connection pooler (like [Prisma Accelerate](https://www.prisma.io/accelerate)) to manage database connections efficiently.

If you choose not to use one, **avoid** instantiating `PrismaClient` globally in long-lived environments. Instead, create and dispose of the client per request to prevent exhausting your database connections.
:::

## 3. Set up Better-Auth

Now it's time to integrate Better-Auth for authentication.

### 3.1. Install and configure Better-Auth

First, install the Better-Auth core package:

```terminal
npm install better-auth
```

Next, generate a secure secret that Better-Auth will use to sign authentication tokens. This ensures your tokens cannot be messed with.

```terminal
npx @better-auth/cli@latest secret
```

Copy the generated secret and add it, along with your application's URL, to your `.env` file:

```dotenv file=.env showLineNumbers
# Better-Auth
//add-start
BETTER_AUTH_SECRET=your-generated-secret
BETTER_AUTH_URL=http://localhost:3000
//add-end

# Prisma
DATABASE_URL="your-database-url"
```

Now, create a configuration file for Better-Auth at `src/lib/auth.ts`:

```terminal
touch src/lib/auth.ts
```

In this file, you'll configure Better-Auth to use the Prisma adapter, which allows it to persist user and session data in your database. You will also enable email and password authentication.

```ts file=src/lib/auth.ts

  database: prismaAdapter(prisma, ),
})
```

Better-Auth also supports other sign-in methods like social logins (Google, GitHub, etc.), which you can explore in their [documentation](https://www.better-auth.com/docs/authentication/email-password).

```ts file=src/lib/auth.ts

  database: prismaAdapter(prisma, ),
  //add-start
  emailAndPassword: ,
  //add-end
})
```

:::info
If your application runs on a port other than `3000`, you must add it to the `trustedOrigins` in your `auth.ts` configuration to avoid CORS errors during authentication requests.

```ts file=src/lib/auth.ts

  database: prismaAdapter(prisma, ),
  emailAndPassword: ,
  //add-next-line
  trustedOrigins: ['http://localhost:3001'],
})
```

:::

### 3.2. Add Better-Auth models to your schema

Better-Auth provides a CLI command to automatically add the necessary authentication models (`User`, `Session`, `Account`, and `Verification`) to your `schema.prisma` file.

Run the following command:

```terminal
npx @better-auth/cli generate
```

:::note
It will ask for confirmation to overwrite your existing Prisma schema. Select `y`.
:::

This will add the following models:

```prisma
model User

model Session

model Account

model Verification
```

### 3.3. Migrate the database

With the new models in your schema, you need to update your database. Run a migration to create the corresponding tables:

```terminal
npx prisma migrate dev --name add-auth-models
```

<br />

## 4. Set up the API routes

Better-Auth needs an API endpoint to handle authentication requests like sign-in, sign-up, and sign-out. You'll create a catch-all API route in Next.js to handle all requests sent to `/api/auth/[...all]`.

First, create the necessary directory and file:

```terminal
mkdir -p "src/app/api/auth/[...all]"
touch "src/app/api/auth/[...all]/route.ts"
```

Add the following code to the newly created `route.ts` file. This code uses a helper from Better-Auth to create Next.js-compatible `GET` and `POST` request handlers.

```ts

```

Next, you'll need a client-side utility to interact with these endpoints from your React components. Create a new file `src/lib/auth-client.ts`:

```terminal
touch src/lib/auth-client.ts
```

Add the following code, which creates the React hooks and functions you'll use in your UI:

```ts

```

## 5. Set up your pages

Now, let's build the user interface for authentication. Create the pages for signing up, signing in, and a protected dashboard:

```terminal
mkdir -p src/app/
touch src/app//page.tsx
```

### 5.1. Sign up page

First, create the basic `SignUpPage` component in `src/app/sign-up/page.tsx`. This sets up the main container and a title for your page.

```tsx file=src/app/sign-up/page.tsx
"use client";

  return (
    <main className="max-w-md mx-auto p-6 space-y-4 text-white">
      <h1 className="text-2xl font-bold">Sign Up</h1>
    </main>
  );
}
```

Next, import the necessary hooks from React and Next.js to manage state and navigation. Initialize the router and a state variable to hold any potential error messages.

```tsx file=src/app/sign-up/page.tsx
"use client";

//add-start

//add-end

  //add-start
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  //add-end

  return (
    <main className="max-w-md mx-auto p-6 space-y-4 text-white">
      <h1 className="text-2xl font-bold">Sign Up</h1>
    </main>
  );
}
```

Now, import the `signUp` function from your Better-Auth client and add the `handleSubmit` function. This function is triggered on form submission and calls the `signUp.email` method provided by Better-Auth, passing the user's name, email, and password.

```tsx file=src/app/sign-up/page.tsx
"use client";

//add-next-lin

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  //add-start
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) );

    if (res.error)  else
  }
  //add-end

  return (
    <main className="max-w-md mx-auto p-6 space-y-4 text-white">
      <h1 className="text-2xl font-bold">Sign Up</h1>
    </main>
  );
}
```

To inform the user of any issues, add an element that conditionally renders when the `error` state is not null.

```tsx file=src/app/sign-up/page.tsx
"use client";

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) );

    if (res.error)  else
  }

  return (
    <main className="max-w-md mx-auto p-6 space-y-4 text-white">
      <h1 className="text-2xl font-bold">Sign Up</h1>

      //add-start
      </p>}
      //add-end
    </main>
  );
}
```

Finally, add the HTML form with input fields for the user's name, email, and password, and a submit button.

```tsx file=src/app/sign-up/page.tsx
"use client";

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) );

    if (res.error)  else
  }

  return (
    <main className="max-w-md mx-auto p-6 space-y-4 text-white">
      <h1 className="text-2xl font-bold">Sign Up</h1>

      </p>}

      //add-start
      <form onSubmit= className="space-y-4">
        <input
          name="name"
          placeholder="Full Name"
          required
          className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          minLength=
          className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2"
        />
        <button
          type="submit"
          className="w-full bg-white text-black font-medium rounded-md px-4 py-2 hover:bg-gray-200"
        >
          Create Account
        </button>
      </form>
      //add-end
    </main>
  );
}
```

### 5.2. Sign in page

For the sign-in page, start with the basic structure in `src/app/sign-in/page.tsx`.

```tsx file=src/app/sign-in/page.tsx
"use client";

  return (
    <main className="max-w-md h-screen flex items-center justify-center flex-col mx-auto p-6 space-y-4 text-white">
      <h1 className="text-2xl font-bold">Sign In</h1>
    </main>
  );
}
```

Now, add the state and router hooks, similar to the sign-up page.

```tsx file=src/app/sign-in/page.tsx
"use client";

//add-start

//add-end

  //add-start
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  //add-end

  return (
    <main className="max-w-md h-screen flex items-center justify-center flex-col mx-auto p-6 space-y-4 text-white">
      <h1 className="text-2xl font-bold">Sign In</h1>
    </main>
  );
}
```

Add the `handleSubmit` function, this time importing and using the `signIn.email` method from Better-Auth.

```tsx file=src/app/sign-in/page.tsx
"use client";

//add-next-line

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  //add-start
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) );

    if (res.error)  else
  }
  //add-end

  return (
    <main className="max-w-md h-screen flex items-center justify-center flex-col mx-auto p-6 space-y-4 text-white">
      <h1 className="text-2xl font-bold">Sign In</h1>
    </main>
  );
}
```

Add the conditional error message display.

```tsx file=src/app/sign-in/page.tsx
"use client";

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) );

    if (res.error)  else
  }

  return (
    <main className="max-w-md h-screen flex items-center justify-center flex-col mx-auto p-6 space-y-4 text-white">
      <h1 className="text-2xl font-bold">Sign In</h1>

      //add-start
      </p>}
      //add-end
    </main>
  );
}
```

Finally, add the form fields for email and password and a sign-in button.

```tsx file=src/app/sign-in/page.tsx
"use client";

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) );

    if (res.error)  else
  }

  return (
    <main className="max-w-md h-screen flex items-center justify-center flex-col mx-auto p-6 space-y-4 text-white">
      <h1 className="text-2xl font-bold">Sign In</h1>

      </p>}

      //add-start
      <form onSubmit= className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2"
        />
        <button
          type="submit"
          className="w-full bg-white text-black font-medium rounded-md px-4 py-2 hover:bg-gray-200"
        >
          Sign In
        </button>
      </form>
      //add-end
    </main>
  );
}
```

### 5.3. Dashboard page

This is the protected page for authenticated users. Start with the basic component in `src/app/dashboard/page.tsx`.

```tsx file=src/app/dashboard/page.tsx
"use client";

  return (
    <main className="max-w-md h-screen flex items-center justify-center flex-col mx-auto p-6 space-y-4 text-white">
      <h1 className="text-2xl font-bold">Dashboard</h1>
    </main>
  );
}
```

Import the `useSession` hook from your Better-Auth client. This hook is the key to managing authentication state on the client side. It provides the session data and a pending status.

```tsx file=src/app/dashboard/page.tsx
"use client";

//add-start

//add-end

  //add-start
  const router = useRouter();
  const  = useSession();
  //add-end

  return (
    <main className="max-w-md h-screen flex items-center justify-center flex-col mx-auto p-6 space-y-4 text-white">
      <h1 className="text-2xl font-bold">Dashboard</h1>
    </main>
  );
}
```

To protect this route, use a `useEffect` hook. This effect checks if the session has loaded (`!isPending`) and if there is no authenticated user (`!session?.user`). If both are true, it redirects the user to the sign-in page.

```tsx file=src/app/dashboard/page.tsx
"use client";

//add-next-line

  const router = useRouter();
  const  = useSession();

  //add-start: redirect if not signed in
  useEffect(() =>
  }, [isPending, session, router]);
  //add-end

  return (
    <main className="max-w-md h-screen flex items-center justify-center flex-col mx-auto p-6 space-y-4 text-white">
      <h1 className="text-2xl font-bold">Dashboard</h1>
    </main>
  );
}
```

To provide a better user experience, add loading and redirecting states while the session is being verified.

```tsx file=src/app/dashboard/page.tsx
"use client";

  const router = useRouter();
  const  = useSession();

  useEffect(() =>
  }, [isPending, session, router]);

  //add-start: loading and redirect states
  if (isPending)
    return <p className="text-center mt-8 text-white">Loading...</p>;
  if (!session?.user)
    return <p className="text-center mt-8 text-white">Redirecting...</p>;
  //add-end

  return (
    <main className="max-w-md h-screen flex items-center justify-center flex-col mx-auto p-6 space-y-4 text-white">
      <h1 className="text-2xl font-bold">Dashboard</h1>
    </main>
  );
}
```

Finally, if the user is authenticated, display their name and email from the `session` object. Also, import the `signOut` function and add a button that calls it, allowing the user to log out.

```tsx file=src/app/dashboard/page.tsx
"use client";

  const router = useRouter();
  const  = useSession();

  useEffect(() =>
  }, [isPending, session, router]);

  if (isPending)
    return <p className="text-center mt-8 text-white">Loading...</p>;
  if (!session?.user)
    return <p className="text-center mt-8 text-white">Redirecting...</p>;

  //add-start: destructure user from session
  const  = session;
  //add-end

  return (
    <main className="max-w-md h-screen flex items-center justify-center flex-col mx-auto p-6 space-y-4 text-white">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome, !</p>
      <p>Email: </p>

      <button
        onClick=
        className="w-full bg-white text-black font-medium rounded-md px-4 py-2 hover:bg-gray-200"
      >
        Sign Out
      </button>

    </main>
  );
}
```

### 5.4. Home page

Finally, update the home page to provide simple navigation to the sign-in and sign-up pages. Replace the contents of `src/app/page.tsx` with the following:

```tsx file=src/app/page.tsx
"use client";

  const router = useRouter();

  return (
    <main className="flex items-center justify-center h-screen bg-neutral-950 text-white">
      <div className="flex gap-4">
        <button
          onClick=
          className="bg-white text-black font-medium px-6 py-2 rounded-md hover:bg-gray-200">
          Sign Up
        </button>
        <button
          onClick=
          className="border border-white text-white font-medium px-6 py-2 rounded-md hover:bg-neutral-800">
          Sign In
        </button>
      </div>
    </main>
  );
}
```

## 6. Test it out

Your application is now fully configured.

1. Start the development server to test it:

```terminal
npm run dev
```

2. Navigate to `http://localhost:3000` in your browser. You should see the home page with "Sign Up" and "Sign In" buttons.

3. Click on **Sign Up**, create a new account, and you should be redirected to the dashboard. You can then sign out and sign back in.

4. To view the user data directly in your database, you can use Prisma Studio.

```terminal
npx prisma studio
```

5. This will open a new tab in your browser where you can see the `User`, `Session`, and `Account` tables and their contents.

:::success

Congratulations! You now have a fully functional authentication system built with Better-Auth, Prisma, and Next.js.

:::

## Next steps

- Add support for social login or magic links
- Implement password reset and email verification
- Add user profile and account management pages
- Deploy to Vercel and secure your environment variables
- Extend your Prisma schema with custom application models

## Further reading

- [Better-Auth documentation](https://www.better-auth.com/docs)
- [Prisma documentation](/orm/overview/introduction)
- [Next.js App Router](https://nextjs.org/docs/app)
