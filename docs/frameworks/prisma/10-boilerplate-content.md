---
title: 'Boilerplate content'
metaTitle: 'Boilerplate content'
metaDescription: 'Boilerplate content for the Prisma docs.'
tocDepth: 3
hidePage: false
search: false
toc: true
---

### To introduce a preview feature

````md
To enable this feature, add `namedConstraints` to `previewFeatures` in your schema:

```prisma highlight=3;normal
generator client 
```
````

### To make a recommendation

If it is a recommendation made by Prisma, use:

> "**We recommend that** you share a single instance of `PrismaClient` across your application."

If it is an industry standard, use:

> "**It is recommended practice to** limit the number of database connections to X."