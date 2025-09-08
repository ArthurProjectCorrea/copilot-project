---
title: 'Composite types'
metaTitle: 'Composite types'
metaDescription: 'Composite types'
tocDepth: 3
---

## Example schema

We’ll use this schema for the examples that follow:

```prisma file=schema.prisma showLineNumbers
generator client

datasource db

model Product

model Order

enum Color

enum Size

type Photo

type Address
```

In this schema, the `Product` model has a `Photo[]` composite type, and the `Order` model has two composite `Address` types. The `shippingAddress` is required, but the `billingAddress` is optional.

## Considerations when using composite types

There are currently some limitations when using composite types in Prisma Client:

- [`findUnique()`](/orm/reference/prisma-client-reference#findunique) can't filter on composite types
- [`aggregate`](/orm/prisma-client/queries/aggregation-grouping-summarizing#aggregate), [`groupBy()`](/orm/prisma-client/queries/aggregation-grouping-summarizing#group-by), [`count`](/orm/prisma-client/queries/aggregation-grouping-summarizing#count) don’t support composite operations

## Default values for required fields on composite types

From version 4.0.0, if you carry out a database read on a composite type when all of the following conditions are true, then Prisma Client inserts the default value into the result.

Conditions:

- A field on the composite type is [required](/orm/prisma-schema/data-model/models#optional-and-mandatory-fields), and
- this field has a [default value](/orm/prisma-schema/data-model/models#defining-a-default-value), and
- this field is not present in the returned document or documents.

Note:

- This is the same behavior as with [model fields](/orm/reference/prisma-schema-reference#model-field-scalar-types).
- On read operations, Prisma Client inserts the default value into the result, but does not insert the default value into the database.

In our example schema, suppose that you add a required field to `photo`. This field, `bitDepth`, has a default value:

```prisma file=schema.prisma highlight=4;add
...
type Photo

...
```

Suppose that you then run `npx prisma db push` to [update your database](/orm/reference/prisma-cli-reference#db-push) and regenerate your Prisma Client with `npx prisma generate`. Then, you run the following application code:

```ts
console.dir(await prisma.product.findMany());
```

The `bitDepth` field has no content because you have only just added this field, so the query returns the default value of `8`.

** Earlier versions **

Before version 4.0.0, Prisma ORM threw a P2032 error as follows:

```
Error converting field "bitDepth" of expected non-nullable
type "int", found incompatible value of "null".
```

## Finding records that contain composite types with `find` and `findMany`

Records can be filtered by a composite type within the `where` operation.

The following section describes the operations available for filtering by a single type or multiple types, and gives examples of each.

### Filtering for one composite type

Use the `is`, `equals`, `isNot` and `isSet` operations to change a single composite type:

- `is`: Filter results by matching composite types. Requires one or more fields to be present _(e.g. Filter orders by the street name on the shipping address)_
- `equals`: Filter results by matching composite types. Requires all fields to be present. _(e.g. Filter orders by the full shipping address)_
- `isNot`: Filter results by non-matching composite types
- `isSet` : Filter optional fields to include only results that have been set (either set to a value, or explicitly set to `null`). Setting this filter to `true` will exclude `undefined` results that are not set at all.

For example, use `is` to filter for orders with a street name of `'555 Candy Cane Lane'`:

```ts
const orders = await prisma.order.findMany(,
    },
  },
})
```

Use `equals` to filter for orders which match on all fields in the shipping address:

```ts
const orders = await prisma.order.findMany(,
    },
  },
})
```

You can also use a shorthand notation for this query, where you leave out the `equals`:

```ts
const orders = await prisma.order.findMany(,
  },
})
```

Use `isNot` to filter for orders that do not have a `zip` code of `'52337'`:

```ts
const orders = await prisma.order.findMany(,
    },
  },
})
```

Use `isSet` to filter for orders where the optional `billingAddress` has been set (either to a value or to `null`):

```ts
const orders = await prisma.order.findMany(,
  },
})
```

### Filtering for many composite types

Use the `equals`, `isEmpty`, `every`, `some` and `none` operations to filter for multiple composite types:

- `equals`: Checks exact equality of the list
- `isEmpty`: Checks if the list is empty
- `every`: Every item in the list must match the condition
- `some`: One or more of the items in the list must match the condition
- `none`: None of the items in the list can match the condition
- `isSet` : Filter optional fields to include only results that have been set (either set to a value, or explicitly set to `null`). Setting this filter to `true` will exclude `undefined` results that are not set at all.

For example, you can use `equals` to find products with a specific list of photos (all `url`, `height` and `width` fields must match):

```ts
const product = prisma.product.findMany(,
        ,
      ],
    },
  },
})
```

You can also use a shorthand notation for this query, where you leave out the `equals` and specify just the fields that you want to filter for:

```ts
const product = prisma.product.findMany(,
      ,
    ],
  },
})
```

Use `isEmpty` to filter for products with no photos:

```ts
const product = prisma.product.findMany(,
  },
})
```

Use `some` to filter for products where one or more photos has a `url` of `"2.jpg"`:

```ts
const product = prisma.product.findFirst(,
    },
  },
})
```

Use `none` to filter for products where no photos have a `url` of `"2.jpg"`:

```ts
const product = prisma.product.findFirst(,
    },
  },
})
```

## Creating records with composite types using `create` and `createMany`

Composite types can be created within a `create` or `createMany` method using the `set` operation. For example, you can use `set` within `create` to create an `Address` composite type inside an `Order`:

```ts
const order = await prisma.order.create( },
    color: 'Red',
    size: 'Large',
    // Composite type
    shippingAddress: ,
    },
  },
})
```

You can also use a shorthand notation where you leave out the `set` and specify just the fields that you want to create:

```ts
const order = await prisma.order.create( },
    color: 'Red',
    size: 'Large',
    // Composite type
    shippingAddress: ,
  },
})
```

For an optional type, like the `billingAddress`, you can also set the value to `null`:

```ts
const order = await prisma.order.create( },
    color: 'Red',
    size: 'Large',
    // Composite type
    shippingAddress: ,
    // Embedded optional type, set to null
    billingAddress: ,
  },
})
```

To model the case where an `product` contains a list of multiple `photos`, you can `set` multiple composite types at once:

```ts
const product = await prisma.product.create(,
        ,
      ],
    },
  },
})
```

You can also use a shorthand notation where you leave out the `set` and specify just the fields that you want to create:

```ts
const product = await prisma.product.create(,
      ,
    ],
  },
})
```

These operations also work within the `createMany` method. For example, you can create multiple `product`s which each contain a list of `photos`:

```ts
const product = await prisma.product.createMany(,
        ,
      ],
    },
    ,
        ,
        ,
      ],
    },
  ],
})
```

## Changing composite types within `update` and `updateMany`

Composite types can be set, updated or removed within an `update` or `updateMany` method. The following section describes the operations available for updating a single type or multiple types at once, and gives examples of each.

### Changing a single composite type

Use the `set`, `unset` `update` and `upsert` operations to change a single composite type:

- Use `set` to set a composite type, overriding any existing value
- Use `unset` to unset a composite type. Unlike `set: null`, `unset` removes the field entirely
- Use `update` to update a composite type
- Use `upsert` to `update` an existing composite type if it exists, and otherwise `set` the composite type

For example, use `update` to update a required `shippingAddress` with an `Address` composite type inside an `Order`:

```ts
const order = await prisma.order.update(,
  data: ,
    },
  },
})
```

For an optional embedded type, like the `billingAddress`, use `upsert` to create a new record if it does not exist, and update the record if it does:

```ts
const order = await prisma.order.update(,
  data: ,
        update: ,
      },
    },
  },
})
```

You can also use the `unset` operation to remove an optional embedded type. The following example uses `unset` to remove the `billingAddress` from an `Order`:

```ts
const order = await prisma.order.update(,
  data: ,
  },
})
```

You can use [filters](/orm/prisma-client/special-fields-and-types/composite-types#finding-records-that-contain-composite-types-with-find-and-findmany) within `updateMany` to update all records that match a composite type. The following example uses the `is` filter to match the street name from a shipping address on a list of orders:

```ts
const orders = await prisma.order.updateMany(,
    },
  },
  data: ,
    },
  },
})
```

### Changing multiple composite types

Use the `set`, `push`, `updateMany` and `deleteMany` operations to change a list of composite types:

- `set`: Set an embedded list of composite types, overriding any existing list
- `push`: Push values to the end of an embedded list of composite types
- `updateMany`: Update many composite types at once
- `deleteMany`: Delete many composite types at once

For example, use `push` to add a new photo to the `photos` list:

```ts
const product = prisma.product.update(,
  data: ],
    },
  },
})
```

Use `updateMany` to update photos with a `url` of `1.jpg` or `2.png`:

```ts
const product = prisma.product.update(,
  data: ,
        data: ,
      },
    },
  },
})
```

The following example uses `deleteMany` to delete all photos with a `height` of 100:

```ts
const product = prisma.product.update(,
  data: ,
      },
    },
  },
})
```

## Upserting composite types with `upsert`

To create or update a composite type, use the `upsert` method. You can use the same composite operations as the `create` and `update` methods above.

For example, use `upsert` to either create a new product or add a photo to an existing product:

```ts
const product = await prisma.product.upsert(,
  create: ,
      ,
    ],
  },
  update: ,
    },
  },
})
```

## Deleting records that contain composite types with `delete` and `deleteMany`

To remove records which embed a composite type, use the `delete` or `deleteMany` methods. This will also remove the embedded composite type.

For example, use `deleteMany` to delete all products with a `size` of `"Small"`. This will also delete any embedded `photos`.

```ts
const deleteProduct = await prisma.product.deleteMany(,
  },
})
```

You can also use [filters](/orm/prisma-client/special-fields-and-types/composite-types#finding-records-that-contain-composite-types-with-find-and-findmany) to delete records that match a composite type. The example below uses the `some` filter to delete products that contain a certain photo:

```ts
const product = await prisma.product.deleteMany(,
    },
  },
})
```

## Ordering composite types

You can use the `orderBy` operation to sort results in ascending or descending order.

For example, the following command finds all orders and orders them by the city name in the shipping address, in ascending order:

```ts
const orders = await prisma.order.findMany(,
  },
})
```

## Duplicate values in unique fields of composite types

Be careful when you carry out any of the following operations on a record with a composite type that has a unique constraint. In this situation, MongoDB does not enforce unique values inside a record.

- When you create the record
- When you add data to the record
- When you update data in the record

If your schema has a composite type with a `@@unique` constraint, MongoDB prevents you from storing the same value for the constrained value in two or more of the records that contain this composite type. However, MongoDB does does not prevent you from storing multiple copies of the same field value in a single record.

Note that you can [use Prisma ORM relations to work around this issue](#use-prisma-orm-relations-to-enforce-unique-values-in-a-record).

For example, in the following schema, `MailBox` has a composite type, `addresses`, which has a `@@unique` constraint on the `email` field.

```prisma
type Address

model MailBox
```

The following code creates a record with two identical values in `address`. MongoDB does not throw an error in this situation, and it stores `alice@prisma.io` in `addresses` twice.

```ts
await prisma.MailBox.createMany(,
          ,
        ],
      },
    },
  ],
})
```

Note: MongoDB throws an error if you try to store the same value in two separate records. In our example above, if you try to store the email address `alice@prisma.io` for the user Alice and for the user Bob, MongoDB does not store the data and throws an error.

### Use Prisma ORM relations to enforce unique values in a record

In the example above, MongoDB did not enforce the unique constraint on a nested address name. However, you can model your data differently to enforce unique values in a record. To do so, use Prisma ORM [relations](/orm/prisma-schema/data-model/relations) to turn the composite type into a collection. Set a relationship to this collection and place a unique constraint on the field that you want to be unique.

In the following example, MongoDB enforces unique values in a record. There is a relation between `Mailbox` and the `Address` model. Also, the `name` field in the `Address` model has a unique constraint.

```prisma
model Address

model Mailbox
```

```ts
await prisma.MailBox.create(, // Not unique
        , // Not unique
      ],
    },
  },
})
```

If you run the above code, MongoDB enforces the unique constraint. It does not allow your application to add two addresses with the name `alice@prisma.io`.
