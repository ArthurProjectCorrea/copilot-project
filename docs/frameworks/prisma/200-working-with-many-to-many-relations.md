---
title: 'Modeling and querying many-to-many relations'
metaTitle: 'Modeling and querying many-to-many relations'
metaDescription: 'Learn how you can model and query implicit and explicit many-to-many relations with Prisma ORM'
tocDepth: 3
---

## Problem

Modeling and querying many-to-many relations in relational databases can be challenging. This article shows two examples how this can be approached with Prisma ORM. The first example uses an [implicit](/orm/prisma-schema/data-model/relations/many-to-many-relations#implicit-many-to-many-relations) and the second one uses an [explicit](/orm/prisma-schema/data-model/relations/many-to-many-relations#explicit-many-to-many-relations) many-to-many relation.

## Solution

### Implicit relations

This is a type of many-to-many relation where Prisma ORM handles the [relation table](/orm/prisma-schema/data-model/relations/many-to-many-relations#relation-tables) internally. A basic example for an implicit many-to-many relation would look like this:

```prisma
model Post 

model Tag 
```

To create a post and its tags, one can write this with Prisma Client:

```ts
await prisma.post.create(, ] },
  },
})
```

In the above example, we can directly query for posts along with their tags as follows:

```ts
await prisma.post.findMany(,
})
```

And the response obtained would be:

```json
[
  ,
      
    ]
  }
]
```

Another use case for this is if you want to add new tags as well as connect to existing tags to a post. An example for this is where a user has created new tags for their post and has also selected existing tags to be added as well. In this case, we can perform this in the following way:

```ts
await prisma.post.update(,
  data: , ], create:  },
  },
})
```

### Explicit relations

Explicit relations mostly need to be created in cases where you need to store extra fields in the relation table or if you're [introspecting](/orm/prisma-schema/introspection) an existing database that already has many-to-many relations setup. This is the same schema used above but with an explicit relation table:

```prisma
model Post 

model PostTags 

model Tag 
```

Adding tags to a post would be a create into the relation table (`PostTags`) as well as into the tags table (`Tag`):

```ts
await prisma.post.create( } },
         } },
      ],
    },
  },
})
```

Also querying for posts along with their tags would require an extra `include` as follows:

```ts
await prisma.post.findMany( } },
})
```

This will provide the following output:

```json
[
  
      },
      
      }
    ]
  }
]
```

Sometimes, it's not ideal to show the data for the relation table in your UI. In this case, it's best to map the data after fetching it on the server itself and sending that response to the frontend.

```ts
const result = posts.map((post) => 
})
```

This will provide an output similar to the one you received with implicit relations.

```json
[
  ,
      
    ]
  }
]
```

This article showed how you can implement implicit and explicit many-to-many relations and query them using Prisma Client.