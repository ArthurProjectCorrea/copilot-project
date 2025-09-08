---
title: 'Get started with the Prisma Management API'
metaTitle: 'Get started with the Prisma Management API'
description: 'Learn how to get started with the Prisma Management API'
sidebar_label: 'Programmatically manage Prisma Postgres'
image: '/img/guides/neon-connection-pooling.png'
completion_time: '15 min'
community_section: true
---

## Overview

This guide walks you through setting up a basic TypeScript project that uses the [Prisma Postgres Management API](/postgres/introduction/management-api) to create a new [Prisma Console project](/platform/about#project) with a [Prisma Postgres](/postgres/introduction/overview) database, and print out all connection details.

You'll authenticate via a [service token](/postgres/introduction/management-api#bearer-tokens), set up your environment, and run a script to interact with the API.

:::tip OpenApi
The API reference is also available via an [OpenAPI 3.1. spec](https://api.prisma.io/v1/swagger-editor).
:::

## Prerequisites

- Node.js and `npm` installed
- A [Prisma Data Platform](https://console.prisma.io/) account

## 1. Create a service token in Prisma Console

First, you need to create a service token to be able to access the Management API:

1. Open the [Prisma Console](https://console.prisma.io/)
2. Navigate to the **Settings** page of your workspace and select **Service Tokens**
3. Click **New Service Token**
4. Copy and save the generated service token securely, you'll use it in step 2.2.

## 2. Set up your project directory

### 2.1. Create a basic TypeScript project

Open your terminal and run the following commands:

```terminal
mkdir management-api-demo
cd management-api-demo
```

Next, initialize npm and install dependencies required for using TypeScript:

```terminal
npm init -y
npm install tsx typescript @types/node --save-dev
touch index.ts
```

You now have an `index.ts` file that you can execute with `npx tsx index.ts`. It's still empty, you'll start writing code in step 3.

### 2.2. Configure service token environment variable

Create your `.env` file:

```terminal
touch .env
```

Next, install the [`dotenv`](https://github.com/motdotla/dotenv) library for loading environment variables from the `.env` file:

```terminal
npm install dotenv
```

Finally, add your service token (from step 1.) to `.env`:

```bash
PRISMA_SERVICE_TOKEN="ey..."
```

### 2.3. Install the `axios` library for HTTP request

You're going to use [`axios`](https://github.com/axios/axios/tree/main) as your HTTP client to interact with the Management API. Install it as follows:

```terminal
npm install axios
```

You're all set, let's write some code to create a project and provision a Prisma Postgres database!

## 3. Programmatically create a new project with a database

Paste the following code into `index.ts`:

```ts

// Load environment variables
dotenv.config();

const API_URL = 'https://api.prisma.io/v1';
const SERVICE_TOKEN = process.env.PRISMA_SERVICE_TOKEN;

if (!SERVICE_TOKEN)

// Set HTTP headers to be used in this script
const headers = `,
  'Content-Type': 'application/json',
};

async function main() `;
  const region = 'us-east-1';
  const createProjectRes = await axios.post(
    `$/projects`,
    ,

  );
  const project = createProjectRes.data;
  console.log('Created project: \n', project);

  // Log the database details
  const apiKeys = project.databases[0].apiKeys || [];
  for (const key of apiKeys) `);
    console.log(`- Created at: $`);
    console.log(`- API key: $`);
    console.log(`- Prisma Postgres connection string: $`);

    if (key.ppgDirectConnection) `);
      console.log(`  - Host: $`);
      console.log(`  - Username: $`);
      console.log(`  - Password: $`);
    }
  }
}

main().catch((e) => );
```

You can run your script with the following command:

Your output of the command should look similar to the output above.

## Conclusion

You have now set up a TypeScript project that interacts with the Prisma Management API, creates a new project and database, and prints out all connection strings. You can extend this script to manage more resources or automate other tasks using the Management API.
