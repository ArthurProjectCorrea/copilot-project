---
title: 'Integration testing'
metaTitle: 'Integration testing with Prisma'
metaDescription: 'Learn how to setup and run integration tests with Prisma and Docker'
tocDepth: 3
---

> **Note:** This [blog post](https://www.prisma.io/blog/testing-series-2-xPhjjmIEsM) offers a comprehensive guide on setting up an integration testing environment and writing integration tests against a real database, providing valuable insights for those looking to explore this topic.

## Prerequisites

This guide assumes you have [Docker](https://docs.docker.com/get-started/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your machine as well as `Jest` setup in your project.

The following ecommerce schema will be used throughout the guide. This varies from the traditional `User` and `Post` models used in other parts of the docs, mainly because it is unlikely you will be running integration tests against your blog.

<details>

<summary>Ecommerce schema</summary>

```prisma file=schema.prisma showLineNumbers
// Can have 1 customer
// Can have many order details
model CustomerOrder 

// Can have 1 order
// Can have many products
model OrderDetails 

// Can have many order details
// Can have 1 category
model Product 

// Can have many products
model Category 

// Can have many orders
model Customer 
```

</details>

The guide uses a singleton pattern for Prisma Client setup. Refer to the [singleton](/orm/prisma-client/testing/unit-testing#singleton) docs for a walk through of how to set that up.

## Add Docker to your project

![Docker compose code pointing towards image of container holding a Postgres database](./Docker_Diagram_V1.png)

With Docker and Docker compose both installed on your machine you can use them in your project.

1. Begin by creating a `docker-compose.yml` file at your projects root. Here you will add a Postgres image and specify the environments credentials.

```yml file=docker-compose.yml
# Set the version of docker compose to use
version: '3.9'

# The containers that compose the project
services:
  db:
    image: postgres:13
    restart: always
    container_name: integration-tests-prisma
    ports:
      - '5433:5432'
    environment:
      POSTGRES_USER: prisma
      POSTGRES_PASSWORD: prisma
      POSTGRES_DB: tests
```

> **Note**: The compose version used here (`3.9`) is the latest at the time of writing, if you are following along be sure to use the same version for consistency.

The `docker-compose.yml` file defines the following:

- The Postgres image (`postgres`) and version tag (`:13`). This will be downloaded if you do not have it locally available.
- The port `5433` is mapped to the internal (Postgres default) port `5432`. This will be the port number the database is exposed on externally.
- The database user credentials are set and the database given a name.

2. To connect to the database in the container, create a new connection string with the credentials defined in the `docker-compose.yml` file. For example:

```env file=.env.test
DATABASE_URL="postgresql://prisma:prisma@localhost:5433/tests"
```

3. To create the container in a detached state so that you can continue to use the terminal tab, run the following command:

```terminal
docker compose up -d
```

4. Next you can check that the database has been created by executing a `psql` command inside the container. Make a note of the container id.

> **Note**: The container id is unique to each container, you will see a different id displayed.

5. Using the container id from the previous step, run `psql` in the container, login with the created user and check the database is created:

## Integration testing

Integration tests will be run against a database in a **dedicated test environment** instead of the production or development environments.

### The flow of operations

The flow for running said tests goes as follows:

1. Start the container and create the database
1. Migrate the schema
1. Run the tests
1. Destroy the container

Each test suite will seed the database before all the test are run. After all the tests in the suite have finished, the data from all the tables will be dropped and the connection terminated.

### The function to test

The ecommerce application you are testing has a function which creates an order. This function does the following:

- Accepts input about the customer making the order
- Accepts input about the product being ordered
- Checks if the customer has an existing account
- Checks if the product is in stock
- Returns an "Out of stock" message if the product doesn't exist
- Creates an account if the customer doesn't exist in the database
- Create the order

An example of how such a function might look can be seen below:

```ts file=create-order.ts

  id?: number
  name?: string
  email: string
  address?: string
}

  customer: Customer
  productId: number
  quantity: number
}

/**
 * Creates an order with customer.
 * @param input The order parameters
 */

  const  = input
  const  = customer

  // Get the product
  const product = await prisma.product.findUnique(,
  })

  // If the product is null its out of stock, return error.
  if (!product) return new Error('Out of stock')

  // If the customer is new then create the record, otherwise connect via their unique email
  await prisma.customerOrder.create(,
          where: ,
        },
      },
      orderDetails: ,
          },
        },
      },
    },
  })
}
```

### The test suite

The following tests will check if the `createOrder` function works as it should do. They will test:

- Creating a new order with a new customer
- Creating an order with an existing customer
- Show an "Out of stock" error message if a product doesn't exist

Before the test suite is run the database is seeded with data. After the test suite has finished a [`deleteMany`](/orm/reference/prisma-client-reference#deletemany) is used to clear the database of its data.

:::tip

Using `deleteMany` may suffice in situations where you know ahead of time how your schema is structured. This is because the operations need to be executed in the correct order according to how the model relations are setup.

However, this doesn't scale as well as having a more generic solution that maps over your models and performs a truncate on them. For those scenarios and examples of using raw SQL queries see [Deleting all data with raw SQL / `TRUNCATE`](/orm/prisma-client/queries/crud#deleting-all-data-with-raw-sql--truncate)

:::

```ts file=__tests__/create-order.ts

beforeAll(async () => , ],
  })

  console.log('✨ 2 categories successfully created!')

  // create products
  await prisma.product.createMany(,
      ,
    ],
  })

  console.log('✨ 2 products successfully created!')

  // create the customer
  await prisma.customer.create(,
  })

  console.log('✨ 1 customer successfully created!')
})

afterAll(async () => )

it('should create 1 new customer with 1 order', async () => 
  // The new orders details
  const order: OrderInput = 

  // Create the order and customer
  await createOrder(order)

  // Check if the new customer was created by filtering on unique email field
  const newCustomer = await prisma.customer.findUnique(,
  })

  // Check if the new order was created by filtering on unique email field of the customer
  const newOrder = await prisma.customerOrder.findFirst(,
    },
  })

  // Expect the new customer to have been created and match the input
  expect(newCustomer).toEqual(customer)
  // Expect the new order to have been created and contain the new customer
  expect(newOrder).toHaveProperty('customerId', 2)
})

it('should create 1 order with an existing customer', async () => 
  // The new orders details
  const order: OrderInput = 

  // Create the order and connect the existing customer
  await createOrder(order)

  // Check if the new order was created by filtering on unique email field of the customer
  const newOrder = await prisma.customerOrder.findFirst(,
    },
  })

  // Expect the new order to have been created and contain the existing customer with an id of 1 (Harry Potter from the seed script)
  expect(newOrder).toHaveProperty('customerId', 1)
})

it("should show 'Out of stock' message if productId doesn't exit", async () => 
  // The new orders details
  const order: OrderInput = 

  // The productId supplied doesn't exit so the function should return an "Out of stock" message
  await expect(createOrder(order)).resolves.toEqual(new Error('Out of stock'))
})
```

## Running the tests

This setup isolates a real world scenario so that you can test your applications functionality against real data in a controlled environment.

You can add some scripts to your projects `package.json` file which will setup the database and run the tests, then afterwards manually destroy the container.

:::warning

If the test doesn't work for you, you'll need to ensure the test database is properly set up and ready, as explained in this [blog](https://www.prisma.io/blog/testing-series-3-aBUyF8nxAn#make-the-script-wait-until-the-database-server-is-ready).

:::

```json file=package.json
  "scripts": ,
```

The `test` script does the following:

1. Runs `docker compose up -d` to create the container with the Postgres image and database.
1. Applies the migrations found in `./prisma/migrations/` directory to the database, this creates the tables in the container's database.
1. Executes the tests.

Once you are satisfied you can run `yarn docker:down` to destroy the container, its database and any test data.