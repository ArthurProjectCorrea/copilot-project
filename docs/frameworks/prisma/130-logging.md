---
title: 'Logging'
metaTitle: 'Logging'
metaDescription: 'Learn how to configure Prisma Client to log the raw SQL queries it sends to the database and other information.'
---

## Log to stdout

The simplest way to print _all_ log levels to stdout is to pass in an array `LogLevel` objects:

```ts
const prisma = new PrismaClient()
```

This is the short form of passing in an array of `LogDefinition` objects where the value of `emit` is always `stdout`:

```ts
const prisma = new PrismaClient(,
    ,
    ,
    ,
  ],
})
```

## Event-based logging

To use event-based logging:

1. Set `emit` to `event` for a specific log level, such as query
2. Use the `$on()` method to subscribe to the event

The following example subscribes to all `query` events and write the `duration` and `query` to console:

The exact [event (`e`) type and the properties available](/orm/reference/prisma-client-reference#event-types) depends on the log level.