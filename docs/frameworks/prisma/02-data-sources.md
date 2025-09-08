---
title: 'Data sources'
metaTitle: 'Data sources (Reference)'
metaDescription: 'Data sources enable Prisma to connect to your database. This page explains how to configure data sources in your Prisma schema.'
---

## Securing database connections

Some data source `provider`s allow you to configure your connection with SSL/TLS, and provide parameters for the `url` to specify the location of certificates.

- [Configuring an SSL connection with PostgreSQL](/orm/overview/databases/postgresql#configuring-an-ssl-connection)
- [Configuring an SSL connection with MySQL](/orm/overview/databases/mysql#configuring-an-ssl-connection)
- [Configure a TLS connection with Microsoft SQL Server](/orm/overview/databases/sql-server#connection-details)

Prisma ORM resolves SSL certificates relative to the `./prisma` directory. If your certificate files are located outside that directory, e.g. your project root directory, use relative paths for certificates:

:::note
When you're using a [multi-file Prisma schema](/orm/prisma-schema/overview/location#multi-file-prisma-schema), Prisma ORM resolves SSL certificates relative to the `./prisma/schema` directory.
:::

```prisma
datasource db 
```