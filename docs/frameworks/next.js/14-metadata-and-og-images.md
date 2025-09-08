---
title: Metadata and OG images
description: Learn how to add metadata to your pages and create dynamic OG images.
related:
  title: API Reference
  description: Learn more about the Metadata APIs mentioned in this page.
  links:
    - app/api-reference/functions/generate-metadata
    - app/api-reference/functions/generate-viewport
    - app/api-reference/functions/image-response
    - app/api-reference/file-conventions/metadata
    - app/api-reference/file-conventions/metadata/app-icons
    - app/api-reference/file-conventions/metadata/opengraph-image
    - app/api-reference/file-conventions/metadata/robots
    - app/api-reference/file-conventions/metadata/sitemap
---

The Metadata APIs can be used to define your application metadata for improved SEO and web shareability and include:

1. [The static `metadata` object](#static-metadata)
2. [The dynamic `generateMetadata` function](#generated-metadata)
3. Special [file conventions](/docs/app/api-reference/file-conventions/metadata) that can be used to add static or dynamically generated [favicons](#favicons) and [OG images](#static-open-graph-images).

With all the options above, Next.js will automatically generate the relevant `<head>` tags for your page, which can be inspected in the browser's developer tools.

The `metadata` object and `generateMetadata` function exports are only supported in Server Components.

## Default fields

There are two default `meta` tags that are always added even if a route doesn't define metadata:

- The [meta charset tag](https://developer.mozilla.org/docs/Web/HTML/Element/meta#attr-charset) sets the character encoding for the website.
- The [meta viewport tag](https://developer.mozilla.org/docs/Web/HTML/Viewport_meta_tag) sets the viewport width and scale for the website to adjust for different devices.

```html
<meta charset="utf-8" /> <meta name="viewport" content="width=device-width, initial-scale=1" />
```

The other metadata fields can be defined with the `Metadata` object (for [static metadata](#static-metadata)) or the `generateMetadata` function (for [generated metadata](#generated-metadata)).

## Static metadata

To define static metadata, export a [`Metadata` object](/docs/app/api-reference/functions/generate-metadata#metadata-object) from a static [`layout.js`](/docs/app/api-reference/file-conventions/layout) or [`page.js`](/docs/app/api-reference/file-conventions/page) file. For example, to add a title and description to the blog route:

```tsx filename="app/blog/layout.tsx" switcher

  title: 'My Blog',
  description: '...',
}

```

```jsx filename="app/blog/layout.js" switcher

  title: 'My Blog',
  description: '...',
}

```

You can view a full list of available options, in the [`generateMetadata` documentation](/docs/app/api-reference/functions/generate-metadata#metadata-fields).

## Generated metadata

You can use [`generateMetadata`](/docs/app/api-reference/functions/generate-metadata) function to `fetch` metadata that depends on data. For example, to fetch the title and description for a specific blog post:

```tsx filename="app/blog/[slug]/page.tsx" switcher

type Props = >
  searchParams: Promise<>
}

  : Props,
  parent: ResolvingMetadata
): Promise<Metadata> `).then((res) =>
    res.json()
  )

  return
}

```

```jsx filename="app/blog/[slug]/page.js" switcher

  const slug = (await params).slug

  // fetch post information
  const post = await fetch(`https://api.vercel.app/blog/$`).then((res) =>
    res.json()
  )

  return
}

```

### Streaming metadata

For dynamically rendered pages, if resolving `generateMetadata` might block rendering, Next.js streams the resolved metadata separately and injects it into the HTML as soon as it's ready.

Statically rendered pages don’t use this behavior since metadata is resolved at build time.

Learn more about [streaming metadata](/docs/app/api-reference/functions/generate-metadata#streaming-metadata).

### Memoizing data requests

There may be cases where you need to fetch the **same** data for metadata and the page itself. To avoid duplicate requests, you can use React's [`cache` function](https://react.dev/reference/react/cache) to memoize the return value and only fetch the data once. For example, to fetch the blog post information for both the metadata and the page:

```ts filename="app/lib/data.ts" highlight= switcher

// getPost will be used twice, but execute only once

  const res = await db.query.posts.findFirst()
  return res
})
```

```js filename="app/lib/data.js" highlight= switcher

// getPost will be used twice, but execute only once

  const res = await db.query.posts.findFirst()
  return res
})
```

```tsx filename="app/blog/[slug]/page.tsx" switcher

  params,
}:
})
}

  const post = await getPost(params.slug)
  return <div></div>
}
```

```jsx filename="app/blog/[slug]/page.js" switcher

  const post = await getPost(params.slug)
  return
}

  const post = await getPost(params.slug)
  return <div></div>
}
```

## File-based metadata

The following special files are available for metadata:

- [favicon.ico, apple-icon.jpg, and icon.jpg](/docs/app/api-reference/file-conventions/metadata/app-icons)
- [opengraph-image.jpg and twitter-image.jpg](/docs/app/api-reference/file-conventions/metadata/opengraph-image)
- [robots.txt](/docs/app/api-reference/file-conventions/metadata/robots)
- [sitemap.xml](/docs/app/api-reference/file-conventions/metadata/sitemap)

You can use these for static metadata, or you can programmatically generate these files with code.

## Favicons

Favicons are small icons that represent your site in bookmarks and search results. To add a favicon to your application, create a `favicon.ico` and add to the root of the app folder.

> You can also programmatically generate favicons using code. See the [favicon docs](/docs/app/api-reference/file-conventions/metadata/app-icons) for more information.

## Static Open Graph images

Open Graph (OG) images are images that represent your site in social media. To add a static OG image to your application, create a `opengraph-image.png` file in the root of the app folder.

You can also add OG images for specific routes by creating a `opengraph-image.png` deeper down the folder structure. For example, to create an OG image specific to the `/blog` route, add a `opengraph-image.jpg` file inside the `blog` folder.

The more specific image will take precedence over any OG images above it in the folder structure.

> Other image formats such as `jpeg`, `png`, and `gif` are also supported. See the [Open Graph Image docs](/docs/app/api-reference/file-conventions/metadata/opengraph-image) for more information.

## Generated Open Graph images

The [`ImageResponse` constructor](/docs/app/api-reference/functions/image-response) allows you to generate dynamic images using JSX and CSS. This is useful for OG images that depend on data.

For example, to generate a unique OG image for each blog post, add a `opengraph-image.tsx` file inside the `blog` folder, and import the `ImageResponse` constructor from `next/og`:

```tsx filename="app/blog/[slug]/opengraph-image.tsx" switcher

// Image metadata

  width: 1200,
  height: 630,
}

// Image generation

  const post = await getPost(params.slug)

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style=}
      >

      </div>
    )
  )
}
```

```jsx filename="app/blog/[slug]/opengraph-image.js" switcher

// Image metadata

  width: 1200,
  height: 630,
}

// Image generation

  const post = await getPost(params.slug)

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style=}
      >

      </div>
    )
  )
}
```

`ImageResponse` supports common CSS properties including flexbox and absolute positioning, custom fonts, text wrapping, centering, and nested images. [See the full list of supported CSS properties](/docs/app/api-reference/functions/image-response).

> **Good to know**:
>
> - Examples are available in the [Vercel OG Playground](https://og-playground.vercel.app/).
> - `ImageResponse` uses [`@vercel/og`](https://vercel.com/docs/og-image-generation), [`satori`](https://github.com/vercel/satori), and `resvg` to convert HTML and CSS into PNG.
> - Only flexbox and a subset of CSS properties are supported. Advanced layouts (e.g. `display: grid`) will not work.
