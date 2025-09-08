---
title: 'Excluding fields'
metaTitle: 'Excluding fields'
metaDescription: 'This page explains how to exclude sensitive fields from Prisma Client'
---

By default Prisma Client returns all fields from a model. You can use [`select`](/orm/prisma-client/queries/select-fields) to narrow the result set, but that can be unwieldy if you have a large model and you only want to exclude a small number of fields.

:::info

As of Prisma ORM 6.2.0, excluding fields is supported via the `omit` option that you can pass to Prisma Client. From versions 5.16.0 through 6.1.0, you must use the `omitApi` Preview feature to access this option.

:::

## Excluding a field globally using `omit`

The following is a type-safe way to exclude a field _globally_ (i.e. for _all_ queries against a given model):

## Excluding a field locally using `omit`

The following is a type-safe way to exclude a field _locally_ (i.e. for a _single_ query):

## How to omit multiple fields

Omitting multiple fields works the same as selecting multiple fields: add multiple key-value pairs to the omit option.
Using the same schema as before, you could omit password and email with the following:

```tsx
const prisma = new PrismaClient()

// password and email are excluded
const user = await prisma.user.findUnique(,
  where: ,
})
```

Multiple fields can be omitted locally and globally.

## How to select a previously omitted field

If you [omit a field globally](#excluding-a-field-globally-using-omit), you can "override" by either selecting the field specifically or by setting `omit` to `false` in a query.

## Ensuring excluded fields don't appear in TypeScript types

While the `omit` option correctly removes fields from the runtime result, TypeScript sometimes does not reflect these omissions in the inferred types, especially when the omit configuration is not strictly typed.

If you define your omit config in a separate variable and do not use `as const`, TypeScript infers the type as ``, which is too broad for Prisma to know which fields are truly omitted. This results in the omitted fields still appearing in the type system, even though they are not present at runtime.

The recommended fix is to use `as const` to ensure the type is exact:

```tsx
const omitConfig = ,
  user: ,
} as const;

const prisma = new PrismaClient();
```

This ensures TypeScript knows exactly which fields are omitted and will reflect that in the types.

## When to use `omit` globally or locally

It's important to understand when to omit a field globally or locally:

- If you are omitting a field in order to prevent it from accidentally being included in a query, it's best to omit it _globally_. For example: Globally omitting the `password` field from a `User` model so that sensitive information doesn't accidentally get exposed.
- If you are omitting a field because it's not needed in a query, it's best to omit it _locally_.

Local omit (when an `omit` option is provided in a query) only applies to the query it is defined in, while a global omit applies to every query made with the same Prisma Client instance, [unless a specific select is used or the omit is overridden](#how-to-select-a-previously-omitted-field).