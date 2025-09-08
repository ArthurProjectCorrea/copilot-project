---
title: 'Prisma Client API reference'
metaTitle: 'Prisma Client API'
metaDescription: 'API reference documentation for Prisma Client.'
sidebar_label: 'Prisma Client API'
tocDepth: 3
toc: true
---

:::tip Use Prisma ORM without Rust binaries

If Prisma’s Rust engine binaries cause large bundle sizes, slow builds, or deployment issues (for example, in serverless or edge environments), you can switch to the [`queryCompiler`](/orm/prisma-client/setup-and-configuration/no-rust-engine) Preview feature introduced in [v6.7.0](https://pris.ly/release/6.7.0).

**When enabled, Prisma Client is generated without a Rust-based query engine binary**, reducing build artifacts and removing native binary dependencies:

```prisma
generator client 
```

Note that the [`driverAdapters`](/orm/overview/databases/database-drivers#driver-adapters) Preview feature is **required** alongside `queryCompiler`.
When using this architecture:

* No Rust query engine binary is downloaded or shipped.
* The database connection pool is maintained by the native JS database driver you install (e.g., `@prisma/adapter-pg` for PostgreSQL).

This setup can simplify deployments in serverless or edge runtimes. Learn more in the [docs here](/orm/prisma-client/setup-and-configuration/no-rust-engine).

:::

The Prisma Client API reference documentation is based on the following schema:

```prisma
model User 

model ExtendedProfile 

model Post 

enum Role 
```

All example generated types (such as `UserSelect` and `UserWhereUniqueInput`) are based on the `User` model.

## `PrismaClient`

This section describes the `PrismaClient` constructor and its parameters.

### Remarks

- Parameters are validated at runtime.

### `datasources`

Programmatically overrides properties of the `datasource` block in the `schema.prisma` file - for example, as part of an integration test. See also: [Data sources](/orm/prisma-schema/overview/data-sources)

From version 5.2.0 and upwards, you can also use the [`datasourceUrl`](#datasourceurl) property to programmatically override the database connection string.

#### Properties

| Example property | Example value                 | Description                                                    |
| ---------------- | ----------------------------- | -------------------------------------------------------------- |
| `db`             | `` | The database [connection URL](/orm/reference/connection-urls). |

#### Remarks

- You must re-generate Prisma Client each time you add or rename a data source. Datasource names are included in the generated client.
- If you named your `datasource` block something else in the schema, replace `db` with the name of your `datasource` block.

#### Examples

##### Programmatically override a datasource `url`

```ts

const prisma = new PrismaClient(,
  },
});
```

Based on the following `datasource` block:

```prisma
datasource db 
```

### `datasourceUrl`

Programmatically overrides the [`datasource`](#datasources) block in the `schema.prisma` file.

#### Property

| Option                     | Example value        | Description                                                    |
| -------------------------- | -------------------- | -------------------------------------------------------------- |
| Database connection string | `'file:./dev_qa.db'` | The database [connection URL](/orm/reference/connection-urls). |

#### Examples

```ts

const prisma = new PrismaClient();
```

### `log`

Determines the type and level of logging. See also: [Logging](/orm/prisma-client/observability-and-logging/logging)

#### Options

| Option                   | Example                                                                  |
| ------------------------ | ------------------------------------------------------------------------ |
| Array of log levels      | `[ "info", "query" ]`                                                    |
| Array of log definitions | `[ , ]` |

##### Log levels

| Name    | Example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `query` | Logs all queries run by Prisma. <br /><br /> For relational databases this logs all SQL queries. Example: <br />`prisma:query SELECT "public"."User"."id", "public"."User"."email" FROM "public"."User" WHERE ("public"."User"."id") IN (SELECT "t0"."id" FROM "public"."User" AS "t0" INNER JOIN "public"."Post" AS "j0" ON ("j0"."authorId") = ("t0"."id") WHERE ("j0"."views" > $1 AND "t0"."id" IS NOT NULL)) OFFSET $2` <br /><br /> For MongoDB this logs queries using the [`mongosh` shell](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh) format. Example: <br /> `prisma:query db.User.deleteMany(, })` |
| `info`  | Example: <br />`prisma:info Started http server on http://127.0.0.1:58471`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `warn`  | Warnings.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `error` | Errors.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

##### Emit formats

| Name     | Description                                                   |
| -------- | ------------------------------------------------------------- |
| `stdout` | See: [stdout](https://en.wikipedia.org/wiki/Standard_streams) |
| `event`  | Raises an event that you can subscribe to.                    |

##### Event types

The `query` event type:

```ts file=index.d.ts

  timestamp: Date;
  query: string; // Query sent to the database
  params: string; // Query parameters
  duration: number; // Time elapsed (in milliseconds) between client issuing query and database responding - not only time taken to run query
  target: string;
};
```

Note that for MongoDB, the `params` and `duration` fields will be undefined.

All other log level event types:

```ts file=index.d.ts

  timestamp: Date;
  message: string;
  target: string;
};
```

#### Examples

##### Log `query` and `info` to `stdout`

##### Log a `query` event to console

##### Log `info`, `warn`, and `error` events to console

### `errorFormat`

Determines the level and formatting of errors returned by Prisma Client.

#### Error formats

| Name                  | Description                                    |
| --------------------- | ---------------------------------------------- |
| `undefined`           | If it's not defined, the default is colorless. |
| `pretty`              | Enables pretty error formatting.               |
| `colorless` (default) | Enables colorless error formatting.            |
| `minimal`             | Enables minimal error formatting.              |

#### Examples

##### No error formatting

```ts
const prisma = new PrismaClient();
```

##### `pretty` error formatting

```ts
const prisma = new PrismaClient();
```

##### `colorless` error formatting

```ts
const prisma = new PrismaClient();
```

##### `minimal` error formatting

```ts
const prisma = new PrismaClient();
```

### `adapter`

Defines an instance of a [driver adapter](/orm/overview/databases/database-drivers#driver-adapters). See also [Database drivers](/orm/overview/databases/database-drivers) .

:::info

This is available from version 5.4.0 and newer behind the `driverAdapters` feature flag.

:::

#### Example

The example below uses the [Neon driver adapter](/orm/overview/databases/neon#how-to-use-neons-serverless-driver-with-prisma-orm-preview)

```ts

dotenv.config();
const connectionString = `$`;

const adapter = new PrismaNeon();
const prisma = new PrismaClient();
```

### `rejectOnNotFound`

Use the `rejectOnNotFound` parameter to configure `findUnique()` and/or `findFirst` to throw an error if the record was not found. By default, both operations return `null` if the record is not found.

#### Remarks

- You can configure `rejectOnNotFound` on a per-request level for both [`findUnique()`](#findunique) and [`findFirst`](#findfirst)

#### Options

| Option               | Description                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------- |
| `RejectOnNotFound`   | Enable globally (`true` / `false`) _or_ throw a custom error.                               |
| `RejectPerOperation` | Enable per operation (`true` / `false`) _or_ throw a custom error per operation, per model. |

#### Examples

##### Enable globally for `findUnique()` and `findFirst`

```ts
const prisma = new PrismaClient();
```

##### Enable globally for a specific operation

```ts
const prisma = new PrismaClient(,
});
```

##### Throw a custom error per model and operation if record is not found

```ts
const prisma = new PrismaClient(,
    findUnique: ,
  },
});
```

### `transactionOptions`

Allows to set [transaction options](/orm/prisma-client/queries/transactions#transaction-options) globally on the constructor level.

#### Remarks

- The transaction levels can be overridden on a per-transaction level.

#### Options

| Option           | Description                                                                                                                                                                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `maxWait`        | The maximum amount of time Prisma Client will wait to acquire a transaction from the database. The default value is 2 seconds.                                                                                                                    |
| `timeout`        | The maximum amount of time the interactive transaction can run before being canceled and rolled back. The default value is 5 seconds.                                                                                                             |
| `isolationLevel` | Sets the [transaction isolation level](/orm/prisma-client/queries/transactions#transaction-isolation-level). By default this is set to the value currently configured in your database. The available can vary depending on the database you use. |

#### Example

```ts
const prisma = new PrismaClient(,
});
```

## Model queries

Use model queries to perform CRUD operations on your models. See also: [CRUD](/orm/prisma-client/queries/crud)

> **Note**: It's a best practice to always validate and sanitize any untrusted user data before passing it into Prisma queries. Failure to do so can lead to SQL injection or other injection vulnerabilities if the type checks are bypassed. Make sure user-supplied values cannot inadvertently bypass critical checks. We strongly recommend performing type checking and input validation at the application layer.  For more details, see [Custom Validation](/orm/prisma-client/queries/custom-validation) section.

### `findUnique()`

`findUnique()` query lets you retrieve a single database record:

- By _ID_
- By a _unique_ attribute

`findUnique()` replaced `findOne` in version [2.12.0](https://github.com/prisma/prisma/releases/tag/2.12.0).

#### Remarks

- Prisma Client's dataloader [automatically batches `findUnique()` queries](/orm/prisma-client/queries/query-optimization-performance#solving-n1-in-graphql-with-findunique-and-prisma-clients-dataloader) with the same `select` and `where` parameters.
- If you want the query to throw an error if the record is not found, then consider using [`findUniqueOrThrow`](#finduniqueorthrow) instead.
- You cannot use [filter conditions](#filter-conditions-and-operators) (e.g. `equals`, `contains`, `not`) to filter fields of the [JSON](/orm/reference/prisma-schema-reference#json) data type. Using filter conditions will likely result in a `null` response for that field.

#### Options

| Name                            | Example type (`User`)    | Required | Description                                                                                                                                                                                                                                                                                  |
| ------------------------------- | ------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `where`                         | `UserWhereUniqueInput`   | **Yes**  | Wraps all fields of a model so that a record can be selected ([learn more](#filter-on-non-unique-fields-with-userwhereuniqueinput)). <br></br>Before version 4.5.0, this type only wraps _unique_ fields of a model.                                                                        |
| `select`                        | `XOR<UserSelect, null>`  | No       | [Specifies which properties to include](/orm/prisma-client/queries/select-fields) on the returned object.                                                                                                                                                                                    |
| `include`                       | `XOR<UserInclude, null>` | No       | [Specifies which relations should be eagerly loaded](/orm/prisma-client/queries/relation-queries) on the returned object.                                                                                                                                                                    |
| `omit`                          | `XOR<UserOmit, null>`    | No       | Specifies which properties to exclude on the returned object. In [Preview](/orm/more/releases#preview) since 5.13.0                                                                                                                                                                          |
| `relationLoadStrategy`          | `'join'` or `'query'`    | No       | **Default: `join`**. Specifies the [load strategy](/orm/prisma-client/queries/relation-queries#relation-load-strategies-preview) for a relation query. Only available in combination with `include` (or `select` on a relation field). In [Preview](/orm/more/releases#preview) since 5.9.0. |

#### Return type

| Return type               | Example                    | Description                                                                                                                                                         |
| ------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JavaScript object (typed) | `User`                     |                                                                                                                                                                     |
| JavaScript object (plain) | `` | Use `select` and `include` to determine which fields to return.                                                                                                     |
| `null`                    | `null`                     | Record not found                                                                                                                                                    |

#### Examples

##### Get the `User` record with an `id` of `42`

```ts
const result = await prisma.user.findUnique(,
});
```

##### Get the `User` record with an `email` of `alice@prisma.io`

```ts
const result = await prisma.user.findUnique(,
});
```

##### Get the `User` record with `firstName` of `Alice` and `lastName` of `Smith` (`@@unique`)

<details>

<summary>Expand for example User model with a @@unique block</summary>

```prisma
model User 
```

</details>

```ts
const result = await prisma.user.findUnique(,
  },
});
```

##### Get the `User` record with `firstName` of `Alice` and `lastName` of `Smith` (`@@id`)

<details>

<summary>Expand for example User model with an @@id block</summary>

```prisma
model User 
```

</details>

```ts
const result = await prisma.user.findUnique(,
  },
});
```

### `findUniqueOrThrow()`

`findUniqueOrThrow()` retrieves a single record in the same way as [`findUnique()`](#findunique). However, if the query does not find the requested record, it throws a `PrismaClientKnownRequestError`.

Note that [before Prisma v6](/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-6#removed-notfounderror), it would throw a `NotFoundError: No User found error`. 

Here’s an example of its usage:

```ts
await prisma.user.findUniqueOrThrow(,
});
```

`findUniqueOrThrow()` differs from `findUnique()` as follows:

- Its return type is non-nullable. For example, `post.findUnique()` can return `post` or `null`, but `post.findUniqueOrThrow()` always returns `post`.
- It is not compatible with sequential operations in the [`$transaction` API](/orm/prisma-client/queries/transactions#the-transaction-api). If the query throws a `PrismaClientKnownRequestError`, then the API will not roll back any operations in the array of calls. As a workaround, you can use interactive transactions with the `$transaction` API, as follows:

  ```ts
   $transaction(async (prisma) => );
     await prisma.model.findUniqueOrThrow();
   })
  ```

### `findFirst()`

`findFirst` returns the first record in a list that matches your criteria.

#### Remarks

- If you want the query to throw an error if the record is not found, then consider using [`findFirstOrThrow`](#findfirstorthrow) instead.

#### Options

| Name                   | Example type (`User`)                                 | Required | Description                                                                                                                                                                                                                                                                                  |
| ---------------------- | ----------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `select`               | `XOR<UserSelect, null>`                               | No       | [Specifies which properties to include](/orm/prisma-client/queries/select-fields) on the returned object.                                                                                                                                                                                    |
| `include`              | `XOR<UserInclude, null>`                              | No       | [Specifies which relations should be eagerly loaded](/orm/prisma-client/queries/relation-queries) on the returned object.                                                                                                                                                                    |
| `omit`                 | `XOR<UserOmit, null>`                                 | No       | Specifies which properties to exclude on the returned object. In [Preview](/orm/more/releases#preview) since 5.13.0.                                                                                                                                                                         |
| `relationLoadStrategy` | `'join'` or `'query'`                                 | No       | **Default: `join`**. Specifies the [load strategy](/orm/prisma-client/queries/relation-queries#relation-load-strategies-preview) for a relation query. Only available in combination with `include` (or `select` on a relation field). In [Preview](/orm/more/releases#preview) since 5.9.0. |
| `where`                | `UserWhereInput`                                      | No       | Wraps _all_ model fields in a type so that the list can be filtered by any property.                                                                                                                                                                                                         |
| `orderBy`              | `XOR<Enumerable<UserOrderByInput>, UserOrderByInput>` | No       | Lets you order the returned list by any property.                                                                                                                                                                                                                                            |

#### Return type

| Return type               | Example                    | Description                                                                                                                                                         |
| ------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JavaScript object (typed) | `User`                     | Specifies which properties to include on the returned object.                                                                                                       |
| JavaScript object (plain) | `` | Use `select` and `include` to determine which fields to return.                                                                                                     |
| `null`                    | `null`                     | Record not found                                                                                                                                                    |

#### Remarks

- `findFirst` calls `findMany` behind the scenes and accepts the same query options.
- Passing in a negative `take` value when you use a `findFirst` query reverses the order of the list.

#### Examples

See [Filter conditions and operators](#filter-conditions-and-operators) for examples of how to filter results.

##### Get the first `User` record where the `name` is `Alice`

```ts
const user = await prisma.user.findFirst(,
});
```

##### Get the first `Post` record where the `title` starts with `A test`, reverse the list with `take`

```ts

const prisma = new PrismaClient();

async function main() ,
  });

  const b = await prisma.post.create(,
  });

  const c = await prisma.post.findFirst(,
    },
    orderBy: ,
    take: -1, // Reverse the list
  });
}

main();
```

### `findFirstOrThrow()`

`findFirstOrThrow()` retrieves a single data record in the same way as [`findFirst()`](#findfirst). However, if the query does not find a record, it throws a `PrismaClientKnownRequestError`.

Note that [before Prisma v6](/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-6#removed-notfounderror), it would throw a `NotFoundError: No User found error`. 

`findFirstOrThrow()` differs from `findFirst()` as follows:

- Its return type is non-nullable. For example, `post.findFirst()` can return `post` or `null`, but `post.findFirstOrThrow` always returns `post`.
- It is not compatible with sequential operations in the [`$transaction` API](/orm/prisma-client/queries/transactions#the-transaction-api). If the query returns `PrismaClientKnownRequestError`, then the API will not roll back any operations in the array of calls. As a workaround, you can use interactive transactions with the `$transaction` API, as follows:

  ```ts
  prisma.$transaction(async (tx) => );
    await tx.model.findFirstOrThrow();
  })
  ```

### `findMany()`

`findMany` returns a list of records.

#### Options

| Name                   | Type                                                          | Required | Description                                                                                                                                                                                                                                                                                  |
| ---------------------- | ------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `select`               | `XOR<PostSelect, null>`                                       | No       | [Specifies which properties to include](/orm/prisma-client/queries/select-fields) on the returned object.                                                                                                                                                                                    |
| `include`              | `XOR<PostInclude, null>`                                      | No       | [Specifies which relations should be eagerly loaded](/orm/prisma-client/queries/relation-queries) on the returned object.                                                                                                                                                                    |
| `omit`                 | `XOR<PostOmit, null>`                                         | No       | Specifies which properties to exclude on the returned object. In [Preview](/orm/more/releases#preview) since 5.13.0                                                                                                                                                                          |
| `relationLoadStrategy` | `'join'` or `'query'`                                         | No       | **Default: `join`**. Specifies the [load strategy](/orm/prisma-client/queries/relation-queries#relation-load-strategies-preview) for a relation query. Only available in combination with `include` (or `select` on a relation field). In [Preview](/orm/more/releases#preview) since 5.9.0. |
| `where`                | `UserWhereInput`                                              | No       | Wraps _all_ model fields in a type so that the list can be filtered by any property.                                                                                                                                                                                                         |
| `orderBy`              | `XOR`ByInput>, PostOrderByInput>` | No       | Lets you order the returned list by any property.                                                                                                                                                                                                                                            |
| `cursor`               | `UserWhereUniqueInput`                                        | No       | Specifies the position for the list (the value typically specifies an `id` or another unique value).                                                                                                                                                                                         |
| `take`                 | `number`                                                      | No       | Specifies how many objects should be returned in the list (as seen from the _beginning_ (positive value) or _end_ (negative value) **either** of the list **or** from the `cursor` position if mentioned)                                                                                    |
| `skip`                 | `number`                                                      | No       | Specifies how many of the returned objects in the list should be skipped.                                                                                                                                                                                                                    |
| `distinct`             | `Enumerable<UserDistinctFieldEnum>`                           | No       | Lets you filter out duplicate rows by a specific field - for example, return only distinct `Post` titles.                                                                                                                                                                                    |

#### Return type

| Return type                     | Example                      | Description                                                     |
| ------------------------------- | ---------------------------- | --------------------------------------------------------------- |
| JavaScript array object (typed) | `User[]`                     |                                                                 |
| JavaScript array object (plain) | `[]` | Use `select` and `include` to determine which fields to return. |
| Empty array                     | `[]`                         | No matching records found.                                      |

#### Examples

See [Filter conditions and operators](#filter-conditions-and-operators) for examples of how to filter results.

##### Get all `User` records where the `name` is `Alice`

```ts
const user = await prisma.user.findMany(,
});
```

### `create()`

`create` creates a new database record.

#### Options

| Name                    | Type                                                     | Required | Description                                                                                                                                                                                                                                                                                  |
| ----------------------- | -------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`                  | `XOR`UserUncheckedCreateInput>` | **Yes**  | Wraps all the model fields in a type so that they can be provided when creating new records. It also includes relation fields which lets you perform (transactional) nested inserts. Fields that are marked as optional or have default values in the datamodel are optional.                |
| [`select`](#select)     | `XOR<UserSelect, null>`                                  | No       | [Specifies which properties to include](/orm/prisma-client/queries/select-fields) on the returned object.                                                                                                                                                                                    |
| [`include`](#include)   | `XOR<UserInclude, null>`                                 | No       | [Specifies which relations should be eagerly loaded](/orm/prisma-client/queries/relation-queries) on the returned object.                                                                                                                                                                    |
| [`omit`](#omit) | `XOR<UserOmit, null>`                                    | No       | Specifies which properties to exclude on the returned object. In [Preview](/orm/more/releases#preview) since 5.13.0                                                                                                                                                                          |
| `relationLoadStrategy`  | `'join'` or `'query'`                                    | No       | **Default: `join`**. Specifies the [load strategy](/orm/prisma-client/queries/relation-queries#relation-load-strategies-preview) for a relation query. Only available in combination with `include` (or `select` on a relation field). In [Preview](/orm/more/releases#preview) since 5.9.0. |

#### Return type

| Return type               | Example                        | Description                                                     |
| ------------------------- | ------------------------------ | --------------------------------------------------------------- |
| JavaScript object (typed) | `User`                         |                                                                 |
| JavaScript object (plain) | `` | Use `select` and `include` to determine which fields to return. |

#### Remarks

- You can also perform a nested [`create`](#create-1) - for example, add a `User` and two `Post` records at the same time.

#### Examples

##### Create a single new record with the only required field `email`

```ts
const user = await prisma.user.create(,
});
```

##### Create multiple new records

In most cases, you can carry out batch inserts with the [`createMany()`](#createmany) or [`createManyAndReturn()`](#createmanyandreturn) queries. However, [there are scenarios where `create()` is the best option to insert multiple records](#remarks-11).

The following example results in **two** `INSERT` statements:

### `update()`

`update` updates an existing database record.

#### Options

| Name                    | Type                                                   | Required | Description                                                                                                                                                                                                                                                                                  |
| ----------------------- | ------------------------------------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`                  | `XOR`UserUncheckedUpdateInput>` | **Yes**  | Wraps all the fields of the model so that they can be provided when updating an existing record. Fields that are marked as optional or have default values in the datamodel are optional.                                                                                                    |
| `where`                 | `UserWhereUniqueInput`                                 | **Yes**  | Wraps all fields of a model so that a record can be selected ([learn more](#filter-on-non-unique-fields-with-userwhereuniqueinput)). <br></br>Before version 4.5.0, this type only wraps _unique_ fields of a model.                                                                        |
| [`select`](#select)     | `XOR<UserSelect, null>`                                | No       | [Specifies which properties to include](/orm/prisma-client/queries/select-fields) on the returned object.                                                                                                                                                                                    |
| [`include`](#include)   | `XOR<UserInclude, null>`                               | No       | [Specifies which relations should be eagerly loaded](/orm/prisma-client/queries/relation-queries) on the returned object.                                                                                                                                                                    |
| [`omit`](#omit) | `XOR<UserOmit, null>`                                  | No       | Specifies which properties to exclude on the returned object. In [Preview](/orm/more/releases#preview) since 5.13.0.                                                                                                                                                                         |
| `relationLoadStrategy`  | `'join'` or `'query'`                                  | No       | **Default: `join`**. Specifies the [load strategy](/orm/prisma-client/queries/relation-queries#relation-load-strategies-preview) for a relation query. Only available in combination with `include` (or `select` on a relation field). In [Preview](/orm/more/releases#preview) since 5.9.0. |

#### Return type

| Return type                | Example                        | Description                                                     |
| -------------------------- | ------------------------------ | --------------------------------------------------------------- |
| JavaScript object (typed)  | `User`                         |                                                                 |
| JavaScript object (plain)  | `` | Use `select` and `include` to determine which fields to return. |
| `RecordNotFound` exception |                                | Exception is thrown if record does not exist.                   |

#### Remarks

- To perform arithmetic operations on update (add, subtract, multiply, divide), use [atomic updates](#atomic-number-operations) to prevent race conditions.
- You can also perform a nested [`update`](#update-1) - for example, update a user and that user's posts at the same time.

#### Examples

##### Update the `email` of the `User` record with `id` of `1` to `alice@prisma.io`

```ts
const user = await prisma.user.update(,
  data: ,
});
```

### `upsert()`

`upsert` does the following:

- If an existing database record satisfies the `where` condition, it updates that record
- If no database record satisfies the `where` condition, it creates a new database record

#### Options

| Name                    | Type                                                    | Required | Description                                                                                                                                                                                                                                                                                  |
| ----------------------- | ------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `create`                | `XOR`UserUncheckedCreateInput>` | **Yes**  | Wraps all the fields of the model so that they can be provided when creating new records. It also includes relation fields which lets you perform (transactional) nested inserts. Fields that are marked as optional or have default values in the datamodel are optional.                   |
| `update`                | `XOR`UserUncheckedUpdateInput>` | **Yes**  | Wraps all the fields of the model so that they can be provided when updating an existing record. Fields that are marked as optional or have default values in the datamodel are optional.                                                                                                    |
| `where`                 | `UserWhereUniqueInput`                                  | **Yes**  | Wraps all fields of a model so that a record can be selected ([learn more](#filter-on-non-unique-fields-with-userwhereuniqueinput)). <br></br>Before version 4.5.0, this type only wraps _unique_ fields of a model.                                                                        |
| [`select`](#select)     | `XOR<UserSelect, null>`                                 | No       | [Specifies which properties to include](/orm/prisma-client/queries/select-fields) on the returned object.                                                                                                                                                                                    |
| [`include`](#include)   | `XOR<UserInclude, null>`                                | No       | [Specifies which relations should be eagerly loaded](/orm/prisma-client/queries/relation-queries) on the returned object.                                                                                                                                                                    |
| [`omit`](#omit) | `XOR<UserOmit, null>`                                   | No       | Specifies which properties to exclude on the returned object. In [Preview](/orm/more/releases#preview) since 5.13.0                                                                                                                                                                          |
| `relationLoadStrategy`  | `'join'` or `'query'`                                   | No       | **Default: `join`**. Specifies the [load strategy](/orm/prisma-client/queries/relation-queries#relation-load-strategies-preview) for a relation query. Only available in combination with `include` (or `select` on a relation field). In [Preview](/orm/more/releases#preview) since 5.9.0. |

#### Return type

| Return type               | Example                        | Description                                                     |
| ------------------------- | ------------------------------ | --------------------------------------------------------------- |
| JavaScript object (typed) | `User`                         |                                                                 |
| JavaScript object (plain) | `` | Use `select` and `include` to determine which fields to return. |

#### Remarks

- To perform arithmetic operations on update (add, subtract, multiply, divide), use [atomic updates](#atomic-number-operations) to prevent race conditions.
- If two or more upsert operations happen at the same time and the record doesn't already exist, then a race condition might happen. As a result, one or more of the upsert operations might throw a unique key constraint error. Your application code can catch this error and retry the operation. [Learn more](#unique-key-constraint-errors-on-upserts).
- From version 4.6.0, Prisma ORM hands over upsert queries to the database where possible. [Learn more](#database-upserts).

#### Examples

##### Update (if exists) or create a new `User` record with an `email` of `alice@prisma.io`

```ts
const user = await prisma.user.upsert(,
  update: ,
  create: ,
});
```

#### Unique key constraint errors on upserts

##### Problem

If multiple upsert operations happen at the same time and the record doesn't already exist, then one or more of the operations might return a [unique key constraint error](/orm/reference/error-reference#p2002).

##### Cause

When Prisma Client does an upsert, it first checks whether that record already exists in the database. To make this check, Prisma Client performs a read operation with the `where` clause from the upsert operation. This has two possible outcomes, as follows:

- If the record does not exist, then Prisma Client creates that record.
- If the record exists, then Prisma Client updates it.

When your application tries to perform two or more concurrent upsert operations, then a race condition might happen where two or more operations do not find the record and therefore try to create that record. In this situation, one of the operations successfully creates the new record but the other operations fail and return a unique key constraint error.

##### Solution

Handle the P2002 error in your application code. When it occurs, retry the upsert operation to update the row.

#### Database upserts

Where possible, Prisma Client hands over an `upsert` query to the database. This is called a _database upsert_.

Database upserts have the following advantages:

- They are faster than upserts handled by Prisma Client
- [Unique key constraint errors](#unique-key-constraint-errors-on-upserts) cannot happen

Prisma Client uses a database upsert automatically when [specific criteria](#database-upsert-query-criteria) are met. When these criteria are not met, Prisma Client handles the `upsert`.

To use a database upsert, Prisma Client sends the SQL construction [`INSERT ... ON CONFLICT SET .. WHERE`](https://www.prisma.io/dataguide/postgresql/inserting-and-modifying-data/insert-on-conflict) to the database.

##### Database upsert prerequisites

Prisma Client can use database upserts if your stack meets the following criteria:

- You use Prisma ORM version 4.6.0 or later
- Your application uses a CockroachDB, PostgreSQL, or SQLite data source

##### Database upsert query criteria

Prisma Client uses a database upsert for an `upsert` query when the query meets the following criteria:

- There are no nested queries in the `upsert`'s `create` and `update` [options](#options-7)
- The query does _not_ include a selection that uses a [nested read](/orm/prisma-client/queries/relation-queries#nested-reads)
- The query modifies only one model
- There is only one unique field in the `upsert`'s `where` option
- The unique field in the `where` option and the unique field in the `create` option have the same value

If your query does not meet these criteria, then Prisma Client handles the upsert itself.

##### Database upsert examples

The following examples use this schema:

```prisma
model User 
```

The following `upsert` query meets all of the criteria, so Prisma Client uses a database upsert.

```ts
prisma.user.upsert(,
  create: ,
  update: ,
});
```

In this situation, Prisma uses the following SQL query:

```sql
INSERT INTO "public"."User" ("id","profileViews","userName","email") VALUES ($1,$2,$3,$4)
ON CONFLICT ("userName") DO UPDATE
SET "email" = $5 WHERE ("public"."User"."userName" = $6 AND 1=1) RETURNING "public"."User"."id", "public"."User"."profileViews", "public"."User"."userName", "public"."User"."email"
```

The following query has multiple unique values in the `where` clause, so Prisma Client does _not_ use a database upsert:

```ts
prisma.User.upsert(,
  create: ,
  update: ,
});
```

In the following query, the values for `userName` in the `where` and `create` options are different, so Prisma Client does _not_ use a database upsert.

```ts
prisma.User.upsert(,
  create: ,
  update: ,
});
```

In the following query, the selection on the `title` field in `posts` is a nested read, so Prisma Client does _not_ use a database upsert.

```ts
prisma.user.upsert(,
    },
  },
  where: ,

  create: ,
  update: ,
});
```

### `delete()`

`delete` deletes an existing database record. You can delete a record:

- By _ID_
- By a _unique_ attribute

To delete records that match a certain criteria, use [`deleteMany`](#deletemany) with a filter.

#### Options

| Name                    | Type                     | Required | Description                                                                                                                                                                                                                                                                                  |
| ----------------------- | ------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `where`                 | `UserWhereUniqueInput`   | **Yes**  | Wraps all fields of a model so that a record can be selected ([learn more](#filter-on-non-unique-fields-with-userwhereuniqueinput)). <br></br>Before version 4.5.0, this type only wraps _unique_ fields of a model.                                                                        |
| [`select`](#select)     | `XOR<UserSelect, null>`  | No       | [Specifies which properties to include](/orm/prisma-client/queries/select-fields) on the returned object.                                                                                                                                                                                    |
| [`include`](#include)   | `XOR<UserInclude, null>` | No       | [Specifies which relations should be eagerly loaded](/orm/prisma-client/queries/relation-queries) on the returned object.                                                                                                                                                                    |
| [`omit`](#omit) | `XOR<UserOmit, null>`    | No       | Specifies which properties to exclude on the returned object. In [Preview](/orm/more/releases#preview) since 5.13.0                                                                                                                                                                          |
| `relationLoadStrategy`  | `'join'` or `'query'`    | No       | **Default: `join`**. Specifies the [load strategy](/orm/prisma-client/queries/relation-queries#relation-load-strategies-preview) for a relation query. Only available in combination with `include` (or `select` on a relation field). In [Preview](/orm/more/releases#preview) since 5.9.0. |

#### Return type

| Return type                | Example                        | Description                                                                                                   |
| -------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| JavaScript object (typed)  | `User`                         | The `User` record that was deleted.                                                                           |
| JavaScript object (plain)  | `` | Data from the `User` record that was deleted. Use `select` and `include` to determine which fields to return. |
| `RecordNotFound` exception |                                | Throws an exception if record does not exist.                                                                 |

#### Remarks

- To delete multiple records based on some criteria (for example, all `User` records with a `prisma.io` email address, use `deleteMany`)

#### Examples

##### Delete the `User` record with an `id` of `1`

```ts
const user = await prisma.user.delete(,
});
```

##### Delete the `User` record where `email` equals `elsa@prisma.io`

The following query deletes a specific user record and uses `select` to return the `name` and `email` of the deleted user:

### `createMany()`

`createMany` creates multiple records in a transaction.

#### Options

| Name              | Type                              | Required | Description                                                                                                                                                                                                                                             |
| ----------------- | --------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`            | `Enumerable<UserCreateManyInput>` | **Yes**  | Wraps all the model fields in a type so that they can be provided when creating new records. Fields that are marked as optional or have default values in the datamodel are optional.                                                                   |
| `skipDuplicates?` | `boolean`                         | No       | Do not insert records with unique fields or ID fields that already exist. Only supported by databases that support [`ON CONFLICT DO NOTHING`](https://www.postgresql.org/docs/9.5/sql-insert.html#SQL-ON-CONFLICT). This excludes MongoDB and SQLServer |

#### Return type

| Return type    | Example        | Description                               |
| -------------- | -------------- | ----------------------------------------- |
| `BatchPayload` | `` | A count of the number of records created. |

#### Remarks

- As of Prisma ORM version 5.12.0, `createMany()` is now supported by SQLite.
- The `skipDuplicates` option is not supported by MongoDB, SQLServer, or SQLite.
- You **cannot** create or connect relations by using nested `create`, `createMany`, `connect`, `connectOrCreate` queries inside a top-level `createMany()` query. See here for a [workaround](/orm/prisma-client/queries/relation-queries#using-nested-createmany).
- You can use a nested [`createMany`](#createmany-1) query inside an [`update()`](#update) or [`create()`](#create) query - for example, add a `User` and two `Post` records with a nested `createMany` at the same time.

#### Examples

##### Create several new users

```ts
const users = await prisma.user.createMany(,
    ,
  ],
});
```

### `createManyAndReturn()`

`createManyAndReturn` creates multiple records and returns the resulting objects.

:::info

This feature is available in Prisma ORM version 5.14.0 and later for PostgreSQL, CockroachDB and SQLite.

:::

#### Options

| Name              | Type                              | Required | Description                                                                                                                                                                                                                                             |
| ----------------- | --------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`            | `Enumerable<UserCreateManyInput>` | **Yes**  | Wraps all the model fields in a type so that they can be provided when creating new records. Fields that are marked as optional or have default values in the datamodel are optional.                                    |
| [`select`](#select)            | `XOR<UserSelect, null>`  | No       | [Specifies which properties to include](/orm/prisma-client/queries/select-fields) on the returned objects.                                                                                 |
| [`omit`](#omit)        | `XOR<UserOmit, null>`    | No       | Specifies which properties to exclude on the returned objects. In [Preview](/orm/more/releases#preview) since 5.13.0. Mutually exclusive with `select`.                                            |
| [`include`](#include)          | `XOR<UserInclude, null>` | No       | [Specifies which relations should be eagerly loaded](/orm/prisma-client/queries/relation-queries) on the returned objects.                                                                                 |
| `skipDuplicates?` | `boolean`                         | No       | Do not insert records with unique fields or ID fields that already exist. Only supported by databases that support [`ON CONFLICT DO NOTHING`](https://www.postgresql.org/docs/9.5/sql-insert.html#SQL-ON-CONFLICT). This excludes MongoDB and SQLServer |

#### Remarks

- The `skipDuplicates` option is not supported by SQLite.
- Note that the order of elements returned by `createManyAndReturn` is not guaranteed.
- You **cannot** create or connect relations by using nested `create`, `createMany`, `connect`, `connectOrCreate` queries inside a top-level `createManyAndReturn()` query. See here for a [workaround](/orm/prisma-client/queries/relation-queries#using-nested-createmany).
- When relations are included via `include`, a separate query is generated per relation.
- `relationLoadStrategy: join` is not supported.

#### Return type

| Return type | Example | Description |
| ----------- | ------- | ----------- |
| JavaScript array object (typed) | `User[]` |     |
| JavaScript array object (plain) | `[]` | Use `select`, `omit` and `include` to determine which fields to return. |

#### Examples

##### Create and return several new users

### `updateMany()`

`updateMany` updates a batch of existing database records in bulk and returns the number of updated records.

#### Options

| Name    | Type                                                                    | Required | Description                                                                                                                                                                                         |
| ------- | ----------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`  | `XOR`UserUncheckedUpdateManyInput>` | **Yes**  | Wraps all the fields of the model so that they can be provided when updating an existing record. Fields that are marked as optional or have default values in the datamodel are optional on `data`. |
| `where` | `UserWhereInput`                                                        | No       | Wraps _all_ fields of a model so that the list can be filtered by any property. If you do not filter the list, all records will be updated.                                                         |
| `limit` | `number`                                                                | No       | Limits the number of records to update.                                                                                                                                                    |

#### Return type

| Return type    | Example        | Description                   |
| -------------- | -------------- | ----------------------------- |
| `BatchPayload` | `` | The count of updated records. |

```ts

  count: number;
};
```

#### Examples

##### Update all `User` records where the `name` is `Alice` to `ALICE`

```ts
const updatedUserCount = await prisma.user.updateMany(,
  data: ,
});
```

##### Update all `User` records where the `email` contains `prisma.io` and at least one related `Post` has more than 10 likes

```ts
const updatedUserCount = await prisma.user.updateMany(,
    posts: ,
      },
    },
  },
  data: ,
});
```

##### Update `User` records where the `email` contains `prisma.io`, but limit to 5 records updated.

```ts
const updatedUserCount = await prisma.user.updateMany(,
  },
  data: ,
  limit: 5,
});
```

### `updateManyAndReturn()`

:::info

This feature is available in Prisma ORM version 6.2.0 and later for PostgreSQL, CockroachDB and SQLite.

:::

`updateManyAndReturn` updates multiple records and returns the resulting objects.

#### Options

| Name    | Type                                                                    | Required | Description                                                                                                                                                                                         |
| ------- | ----------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`  | `XOR`UserUncheckedUpdateManyInput>` | **Yes**  | Wraps all the fields of the model so that they can be provided when updating an existing record. Fields that are marked as optional or have default values in the datamodel are optional on `data`. |
| `where` | `UserWhereInput`                                                        | No       | Wraps _all_ fields of a model so that the list can be filtered by any property. If you do not filter the list, all records will be updated.                                                         |

#### Return type

| Return type | Example | Description |
| ----------- | ------- | ----------- |
| JavaScript array object (typed) | `User[]` |     |
| JavaScript array object (plain) | `[]` | Use `select`, `omit` and `include` to determine which fields to return. |

#### Examples

##### Update and return multiple users

### `deleteMany()`

`deleteMany` deletes multiple records in a transaction.

#### Options

| Name    | Type             | Required | Description                                                                  |
| ------- | ---------------- | -------- | ---------------------------------------------------------------------------- |
| `where` | `UserWhereInput` | No       | Wraps _all_ fields of a model so that the list can be filtered by any field. |
| `limit` | `Int`            | No       | Limits the number of records deleted.                                         |

#### Return type

| Return type    | Example        | Description                   |
| -------------- | -------------- | ----------------------------- |
| `BatchPayload` | `` | The count of deleted records. |

```ts

  count: number;
};
```

#### Examples

##### Delete all `User` records

```ts
const deletedUserCount = await prisma.user.deleteMany();
```

##### Delete all `User` records where the `name` is `Alice`

```ts
const deletedUserCount = await prisma.user.deleteMany(,
});
```

##### Delete all `User` records where the `email` contains `prisma.io`, but limit to 5 records deleted.

```ts
const deletedUserCount = await prisma.user.deleteMany(,
  },
  limit: 5,
});
```

See [Filter conditions and operators](#filter-conditions-and-operators) for examples of how to filter the records to delete.

### `count()`

#### Options

| Name      | Type                                                          | Required | Description                                                                                                                                                                                               |
| --------- | ------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `where`   | `UserWhereInput`                                              | No       | Wraps _all_ model fields in a type so that the list can be filtered by any property.                                                                                                                      |
| `orderBy` | `XOR`ByInput>, PostOrderByInput>` | No       | Lets you order the returned list by any property.                                                                                                                                                         |
| `cursor`  | `UserWhereUniqueInput`                                        | No       | Specifies the position for the list (the value typically specifies an `id` or another unique value).                                                                                                      |
| `take`    | `number`                                                      | No       | Specifies how many objects should be returned in the list (as seen from the _beginning_ (positive value) or _end_ (negative value) **either** of the list **or** from the `cursor` position if mentioned) |
| `skip`    | `number`                                                      | No       | Specifies how many of the returned objects in the list should be skipped.                                                                                                                                 |

#### Return type

| Return type                    | Example                  | Description                   |
| ------------------------------ | ------------------------ | ----------------------------- |
| `number`                       | `29`                     | The count of records.         |
| `UserCountAggregateOutputType` | `` | Returned if `select` is used. |

#### Examples

##### Count all `User` records

```ts
const result = await prisma.user.count();
```

##### Count all `User` records with at least one published `Post`

```ts
const result = await prisma.user.count(,
    },
  },
});
```

##### Use `select` to perform three separate counts

The following query returns:

- A count of all records (`_all`)
- A count of all records with non-`null` `name` fields
- A count of all records with non-`null` `city` fields

```ts
const c = await prisma.user.count(,
});
```

### `aggregate()`

See also: [Aggregation, grouping, and summarizing](/orm/prisma-client/queries/aggregation-grouping-summarizing#aggregate)

#### Options

| Name      | Type                                                         | Required | Description                                                                                                                                                                                               |
| --------- | ------------------------------------------------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `where`   | `UserWhereInput`                                             | No       | Wraps _all_ model fields in a type so that the list can be filtered by any property.                                                                                                                      |
| `orderBy` | `XOR<Enumerable<UserOrderByInput>,`<br />`UserOrderByInput>` | No       | Lets you order the returned list by any property.                                                                                                                                                         |
| `cursor`  | `UserWhereUniqueInput`                                       | No       | Specifies the position for the list (the value typically specifies an `id` or another unique value).                                                                                                      |
| `take`    | `number`                                                     | No       | Specifies how many objects should be returned in the list (as seen from the _beginning_ (positive value) or _end_ (negative value) **either** of the list **or** from the `cursor` position if mentioned) |
| `skip`    | `number`                                                     | No       | Specifies how many of the returned objects in the list should be skipped.                                                                                                                                 |
| `_count`  | `true`                                                       | No       | Returns a count of matching records or non-`null` fields.                                                                                                                                                 |
| `_avg`    | `UserAvgAggregateInputType`                                  | No       | Returns an average of all values of the specified field.                                                                                                                                                  |
| `_sum`    | `UserSumAggregateInputType`                                  | No       | Returns the sum of all values of the specified field.                                                                                                                                                     |
| `_min`    | `UserMinAggregateInputType`                                  | No       | Returns the smallest available value of the specified field.                                                                                                                                              |
| `_max`    | `UserMaxAggregateInputType`                                  | No       | Returns the largest available value of the specified field.                                                                                                                                               |

#### Examples

##### Return `_min`, `_max`, and `_count` of `profileViews` of all `User` records

##### Return `_sum` of all `profileViews` for all `User` records

### `groupBy()`

See also: [Aggregation, grouping, and summarizing](/orm/prisma-client/queries/aggregation-grouping-summarizing#group-by)

#### Options

| Name      | Type                                                         | Required | Description                                                                                                                                                                                               |
| --------- | ------------------------------------------------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `where`   | `UserWhereInput`                                             | No       | Wraps _all_ model fields in a type so that the list can be filtered by any property.                                                                                                                      |
| `orderBy` | `XOR<Enumerable<UserOrderByInput>,`<br />`UserOrderByInput>` | No       | Lets you order the returned list by any property that is also present in `by`.                                                                                                                            |
| `by`      | `Array<UserScalarFieldEnum>` \| `string`                     | No       | Specifies the field or combination of fields to group records by.                                                                                                                                         |
| `having`  | `UserScalarWhereWithAggregatesInput`                         | No       | Allows you to filter groups by an aggregate value - for example, only return groups _having_ an average age less than 50.                                                                                 |
| `take`    | `number`                                                     | No       | Specifies how many objects should be returned in the list (as seen from the _beginning_ (positive value) or _end_ (negative value) **either** of the list **or** from the `cursor` position if mentioned) |
| `skip`    | `number`                                                     | No       | Specifies how many of the returned objects in the list should be skipped.                                                                                                                                 |
| `_count`  | `true` \| `UserCountAggregateInputType`                      | No       | Returns a count of matching records or non-`null` fields.                                                                                                                                                 |
| `_avg`    | `UserAvgAggregateInputType`                                  | No       | Returns an average of all values of the specified field.                                                                                                                                                  |
| `_sum`    | `UserSumAggregateInputType`                                  | No       | Returns the sum of all values of the specified field.                                                                                                                                                     |
| `_min`    | `UserMinAggregateInputType`                                  | No       | Returns the smallest available value of the specified field.                                                                                                                                              |
| `_max`    | `UserMaxAggregateInputType`                                  | No       | Returns the largest available value of the specified field.                                                                                                                                               |

#### Examples

##### Group by `country`/`city` where the average `profileViews` is greater than `200`, and return the `_sum` of `profileViews` for each group

The query also returns a count of `_all` records in each group, and all records with non-`null` `city` field values in each group.

### `findRaw()`

See: [Using Raw SQL (`findRaw()`)](/orm/prisma-client/using-raw-sql/raw-queries#findraw).

### `aggregateRaw()`

See: [Using Raw SQL (`aggregateRaw()`)](/orm/prisma-client/using-raw-sql/raw-queries#aggregateraw).

## Model query options

### `select`

`select` defines which fields are included in the object that Prisma Client returns. See: [Select fields and include relations](/orm/prisma-client/queries/select-fields) .

#### Remarks

- You cannot combine `select` and `include` on the same level.
- In [3.0.1](https://github.com/prisma/prisma/releases/3.0.1) and later, you can [select a `_count` of relations](#select-a-_count-of-relations).

#### Examples

##### Select the `name` and `profileViews` fields of a single `User` record

##### Select the `email` and `role` fields of a multiple `User` records

##### Select a `_count` of relations

##### Select the 'id' and 'title' fields of related `Post` records

##### `include` inside `select`

#### Generated types for `select`

The following example demonstrates how to use the [`validator`](/orm/prisma-client/type-safety/prisma-validator) with `select`:

```ts
const selectNameEmailNotPosts = Prisma.validator<Prisma.UserSelect>()();
```

### `include`

`include` defines which relations are included in the result that Prisma Client returns. See: [Select fields and include relations](/orm/prisma-client/queries/select-fields) .

#### Remarks

- In [3.0.1](https://github.com/prisma/prisma/releases/3.0.1) and later, you can [`include` a `_count` of relations](#include-a-_count-of-relations)

#### Examples

##### Include the `posts` and `profile` relation when loading `User` records

```ts
const users = await prisma.user.findMany(,
});
```

##### Include the `posts` relation on the returned objects when creating a new `User` record with two `Post` records

```ts
const user = await prisma.user.create(, ],
    },
  },
  include: , // Returns all fields for all posts
});
```

#### Generated types for `include`

The following example demonstrates how to use the [`validator`](/orm/prisma-client/type-safety/prisma-validator) with `include`:

```ts
const includePosts = Prisma.validator<Prisma.UserInclude>()();
```

##### Include a `_count` of relations

### `omit`

`omit` defines which fields are excluded in the object that Prisma Client returns.

#### Remarks

- You cannot combine `omit` and `select` since they serve opposite purposes
- `omit` was released into General Availability with Prisma ORM 6.2.0. It was available via the `omitApi` [Preview feature](/orm/reference/preview-features/client-preview-features) in Prisma ORM versions `5.13.0` through `6.1.0`.

#### Examples

##### Omit the `password` field from all `User` records

##### Omit the `title` fields from all `User`'s `posts` relation

#### Generated types for `omit`

The following example demonstrates how to use the [`validator`](/orm/prisma-client/type-safety/prisma-validator) with `omit`:

```ts
const omitPassword = Prisma.validator<Prisma.UserOmit>()();
```

### `relationLoadStrategy` (Preview)

`relationLoadStrategy` specifies how a relation should be loaded from the database. It has two possible values:

- `join` (default): Uses a database-level `LATERAL JOIN` (PostgreSQL) or correlated subqueries (MySQL) and fetches all data with a single query to the database.
- `query`: Sends multiple queries to the database (one per table) and joins them on the application level.

> **Note**: Once `relationLoadStrategy` moves from [Preview](/orm/more/releases#preview) into [General Availability](/orm/more/releases/#generally-available-ga), `join` will universally become the default for all relation queries.

You can learn more about join strategies [here](/orm/prisma-client/queries/relation-queries#relation-load-strategies-preview).

Because the `relationLoadStrategy` option is currently in Preview, you need to enable it via the `relationJoins` preview feature flag in your Prisma schema file:

```prisma
generator client 
```

After adding this flag, you need to run `prisma generate` again to re-generate Prisma Client. The `relationJoins` feature is currently available on PostgreSQL, CockroachDB and MySQL.

#### Remarks

- In most situations, the default `join` strategy will be more effective. Use `query` if you want to save resources on your database server or if you profiling shows that the application-level join is more performant.
- You can only specify the `relationLoadStrategy` on the top-level in your query. The top-level choice will affect all nested sub-queries.

#### Examples

##### Load the `posts` relation via a database-level JOIN when using `include`

```ts
const users = await prisma.user.findMany(,
});
```

##### Load the `posts` relation via a database-level JOIN when using `select`

```ts
const users = await prisma.user.findMany(,
});
```

### `where`

`where` defines one or more [filters](#filter-conditions-and-operators), and can be used to filter on record properties (like a user's email address) or related record properties (like a user's top 10 most recent post titles).

#### Examples

```ts
const results = await prisma.user.findMany(,
  },
});
```

#### Generated types for `where`

The following examples demonstrate how to use the [`validator`](/orm/prisma-client/type-safety/prisma-validator) with `where`:

- `UserWhereInput`

  ```ts
  // UserWhereInput
  const whereNameIs = Prisma.validator<Prisma.UserWhereInput>()();

  // It can be combined with conditional operators too
  const whereNameIs = Prisma.validator<Prisma.UserWhereInput>()(,
      },
    ],
  });
  ```

- `UserWhereUniqueInput` This type works by exposing any unique fields on the model. A field assigned `@id` is considered unique,
  as is one assigned `@unique`.

  From version 4.5.0, this type exposes all fields on the model. This means that when you filter for a single record based on a unique field, you can check additional non-unique and unique fields at the same time. [Learn more](#filter-on-non-unique-fields-with-userwhereuniqueinput).

  ```ts
  // UserWhereUniqueInput
  const whereEmailIsUnique = Prisma.validator<Prisma.UserWhereUniqueInput>()()
  ```

- `PostScalarWhereInput`

  ```ts
  const whereScalarTitleIs = Prisma.validator<Prisma.PostScalarWhereInput>()();
  ```

- `PostUpdateWithWhereUniqueWithoutAuthorInput` - This type accepts a unique `where` field (an `@id` or another assigned `@unique`)
  and updates any field on the `Post` model except the `Author`. The `Author` is the scalar field on the `Post` model.

  ```ts
  const updatePostByIdWithoutAuthor =
    Prisma.validator<Prisma.PostUpdateWithWhereUniqueWithoutAuthorInput>()(,
      data: ,
    });
  ```

- `PostUpsertWithWhereUniqueWithoutAuthorInput` - This type will update the `Post` records title field where the id matches, if it doesn't exist it will create it instead.

  ```ts
  const updatePostTitleOrCreateIfNotExist =
    Prisma.validator<Prisma.PostUpsertWithWhereUniqueWithoutAuthorInput>()(,
      update: ,
      create: ,
    });
  ```

- `PostUpdateManyWithWhereWithoutAuthorInput` - This type will update all `Post` records where published is set to false.

  ```ts
  const publishAllPosts = Prisma.validator<Prisma.PostUpdateManyWithWhereWithoutAuthorInput>()(,
    },
    data: ,
  });
  ```

### `orderBy`

Sorts a list of records. See also: [Sorting](/orm/prisma-client/queries/filtering-and-sorting)

#### Remarks

- In [2.16.0](https://github.com/prisma/prisma/releases/2.16.0) and later, you can [order by relation fields](#sort-post-by-the-related-user-records-name) - for example, order posts by the author's name.

- In [3.5.0](https://github.com/prisma/prisma/releases/3.5.0) and later, in PostgreSQL you can [order by relevance](#sort-post-by-relevance-of-the-title). For details, see [Sort by relevance](/orm/prisma-client/queries/filtering-and-sorting#sort-by-relevance-postgresql-and-mysql).

- In [4.1.0](https://github.com/prisma/prisma/releases/4.1.0) and later, you can [sort `null` records first or last](#sort-post-by-the-related-user-records-name-with-null-records-first). For details, see [Sort with nulls first or last](/orm/prisma-client/queries/filtering-and-sorting#sort-with-null-records-first-or-last).

#### Inputs for `sort` argument

| Name   | Description                  |
| ------ | ---------------------------- |
| `asc`  | Sort ascending (A &rarr; Z)  |
| `desc` | Sort descending (Z &rarr; A) |

#### Inputs for `nulls` argument

Note:

- This argument is optional.
- It is for use on optional [scalar](/orm/prisma-schema/data-model/models#scalar-fields) fields only. If you try to sort by nulls on a required or [relation](/orm/prisma-schema/data-model/models#relation-fields) field, Prisma Client throws a [P2009 error](/orm/reference/error-reference#p2009).
- It is available in version 4.1.0 and later, as a preview feature. See [sort with nulls first or last](/orm/prisma-client/queries/filtering-and-sorting#sort-with-null-records-first-or-last) for details of how to enable the feature.

| Name    | Description                    |
| ------- | ------------------------------ |
| `first` | Sort with `null` values first. |
| `last`  | Sort with `null` values last.  |

#### Examples

##### Sort `User` by `email` field

The following example returns all `User` records sorted by `email` ascending:

```ts
const users = await prisma.user.findMany(,
});
```

The following example returns all `User` records sorted by `email` descending:

```ts
const users = await prisma.user.findMany(,
});
```

#### Sort `Post` by the related `User` record's `name`

The following query orders posts by user name:

```ts
const posts = await prisma.post.findMany(,
  },
});
```

#### Sort `Post` by the related `User` record's `name`, with `null` records first

The following query orders posts by user name, with `null` records first:

```ts
const posts = await prisma.post.findMany(,
    },
  },
});
```

#### Sort `Post` by relevance of the title

:::info

For PostgreSQL, this feature is still in Preview. [Enable the `fullTextSearchPostgres` feature flag](/orm/prisma-client/queries/full-text-search#enabling-full-text-search-for-postgresql) in order to use it.

:::

The following query orders posts by relevance of the search term `'database'` to the title:

```ts
const posts = await prisma.post.findMany(,
})
```

#### Sort `User` by the `posts` count

The following query orders users by post count:

```ts
const getActiveusers = await prisma.user.findMany(,
  },
});
```

##### Sort `User` by multiple fields - `email` _and_ `role`

The following example sorts users by two fields - first `email`, then `role`:

The order of sorting parameters matters - the following query sorts by `role`, then `email`. Note the difference in the results:

##### Sort `User` by `email`, select `name` and `email`

The following example returns all the `name` and `email` fields of all `User` records, sorted by `email`:

##### Sort `User` records by `email` and sort nested `Post` records by `title`

The following example:

- Returns all `User` records sorted by `email`
- For each `User` record, returns the `title` field of all nested `Post` records sorted by `title`

##### Sort one user's nested list of `Post` records

The following example retrieves a single `User` record by ID, as well as a list of nested `Post` records sorted by `title`:

##### Sort by `enum`

The following sorts all `User` records by `role` (an `enum`):

#### Generated types for `orderBy`

The following examples demonstrate how to use the [`validator`](/orm/prisma-client/type-safety/prisma-validator) with `orderBy`:

- `UserOrderByInput`
  ```ts
  const orderEmailsByDescending = Prisma.validator<Prisma.UserOrderByInput>()();
  ```

### `distinct`

Deduplicate a list of records from [`findMany`](#findmany) or [`findFirst`](#findfirst). See also: [Aggregation, grouping, and summarizing](/orm/prisma-client/queries/aggregation-grouping-summarizing#select-distinct)

<!-- :::note
**Preview:** You can enable the [`nativeDistinct`](<link-to-nativeDistinct-doc>) feature in Prisma to push this deduplication process down to the database (if supported). For details, see the [Preview Features guide](<link>).
::: -->

#### Examples

##### Select distinct on a single field

The following example returns all distinct `city` fields, and selects only the `city` and `country` fields:

##### Select distinct on multiple fields

The following example returns all distinct `city` _and_ `country` field combinations, and selects only the `city` and `country` fields:

Note that there is now a "Paris, Denmark" in addition to "Paris, France":

##### Select distinct in combination with a filter

The following example returns all distinct `city` _and_ `country` field combinations where the user's email contains `"prisma.io"`, and selects only the `city` and `country` fields:

## `nativeDistinct`

Enabling `nativeDistinct` in your Prisma schema pushes the `distinct` operation to the database layer 
(where supported). This can significantly improve performance. However, note that:

- Some databases may not fully support DISTINCT on certain field combinations.
- Behavior can differ among providers.

To enable `nativeDistinct`:

```prisma showLineNumbers
generator client 
```

See [Preview Features](/orm/reference/preview-features/client-preview-features#preview-features-promoted-to-general-availability) for more details.

## Nested queries

### `create`

A nested `create` query adds a new related record or set of records to a parent record. See: [Working with relations](/orm/prisma-client/queries/relation-queries)

#### Remarks

- `create` is available as a nested query when you `create()` (`prisma.user.create(...)`) a new parent record or `update()` (`prisma.user.update(...)`) an existing parent record.
- You can use a nested `create` _or_ a nested [`createMany`](#createmany-1) to create multiple related records. If you require the [`skipDuplicates` query option](#nested-createmany-options) you should use `createMany`.

#### Examples

##### Create a new `User` record with a new `Profile` record

```ts highlight=5;normal
const user = await prisma.user.create(,
    },
  },
});
```

##### Create a new `Profile` record with a new `User` record

```ts
const user = await prisma.profile.create(,
    },
  },
})
```

##### Create a new `User` record with a new `Post` record

```ts highlight=5;normal
const user = await prisma.user.create(,
    },
  },
});
```

##### Create a new `User` record with two new `Post` records

Because it's a one-to-many relation, you can also create multiple `Post` records at once by passing an array to `create`:

```ts highlight=5-12;normal
const user = await prisma.user.create(,
        ,
      ],
    },
  },
});
```

Note: You can also use a nested [`createMany`](#createmany-1) to achieve the same result.

##### Update an existing `User` record by creating a new `Profile` record

```ts highlight=5;normal;
const user = await prisma.user.update(,
  data: ,
    },
  },
});
```

##### Update an existing `User` record by creating a new `Post` record

```ts
const user = await prisma.user.update(,
  data: ,
    },
  },
})
```

### `createMany`

A nested `createMany` query adds a new set of records to a parent record. See: [Working with relations](/orm/prisma-client/queries/relation-queries)

#### Remarks

- `createMany` is available as a nested query when you `create()` (`prisma.user.create(...)`) a new parent record or `update()` (`prisma.user.update(...)`) an existing parent record.
  - Available in the context of a one-to-many relation — for example, you can `prisma.user.create(...)` a user and use a nested `createMany` to create multiple posts (posts have one user).
  - **Not** available in the context of a many-to-many relation — for example, you **cannot** `prisma.post.create(...)` a post and use a nested `createMany` to create categories (many posts have many categories).
- You cannot nest an additional `create` or `createMany`.
- Allows setting foreign keys directly — for example, setting the `categoryId` on a post.
- As of Prisma ORM version 5.12.0, nested `createMany` is supported by SQLite.
- You can use a nested `create` _or_ a nested `createMany` to create multiple related records - [if you do not need the `skipDuplicates` query option, you should probably use `create`](/orm/prisma-client/queries/relation-queries#create-a-single-record-and-multiple-related-records).

#### Options \

| Name              | Type                              | Required | Description                                                                                                                                                                                                                                             |
| ----------------- | --------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`            | `Enumerable<UserCreateManyInput>` | **Yes**  | Wraps all the model fields in a type so that they can be provided when creating new records. Fields that are marked as optional or have default values in the datamodel are optional.                                                                   |
| `skipDuplicates?` | `boolean`                         | No       | Do not insert records with unique fields or ID fields that already exist. Only supported by databases that support [`ON CONFLICT DO NOTHING`](https://www.postgresql.org/docs/9.5/sql-insert.html#SQL-ON-CONFLICT). This excludes MongoDB and SQLServer |

#### Examples

##### Update a `User` and multiple new related `Post` records

```ts
const user = await prisma.user.update(,
  data: , ],
      },
    },
  },
});
```

### `set`

`set` overwrites the value of a relation - for example, replacing a list of `Post` records with a different list. See: [Working with relations](/orm/prisma-client/queries/relation-queries)

#### Examples

##### Update an existing `User` record by disconnecting any previous `Post` records and connecting two other existing ones

```ts
const user = await prisma.user.update(,
  data: , ],
    },
  },
});
```

### `connect`

A nested `connect` query connects a record to an existing related record by specifying an ID or unique identifier. See: [Working with relations](/orm/prisma-client/queries/relation-queries)

#### Remarks

- `connect` is available as a nested query when you create a new parent record or update an existing parent record.
- If the related record does not exist, Prisma Client throws an exception:

  ```
  The required connected records were not found. Expected 1 records to be connected, found 0.
  ```
- When using `set` and `connect` together, the order in which they are applied significantly impacts the result. If `set` is used before `connect`, the connected records will only reflect the final state established by the `connect` operation, as `set` clears all existing connections before `connect` establishes new ones. Conversely, if `connect` is applied before `set`, the `set` operation will override the `connect` action by clearing all connected records and replacing them with its own specified state.

#### Examples

##### Create a new `Profile` record and connect it to an existing `User` record via unique field

```ts
const user = await prisma.profile.create(,
    },
  },
});
```

##### Create a new `Profile` record and connect it to an existing `User` record via an ID field

```ts
const user = await prisma.profile.create(, // sets userId of Profile record
    },
  },
});
```

In [2.11.0](https://github.com/prisma/prisma/releases/2.11.0) and later, you can set the foreign key directly:

```ts
const user = await prisma.profile.create(,
});
```

However, you can't use both the direct approach and the `connect` approach in the same query. See [this issue comment](https://github.com/prisma/prisma/issues/4322#issuecomment-737976117) for details.

##### Create a new `Post` record and connect it to an existing `User` record

```ts
const user = await prisma.post.create(,
    },
  },
});
```

##### Update an existing `User` record by connecting it to an existing `Profile` record

```ts
const user = await prisma.user.update(,
  data: ,
    },
  },
});
```

##### Update an existing `User` record by connecting it to two existing `Post` records

```ts
const user = await prisma.user.update(,
  data: , ],
    },
  },
});
```

### `connectOrCreate`

`connectOrCreate` _either_ connects a record to an existing related record by ID or unique identifier _or_ creates a new related record if the record does not exist. See: [Working with relations](/orm/prisma-client/queries/relation-queries)

#### Remarks

- Multiple `connectOrCreate` queries that run _as concurrent transactions_ can result in a **race condition**. Consider the following example, where two queries attempt to `connectOrCreate` a blog post tag named `computing` at the same time (tag names must be unique):

  If query A and query B overlap in the following way, query A results in an exception:

  | Query A (Fail ❌)                                                | Query B (Success ✅)                                             |
  | :--------------------------------------------------------------- | :--------------------------------------------------------------- |
  | Query hits server, starts transaction A                          | Query hits server, starts transaction B                          |
  |                                                                  | Find record where `tagName` equals `computing`, record not found |
  | Find record where `tagName` equals `computing`, record not found |                                                                  |
  |                                                                  | Create record where `tagName` equals `computing` and connect     |
  | Create record where `tagName` equals `computing`                 |                                                                  |
  | Unique violation, record already created by transaction B        |                                                                  |

  To work around this scenario, we recommend catching the unique violation exception (`PrismaClientKnownRequestError`, error `P2002`) and retrying failed queries.

#### Examples

##### Create a new `Profile` record, then connect it to an existing `User` record _or_ create a new `User`

The following example:

1. Creates a `Profile`
2. Attempts to connect the profile to a `User` where the email address is `alice@prisma.io`
3. Creates a new user if a matching user does not exist

```ts
const user = await prisma.profile.create(,
        create: 
    },
  },
})
```

##### Create a new `Post` record and connect it to an existing `User` record, _or_ create a new `User`

```ts
const user = await prisma.post.create(,
        create: ,
      },
    },
  },
});
```

##### Update an existing `User` record by connecting it to an existing `Profile` record, _or_ creating a new `Profile` record

The following example:

1. Attempts to connect the user to a `Profile` with an `id` of `20`
2. Creates a new profile if a matching profile does not exist

```ts
const updateUser = await prisma.user.update(,
  data: ,
        create: ,
      },
    },
  },
});
```

##### Update an existing `User` record by connect it to two existing `Post` records, or creating two new `Post` records

```ts
const user = await prisma.user.update(,
  data: ,
          create: ,
        },
        ,
          create: ,
        },
      ],
    },
  },
});
```

### `disconnect`

A nested `disconnect` query breaks the connection between a parent record and a related record, but does not delete either record. See: [Working with relations](/orm/prisma-client/queries/relation-queries)

#### Remarks

- `disconnect` is only available if the relation is optional.
- If the relationship you are attempting to disconnect does not exist:

  - ([In 2.21.0 and later](https://github.com/prisma/prisma/releases/tag/2.21.0)), the operation does nothing
  - (Before [2.21.0](https://github.com/prisma/prisma/releases/tag/2.21.0)) Prisma Client throws an exception if the provided ID or unique identifier is not connected:

    ```
    The records for relation `PostToUser` between the `User` and `Post` models are not connected.
    ```

#### Examples

##### Update an existing `User` record by disconnecting the `Profile` record it's connected to

```ts
const user = await prisma.user.update(,
  data: ,
  },
});
```

##### Update an existing `User` record by disconnecting two `Post` records it's connected to

```ts
const user = await prisma.user.update(,
  data: , ],
    },
  },
});
```

### `update`

A nested `update` query updates one or more related records where the parent record's ID is `n`. See: [Working with relations](/orm/prisma-client/queries/relation-queries#update-a-specific-related-record)

#### Remarks

- Nested `update` queries are only available in the context of a top-level `update` query (for example, `prisma.user.update(...)`).
- If the parent record does not exist, Prisma Client throws an exception:

  ```
  AssertionError("Expected a valid parent ID to be present for nested update to-one case.")
  ```

- If the related record that you want to update does not exist, Prisma Client throws an exception:

  ```
  AssertionError("Expected a valid parent ID to be present for nested update to-one case.")
  ```

#### Examples

##### Update an existing `User` record by updating the `Profile` record it's connected to

```ts
const user = await prisma.user.update(,
  data: ,
    },
  },
});
```

##### Update an existing `User` record by updating two `Post` records it's connected to

```ts
const user = await prisma.user.update(,
  data: ,
          where: ,
        },
        ,
          where: ,
        },
      ],
    },
  },
});
```

### `upsert`

A nested `upsert` query updates a related record if it exists, or creates a new related record.

#### Examples

##### Update an existing `User` record by updating the `Profile` record it's connected to or creating a new one (_upsert_)

```ts
const user = await prisma.user.update(,
  data: ,
        update: ,
      },
    },
  },
});
```

##### Update an existing `User` record by updating two `Post` record it's connected to or creating new ones (_upsert_)

```ts
const user = await prisma.user.update(,
  data: ,
          update: ,
          where: ,
        },
        ,
          update: ,
          where: ,
        },
      ],
    },
  },
});
```

### `delete`

A nested `delete` query deletes a related record. The parent record is not deleted.

#### Remarks

- `delete` is only available if the relation is optional.

#### Examples

##### Update an existing `User` record by deleting the `Profile` record it's connected to

```ts
const user = await prisma.user.update(,
  data: ,
  },
});
```

##### Update an existing `User` record by deleting two `Post` records it's connected to

```ts
const user = await prisma.user.update(,
  data: , ],
    },
  },
});
```

### `updateMany`

A nested `updateMany` updates a list of related records and supports filtering - for example, you can update a user's unpublished posts.

#### Examples

##### Update all unpublished posts belonging to a specific user

```ts
const result = await prisma.user.update(,
  data: ,
        data: ,
      },
    },
  },
});
```

### `deleteMany`

A nested `deleteMany` deletes related records and supports filtering. For example, you can delete a user's posts while updating other properties of that user.

#### Examples

##### Delete all posts belonging to a specific user as part of an update

```ts
const result = await prisma.user.update(,
  data: ,
    },
  },
});
```

## Filter conditions and operators

### `equals`

Value equals `n`.

#### Examples

**Return all users where `name` equals `"Eleanor"`**

```ts
const result = await prisma.user.findMany(,
  },
});
```

You can also exclude the `equals`:

```ts
const result = await prisma.user.findMany(,
});
```

**Return all products with a quantity lower than the "warn quantity" threshold**

This example compares fields of the same model which is available as of version 4.3.0.

```ts
const productsWithLowQuantity = await prisma.product.findMany(,
  },
});
```

**Return all users that have blue and green as their favorite colors**

This example finds users that have set their `favoriteColors` field to `['blue', 'green']`.

Note that when using `equals`, order of elements matters. That is to say `['blue', 'green']` is **not** equal to `['green', 'blue']`

```ts
const favoriteColorFriends = await prisma.user.findMany(,
  },
});
```

### `not`

Value does not equal `n`.

#### Examples

##### Return all users where `name` does **not** equal `"Eleanor"`

```ts
const result = await prisma.user.findMany(,
  },
});
```

:::warning

`not` will return all items that do not match a given value. However, if the column is nullable, `NULL` values will not be returned. If you require null values to be returned, use an [`OR`](#or) operator to include `NULL` values.

:::

##### Return all users where `name` does **not** equal `"Eleanor"` **including** users where `name` is `NULL`

```ts
await prisma.user.findMany( },
      
    ]
  }
})
```

### `in`

Value `n` exists in list.

:::note

`null` values are not returned. For example, if you combine `in` and `NOT` to return a user whose name is _not_ in the list, users with `null` value names are not returned.

:::

#### Examples

##### Get `User` records where the `id` can be found in the following list: `[22, 91, 14, 2, 5]`

```ts
const getUser = await prisma.user.findMany(,
  },
});
```

##### Get `User` records where the `name` can be found in the following list: `['Saqui', 'Clementine', 'Bob']`

```ts
const getUser = await prisma.user.findMany(,
  },
});
```

##### Get `User` records where `name` is **not** present in the list

The following example combines `in` and [`NOT`](#not). You can also use [`notIn`](#notin).

```ts
const getUser = await prisma.user.findMany(,
    },
  },
});
```

##### Get a `User` record where at least one `Post` has at least one specified `Category`

```ts
const getUser = await prisma.user.findMany(,
          },
        },
      },
    },
  },
});
```

### `notIn`

Value `n` does not exist in list.

#### Remarks

- `null` values are not returned.

#### Examples

##### Get `User` records where the `id` can **not** be found in the following list: `[22, 91, 14, 2, 5]`

```ts
const getUser = await prisma.user.findMany(,
  },
});
```

### `lt`

Value `n` is less than `x`.

#### Examples

##### Get all `Post` records where `likes` is less than `9`

```ts
const getPosts = await prisma.post.findMany(,
  },
});
```

### `lte`

Value `n` is less than _or_ equal to `x`.

#### Examples

##### Get all `Post` records where `likes` is less or equal to `9`

```ts
const getPosts = await prisma.post.findMany(,
  },
});
```

### `gt`

Value `n` is greater than `x`.

#### Examples

##### Get all `Post` records where `likes` is greater than `9`

```ts
const getPosts = await prisma.post.findMany(,
  },
});
```

### `gte`

Value `n` is greater than _or_ equal to `x`.

#### Examples

##### Get all `Post` records where `likes` is greater than or equal to `9`

```ts
const getPosts = await prisma.post.findMany(,
  },
});
```

#### Examples

##### Get all `Post` records where `date_created` is greater than March 19th, 2020

```js
const result = await prisma.post.findMany(,
  },
});
```

### `contains`

Value `n` contains `x`.

#### Examples

##### Count all `Post` records where `content` contains `databases`

```js
const result = await prisma.post.count(,
  },
});
```

##### Count all `Post` records where `content` **does not** contain `databases`

```js
const result = await prisma.post.count(,
    },
  },
});
```

### `search`

Use [Full-Text Search](/orm/prisma-client/queries/full-text-search) to search within a `String` field.

:::info

For PostgreSQL, this feature is still in Preview. [Enable the `fullTextSearchPostgres` feature flag](/orm/prisma-client/queries/full-text-search#enabling-full-text-search-for-postgresql) in order to use it.

:::

#### Examples

##### Find all posts with a title that contains `cat` or `dog`.

```js
const result = await prisma.post.findMany(,
  },
});
```

##### Find all posts with a title that contains `cat` and `dog`.

```js
const result = await prisma.post.findMany(,
  },
});
```

##### Find all posts with a title that doesn't contain `cat`.

```js
const result = await prisma.post.findMany(,
  },
});
```

### `mode`

#### Remarks

- Supported by the PostgreSQL and MongoDB connectors only

#### Examples

##### Get all `Post` records where `title` contains `prisma`, in a case insensitive way

```js
const result = await prisma.post.findMany(,
  },
});
```

### `startsWith`

#### Examples

##### Get all `Post` records where `title` starts with `Pr` (such as `Prisma`)

```js
const result = await prisma.post.findMany(,
  },
});
```

### `endsWith`

#### Get all `User` records where `email` ends with `prisma.io`

```js
const result = await prisma.user.findMany(,
  },
});
```

### `AND`

All conditions must return `true`. Alternatively, pass a list of objects into the `where` clause - the [`AND` operator is not required](#get-all-post-records-where-the-content-field-contains-prisma-and-published-is-false-no-and).

#### Examples

##### Get all `Post` records where the `content` field contains `Prisma` and `published` is `false`

```js
const result = await prisma.post.findMany(,
      },
      ,
      },
    ],
  },
});
```

##### Get all `Post` records where the `content` field contains `Prisma` and `published` is `false` (no `AND`)

The following format returns the same results as the previous example **without** the `AND` operator:

```js
const result = await prisma.post.findMany(,
    published: ,
  },
});
```

##### Get all `Post` records where the `title` field contains `Prisma` or `databases`, and `published` is `false`

The following example combines `OR` and `AND`:

```js
const result = await prisma.post.findMany(,
      },
      ,
      },
    ],
    AND: ,
  },
});
```

### `OR`

One or more conditions must return `true`.

#### Examples

##### Get all `Post` records where the `title` field contains `Prisma` or `databases`

```js
const result = await prisma.post.findMany(,
      },
      ,
      },
    ],
  },
});
```

##### Get all `Post` records where the `title` field contains `Prisma` or `databases`, but not `SQL`

The following example combines `OR` and `NOT`:

```js
const result = await prisma.post.findMany(,
      },
      ,
      },
    ],
    NOT: ,
    },
  },
});
```

##### Get all `Post` records where the `title` field contains `Prisma` or `databases`, and `published` is `false`

The following example combines `OR` and `AND`:

```js
const result = await prisma.post.findMany(,
      },
      ,
      },
    ],
    AND: ,
  },
});
```

### `NOT`

All conditions must return `false`.

#### Examples

##### Get all `Post` records where the `title` does not contain `SQL`

```js
const result = await prisma.post.findMany(,
    },
  },
});
```

##### Get all `Post` records where the `title` field contains `Prisma` or `databases`, but not `SQL`, and the related `User` record' email address does not contain `sarah`

```js
const result = await prisma.post.findMany(,
      },
      ,
      },
    ],
    NOT: ,
    },
    user: ,
      },
    },
  },
  include: ,
});
```

## Relation filters

### `some`

Returns all records where **one or more** ("some") _related_ records match filtering criteria.

#### Remarks

- You can use `some` without parameters to return all records with at least one relation

#### Examples

##### Get all `User` records where _some_ posts mention `Prisma`

```ts
const result = await prisma.user.findMany(
      }
    }
  }
}
```

### `every`

Returns all records where **all** ("every") _related_ records match filtering criteria.

#### Examples

##### Get all `User` records where _all_ posts are published

```ts
const result = await prisma.user.findMany(,
    }
  }
}
```

### `none`

Returns all records where **zero** _related_ records match filtering criteria.

#### Remarks

- You can use `none` without parameters to [return all records with no relations](#get-all-user-records-with-zero-posts)

#### Examples

##### Get all `User` records with zero posts

```ts
const result = await prisma.user.findMany( // User has no posts
    }
  }
}
```

##### Get all `User` records with zero published posts

```ts
const result = await prisma.user.findMany(
    }
  }
}
```

### `is`

Returns all records where related record matches filtering criteria (for example, user's name `is` Bob).

#### Examples

##### Get all `Post` records where user's name is `"Bob"`

```ts
const result = await prisma.post.findMany(,
    }
  }
}
```

### `isNot`

Returns all records where the related record does not match the filtering criteria (for example, user's name `isNot` Bob).

#### Examples

##### Get all `Post` records where user's name is NOT `"Bob"`

```ts
const result = await prisma.post.findMany(,
    }
  }
}
```

## Scalar list methods

### `set`

Use `set` to overwrite the value of a scalar list field.

#### Remarks

- `set` is optional - you can set the value directly:

  ```ts
  tags: ['computers', 'books'];
  ```

#### Examples

##### Set the value of `tags` to a list of string values

```ts
const setTags = await prisma.post.update(,
  data: ,
  },
});
```

##### Set `tags` to a list of values _without_ using the `set` keyword

```ts
const setTags = await prisma.post.update(,
  data: ,
});
```

#### Set the value of `tags` to a single string value

```ts
const setTags = await prisma.post.update(,
  data: ,
  },
});
```

### `push`

`push` is available in version [2.20.0](https://github.com/prisma/prisma/releases/2.20.0) and later. Use `push` to add _one_ value or _multiple_ values to a scalar list field.

#### Remarks

- Available for PostgreSQL and MongoDB only.
- You can push a list of values or only a single value.

#### Examples

##### Add a `computing` item to the `tags` list

```ts
const addTag = await prisma.post.update(,
  data: ,
  },
});
```

```ts
const addTag = await prisma.post.update(,
  data: ,
  },
});
```

### `unset`

Use `unset` to unset the value of a scalar list. Unlike `set: null`, `unset` removes the list entirely.

#### Examples

##### Unset the value of `tags`

```ts
const setTags = await prisma.post.update(,
  data: ,
  },
});
```

## Scalar list filters

Scalar list filters allow you to filter by the contents of a list / array field.

### Remarks

- Scalar list / array filters [ignore `NULL` values](/orm/prisma-client/special-fields-and-types/working-with-scalar-lists-arrays#null-values-in-arrays) . Using `isEmpty` or `NOT` does not return records with `NULL` value lists / arrays, and `` results in an error.

### `has`

The given value exists in the list.

#### Examples

The following query returns all `Post` records where the `tags` list includes `"databases"`:

```ts
const posts = await client.post.findMany(,
  },
});
```

The following query returns all `Post` records where the `tags` list **does not** include `"databases"`:

```ts
const posts = await client.post.findMany(,
    },
  },
});
```

### `hasEvery`

Every value exists in the list.

#### Examples

The following query returns all `Post` records where the `tags` list includes _at least_ `"databases"` _and_ `"typescript"`:

```ts
const posts = await prisma.post.findMany(,
  },
});
```

### `hasSome`

At least one value exists in the list.

#### Examples

The following query returns all `Post` records where the `tags` list includes `"databases"` _or_ `"typescript"`:

```ts
const posts = await prisma.post.findMany(,
  },
});
```

### `isEmpty`

The list is empty.

#### Examples

The following query returns all `Post` records that have no tags:

```ts
const posts = await prisma.post.findMany(,
  },
});
```

### `isSet`

Filter lists to include only results that have been set (either set to a value, or explicitly set to `null`). Setting this filter to `true` will exclude undefined results that are not set at all.

#### Examples

The following query returns all `Post` records where the `tags` have been set to either `null` or a value:

```ts
const posts = await prisma.post.findMany(,
  },
});
```

### `equals`

The list matches the given value exactly.

#### Examples

The following query returns all `Post` records where the `tags` list includes `"databases"` and `"typescript"` only:

```ts
const posts = await prisma.post.findMany(,
  },
});
```

## Composite type methods

Composite type methods allow you to create, update and delete [composite types](/orm/prisma-client/special-fields-and-types/composite-types).

### `set`

Use `set` to overwrite the value of a composite type.

#### Remarks

- The `set` keyword is optional - you can set the value directly:
  ```ts
  photos: [
    ,
    ,
  ];
  ```

#### Examples

##### Set the `shippingAddress` composite type within a new `order`

```ts
const order = await prisma.order.create( },
    color: 'Red',
    size: 'Large',
    // Composite type
    shippingAddress: ,
    },
  },
});
```

##### Set an optional composite type to `null`

```ts
const order = await prisma.order.create(,
  },
});
```

### `unset`

Use `unset` to unset the value of a composite type. Unlike `set: null`, this removes the field entirely from the MongoDB document.

#### Examples

##### Remove the `billingAddress` from an `order`

```ts
const order = await prisma.order.update(,
  data: ,
  },
});
```

### `update`

Use `update` to update fields within a required composite type.

#### Remarks

The `update` method cannot be used on optional types. Instead, use [upsert](#upsert-2)

#### Examples

##### Update the zip field of a `shippingAddress` composite type

```ts
const order = await prisma.order.update(,
  data: ,
    },
  },
});
```

### `upsert`

Use `upsert` to update an existing optional composite type if it exists, and otherwise set the composite type.

#### Remarks

The `upsert` method cannot be used on required types. Instead, use [update](#update-2)

#### Examples

##### Create a new `billingAddress` if it doesn't exist, and otherwise update it

```ts
const order = await prisma.order.update(,
  data: ,
        update: ,
      },
    },
  },
});
```

### `push`

Use `push` to push values to the end of a list of composite types.

#### Examples

##### Add a new photo to the `photos` list

```ts
const product = prisma.product.update(,
  data: ],
    },
  },
});
```

## Composite type filters

Composite type filters allow you to filter the contents of [composite types](/orm/prisma-client/special-fields-and-types/composite-types).

### `equals`

Use `equals` to filter results by matching a composite type or a list of composite types. Requires all required fields of the composite type to match.

#### Remarks

When matching optional fields, you need to distinguish between undefined (missing) fields of the document, and fields that have been explicitly set to `null`:

- If you omit an optional field, it will match undefined fields, but not fields that have been set to `null`
- If you filter for `null` values of an optional field with `equals: `, then it will match only documents where the field has been set to `null`, and not undefined fields

The ordering of fields and lists matters when using `equals`:

- For fields, `` and `` are not considered equal
- For lists, `[ ,  ]` and `[ ,  ]` are not considered equal

#### Examples

##### Find orders that exactly match the given `shippingAddress`

```ts
const orders = await prisma.order.findMany(,
    },
  },
});
```

##### Find products with photos that match all of a list of `url`s

```ts
const product = prisma.product.findMany(, ],
    },
  },
});
```

### `is`

Use `is` to filter results by matching specific fields within composite types.

#### Examples

##### Find orders with a `shippingAddress` that matches the given street name

```ts
const orders = await prisma.order.findMany(,
    },
  },
});
```

### `isNot`

Use `isNot` to filter results for composite type fields that do not match.

#### Examples

##### Find orders with a `shippingAddress` that does not match the given zip code

```ts
const orders = await prisma.order.findMany(,
    },
  },
});
```

### `isEmpty`

Use `isEmpty` to filter results for an empty list of composite types.

#### Examples

##### Find products with no photos

```ts
const product = prisma.product.findMany(,
  },
});
```

### `every`

Use `every` to filter for lists of composite types where every item in the list matches the condition

#### Examples

##### Find the first product where every photo has a `height` of `200`

```ts
const product = await prisma.product.findFirst(
    }
  },
})
```

### `some`

Use `some` to filter for lists of composite types where one or more items in the list match the condition.

#### Examples

##### Find the first product where one or more photos have a `url` of `2.jpg`

```ts
const product = await prisma.product.findFirst(
    }
  },
})
```

### `none`

Use `none` to filter for lists of composite types where no items in the list match the condition.

#### Examples

##### Find the first product where no photos have a `url` of `2.jpg`

```ts
const product = await prisma.product.findFirst(
    }
  },
})
```

## Atomic number operations

Atomic operations on update is available for number field types (`Float` and `Int`). This feature allows you to update a field based on its **current** value (such as _subtracting_ or _dividing_) without risking a race condition.

<details>

<summary>Overview: Race conditions</summary>

A race conditions occurs when two or more operations must be done in sequence in order to complete a task. In the following example, two clients try to increase the same field (`postCount`) by one:

| Client   | Operation           | Value  |
| :------- | :------------------ | :----- |
| Client 1 | **Get** field value | `21`   |
| Client 2 | **Get** field value | `21`   |
| Client 2 | **Set** field value | `22`   |
| Client 1 | **Set** field value | `22` ✘ |

The value _should_ be `23`, but the two clients did not read and write to the `postCount` field in sequence. Atomic operations on update combine read and write into a single operation, which prevents a race condition:

| Client   | Operation                   | Value              |
| :------- | :-------------------------- | :----------------- |
| Client 1 | **Get and set** field value | `21` &rarr; `22`   |
| Client 2 | **Get and set** field value | `22` &rarr; `23` ✔ |

</details>

### Operators

| Option      | Description                                                   |
| :---------- | :------------------------------------------------------------ |
| `increment` | Adds `n` to the current value.                                |
| `decrement` | Subtacts `n` from the current value.                          |
| `multiply`  | Multiplies the current value by `n`.                          |
| `divide`    | Divides the current value by `n`.                             |
| `set`       | Sets the current field value. Identical to ``. |

### Remarks

- You can only perform **one** atomic update per field, per query.
- If a field is `null`, it will not be updated by `increment`, `decrement`, `multiply`, or `divide`.

### Examples

#### Increment all `view` and `likes` fields of all `Post` records by `1`

```ts
const updatePosts = await prisma.post.updateMany(,
    likes: ,
  },
});
```

#### Set all `views` fields of all `Post` records to `0`

```ts
const updatePosts = await prisma.post.updateMany(,
  },
});
```

Can also be written as:

```ts
const updatePosts = await prisma.post.updateMany(,
});
```

## `Json` filters

For use cases and advanced examples, see: [Working with `Json` fields](/orm/prisma-client/special-fields-and-types/working-with-json-fields).

The examples in this section assumes that the value of the `pet` field is:

```json
,
      
    ]
  },
  "fostered": ,
  "owned": 
}
```

### Remarks

- The implementation of `Json` filtering [differs between database connectors](/orm/prisma-client/special-fields-and-types/working-with-json-fields)
- Filtering is case sensitive in PostgreSQL and does not yet support `mode`

### `path`

`path` represents the location of a specific key. The following query returns all users where the nested `favourites` > `dogBreed` key equals `"Rottweiler"`.

The following query returns all users where the nested `owned` > `cats` array contains `"Elliott"`.

The following query returns all users where the nested `favorites` > `treats` array contains an object where the `name` value is `"Dreamies"`:

```ts
const getUsers = await prisma.user.findMany(,
  },
});
```

### `string_contains`

The following query returns all users where the nested `favorites` > `catBreed` key value contains `"Van"`:

### `string_starts_with`

The following query returns all users where the nested `favorites` > `catBreed` key value starts with `"Turkish"`:

### `string_ends_with`

The following query returns all users where the nested `favorites` \> `catBreed` key value ends with `"Van"`:

### `mode`

Specify whether the the string filtering should be case sensitive (default) or case insensitive.

The following query returns all users where the nested `favorites` > `catBreed` key value contains `"Van"` or `"van"`:

### `array_contains`

The following query returns all users where the `sanctuaries` array contains the value `"RSPCA"`:

The following query returns all users where the `sanctuaries` array contains _all_ the values in the given array:

### `array_starts_with`

The following query returns all users where the `sanctuaries` array starts with the value `"RSPCA"`:

### `array_ends_with`

The following query returns all users where the `sanctuaries` array ends with the value `"Alley Cat Allies"`:

## Client methods

**Note:** Client-level methods are prefixed by `$`.

### Remarks

- `$on` and `$use` client methods do not exist on extended client instances which are extended using [`$extends`](#extends)

### `$disconnect()`

The `$disconnect()` method closes the database connections that were established when `$connect` was called and stops the process that was running Prisma ORM's query engine. See [Connection management](/orm/prisma-client/setup-and-configuration/databases-connections/connection-management) for an overview of `$connect()` and `$disconnect()`.

#### Remarks

- `$disconnect()` returns a `Promise`, so you should call it inside an `async` function with the `await` keyword.

### `$connect()`

The `$connect()` method establishes a physical connection to the database via Prisma ORM's query engine. See [Connection management](/orm/prisma-client/setup-and-configuration/databases-connections/connection-management) for an overview of `$connect()` and `$disconnect()`.

#### Remarks

- `$connect()` returns a `Promise`, so you should call it inside an `async` function with the `await` keyword.

### `$on()`

The `$on()` method allows you to subscribe to [logging events](#log) or the [exit hook](/orm/prisma-client/setup-and-configuration/databases-connections/connection-management#exit-hooks).

### `$use()`

The `$use()` method adds [middleware](/orm/prisma-client/client-extensions/middleware) :

```ts
prisma.$use(async (params, next) => );
```

#### `next`

`next` represents the "next level" in the middleware stack, which could be the next middleware or the Prisma Query, depending on [where in the stack you are](/orm/prisma-client/client-extensions/middleware#running-order-and-the-middleware-stack).

#### `params`

`params` is an object with information to use in your middleware.

| Parameter          | Description                                                                                    |
| :----------------- | :--------------------------------------------------------------------------------------------- |
| `action`           | The query type - for example, `create` or `findMany`.                                          |
| `args`             | Arguments that were passed into the query - for example, `where`, `data`, or `orderBy`         |
| `dataPath`         | Populated if you use the [fluent API](/orm/prisma-client/queries/relation-queries#fluent-api). |
| `model`            | The model type - for example, `Post` or `User`.                                                |
| `runInTransaction` | Returns `true` if the query ran in the context of a [transaction](#transaction).               |

:::tip

If you need the `model` property as a string, use: `String(params.model)`

:::

Example parameter values:

```js
 },
  dataPath: [ 'select', 'author', 'select', 'posts' ],
  runInTransaction: false,
  action: 'findMany',
  model: 'Post'
}
```

#### Examples

See [middleware examples](/orm/prisma-client/client-extensions/middleware#samples).

### `$queryRawTyped`

See: [Using Raw SQL (`$queryRawTyped`)](/orm/prisma-client/using-raw-sql/typedsql).

### `$queryRaw`

See: [Using Raw SQL (`$queryRaw`)](/orm/prisma-client/using-raw-sql/raw-queries#queryraw).

### `$queryRawUnsafe()`

See: [Using Raw SQL (`$queryRawUnsafe()`)](/orm/prisma-client/using-raw-sql/raw-queries#queryrawunsafe).

### `$executeRaw`

See: [Using Raw SQL (`$executeRaw`)](/orm/prisma-client/using-raw-sql/raw-queries#executeraw).

### `$executeRawUnsafe()`

See: [Using Raw SQL (`$executeRawUnsafe()`)](/orm/prisma-client/using-raw-sql/raw-queries#executerawunsafe).

### `$runCommandRaw()`

See: [Using Raw SQL (`$runCommandRaw()`)](/orm/prisma-client/using-raw-sql/raw-queries#runcommandraw).

### `$transaction()`

See: [Transactions](/orm/prisma-client/queries/transactions).

### `$metrics`

Prisma Client metrics give you a detailed insight into how Prisma Client interacts with your database. You can use this insight to help diagnose performance issues with your application. Learn more: [Metrics](/orm/prisma-client/observability-and-logging/metrics).

Prisma Client metrics has the following methods:

- `$metrics.json()`: [Retrieves Prisma Client metrics in JSON format](/orm/prisma-client/observability-and-logging/metrics#retrieve-metrics-in-json-format).
- `$metrics.prometheus()`: [Retrieves Prisma Client metrics in Prometheus format](/orm/prisma-client/observability-and-logging/metrics#retrieve-metrics-in-prometheus-format).

### `$extends`

With `$extends`, you can create and use Prisma Client extensions to add functionality to Prisma Client in the following ways:

- `model`: add custom methods to your models
- `client`: add custom methods to your client
- `query`: create custom Prisma Client queries
- `result`: add custom fields to your query results

Learn more: [Prisma Client extensions](/orm/prisma-client/client-extensions).

## Utility types

Utility types are helper functions and types that live on the `Prisma` namespace. They are useful for keeping your application type safe.

### `Prisma.validator`

The `validator` helps you create re-usable query parameters based on your schema models while making sure that the objects you create are valid. See also: [Using `Prisma.validator`](/orm/prisma-client/type-safety/prisma-validator)

There are two ways you can use the `validator`:

#### Using generated Prisma Client types

Using types provides a type-level approach to validate data:

```ts
Prisma.validator<GeneratedType>();
```

#### Using a "selector"

When using the selector pattern, you use an existing Prisma Client instance to create a validator. This pattern allows you to select the model, operation, and query option to validate against.

You can also use an instance of Prisma Client that has been extended using a [Prisma Client extension](/orm/prisma-client/client-extensions).

```ts
Prisma.validator(PrismaClientInstance, '<model>', '<operation>', '<query option>')();
```

#### Examples

The following example shows how you can extract and validate the input for the `create` operation you can reuse within your app:

```ts

