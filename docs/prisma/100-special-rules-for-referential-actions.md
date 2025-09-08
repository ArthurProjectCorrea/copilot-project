---
title: 'Special rules for referential actions in SQL Server and MongoDB'
metaTitle: 'Special rules for referential actions in SQL Server and MongoDB'
metaDescription: 'Circular references or multiple cascade paths can cause validation errors on Microsoft SQL Server and MongoDB. Since the database does not handle these situations out of the box, learn how to solve this problem.'
tocDepth: 3
---

## Self-relation (SQL Server and MongoDB)

The following model describes a self-relation where an `Employee` can have a manager and managees, referencing entries of the same model.

```prisma
model Employee
```

This will result in the following error:

```terminal wrap
Error parsing attribute "@relation": A self-relation must have `onDelete` and `onUpdate` referential actions set to `NoAction` in one of the @relation attributes. (Implicit default `onDelete`: `SetNull`, and `onUpdate`: `Cascade`)
```

By not defining any actions, Prisma ORM will use the following default values depending if the underlying [scalar fields](/orm/prisma-schema/data-model/models#scalar-fields) are set to be optional or required.

| Clause     | All of the scalar fields are optional | At least one scalar field is required |
| :--------- | :------------------------------------ | :------------------------------------ |
| `onDelete` | `SetNull`                             | `NoAction`                            |
| `onUpdate` | `Cascade`                             | `Cascade`                             |

Since the default referential action for `onUpdate` in the above relation would be `Cascade` and for `onDelete` it would be `SetNull`, it creates a cycle and the solution is to explicitly set the `onUpdate` and `onDelete` values to `NoAction`.

```prisma highlight=3;delete|4;add
model Employee
```

## Cyclic relation between three tables (SQL Server and MongoDB)

The following models describe a cyclic relation between a `Chicken`, an `Egg` and a `Fox`, where each model references the other.

```prisma
model Chicken

model Egg

model Fox
```

This will result in three validation errors in every relation field that is part of the cycle.

The first one is in the relation `egg` in the `Chicken` model:

```terminal wrap
Error parsing attribute "@relation": Reference causes a cycle. One of the @relation attributes in this cycle must have `onDelete` and `onUpdate` referential actions set to `NoAction`. Cycle path: Chicken.egg → Egg.predator → Fox.meal. (Implicit default `onUpdate`: `Cascade`)
```

The second one is in the relation `predator` in the `Egg` model:

```terminal wrap
Error parsing attribute "@relation": Reference causes a cycle. One of the @relation attributes in this cycle must have `onDelete` and `onUpdate` referential actions set to `NoAction`. Cycle path: Egg.predator → Fox.meal → Chicken.egg. (Implicit default `onUpdate`: `Cascade`)
```

And the third one is in the relation `meal` in the `Fox` model:

```terminal wrap
Error parsing attribute "@relation": Reference causes a cycle. One of the @relation attributes in this cycle must have `onDelete` and `onUpdate` referential actions set to `NoAction`. Cycle path: Fox.meal → Chicken.egg → Egg.predator. (Implicit default `onUpdate`: `Cascade`)
```

As the relation fields are required, the default referential action for `onDelete` is `NoAction` but for `onUpdate` it is `Cascade`, which causes a referential action cycle. The solution is to set the `onUpdate` value to `NoAction` in any one of the relations.

```prisma highlight=3;delete|4;add
model Chicken
```

or

```prisma highlight=3;delete|4;add
model Egg
```

or

```prisma highlight=3;delete|4;add
model Fox
```

## Multiple cascade paths between two models (SQL Server only)

The data model describes two different paths between same models, with both relations triggering cascading referential actions.

```prisma
model User

model Post

model Comment
```

The problem in this data model is how there are two paths from `Comment` to the `User`, and how the default `onUpdate` action in both relations is `Cascade`. This leads into two validation errors:

The first one is in the relation `writtenBy`:

```terminal wrap
Error parsing attribute "@relation": When any of the records in model `User` is updated or deleted, the referential actions on the relations cascade to model `Comment` through multiple paths. Please break one of these paths by setting the `onUpdate` and `onDelete` to `NoAction`. (Implicit default `onUpdate`: `Cascade`)
```

The second one is in the relation `post`:

```terminal wrap
Error parsing attribute "@relation": When any of the records in model `User` is updated or deleted, the referential actions on the relations cascade to model `Comment` through multiple paths. Please break one of these paths by setting the `onUpdate` and `onDelete` to `NoAction`. (Implicit default `onUpdate`: `Cascade`)
```

The error means that by updating a primary key in a record in the `User` model, the update will cascade once between the `Comment` and `User` through the `writtenBy` relation, and again through the `Post` model from the `post` relation due to `Post` being related with the `Comment` model.

The fix is to set the `onUpdate` referential action to `NoAction` in the `writtenBy` or `post` relation fields, or from the `Post` model by changing the actions in the `author` relation:

```prisma highlight=5;delete|6;add
model Comment
```

or

```prisma highlight=6;delete|7;add
model Comment
```

or

```prisma highlight=4;delete|5;add
model Post
```
