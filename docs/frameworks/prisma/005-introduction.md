---
title: 'Introduction to Prisma Client'
sidebar_label: 'Introduction'
metaTitle: 'Introduction to Prisma Client'
metaDescription: 'Learn how to set up Prisma Client.'
---

import from '@site/src/components/Icon';

## Set up

### 1. Prerequisites

In order to set up Prisma Client, you need a [Prisma schema file](/orm/prisma-schema) with your database connection, the Prisma Client generator, and at least one model:

```prisma file=schema.prisma
datasource db

generator client

model User
```

Also make sure to [install the Prisma CLI](/orm/tools/prisma-cli#installation):

```
npm install prisma --save-dev
npx prisma
```

### 2. Installation

Install Prisma Client in your project with the following command:

```
npm install @prisma/client
```

### 3. Importing Prisma Client

There are multiple ways to import Prisma Client in your project depending on your use case:

For edge environments, you can import Prisma Client as follows:

> **Note**: If you're using [driver adapters](/orm/overview/databases/database-drivers#driver-adapters), you can import from the location spefified in your generator's `output` path directly, e.g. `./src/generated/prisma`. No need to import from `./src/generated/prisma/edge`.

### 4. Use Prisma Client to send queries to your database

Once you have instantiated `PrismaClient`, you can start sending queries in your code:

```ts
// run inside `async` function
const newUser = await prisma.user.create(,
})

const users = await prisma.user.findMany()
```

### 5. Evolving your application

Whenever you make changes to your database that are reflected in the Prisma schema, you need to manually re-generate Prisma Client to update the generated code in the `node_modules/.prisma/client` directory:

```
prisma generate
```