const validateUserAndPostInput = (name, email, postTitle) => ,
    },
  });
};
```

Here is an alternative syntax for the same operation:

```ts

const validateUserAndPostInput = (name, email, postTitle) => ,
    },
  });
};
```

## Compare columns in the same table

You can compare columns in the same table directly, for non-unique filters.

This feature was moved to general availability in version 5.0.0 and was available via the `fieldReference` Preview feature from Prisma ORM versions 4.3.0 to 4.16.2.

To compare columns in the same table, use the `<model>.fields` property. In the following example, the query returns all records where the value in the `prisma.product.quantity` field is less than or equal to the value in the `prisma.product.warnQuantity` field.

```ts
prisma.product.findMany( },
});
```

### Considerations

#### Fields must be of the same type

You can only make comparisons on fields of the same type. For example, the following causes an error:

```ts
await prisma.order.findMany(,
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Type error: id is a string, while amountDue is an integer
  },
});
```

#### Fields must be in the same model

You can only make comparisons with the `fields` property on fields in the same model. The following example does not work:

```ts
await prisma.order.findMany(,
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Type error: name is a field on the User model, not Order
  },
});
```

However, you can compare fields in separate models with [standard queries](#model-queries).

#### In `groupBy` model queries, put your referenced fields in the `by` argument

If you use the [groupBy](#groupby) model query with the `having` option, then you must put your referenced fields in the `by` argument.

The following example works:

```ts
prisma.user.groupBy( },
});
```

The following example does not work, because `name` is not in the `by` argument:

```ts
prisma.user.groupBy( },
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // name is not in the 'by' argument
});
```

#### Search for fields in scalar lists

If your data source supports scalar lists (for example in PostgreSQL), then you can search for all records where a specific field is in a list of fields. To do so, reference the scalar list with the [`in`](#in) and [`notIn`](#notin) filters. For example:

```ts
await prisma.user.findMany(,
  },
});
```

## Filter on non-unique fields with `UserWhereUniqueInput`

From version 5.0.0, the generated type `UserWhereUniqueInput` on [`where`](#where) exposes all fields on the model, not just unique fields.
This was available under the [`extendedWhereUnique` Preview flag](/orm/reference/preview-features/client-preview-features#preview-features-promoted-to-general-availability) between versions 4.5.0 to 4.16.2

You must specify at least one unique field in your `where` statement [outside of boolean operators](#boolean-operators-with-userwhereuniqueinput), and you can specify any number of additional unique and non-unique fields. You can use this to add filters to any operation that returns a single record. For example, you can use this feature for the following:

- [Optimistic concurrency control on updates](#optimistic-concurrency-control-on-updates)
- [Permission checks](#permission-checks)
- [Soft deletes](#soft-deletes)

From version 4.6.0, you can use this feature to filter on optional [one-to-one nested reads](/orm/prisma-client/queries/relation-queries#nested-reads).

### Optimistic concurrency control on updates

You can filter on non-unique fields to perform [optimistic concurrency control](/orm/prisma-client/queries/transactions#optimistic-concurrency-control) on `update` operations.

To perform optimistic concurrency control, we recommend that you use a `version` field to check whether the data in a record or related record has changed while your code executes. Before version 4.5.0, you could not evaluate the `version` field in an `update` operation, because the field is non-unique. From version 4.5.0, you can evaluate the `version` field.

In the following example, `updateOne` and `updateTwo` first read the same record and then attempt to update it. The database only executes these updates if the value in `version` is the same as the value when it did the initial read. When the database executes the first of these updates (which might be `updateOne` or `updateTwo`, depending on timing), it increments the value in `version`. This means that the database does not execute the second update because the value in `version` has changed.

```prisma
model User 
```

```ts
function updateOne() );

  await prisma.user.update(,
    data:  },
  });
}

