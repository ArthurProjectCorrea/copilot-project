---
title: 'Select fields'
metaTitle: 'Select fields'
metaDescription: 'This page explains how to select only a subset of a model''s fields and/or include relations ("eager loading") in a Prisma Client query.'
tocDepth: 3
---

## Overview

By default, when a query returns records (as opposed to a count), the result includes:

- **All scalar fields** of a model (including enums)
- **No relations** defined on a model

As an example, consider this schema:

```prisma
model User 

model Post 

enum Role 
```

A query to the `User` model will include the `id`, `email`, `name` and `role` fields (because these are _scalar_ fields), but not the `posts` field (because that's a _relation_ field):

If you want to customize the result and have a different combination of fields returned, you can:

- Use [`select`](/orm/reference/prisma-client-reference#select) to return specific fields. You can also use a [nested `select`](/orm/prisma-client/queries/relation-queries#select-specific-fields-of-included-relations) by selecting relation fields.
- Use [`omit`](/orm/reference/prisma-client-reference#omit) to exclude specific fields from the result. `omit` can be seen as the "opposite" to `select`.
- Use [`include`](/orm/reference/prisma-client-reference#include) to additionally [include relations](/orm/prisma-client/queries/relation-queries#nested-reads).

In all cases, the query result will be statically typed, ensuring that you don't accidentally access any fields that you did not actually query from the database.

Selecting only the fields and relations that you require rather than relying on the default selection set can reduce the size of the response and improve query speed.

Since version [5.9.0](https://github.com/prisma/prisma/releases/tag/5.9.0), when doing a relation query with `include` or by using `select` on a relation field, you can also specify the `relationLoadStrategy` to decide whether you want to use a database-level join or perform multiple queries and merge the data on the application level. This feature is currently in [Preview](/orm/more/releases#preview), you can learn more about it [here](/orm/prisma-client/queries/relation-queries#relation-load-strategies-preview).

## Example schema

All following examples on this page are based on the following schema:

```prisma
model User 

model Post 

model Profile 

enum Role 
```

## Return the default fields

The following query returns the default fields (all scalar fields, no relations):

## Select specific fields

Use `select` to return a _subset_ of fields instead of _all_ fields. The following example returns the `email` and `name` fields only:

## Return nested objects by selecting relation fields

You can also return relations by nesting `select` multiple times on [relation fields](/orm/prisma-schema/data-model/relations#relation-fields).

The following query uses a nested `select` to select each user's `name` and the `title` of each related post:

The following query uses `select` within an `include`, and returns _all_ user fields and each post's `title` field:

You can nest your queries arbitrarily deep. The following query fetches:
- the `title` of a `Post`
- the `name` of the related `User`
- the `biography` of the related `Profile`

:::note

Be careful when deeply nesting relations because the underlying database query may become slow due it needing to access a lot of different tables. To ensure your queries always have optimal speed, consider adding a caching layer with [Prisma Accelerate](/accelerate) or use [Prisma Optimize](/optimize/) to get query insights and recommendations for performance optimizations.  

:::

For more information about querying relations, refer to the following documentation:

- [Include a relation (including all fields)](/orm/prisma-client/queries/relation-queries#include-all-fields-for-a-specific-relation)
- [Select specific relation fields](/orm/prisma-client/queries/relation-queries#select-specific-fields-of-included-relations)

## Omit specific fields

There may be situations when you want to return _most_ fields of a model, excluding only a _small_ subset. A common example for this is when you query a `User` but want to exclude the `password` field for security reasons.

In these cases, you can use `omit`, which can be seen as the counterpart to `select`:

Notice how the returned object does _not_ contain the `password` field.

## Relation count

In [3.0.1](https://github.com/prisma/prisma/releases/3.0.1) and later, you can `include` or `select` a [count of relations](/orm/prisma-client/queries/aggregation-grouping-summarizing#count-relations) alongside fields. For example, a user's post count.