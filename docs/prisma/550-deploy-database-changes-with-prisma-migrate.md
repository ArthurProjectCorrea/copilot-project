---
title: 'Deploying database changes with Prisma Migrate'
metaDescription: 'Learn how to deploy database changes with Prisma Migrate.'
sidebar_label: 'Deploying database changes'
---

## Deploying database changes using GitHub Actions

As part of your CI/CD, you can run `prisma migrate deploy` as part of your pipeline to apply pending migrations to your production database.

Here is an example action that will run your migrations against your database:

```yaml file=deploy.yml highlight=17-20 showLineNumbers
name: Deploy
on:
  push:
    paths: //highlight-next-line
      - prisma/migrations/**
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v3
      - name: Install dependencies
        run: npm install
      - name: Apply all pending migrations to the database
        run: npx prisma migrate deploy
        env:
          DATABASE_URL: $}
```

The highlighted line shows that this action will only run if there is a change in the `prisma/migrations` directory, so `npx prisma migrate deploy` will only run when migrations are updated.

Ensure you have the `DATABASE_URL` variable [set as a secret in your repository](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions), without quotes around the connection string.
