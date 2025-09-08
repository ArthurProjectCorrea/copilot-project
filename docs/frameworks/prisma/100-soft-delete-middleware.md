---
title: 'Middleware sample: soft delete'
metaTitle: 'Middleware sample: soft delete (Reference)'
metaDescription: 'How to use middleware to intercept deletes and set a field value instead of deleting the record.'
toc_max_heading_level: 4
---

## Step 1: Store status of record

Add a field named `deleted` to the `Post` model. You can choose between two field types depending on your requirements:

- `Boolean` with a default value of `false`:

  ```prisma highlight=4;normal
  model Post 
  ```

- Create a nullable `DateTime` field so that you know exactly _when_ a record was marked as deleted - `NULL` indicates that a record has not been deleted. In some cases, storing when a record was removed may be a regulatory requirement:

  ```prisma highlight=4;normal
  model Post 
  ```

> **Note**: Using two separate fields (`isDeleted` and `deletedDate`) may result in these two fields becoming out of sync - for example, a record may be marked as deleted but have no associated date.)

This sample uses a `Boolean` field type for simplicity.

## Step 2: Soft delete middleware

Add a middleware that performs the following tasks:

- Intercepts `delete()` and `deleteMany()` queries for the `Post` model
- Changes the `params.action` to `update` and `updateMany` respectively
- Introduces a `data` argument and sets ``, preserving other filter arguments if they exist

Run the following sample to test the soft delete middleware:

```ts

const prisma = new PrismaClient()

async function main() 
      }
      if (params.action == 'deleteMany')  else 
        }
      }
    }
    return next(params)
  })

  /***********************************/
  /* TEST */
  /***********************************/

  const titles = [
    ,
    ,
    ,
  ]

  console.log('\u001b[1;34mSTARTING SOFT DELETE TEST \u001b[0m')
  console.log('\u001b[1;34m#################################### \u001b[0m')

  let i = 0
  let posts = new Array()

  // Create 3 new posts with a randomly assigned title each time
  for (i == 0; i < 3; i++) )
    posts.push(createPostOperation)
  }

  var postsCreated = await prisma.$transaction(posts)

  console.log(
    'Posts created with IDs: ' +
      '\u001b[1;32m' +
      postsCreated.map((x) => x.id) +
      '\u001b[0m'
  )

  // Delete the first post from the array
  const deletePost = await prisma.post.delete(,
  })

  // Delete the 2nd two posts
  const deleteManyPosts = await prisma.post.deleteMany(,
    },
  })

  const getPosts = await prisma.post.findMany(,
    },
  })

  console.log()

  console.log(
    'Deleted post with ID: ' + '\u001b[1;32m' + deletePost.id + '\u001b[0m'
  )
  console.log(
    'Deleted posts with IDs: ' +
      '\u001b[1;32m' +
      [postsCreated[1].id + ',' + postsCreated[2].id] +
      '\u001b[0m'
  )
  console.log()
  console.log(
    'Are the posts still available?: ' +
      (getPosts.length == 3
        ? '\u001b[1;32m' + 'Yes!' + '\u001b[0m'
        : '\u001b[1;31m' + 'No!' + '\u001b[0m')
  )
  console.log()
  console.log('\u001b[1;34m#################################### \u001b[0m')
  // 4. Count ALL posts
  const f = await prisma.post.findMany()
  console.log('Number of posts: ' + '\u001b[1;32m' + f.length + '\u001b[0m')

  // 5. Count DELETED posts
  const r = await prisma.post.findMany(,
  })
  console.log(
    'Number of SOFT deleted posts: ' + '\u001b[1;32m' + r.length + '\u001b[0m'
  )
}

main()
```

The sample outputs the following:

```no-lines
STARTING SOFT DELETE TEST
####################################
Posts created with IDs: 587,588,589

Deleted post with ID: 587
Deleted posts with IDs: 588,589

Are the posts still available?: Yes!

####################################
```

:::tip

Comment out the middleware to see the message change.

:::

✔ Pros of this approach to soft delete include:

- Soft delete happens at data access level, which means that you cannot delete records unless you use raw SQL

✘ Cons of this approach to soft delete include:

- Content can still be read and updated unless you explicitly filter by `where: ` - in a large project with a lot of queries, there is a risk that soft deleted content will still be displayed
- You can still use raw SQL to delete records

:::tip

