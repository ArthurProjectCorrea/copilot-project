---
title: 'Engines'
metaTitle: 'Engines'
metaDescription: "Prisma's query engine manages the communication with the database when using Prisma Client. Learn how it works on this page."
---

From a technical perspective, Prisma Client consists of three major components:

- JavaScript client library
- TypeScript type definitions
- A query engine

All of these components are located in the [generated `.prisma/client` folder](/orm/prisma-client/setup-and-configuration/generating-prisma-client#the-prismaclient-npm-package) after you ran `prisma generate`.

This page covers relevant technical details about the query engine.

:::note

As of [v6.16.0](https://pris.ly/release/6.16.0), Prisma ORM can be used without Rust engines in production applications. Learn more [here](/orm/prisma-client/setup-and-configuration/no-rust-engine).

**When enabled, your Prisma Client will be generated without a Rust-based query engine binary**:

```prisma
generator client
```

Note that [driver adapters](/orm/overview/databases/database-drivers#driver-adapters) are required if you want to use Prisma ORM without Rust engines.

You can [read about the performance and DX improvements](https://www.prisma.io/blog/prisma-orm-without-rust-latest-performance-benchmarks) of this change on our blog.

:::

## Prisma engines

At the core of each module, there typically is a [Prisma engine](https://github.com/prisma/prisma-engines) that implements the core set of functionality. Engines are implemented in [Rust](https://www.rust-lang.org/) and expose a low-level API that is used by the higher-level interfaces.

A Prisma engine is the **direct interface to the database**, any higher-level interfaces always communicate with the database _through_ the engine-layer.

As an example, Prisma Client connects to the [query engine](/orm/more/under-the-hood/engines) in order to read and write data in a database:

![Prisma engine](./typical-flow-query-engine-at-runtime.png)

### Using custom engine libraries or binaries

By default, all engine files are automatically downloaded into the `node_modules/@prisma/engines` folder when you install or update `prisma`, the Prisma CLI package. The [query engine](/orm/more/under-the-hood/engines) is also copied to the generated Prisma Client when you call `prisma generate`.
You might want to use a [custom library or binary](https://github.com/prisma/prisma-engines) file if:

- Automated download of engine files is not possible.
- You have created your own engine library or binary for testing purposes, or for an OS that is not officially supported.

Use the following environment variables to specify custom locations for your binaries:

- [`PRISMA_QUERY_ENGINE_LIBRARY`](/orm/reference/environment-variables-reference#prisma_query_engine_library) (Query engine, library)
- [`PRISMA_QUERY_ENGINE_BINARY`](/orm/reference/environment-variables-reference#prisma_query_engine_binary) (Query engine, binary)
- [`PRISMA_SCHEMA_ENGINE_BINARY`](/orm/reference/environment-variables-reference#prisma_schema_engine_binary) (Schema engine)
- [`PRISMA_MIGRATION_ENGINE_BINARY`](/orm/reference/environment-variables-reference#prisma_migration_engine_binary) (Migration engine)
- [`PRISMA_INTROSPECTION_ENGINE_BINARY`](/orm/reference/environment-variables-reference#prisma_introspection_engine_binary) (Introspection engine)

#### Setting the environment variable

You can define environment variables globally on your machine or in the `.env` file.

##### a) The `.env` file

Add the environment variable to the [`.env` file](/orm/more/development-environment/environment-variables).

> **Note**: It is possible to [use an `.env` file in a location outside the `prisma` folder](/orm/more/development-environment/environment-variables).

##### b) Global environment variable

Run the following command to set the environment variable globally (in this example, `PRISMA_QUERY_ENGINE_BINARY`):

#### Test your environment variable

Run the following command to output the paths to all binaries:

```terminal
npx prisma -v
```

The output shows that the query engine path comes from the `PRISMA_QUERY_ENGINE_BINARY` environment variable:

### Hosting engines

The [`PRISMA_ENGINES_MIRROR`](/orm/reference/environment-variables-reference#prisma_engines_mirror) environment variable allows you to host engine files via a private server, AWS bucket or other cloud storage.
This can be useful if you have a custom OS that requires custom-built engines.

```terminal
PRISMA_ENGINES_MIRROR=https://my-aws-bucket
```

## The query engine file

The **query engine file** is different for each operating system. It is named `query-engine-PLATFORM` or `libquery_engine-PLATFORM` where `PLATFORM` corresponds to the name of a compile target. Query engine file extensions depend on the platform as well. As an example, if the query engine must run on a [Darwin](<https://en.wikipedia.org/wiki/Darwin_(operating_system)>) operating system such as macOS Intel, it is called `libquery_engine-darwin.dylib.node` or `query-engine-darwin`. You can find an overview of all supported platforms [here](/orm/reference/prisma-schema-reference#binarytargets-options).

The query engine file is downloaded into the `runtime` directory of the generated Prisma Client when `prisma generate` is called.

Note that the query engine is implemented in Rust. The source code is located in the [`prisma-engines`](https://github.com/prisma/prisma-engines/) repository.

## The query engine at runtime

By default, Prisma Client loads the query engine as a [Node-API library](https://nodejs.org/api/n-api.html). You can alternatively [configure Prisma to use the query engine compiled as an executable binary](#configuring-the-query-engine), which is run as a sidecar process alongside your application.
The Node-API library approach is recommended since it reduces the communication overhead between Prisma Client and the query engine.

![Diagram showing the query engine and Node.js at runtime](./query-engine-node-js-at-runtime.png)

The query engine is started when the first Prisma Client query is invoked or when the [`$connect()`](/orm/prisma-client/setup-and-configuration/databases-connections/connection-management) method is called on your `PrismaClient` instance. Once the query engine is started, it creates a [connection pool](/orm/prisma-client/setup-and-configuration/databases-connections/connection-pool) and manages the physical connections to the database. From that point onwards, Prisma Client is ready to send [queries](/orm/prisma-client/queries/crud) to the database (e.g. `findUnique()`, `findMany`, `create`, ...).

The query engine is stopped and the database connections are closed when [`$disconnect()`](/orm/prisma-client/setup-and-configuration/databases-connections/connection-management) is invoked.

The following diagram depicts a "typical flow":

1. `$connect()` is invoked on Prisma Client
1. The query engine is started
1. The query engine establishes connections to the database and creates connection pool
1. Prisma Client is now ready to send queries to the database
1. Prisma Client sends a `findMany()` query to the query engine
1. The query engine translates the query into SQL and sends it to the database
1. The query engine receives the SQL response from the database
1. The query engine returns the result as plain old JavaScript objects to Prisma Client
1. `$disconnect()` is invoked on Prisma Client
1. The query engine closes the database connections
1. The query engine is stopped

![Typical flow of the query engine at run time](./typical-flow-query-engine-at-runtime.png)

## Responsibilities of the query engine

The query engine has the following responsibilities in an application that uses Prisma Client:

- manage physical database connections in connection pool
- receive incoming queries from the Prisma Client Node.js process
- generate SQL queries
- send SQL queries to the database
- process responses from the database and send them back to Prisma Client

## Debugging the query engine

You can access the logs of the query engine by setting the [`DEBUG`](/orm/prisma-client/debugging-and-troubleshooting/debugging) environment variable to `engine`:

```terminal

```

You can also get more visibility into the SQL queries that are generated by the query engine by setting the [`query` log level](/orm/reference/prisma-client-reference#log-levels) in Prisma Client:

```ts showLineNumbers
const prisma = new PrismaClient();
```

Learn more about [Debugging](/orm/prisma-client/debugging-and-troubleshooting/debugging) and [Logging](/orm/prisma-client/observability-and-logging/logging).

## Configuring the query engine

### Defining the query engine type for Prisma Client

[As described above](#the-query-engine-at-runtime) the default query engine is a Node-API library that is loaded into Prisma Client, but there is also an alternative implementation as an executable binary that runs in its own process. You can configure the query engine type by providing the `engineType` property to the Prisma Client `generator`:

```prisma
generator client
```

Valid values for `engineType` are `binary` and `library`. You can also use the environment variable [`PRISMA_CLIENT_ENGINE_TYPE`](/orm/reference/environment-variables-reference#prisma_client_engine_type) instead.

### Defining the query engine type for Prisma CLI

Prisma CLI also uses its own query engine for its own needs. You can configure it to use the binary version of the query engine by defining the environment variable [`PRISMA_CLI_QUERY_ENGINE_TYPE=binary`](/orm/reference/environment-variables-reference#prisma_cli_query_engine_type).
