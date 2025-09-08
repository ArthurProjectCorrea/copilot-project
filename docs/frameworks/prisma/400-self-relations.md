---
title: Self-relations
metaDescription: How to define and work with self-relations in Prisma.
---

A relation field can also reference its own model, in this case the relation is called a _self-relation_. Self-relations can be of any cardinality, 1-1, 1-n and m-n.

Note that self-relations always require the `@relation` attribute.

## One-to-one self-relations

The following example models a one-to-one self-relation:

This relation expresses the following:

- "a user can have one or zero predecessors" (for example, Sarah is Mary's predecessor as blog owner)
- "a user can have one or zero successors" (for example, Mary is Sarah's successor as blog owner)

> **Note**: One-to-one self-relations cannot be made required on both sides. One or both sides must be optional, otherwise it becomes impossible to create the first `User` record.

To create a one-to-one self-relation:

- Both sides of the relation must define a `@relation` attribute that share the same name - in this case, **BlogOwnerHistory**.
- One relation field must be a [fully annotated](/orm/prisma-schema/data-model/relations#relation-fields). In this example, the `successor` field defines both the `field` and `references` arguments.
- One relation field must be backed by a foreign key. The `successor` field is backed by the `successorId` foreign key, which references a value in the `id` field. The `successorId` scalar relation field also requires a `@unique` attribute to guarantee a one-to-one relation.

> **Note**: One-to-one self relations require two sides even if both sides are equal in the relationship. For example, to model a 'best friends' relation, you would need to create two relation fields: `bestfriend1` and a `bestfriend2`.

Either side of the relation can be backed by a foreign key. In the previous example, repeated below, `successor` is backed by `successorId`:

Alternatively, you could rewrite this so that `predecessor` is backed by `predecessorId`:

No matter which side is backed by a foreign key, Prisma Client surfaces both the `predecessor` and `successor` fields:

```ts showLineNumbers
const x = await prisma.user.create(,
    },
      //highlight-next-line
      predecessor: ,
    },
  },
});
```

### One-to-one self relations in the database

### Relational databases

In **relational databases only**, a one-to-one self-relation is represented by the following SQL:

```sql
CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    "name" TEXT,
    "successorId" INTEGER
);

ALTER TABLE "User" ADD CONSTRAINT fk_successor_user FOREIGN KEY ("successorId") REFERENCES "User" (id);

ALTER TABLE "User" ADD CONSTRAINT successor_unique UNIQUE ("successorId");
```

### MongoDB

For MongoDB, Prisma ORM currently uses a [normalized data model design](https://www.mongodb.com/docs/manual/data-modeling/), which means that documents reference each other by ID in a similar way to relational databases.

The following MongoDB documents represent a one-to-one self-relation between two users:

```json
, "name": "Elsa the Elder" }
```

```json
,
  "name": "Elsa",
  "successorId":
}
```

## One-to-many self relations

A one-to-many self-relation looks as follows:

This relation expresses the following:

- "a user has zero or one _teachers_ "
- "a user can have zero or more _students_"

Note that you can also require each user to have a teacher by making the `teacher` field [required](/orm/prisma-schema/data-model/models#optional-and-mandatory-fields).

### One-to-many self-relations in the database

### Relational databases

In relational databases, a one-to-many self-relation is represented by the following SQL:

```sql
CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    "name" TEXT,
    "teacherId" INTEGER
);

ALTER TABLE "User" ADD CONSTRAINT fk_teacherid_user FOREIGN KEY ("teacherId") REFERENCES "User" (id);
```

Notice the lack of `UNIQUE` constraint on `teacherId` - multiple students can have the same teacher.

### MongoDB

For MongoDB, Prisma ORM currently uses a [normalized data model design](https://www.mongodb.com/docs/manual/data-modeling/), which means that documents reference each other by ID in a similar way to relational databases.

The following MongoDB documents represent a one-to-many self-relation between three users - one teacher and two students with the same `teacherId`:

```json
,
  "name": "Ms. Roberts"
}
```

```json
,
  "name": "Student 8",
  "teacherId":
}
```

```json
,
  "name": "Student 9",
  "teacherId":
}
```

## Many-to-many self relations

A many-to-many self-relation looks as follows:

This relation expresses the following:

- "a user can be followed by zero or more users"
- "a user can follow zero or more users"

Note that for relational databases, this many-to-many-relation is [implicit](/orm/prisma-schema/data-model/relations/many-to-many-relations#implicit-many-to-many-relations). This means Prisma ORM maintains a [relation table](/orm/prisma-schema/data-model/relations/many-to-many-relations#relation-tables) for it in the underlying database.

If you need the relation to hold other fields, you can create an [explicit](/orm/prisma-schema/data-model/relations/many-to-many-relations#explicit-many-to-many-relations) many-to-many self relation as well. The explicit version of the self relation shown previously is as follows:

```prisma
model User

model Follows
```

### Many-to-many self-relations in the database

### Relational databases

In relational databases, a many-to-many self-relation (implicit) is represented by the following SQL:

```sql
CREATE TABLE "User" (
    id integer DEFAULT nextval('"User_id_seq"'::regclass) PRIMARY KEY,
    name text
);
CREATE TABLE "_UserFollows" (
    "A" integer NOT NULL REFERENCES "User"(id) ON DELETE CASCADE ON UPDATE CASCADE,
    "B" integer NOT NULL REFERENCES "User"(id) ON DELETE CASCADE ON UPDATE CASCADE
);
```

### MongoDB

For MongoDB, Prisma ORM currently uses a [normalized data model design](https://www.mongodb.com/docs/manual/data-modeling/), which means that documents reference each other by ID in a similar way to relational databases.

The following MongoDB documents represent a many-to-many self-relation between five users - two users that follow `"Bob"`, and two users that follow him:

```json
,
  "name": "Bob",
  "followedByIDs": [
    ,

  ],
  "followingIDs": [
    ,

  ]
}
```

```json
,
  "name": "Follower1",
  "followingIDs": []
}
```

```json
,
  "name": "Follower2",
  "followingIDs": []
}
```

```json
,
  "name": "CoolPerson1",
  "followedByIDs": []
}
```

```json
,
  "name": "CoolPerson2",
  "followedByIDs": []
}
```

## Defining multiple self-relations on the same model

You can also define multiple self-relations on the same model at once. Taking all relations from the previous sections as example, you could define a `User` model as follows:
