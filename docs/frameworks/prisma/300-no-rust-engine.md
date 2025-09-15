---
title: 'No Rust engine'
metaTitle: 'Use Prisma ORM without Rust engines'
metaDescription: 'Learn how to use Prisma ORM without Rust engines'
---

As of [v6.16.0](https://pris.ly/release/6.16.0), usage of Prisma ORM without [Rust engine](/orm/more/under-the-hood/engines) binaries on PostgreSQL, CockroachDB, Neon, MySQL, PlanetScale, SQLite, D1 & MS SQL Server databases has been [Generally Available](/orm/more/releases#generally-available-ga).

This page gives an overview of how to use this version of Prisma ORM.

## Prisma ORM without Rust engines

The main technical differences if you're using Prisma ORM without a Rust engine are:

- no `binaryTargets` field on the `generator` block
- no query engine binary that's downloaded into the directory with your generated Prisma Client
- `engineType` needs to be set to `"client"` on the `generator` block
- required usage of [driver adapters](/orm/overview/databases/database-drivers#driver-adapters) for database connection management

:::warning
The Rust-free version of Prisma ORM has been thoroughly tested with the `prisma-client` generator (see below), not with `prisma-client-js`. Use the old generator at your discretion.
:::

## Usage

### Prerequisites

- Prisma ORM v6.15.0 (or later)

### 1. Set `engineType` on the `generator` block

```prisma file=schema.prisma
generator client
```

### 2. Re-generate Prisma Client

To make the configuration take effect, you need re-generate Prisma Client:

```terminal
npx prisma generate
```

### 3. Install the driver adapter

Depending on the database you use, you need to install a different driver adapter library:

### 4. Instantiate Prisma Client

Finally, instantiate Prisma Client which you can do using the driver adapter and the connection URL for the database instance you're using:

### 5. Query your database

If you went through the previous steps, you can query your database as you're used to with Prisma Client. No other changes are needed.

## Usage with older versions (Preview)

The Rust-free version of Prisma ORM has been in Preview from versions v6.7.0 to v.6.14.0. Expand below if you're using any of these versions and are unable to upgrade to the latest one.

<details>

<summary>Expand to see instructions for Prisma ORM v6.7.0 to v6.14.0</summary>

### Prerequisites

- Any Prisma ORM version between 6.7.0 and 6.14.0

### 1. Set feature flags

Usage of the new architecture requires the `driverAdapters` and `queryCompiler` feature flags to be set:

```prisma file=schema.prisma
generator client
```

### 2. Re-generate Prisma Client

To make the feature flags take effect, you need re-generate Prisma Client:

```terminal
npx prisma generate
```

### 3. Install the driver adapter

Depending on the database you use, you need to install a different driver adapter library:

### 4. Instantiate Prisma Client

Finally, you need to instantiate Prisma Client which you can do using the driver adapter and the connection URL for the database instance you're using.

### 5. Query your database

If you went through the previous steps, you can query your database as you're used to with Prisma Client. No other changes are needed.

</details>
