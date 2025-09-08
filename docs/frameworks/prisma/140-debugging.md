---
title: 'Debugging'
metaTitle: 'Debugging (Reference)'
metaDescription: 'This page explains how to enable debugging output for Prisma Client by setting the `DEBUG` environment variable.'
---

## Setting the `DEBUG` environment variable

Here are examples for setting these debugging options in bash:

```terminal
# enable only `prisma:engine`-level debugging output

# enable only `prisma:client`-level debugging output

# enable both `prisma-client`- and `engine`-level debugging output

```

To enable all `prisma` debugging options, set `DEBUG` to `prisma*`:

```terminal

```

On Windows, use `set` instead of `export`:

```terminal
set DEBUG="prisma*"
```

To enable _all_ debugging options, set `DEBUG` to `*`:

```terminal

```
