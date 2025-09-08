---
title: 'Working with Json fields'
metaTitle: 'Working with Json fields (Concepts)'
metaDescription: 'How to read, write, and filter by Json fields.'
tocDepth: 3
---

Use the [`Json`](/orm/reference/prisma-schema-reference#json) Prisma ORM field type to read, write, and perform basic filtering on JSON types in the underlying database. In the following example, the `User` model has an optional `Json` field named `extendedPetsData`:

```prisma highlight=6;normal
model User 
```

Example field value:

```json
,
  "pet2": 
}
```

The `Json` field supports a few additional types, such as `string` and `boolean`. These additional types exist to match the types supported by [`JSON.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse):

```ts

  | string
  | number
  | boolean
  | null
  | JsonObject
  | JsonArray
```

## Use cases for JSON fields

Reasons to store data as JSON rather than representing data as related models include:

- You need to store data that does not have a consistent structure
- You are importing data from another system and do not want to map that data to Prisma models

## Reading a `Json` field

You can use the `Prisma.JsonArray` and `Prisma.JsonObject` utility classes to work with the contents of a `Json` field:

```ts
const  = require('@prisma/client')

const user = await prisma.user.findFirst(,
})

// Example extendedPetsData data:
// [, ]

if (
  user?.extendedPetsData &&
  typeof user?.extendedPetsData === 'object' &&
  Array.isArray(user?.extendedPetsData)
) 
```

See also: [Advanced example: Update a nested JSON key value](#advanced-example-update-a-nested-json-key-value)

## Writing to a `Json` field

The following example writes a JSON object to the `extendedPetsData` field:

```ts
var json = [
  ,
  ,
] as Prisma.JsonArray

const createUser = await prisma.user.create(,
})
```

> **Note**: JavaScript objects (for example, ``) are automatically converted to JSON.

See also: [Advanced example: Update a nested JSON key value](#advanced-example-update-a-nested-json-key-value)

## Filter on a `Json` field (simple)

You can filter rows of `Json` type.

### Filter on exact field value

The following query returns all users where the value of `extendedPetsData` matches the `json` variable exactly:

```ts
var json = [, ]

const getUsers = await prisma.user.findMany(,
  },
})
```

The following query returns all users where the value of `extendedPetsData` does **not** match the `json` variable exactly:

```ts
var json = [, ]

const getUsers = await prisma.user.findMany(,
  },
})
```

## Filter on a `Json` field (advanced)

You can also filter rows by the data inside a `Json` field. We call this **advanced `Json` filtering**. This functionality is supported by [PostgreSQL](/orm/overview/databases/postgresql) and [MySQL](/orm/overview/databases/mysql) only with [different syntaxes for the `path` option](#path-syntax-depending-on-database).

### `path` syntax depending on database

The filters below use a `path` option to select specific parts of the `Json` value to filter on. The implementation of that filtering differs between connectors:

- The [MySQL connector](/orm/overview/databases/mysql) uses [MySQL's implementation of JSON path](https://dev.mysql.com/doc/refman/8.0/en/json.html#json-path-syntax)
- The [PostgreSQL connector](/orm/overview/databases/postgresql) uses the custom JSON functions and operators [supported in version 12 _and earlier_](https://www.postgresql.org/docs/11/functions-json.html)

For example, the following is a valid MySQL `path` value:

```
$petFeatures.petName
```

The following is a valid PostgreSQL `path` value:

```
["petFeatures", "petName"]
```

### Filter on object property

You can filter on a specific property inside a block of JSON. In the following examples, the value of `extendedPetsData` is a one-dimensional, unnested JSON object:

```json highlight=11;normal

```

The following query returns all users where the value of `petName` is `"Claudine"`:

The following query returns all users where the value of `petType` _contains_ `"cat"`:

The following string filters are available:

- [`string_contains`](/orm/reference/prisma-client-reference#string_contains)
- [`string_starts_with`](/orm/reference/prisma-client-reference#string_starts_with)
- [`string_ends_with`](/orm/reference/prisma-client-reference#string_ends_with) .

To use case insensitive filter with these, you can use the [`mode`](/orm/reference/prisma-client-reference#mode) option:

### Filter on nested object property

You can filter on nested JSON properties. In the following examples, the value of `extendedPetsData` is a JSON object with several levels of nesting.

```json
,
  "pet2": 
  }
}
```

The following query returns all users where `"pet2"` &rarr; `"petName"` is `"Sunny"`:

The following query returns all users where:

- `"pet2"` &rarr; `"petName"` is `"Sunny"`
- `"pet2"` &rarr; `"features"` &rarr; `"furColor"` contains `"black"`

### Filtering on an array value

You can filter on the presence of a specific value in a scalar array (strings, integers). In the following example, the value of `extendedPetsData` is an array of strings:

```json
["Claudine", "Sunny"]
```

The following query returns all users with a pet named `"Claudine"`:

The following array filters are available:

- [`array_contains`](/orm/reference/prisma-client-reference#array_contains)
- [`array_starts_with`](/orm/reference/prisma-client-reference#array_starts_with)
- [`array_ends_with`](/orm/reference/prisma-client-reference#array_ends_with)

### Filtering on nested array value

You can filter on the presence of a specific value in a scalar array (strings, integers). In the following examples, the value of `extendedPetsData` includes nested scalar arrays of names:

```json
,
  "dogs": 
}
```

#### Scalar value arrays

The following query returns all users that foster a cat named `"Fido"`:

The following query returns all users that foster cats named `"Fido"` _and_ `"Bob"`:

#### JSON object arrays

- If you are using PostgreSQL, you must pass in an array of objects to match, even if that array only contains one object:

  ```json5
  []
  // PostgreSQL
  ```

  If you are using MySQL, you must pass in a single object to match:

  ```json5
  
  // MySQL
  ```

- If your filter array contains multiple objects, PostgreSQL will only return results if _all_ objects are present - not if at least one object is present.

- You must set `array_contains` to a JSON object, not a string. If you use a string, Prisma Client escapes the quotation marks and the query will not return results. For example:

  ```ts
  array_contains: '[]'
  ```

  is sent to the database as:

  ```
  []
  ```

### Targeting an array element by index

You can filter on the value of an element in a specific position.

```json

