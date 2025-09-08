---
title: One-to-one relations
metaDescription: How to define and work with one-to-one relations in Prisma.
tocDepth: 3
---

## Overview

One-to-one (1-1) relations refer to relations where at most **one** record can be connected on both sides of the relation. In the example below, there is a one-to-one relation between `User` and `Profile`:

The `userId` relation scalar is a direct representation of the foreign key in the underlying database. This one-to-one relation expresses the following:

- "a user can have zero profiles or one profile" (because the `profile` field is [optional](/orm/prisma-schema/data-model/models#type-modifiers) on `User`)
- "a profile must always be connected to one user"

In the previous example, the `user` relation field of the `Profile` model references the `id` field of the `User` model. You can also reference a different field. In this case, you need to mark the field with the `@unique` attribute, to guarantee that there is only a single `User` connected to each `Profile`. In the following example, the `user` field references an `email` field in the `User` model, which is marked with the `@unique` attribute:

## Multi-field relations in relational databases

In **relational databases only**, you can also use [multi-field IDs](/orm/reference/prisma-schema-reference#id-1) to define a 1-1 relation:

```prisma
model User 

model Profile 
```

## 1-1 relations in the database

### Relational databases

The following example demonstrates how to create a 1-1 relation in SQL:

```sql
CREATE TABLE "User" (
    id SERIAL PRIMARY KEY
);
CREATE TABLE "Profile" (
    id SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL UNIQUE,
    FOREIGN KEY ("userId") REFERENCES "User"(id)
);
```

Notice that there is a `UNIQUE` constraint on the foreign key `userId`. If this `UNIQUE` constraint was missing, the relation would be considered a [1-n relation](/orm/prisma-schema/data-model/relations/one-to-many-relations).

The following example demonstrates how to create a 1-1 relation in SQL using a composite key (`firstName` and `lastName`):

```sql
CREATE TABLE "User" (
    firstName TEXT,
    lastName TEXT,
    PRIMARY KEY ("firstName","lastName")
);
CREATE TABLE "Profile" (
    id SERIAL PRIMARY KEY,
    "userFirstName" TEXT NOT NULL,
    "userLastName" TEXT NOT NULL,
    UNIQUE ("userFirstName", "userLastName")
    FOREIGN KEY ("userFirstName", "userLastName") REFERENCES "User"("firstName", "lastName")
);
```

### MongoDB

For MongoDB, Prisma ORM currently uses a [normalized data model design](https://www.mongodb.com/docs/manual/data-modeling/), which means that documents reference each other by ID in a similar way to relational databases.

The following MongoDB document represents a `User`:

```json
, "name": "Bob" }
```

The following MongoDB document represents a `Profile` - notice the `userId` field, which references the `User` document's `$oid`:

```json
,
  "bio": "I'm Bob, and I like drawing.",
  "userId": 
}
```

## Required and optional 1-1 relation fields

In a one-to-one relation, the side of the relation _without_ a relation scalar (the field representing the foreign key in the database) _must_ be optional:

```prisma highlight=3;normal
model User 
```

This restriction was introduced in 2.12.0.

However, you can choose if the side of the relation _with_ a relation scalar should be optional or mandatory.

### Mandatory 1-1 relation

In the following example, `profile` and `profileId` are mandatory. This means that you cannot create a `User` without connecting or creating a `Profile`:

```prisma
model User 

model Profile 
```

### Optional 1-1 relation

In the following example, `profile` and `profileId` are optional. This means that you can create a user without connecting or creating a `Profile`:

```prisma
model User 

model Profile 
```

## Choosing which side should store the foreign key in a 1-1 relation

In **1-1 relations**, you can decide yourself which side of the relation you want to annotate with the `@relation` attribute (and therefore holds the foreign key).

In the following example, the relation field on the `Profile` model is annotated with the `@relation` attribute. `userId` is a direct representation of the foreign key in the underlying database:

You can also annotate the other side of the relation with the `@relation` attribute. The following example annotates the relation field on the `User` model. `profileId` is a direct representation of the foreign key in the underlying database: