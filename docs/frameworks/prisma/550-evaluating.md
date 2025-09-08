---
title: 'Evaluating'
metaTitle: 'Accelerate: Evaluating'
metaDescription: 'Learn about evaluating Prisma Accelerate.'
tocDepth: 3
toc: true
---

## How Accelerate's connection pool optimizes performance under load

Prisma Accelerate employs a dynamic, serverless connection pooling infrastructure. When a request is made, a connection pool is quickly provisioned for the project in the region assigned while configuring Prisma Accelerate. This connection pool remains active, serving many additional requests while reusing established database connections. The connection pool will disconnect after a period of inactivity, so it’s important to evaluate Prisma Accelerate with a consistent stream of traffic.

**Key Benefits:**

- **Optimized Query Performance:** The serverless connection pooler adapts to the query load, ensuring the database connections are managed efficiently during peak demand.

  > Prisma Accelerate’s connection pooler cannot improve the performance of queries in the database. In scenarios where query performance is an issue, we recommend optimizing the Prisma query, applying indexes, or utilizing Accelerate’s edge caching.

- **Maximize Connection Reuse:** Executing a consistent volume of queries helps maintain active instances of Accelerate connection poolers. This increases connection reuse, ensuring faster response times for subsequent queries.

By understanding and harnessing this mechanism, you can ensure that your database queries perform consistently and efficiently at scale.

## Evaluating Prisma Accelerate connection pooling performance

Below you will find an example of how to evaluate Prisma Accelerate using a sample model:

```prisma
model Notes 
```

```typescript

const prisma = new PrismaClient().$extends(withAccelerate())

function calculateStatistics(numbers: number[]):  

  // Sort the array in ascending order
  numbers.sort((a, b) => a - b)

  const sum = numbers.reduce((acc, num) => acc + num, 0)
  const count = numbers.length

  const average = sum / count
  const p50 = getPercentile(numbers, 50)
  const p75 = getPercentile(numbers, 75)
  const p99 = getPercentile(numbers, 99)

  return 
}

function getPercentile(numbers: number[], percentile: number): number 

  const index = (percentile / 100) * (numbers.length - 1)
  if (Number.isInteger(index))  else 
}

async function main() )

  // we recommend evaluationg Prisma Accelerate with a large loop
  const LOOP_LENGTH = 10000

  for (let i = 0; i < LOOP_LENGTH; i++) )

    timings.push(Date.now() - start)
  }

  const statistics = calculateStatistics(timings)
  console.log('Average:', statistics.average)
  console.log('P50:', statistics.p50)
  console.log('P75:', statistics.p75)
  console.log('P99:', statistics.p99)
}

main()
  .then(async () => )
  .catch((e) => )
```

## Evaluating Prisma Accelerate caching performance

Prisma Accelerate’s edge cache is also optimized for a high volume of queries. The cache automatically optimizes for repeated queries. As a result, the cache hit rate will increase as the query frequency does. Adding a query result to the cache is also non-blocking, so a short burst of queries might not utilize the cache or a sustained load.

To evaluate Accelerate’s edge caching, you can modify the above script with the below:

```typescript

const prisma = new PrismaClient().$extends(withAccelerate())

function calculateStatistics(numbers: number[]):  

  // Sort the array in ascending order
  numbers.sort((a, b) => a - b)

  const sum = numbers.reduce((acc, num) => acc + num, 0)
  const count = numbers.length

  const average = sum / count
  const p50 = getPercentile(numbers, 50)
  const p75 = getPercentile(numbers, 75)
  const p99 = getPercentile(numbers, 99)

  return 
}

function getPercentile(numbers: number[], percentile: number): number 

  const index = (percentile / 100) * (numbers.length - 1)
  if (Number.isInteger(index))  else 
}

async function main() ,
  })

  // we recommend evaluating Prisma Accelerate with a large loop
  const LOOP_LENGTH = 10000

  for (let i = 0; i < LOOP_LENGTH; i++) ,
    })

    timings.push(Date.now() - start)
  }

  const statistics = calculateStatistics(timings)
  console.log('Average:', statistics.average)
  console.log('P50:', statistics.p50)
  console.log('P75:', statistics.p75)
  console.log('P99:', statistics.p99)
}

main()
  .then(async () => )
  .catch((e) => )
```