function updateTwo() );

  await prisma.user.update(,
    data:  },
  });
}

function main() 
```

### Permission checks

You can filter on non-unique fields to check permissions during an update.

In the following example, a user wants to update a post title. The `where` statement checks the value in `authorId` to confirm that the user is the author of the post. The application only updates the post title if the user is the post author.

```ts
await prisma.post.update(,
  data: ,
});
```

### Soft deletes

You can filter on non-unique fields to handle soft deletes.

In the following example, we do not want to return a post if it is soft-deleted. The operation only returns the post if the value in `isDeleted` is `false`.

```ts
prisma.Post.findUnique( });
```

### `UserWhereUniqueInput` considerations

#### Boolean operators with `UserWhereUniqueInput`

With `UserWhereUniqueInput`, you must specify at least one unique field outside of the boolean operators `AND`, `OR`, `NOT`. You can still use these boolean operators in conjunction with any other unique fields or non-unique fields in your filter.

In the following example, we test `id`, a unique field, in conjunction with `email`. This is valid.

```ts
await prisma.user.update(, ] },
        // ^^^ Valid: the expression specifies a unique field (`id`) outside of any boolean operators
  data: 
})

// SQL equivalent:
// WHERE id = 1 AND (email = "bob@prisma.io" OR email = "alice@prisma.io")
```

The following example is not valid, because there is no unique field outside of any boolean operators:

```ts
await prisma.user.update(, ] },
        // ^^^ Invalid: the expressions does not contain a unique field outside of boolean operators
  data: 
})
```

#### One-to-one relations

From version 4.5.0, you can filter on non-unique fields in the following operations on [one-to-one relations](/orm/prisma-schema/data-model/relations/one-to-one-relations):

- Nested update
- Nested upsert
- Nested disconnect
- Nested delete

Prisma Client automatically uses a unique filter to select the appropriate related record. As a result, you do not need to specify a unique filter in your `where` statement with a `WhereUniqueInput` [generated type](#generated-types-for-where). Instead, the `where` statement has a `WhereInput` generated type. You can use this to filter without the restrictions of `WhereUniqueInput`.

##### Nested update example

```ts
await prisma.user.update(,
  data: 
      // From Prisma version 4.5.0, you can also do the following:
      update: , data:  } }
    }
  }
})
```

##### Nested upsert example

```ts
await prisma.user.update(,
  data:  // new argument from Prisma 4.5.0
        create: ,
        update: ,
      }
    }
  }
})
```

##### Nested disconnect example

```ts
await prisma.user.update(,
  data: 
    }
  }
})
```

##### Nested delete example

```ts
await prisma.user.update(,
  data: 
    }
  }
})
```

## `PrismaPromise` behavior

All Prisma Client queries return an instance of `PrismaPromise`. This is a ["thenable"](https://masteringjs.io/tutorials/fundamentals/thenable), meaning a `PrismaPromise` only executes when you call `await` or `.then()` or `.catch()`. This behavior is different from a regular JavaScript [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), which starts executing immediately.

For example:

```ts
const findPostOperation = prisma.post.findMany(); // Query not yet executed

findPostOperation.then(); // Prisma Client now executes the query
// or
await findPostOperation; // Prisma Client now executes the query
```

When using the [`$transaction` API](/orm/prisma-client/queries/transactions#the-transaction-api), this behavior makes it possible for Prisma Client to pass all the queries on to the query engine as a single transaction.