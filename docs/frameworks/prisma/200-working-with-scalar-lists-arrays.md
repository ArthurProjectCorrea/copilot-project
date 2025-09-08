---
title: 'Working with scalar lists'
metaTitle: 'Working with scalar lists/arrays (Concepts)'
metaDescription: 'How to read, write, and filter by scalar lists / arrays.'
tocDepth: 3
---

## Setting the value of a scalar list

The following example demonstrates how to [`set`](/orm/reference/prisma-client-reference#set-1) the value of a scalar list (`coinflips`) when you create a model:

```ts
const createdUser = await prisma.user.create(,
})
```

## Unsetting the value of a scalar list

The following example demonstrates how to [`unset`](/orm/reference/prisma-client-reference#unset) the value of a scalar list (`coinflips`):

```ts
const createdUser = await prisma.user.create(,
  },
})
```

Unlike `set: null`, `unset` removes the list entirely.

## Adding items to a scalar list

Use the [`push`](/orm/reference/prisma-client-reference#push) method to add a single value to a scalar list:

```ts
const userUpdate = await prisma.user.update(,
  data: ,
  },
})
```

In earlier versions, you have to overwrite the entire value. The following example retrieves user, uses `push()` to add three new coin flips, and overwrites the `coinflips` field in an `update`:

```ts
const user = await prisma.user.findUnique(,
})

if (user) ,
    data: ,
  })

  console.log(updatedUser.coinflips)
}
```

## Filtering scalar lists

Use [scalar list filters](/orm/reference/prisma-client-reference#scalar-list-filters) to filter for records with scalar lists that match a specific condition. The following example returns all posts where the tags list includes `databases` _and_ `typescript`:

```ts
const posts = await prisma.post.findMany(,
  },
})
```

### `NULL` values in arrays

When using scalar list filters with a relational database connector, array fields with a `NULL` value are not considered by the following conditions:

- `NOT` (array does not contain X)
- `isEmpty` (array is empty)

This means that records you might expect to see are not returned. Consider the following examples:

- The following query returns all posts where the `tags` **do not** include `databases`:

  ```ts
  const posts = await prisma.post.findMany(,
      },
    },
  })
  ```

  - ✔ Arrays that do not contain `"databases"`, such as ``
  - ✔ Empty arrays, such as `[]`

  The query does not return:

  - ✘ `NULL` arrays, even though they do not contain `"databases"`

The following query returns all posts where `tags` is empty:

```ts
const posts = await prisma.post.findMany(,
  },
})
```

The query returns:

- ✔ Empty arrays, such as `[]`

The query does not return:

- ✘ `NULL` arrays, even though they could be considered empty

To work around this issue, you can set the default value of array fields to `[]`.