---
title: 'Creating the Prisma schema using TypeScript and MongoDB'
sidebar_label: 'Creating the Prisma schema'
metaTitle: 'Creating the Prisma schema using TypeScript and MongoDB'
metaDescription: 'Update the Prisma schema for MongoDB with TypeScript'
langSwitcher: ['typescript', 'node']
dbSwitcher: ['mongodb']
hide_table_of_contents: true
pagination_prev: getting-started/setup-prisma/start-from-scratch/mongodb/connect-your-database-typescript-mongodb
pagination_next: getting-started/setup-prisma/start-from-scratch/mongodb/install-prisma-client-typescript-mongodb
slugSwitch: /getting-started/setup-prisma/start-from-scratch/mongodb/creating-the-prisma-schema-
---
 
## Update the Prisma schema

Open the `prisma/schema.prisma` file and replace the default contents with the following:

```prisma file=prisma/schema.prisma showLineNumbers
datasource db 

generator client 

model Post 

model User 

model Comment 

// Address is an embedded document
type Address 
```

There are also a number of subtle differences in how the schema is setup when compared to relational databases like PostgreSQL.

For example, the underlying `ID` field name is always `_id` and must be mapped with `@map("_id")`.

For more information check out the [MongoDB schema reference](/orm/reference/prisma-schema-reference#mongodb-2).