You can create rules or triggers ([MySQL](https://dev.mysql.com/doc/refman/8.0/en/trigger-syntax.html) and [PostgreSQL](https://www.postgresql.org/docs/8.1/rules-update.html)) at a database level to prevent records from being deleted.

:::

## Step 3: Optionally prevent read/update of soft deleted records

In step 2, we implemented middleware that prevents `Post` records from being deleted. However, you can still read and update deleted records. This step explores two ways to prevent the reading and updating of deleted records.

> **Note**: These options are just ideas with pros and cons, you may choose to do something entirely different.

### Option 1: Implement filters in your own application code

In this option:

- Prisma Client middleware is responsible for preventing records from being deleted
- Your own application code (which could be a GraphQL API, a REST API, a module) is responsible for filtering out deleted posts where necessary (` }`) when reading and updating data - for example, the `getPost` GraphQL resolver never returns a deleted post

✔ Pros of this approach to soft delete include:

- No change to Prisma Client's create/update queries - you can easily request deleted records if you need them
- Modifying queries in middleware can have some unintended consequences, such as changing query return types (see option 2)

✘ Cons of this approach to soft delete include:

- Logic relating to soft delete maintained in two different places
- If your API surface is very large and maintained by multiple contributors, it may be difficult to enforce certain business rules (for example, never allow deleted records to be updated)

### Option 2: Use middleware to determine the behavior of read/update queries for deleted records

Option two uses Prisma Client middleware to prevent soft deleted records from being returned. The following table describes how the middleware affects each query:

| **Query**      | **Middleware logic**                                                                                                                                                                                                                                                                                                                                                                                              | **Changes to return type**       |
| :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------- |
| `findUnique()` | 🔧 Change query to `findFirst` (because you cannot apply `deleted: false` filters to `findUnique()`) <br /> 🔧 Add `where: ` filter to exclude soft deleted posts <br />🔧 From version 5.0.0, you can use `findUnique()` to apply `delete: false` filters since [non unique fields are exposed](/orm/reference/prisma-client-reference#filter-on-non-unique-fields-with-userwhereuniqueinput). | No change                        |     |
| `findMany`     | 🔧 Add `where: ` filter to exclude soft deleted posts by default <br />🔧 Allow developers to **explicitly request** soft deleted posts by specifying `deleted: true`                                                                                                                                                                                                                           | No change                        |
| `update`       | 🔧 Change query to `updateMany` (because you cannot apply `deleted: false` filters to `update`) <br /> 🔧 Add `where: ` filter to exclude soft deleted posts                                                                                                                                                                                                                                    | `` instead of `Post` |
| `updateMany`   | 🔧 Add `where: ` filter to exclude soft deleted posts                                                                                                                                                                                                                                                                                                                                           | No change                        |

- **Is it not possible to utilize soft delete with `findFirstOrThrow()` or `findUniqueOrThrow()`?**<br />
  From version [5.1.0](https://github.com/prisma/prisma/releases/5.1.0), you can apply soft delete `findFirstOrThrow()` or `findUniqueOrThrow()` by using middleware.
- **Why are you making it possible to use `findMany()` with a ` }` filter, but not `updateMany()`?**<br />
  This particular sample was written to support the scenario where a user can _restore_ their deleted blog post (which requires a list of soft deleted posts) - but the user should not be able to edit a deleted post.
- **Can I still `connect` or `connectOrCreate` a deleted post?**<br />
  In this sample - yes. The middleware does not prevent you from connecting an existing, soft deleted post to a user.

Run the following sample to see how middleware affects each query:

```ts

const prisma = new PrismaClient()

async function main() 
      if (
        params.action === 'findFirstOrThrow' ||
        params.action === 'findUniqueOrThrow'
      ) 
        } else 
        }
      }
      if (params.action === 'findMany') 
        } else 
        }
      }
    }
    return next(params)
  })

  prisma.$use(async (params, next) => 
      if (params.action == 'updateMany')  else 
        }
      }
    }
    return next(params)
  })

  prisma.$use(async (params, next) => 
      }
      if (params.action == 'deleteMany')  else 
        }
      }
    }
    return next(params)
  })

  /***********************************/
  /* TEST */
  /***********************************/

  const titles = [
    ,
    ,
    ,
  ]

  console.log('\u001b[1;34mSTARTING SOFT DELETE TEST \u001b[0m')
  console.log('\u001b[1;34m#################################### \u001b[0m')

  let i = 0
  let posts = new Array()

  // Create 3 new posts with a randomly assigned title each time
  for (i == 0; i < 3; i++) )
    posts.push(createPostOperation)
  }

  var postsCreated = await prisma.$transaction(posts)

  console.log(
    'Posts created with IDs: ' +
      '\u001b[1;32m' +
      postsCreated.map((x) => x.id) +
      '\u001b[0m'
  )

  // Delete the first post from the array
  const deletePost = await prisma.post.delete(,
  })

  // Delete the 2nd two posts
  const deleteManyPosts = await prisma.post.deleteMany(,
    },
  })

  const getOnePost = await prisma.post.findUnique(,
  })

  const getOneUniquePostOrThrow = async () =>
    await prisma.post.findUniqueOrThrow(,
    })

  const getOneFirstPostOrThrow = async () =>
    await prisma.post.findFirstOrThrow(,
    })

  const getPosts = await prisma.post.findMany(,
    },
  })

  const getPostsAnDeletedPosts = await prisma.post.findMany(,
      deleted: true,
    },
  })

  const updatePost = await prisma.post.update(,
    data: ,
  })

  const updateManyDeletedPosts = await prisma.post.updateMany(,
    },
    data: ,
  })

  console.log()

  console.log(
    'Deleted post (delete) with ID: ' +
      '\u001b[1;32m' +
      deletePost.id +
      '\u001b[0m'
  )
  console.log(
    'Deleted posts (deleteMany) with IDs: ' +
      '\u001b[1;32m' +
      [postsCreated[1].id + ',' + postsCreated[2].id] +
      '\u001b[0m'
  )
  console.log()
  console.log(
    'findUnique: ' +
      (getOnePost?.id != undefined
        ? '\u001b[1;32m' + 'Posts returned!' + '\u001b[0m'
        : '\u001b[1;31m' +
          'Post not returned!' +
          '(Value is: ' +
          JSON.stringify(getOnePost) +
          ')' +
          '\u001b[0m')
  )
  try  catch (error) 
  try  catch (error) 
  console.log()
  console.log(
    'findMany: ' +
      (getPosts.length == 3
        ? '\u001b[1;32m' + 'Posts returned!' + '\u001b[0m'
        : '\u001b[1;31m' + 'Posts not returned!' + '\u001b[0m')
  )
  console.log(
    'findMany ( delete: true ): ' +
      (getPostsAnDeletedPosts.length == 3
        ? '\u001b[1;32m' + 'Posts returned!' + '\u001b[0m'
        : '\u001b[1;31m' + 'Posts not returned!' + '\u001b[0m')
  )
  console.log()
  console.log(
    'update: ' +
      (updatePost.id != undefined
        ? '\u001b[1;32m' + 'Post updated!' + '\u001b[0m'
        : '\u001b[1;31m' +
          'Post not updated!' +
          '(Value is: ' +
          JSON.stringify(updatePost) +
          ')' +
          '\u001b[0m')
  )
  console.log(
    'updateMany ( delete: true ): ' +
      (updateManyDeletedPosts.count == 3
        ? '\u001b[1;32m' + 'Posts updated!' + '\u001b[0m'
        : '\u001b[1;31m' + 'Posts not updated!' + '\u001b[0m')
  )
  console.log()
  console.log('\u001b[1;34m#################################### \u001b[0m')
  // 4. Count ALL posts
  const f = await prisma.post.findMany()
  console.log(
    'Number of active posts: ' + '\u001b[1;32m' + f.length + '\u001b[0m'
  )

  // 5. Count DELETED posts
  const r = await prisma.post.findMany(,
  })
  console.log(
    'Number of SOFT deleted posts: ' + '\u001b[1;32m' + r.length + '\u001b[0m'
  )
}

main()
```

The sample outputs the following:

```
STARTING SOFT DELETE TEST
####################################
Posts created with IDs: 680,681,682

Deleted post (delete) with ID: 680
Deleted posts (deleteMany) with IDs: 681,682

findUnique: Post not returned!(Value is: [])
findMany: Posts not returned!
findMany ( delete: true ): Posts returned!

update: Post not updated!(Value is: )
updateMany ( delete: true ): Posts not updated!

####################################
Number of active posts: 0
Number of SOFT deleted posts: 95
```

✔ Pros of this approach:

- A developer can make a conscious choice to include deleted records in `findMany`
- You cannot accidentally read or update a deleted record

✖ Cons of this approach:

- Not obvious from API that you aren't getting all records and that ` }` is part of the default query
- Return type `update` affected because middleware changes the query to `updateMany`
- Doesn't handle complex queries with `AND`, `OR`, `every`, etc...
- Doesn't handle filtering when using `include` from another model.

## FAQ

### Can I add a global `includeDeleted` to the `Post` model?

You may be tempted to 'hack' your API by adding a `includeDeleted` property to the `Post` model and make the following query possible:

```ts
prisma.post.findMany( })
```

> **Note**: You would still need to write middleware.

We **✘ do not** recommend this approach as it pollutes the schema with fields that do not represent real data.