```

### Filtering on object key value inside array

Depending on your provider, you can filter on the key value of an object inside an array.

In the following example, the value of `extendedPetsData` is an array of objects with a nested `insurances` array, which contains two objects:

```json
[
  ,
      
    ]
  },
  ,
  ,
  
]
```

The following query returns all users where at least one pet is a moose:

```ts
const getUsers = await prisma.user.findMany(,
  },
})
```

- `$[*]` is the root array of pet objects
- `petType` matches the `petType` key in any pet object

The following query returns all users where at least one pet has an expired insurance:

```ts
const getUsers = await prisma.user.findMany(,
  },
})
```

- `$[*]` is the root array of pet objects
- `insurances[*]` matches any `insurances` array inside any pet object
- `status` matches any `status` key in any insurance object

## Advanced example: Update a nested JSON key value

The following example assumes that the value of `extendedPetsData` is some variation of the following:

```json
,
    
  ]
}
```

The following example:

1. Gets all users
1. Change the `"status"` of each insurance object to `"expired"`
1. Get all users that have an expired insurance where the ID is `92`

## Using `null` Values

There are two types of `null` values possible for a `JSON` field in an SQL database.

- Database `NULL`: The value in the database is a `NULL`.
- JSON `null`: The value in the database contains a JSON value that is `null`.

To differentiate between these possibilities, we've introduced three _null enums_ you can use:

- `JsonNull`: Represents the `null` value in JSON.
- `DbNull`: Represents the `NULL` value in the database.
- `AnyNull`: Represents both `null` JSON values and `NULL` database values. (Only when filtering)

For example:

```prisma
model Log 
```

Here is an example of using `AnyNull`:

```ts highlight=7;normal

prisma.log.findMany(,
    },
  },
})
```

### Inserting `null` Values

This also applies to `create`, `update` and `upsert`. To insert a `null` value
into a `Json` field, you would write:

```ts highlight=5;normal

prisma.log.create(,
})
```

And to insert a database `NULL` into a `Json` field, you would write:

```ts highlight=5;normal

prisma.log.create(,
})
```

### Filtering by `null` Values

To filter by `JsonNull` or `DbNull`, you would write:

```ts highlight=6;normal

prisma.log.findMany(,
  },
})
```

## Typed `Json` Fields

Prisma's `Json` fields are untyped by default. To add strong typing, you can use the external package [prisma-json-types-generator](https://www.npmjs.com/package/prisma-json-types-generator).

1.  First, install the package and add the generator to your `schema.prisma`:

    ```bash
    npm install -D prisma-json-types-generator
    ```

    ```prisma file=schema.prisma
    generator client 

    generator json 
    ```

2.  Next, link a field to a TypeScript type using an [AST comment](/orm/prisma-schema/overview#comments).

    ```prisma highlight=4;normal file=schema.prisma showLineNumbers
    model Log 
    ```

3.  Then, define `LogMetaType` in a type declaration file (e.g., `types.ts`) that is included in your `tsconfig.json`.

    ```ts file=types.ts showLineNumbers
    declare global ;
      }
    }

    // This file must be a module.
    export ;
    ```

Now, `Log.meta` will be strongly typed as ``.

### Typing `String` Fields and Advanced Features

You can also apply these techniques to `String` fields. This is especially useful for creating string-based enums directly in your schema when your database does not support enum types.

```prisma
model Post 
```

This results in `post.status` being strongly typed as `'draft' | 'published'` and `post.meta` as `LogMetaType[]`.

For a complete guide on configuration, monorepo setup, and other advanced features, please refer to the [official `prisma-json-types-generator` documentation](https://github.com/arthurfiorette/prisma-json-types-generator#readme).

## `Json` FAQs

### Can you select a subset of JSON key/values to return?

No - it is not yet possible to [select which JSON elements to return](https://github.com/prisma/prisma/issues/2431). Prisma Client returns the entire JSON object.

### Can you filter on the presence of a specific key?

No - it is not yet possible to filter on the presence of a specific key.

### Is case insensitive filtering supported?

No - [case insensitive filtering](https://github.com/prisma/prisma/issues/7390) is not yet supported.

### Can you sort an object property within a JSON value?

No, [sorting object properties within a JSON value](https://github.com/prisma/prisma/issues/10346) (order-by-prop) is not currently supported.

### How to set a default value for JSON fields?

When you want to set a `@default` value the `Json` type, you need to enclose it with double-quotes inside the `@default` attribute (and potentially escape any "inner" double-quotes using a backslash), for example:

```prisma
model User ")
}
```