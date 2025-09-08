---
title: 'Serverless driver'
metaTitle: 'Serverless driver'
metaDescription: 'The serverless driver enables direct access to Prisma Postgres via HTTP.'
tocDepth: 3
toc: true
sidebar_class_name: early-access-badge
---

The serverless driver for Prisma Postgres is a lightweight and minimal client library that can talk to Prisma Postgres using raw SQL. You can use it via the [`@prisma/ppg`](https://github.com/prisma/ppg-client/tree/main) npm package.

:::warning

The Prisma Postgres serverless driver is currently in [Early Access](/orm/more/releases#early-access) and not yet recommended for production scenarios.

:::

## Installation

Install the serverless driver via npm:

```terminal
npm install @prisma/ppg
```

## Usage

The recommended API for most users is the `ppg` function, which returns a high-level SQL client implemented as a template literal tag function:

```ts

type Post =

const sql = ppg("prisma+postgres://accelerate.prisma-data.net/?api_key=...");

const authorId = 1;
const posts = await sql<Post>`SELECT * FROM "Post" WHERE "authorId" = $`;
```

## API reference

### `ppg`

The `ppg` function returns a high-level SQL client implemented as a template literal tag function:

```ts
function ppg(connectionString: string, deserialize?: Deserialize): Sql;

interface Sql
type Deserialize = (value: unknown, oid: unknown) => unknown;
```

The returned `Sql` object:

- Accepts a SQL statement as a template literal. If this contains any interpolated values, these are automatically converted to SQL parameters in order to prevent SQL injection attacks (see below for an example).
- Returns the data as an array of objects mirroring the structure of your Prisma models.
- Provides a `query` function which:
  - Takes a raw string and a list of params separately, allowing you to control the SQL parameters yourself or concatenate the query unsafely if needed.
  - Returns column types and raw data without converting the rows into an array of objects.

#### Arguments

The `ppg` function accepts the following arguments:

| Name               | Type          | Required | Description                                                                                                                                                                                   |
| :----------------- | :------------ | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `connectionString` | `string`      | **Yes**  | The connection string for your Prisma Postgres instance.                                                                                                                                      |
| `deserialize`      | `Deserialize` | No       | Custom deserializer function which takes a column type OID and a raw value and returns a mapped value. It's type is defined as `type Deserialize = (value: unknown, oid: unknown) => unknown` |

#### Usage

```ts

type Post =

type User =

const sql = ppg("prisma+postgres://accelerate.prisma-data.net/?api_key=...");

const posts: Post[] = await sql<Post>`SELECT * FROM "Post"`

const userId = 42;
const user: User[] = await sql<User>`SELECT * FROM "User" WHERE "id" = $`
```

### `Client`

The `Client` class provides more low-level control and should be used with more care:

```ts
class Client implements Queryable
```

The `query` function it exposes:

- Takes a raw string and a list of params separately, allowing you to control the SQL parameters yourself or concatenate the query unsafely if needed.
- Returns column types and raw data without converting the rows into an array of objects.

#### Usage

```ts
const client = new Client();

const posts = await client.query('SELECT * FROM "Post" WHERE "authorId" = $1', [1]);
```

This query returns an object of this structure:

```ts
,
    ,
    ,
    ,

  ],
  rows: [ [ 1, 'Hello World', 'This is the content of the post', true, 1 ] ]
}
```

## Limitations

- No transaction support.
- No [local Prisma Postgres](/postgres/database/local-development) support.
