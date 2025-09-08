---
title: generateSitemaps
nav_title: generateSitemaps
description: Learn how to use the generateSiteMaps function to create multiple sitemaps for your application.
related:
  title: Next Steps
  description: Learn how to create sitemaps for your Next.js application.
  links:
    - app/api-reference/file-conventions/metadata/sitemap
---

You can use the `generateSitemaps` function to generate multiple sitemaps for your application.

## Returns

The `generateSitemaps` returns an array of objects with an `id` property.

## URLs

Your generated sitemaps will be available at `/.../sitemap/[id].xml`. For example, `/product/sitemap/1.xml`.

## Example

For example, to split a sitemap using `generateSitemaps`, return an array of objects with the sitemap `id`. Then, use the `id` to generate the unique sitemaps.

```ts filename="app/product/sitemap.ts" switcher

  // Fetch the total number of products and calculate the number of sitemaps needed
  return [, , , ]
}

  id,
}: ): Promise<MetadataRoute.Sitemap>  AND $`
  )
  return products.map((product) => (/product/$`,
    lastModified: product.date,
  }))
}
```

```js filename="app/product/sitemap.js" switcher

  // Fetch the total number of products and calculate the number of sitemaps needed
  return [, , , ]
}

  // Google's limit is 50,000 URLs per sitemap
  const start = id * 50000
  const end = start + 50000
  const products = await getProducts(
    `SELECT id, date FROM products WHERE id BETWEEN $ AND $`
  )
  return products.map((product) => (/product/$`,
    lastModified: product.date,
  }))
}
```

## Version History

| Version   | Changes                                                                                                                                              |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `v15.0.0` | `generateSitemaps` now generates consistent URLs between development and production                                                                  |
| `v13.3.2` | `generateSitemaps` introduced. In development, you can view the generated sitemap on `/.../sitemap.xml/[id]`. For example, `/product/sitemap.xml/1`. |