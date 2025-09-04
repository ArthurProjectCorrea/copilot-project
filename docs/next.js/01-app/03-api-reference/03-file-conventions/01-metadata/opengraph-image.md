---
title: opengraph-image and twitter-image
description: API Reference for the Open Graph Image and Twitter Image file conventions.
---

The `opengraph-image` and `twitter-image` file conventions allow you to set Open Graph and Twitter images for a route segment.

They are useful for setting the images that appear on social networks and messaging apps when a user shares a link to your site.

There are two ways to set Open Graph and Twitter images:

- [Using image files (.jpg, .png, .gif)](#image-files-jpg-png-gif)
- [Using code to generate images (.js, .ts, .tsx)](#generate-images-using-code-js-ts-tsx)

## Image files (.jpg, .png, .gif)

Use an image file to set a route segment's shared image by placing an `opengraph-image` or `twitter-image` image file in the segment.

Next.js will evaluate the file and automatically add the appropriate tags to your app's `<!-- head -->` element.

| File convention                                 | Supported file types            |
| ----------------------------------------------- | ------------------------------- |
| [`opengraph-image`](#opengraph-image)           | `.jpg`, `.jpeg`, `.png`, `.gif` |
| [`twitter-image`](#twitter-image)               | `.jpg`, `.jpeg`, `.png`, `.gif` |
| [`opengraph-image.alt`](#opengraph-imagealttxt) | `.txt`                          |
| [`twitter-image.alt`](#twitter-imagealttxt)     | `.txt`                          |

> **Good to know**:
>
> The `twitter-image` file size must not exceed [5MB](https://developer.x.com/en/docs/x-for-websites/cards/overview/summary), and the `opengraph-image` file size must not exceed [8MB](https://developers.facebook.com/docs/sharing/webmasters/images). If the image file size exceeds these limits, the build will fail.

### `opengraph-image`

Add an `opengraph-image.(jpg|jpeg|png|gif)` image file to any route segment.

```html filename="<!-- head --> output"
<!-- meta -->" />
<!-- meta -->" />
<!-- meta -->" />
<!-- meta -->" />
```

### `twitter-image`

Add a `twitter-image.(jpg|jpeg|png|gif)` image file to any route segment.

```html filename="<!-- head --> output"
<!-- meta -->" />
<!-- meta -->" />
<!-- meta -->" />
<!-- meta -->" />
```

### `opengraph-image.alt.txt`

Add an accompanying `opengraph-image.alt.txt` file in the same route segment as the `opengraph-image.(jpg|jpeg|png|gif)` image it's alt text.

```txt filename="opengraph-image.alt.txt"
About Acme
```

```html filename="<!-- head --> output"
<!-- meta -->
```

### `twitter-image.alt.txt`

Add an accompanying `twitter-image.alt.txt` file in the same route segment as the `twitter-image.(jpg|jpeg|png|gif)` image it's alt text.

```txt filename="twitter-image.alt.txt"
About Acme
```

```html filename="<!-- head --> output"
<!-- meta -->
```

## Generate images using code (.js, .ts, .tsx)

In addition to using [literal image files](#image-files-jpg-png-gif), you can programmatically **generate** images using code.

Generate a route segment's shared image by creating an `opengraph-image` or `twitter-image` route that default exports a function.

| File convention   | Supported file types |
| ----------------- | -------------------- |
| `opengraph-image` | `.js`, `.ts`, `.tsx` |
| `twitter-image`   | `.js`, `.ts`, `.tsx` |

> **Good to know**:
>
> - By default, generated images are [**statically optimized**](/docs/app/getting-started/partial-prerendering#static-rendering) (generated at build time and cached) unless they use [Dynamic APIs](/docs/app/getting-started/partial-prerendering#dynamic-rendering#dynamic-apis) or uncached data.
> - You can generate multiple Images in the same file using [`generateImageMetadata`](/docs/app/api-reference/functions/generate-image-metadata).
> - `opengraph-image.js` and `twitter-image.js` are special Route Handlers that is cached by default unless it uses a [Dynamic API](/docs/app/guides/caching#dynamic-apis) or [dynamic config](/docs/app/guides/caching#segment-config-options) option.

The easiest way to generate an image is to use the [ImageResponse](/docs/app/api-reference/functions/image-response) API from `next/og`.

```tsx filename="app/about/opengraph-image.tsx" switcher




// Image metadata
export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {
  // Font loading, process.cwd() is Next.js project directory
  const interSemiBold = await readFile(
    join(process.cwd(), 'assets/Inter-SemiBold.ttf')
  )

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <!-- div -->
        About Acme

    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: interSemiBold,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  )
}
```

```jsx filename="app/about/opengraph-image.js" switcher




// Image metadata
export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {
  // Font loading, process.cwd() is Next.js project directory
  const interSemiBold = await readFile(
    join(process.cwd(), 'assets/Inter-SemiBold.ttf')
  )

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <!-- div -->
        About Acme

    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: interSemiBold,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  )
}
```

```html filename="<!-- head --> output"
<!-- meta -->" />
<!-- meta -->
<!-- meta -->
<!-- meta -->
<!-- meta -->
```

### Props

The default export function receives the following props:

#### `params` (optional)

An object containing the [dynamic route parameters](/docs/app/api-reference/file-conventions/dynamic-routes) object from the root segment down to the segment `opengraph-image` or `twitter-image` is colocated in.

```tsx filename="app/shop/[slug]/opengraph-image.tsx" switcher
export default function Image({ params }: { params: { slug: string } }) {
  // ...
}
```

```jsx filename="app/shop/[slug]/opengraph-image.js" switcher
export default function Image({ params }) {
  // ...
}
```

| Route                                      | URL         | `params`                  |
| ------------------------------------------ | ----------- | ------------------------- |
| `app/shop/opengraph-image.js`              | `/shop`     | `undefined`               |
| `app/shop/[slug]/opengraph-image.js`       | `/shop/1`   | `{ slug: '1' }`           |
| `app/shop/[tag]/[item]/opengraph-image.js` | `/shop/1/2` | `{ tag: '1', item: '2' }` |

### Returns

The default export function should return a `Blob` | `ArrayBuffer` | `TypedArray` | `DataView` | `ReadableStream` | `Response`.

> **Good to know**: `ImageResponse` satisfies this return type.

### Config exports

You can optionally configure the image's metadata by exporting `alt`, `size`, and `contentType` variables from `opengraph-image` or `twitter-image` route.

| Option                        | Type                                                                                                            |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------- |
| [`alt`](#alt)                 | `string`                                                                                                        |
| [`size`](#size)               | `{ width: number; height: number }`                                                                             |
| [`contentType`](#contenttype) | `string` - [image MIME type](https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/MIME_types#image_types) |

#### `alt`

```tsx filename="opengraph-image.tsx | twitter-image.tsx" switcher
export const alt = 'My images alt text';

export default function Image() {}
```

```jsx filename="opengraph-image.js | twitter-image.js" switcher
export const alt = 'My images alt text';

export default function Image() {}
```

```html filename="<!-- head --> output"
<!-- meta -->
```

#### `size`

```tsx filename="opengraph-image.tsx | twitter-image.tsx" switcher
export const size = { width: 1200, height: 630 };

export default function Image() {}
```

```jsx filename="opengraph-image.js | twitter-image.js" switcher
export const size = { width: 1200, height: 630 };

export default function Image() {}
```

```html filename="<!-- head --> output"
<!-- meta -->
<!-- meta -->
```

#### `contentType`

```tsx filename="opengraph-image.tsx | twitter-image.tsx" switcher
export const contentType = 'image/png';

export default function Image() {}
```

```jsx filename="opengraph-image.js | twitter-image.js" switcher
export const contentType = 'image/png';

export default function Image() {}
```

```html filename="<!-- head --> output"
<!-- meta -->
```

#### Route Segment Config

`opengraph-image` and `twitter-image` are specialized [Route Handlers](/docs/app/api-reference/file-conventions/route) that can use the same [route segment configuration](/docs/app/api-reference/file-conventions/route-segment-config) options as Pages and Layouts.

### Examples

#### Using external data

This example uses the `params` object and external data to generate the image.

> **Good to know**:
> By default, this generated image will be [statically optimized](/docs/app/getting-started/partial-prerendering#static-rendering). You can configure the individual `fetch` [`options`](/docs/app/api-reference/functions/fetch) or route segments [options](/docs/app/api-reference/file-conventions/route-segment-config#revalidate) to change this behavior.

```tsx filename="app/posts/[slug]/opengraph-image.tsx" switcher


export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await fetch(`https://.../posts/${params.slug}`).then((res) =>
    res.json()
  )

  return new ImageResponse(
    (
      <!-- div -->
        {post.title}

    ),
    {
      ...size,
    }
  )
}
```

```jsx filename="app/posts/[slug]/opengraph-image.js" switcher


export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }) {
  const post = await fetch(`https://.../posts/${params.slug}`).then((res) =>
    res.json()
  )

  return new ImageResponse(
    (
      <!-- div -->
        {post.title}

    ),
    {
      ...size,
    }
  )
}
```

#### Using Node.js runtime with local assets

These examples use the Node.js runtime to fetch a local image from the file system and pass it to the `<!-- img -->` `src` attribute, either as a base64 string or an `ArrayBuffer`. Place the local asset relative to the project root, not the example source file.

```tsx filename="app/opengraph-image.tsx" switcher




export default async function Image() {
  const logoData = await readFile(join(process.cwd(), 'logo.png'), 'base64')
  const logoSrc = `data:image/png;base64,${logoData}`

  return new ImageResponse(
    (
      <!-- div -->
        <!-- img -->

    )
  )
}
```

```jsx filename="app/opengraph-image.js" switcher




export default async function Image() {
  const logoData = await readFile(join(process.cwd(), 'logo.png'), 'base64')
  const logoSrc = `data:image/png;base64,${logoData}`

  return new ImageResponse(
    (
      <!-- div -->
        <!-- img -->

    )
  )
}
```

Passing an `ArrayBuffer` to the `src` attribute of an `<!-- img -->` element is not part of the HTML spec. The rendering engine used by `next/og` supports it, but because TypeScript definitions follow the spec, you need a `@ts-expect-error` directive or similar to use this [feature](https://github.com/vercel/satori/issues/606#issuecomment-2144000453).

```tsx filename="app/opengraph-image.tsx" switcher




export default async function Image() {
  const logoData = await readFile(join(process.cwd(), 'logo.png'))
  const logoSrc = Uint8Array.from(logoData).buffer

  return new ImageResponse(
    (
      <!-- div -->
        {/* @ts-expect-error Satori accepts ArrayBuffer/typed arrays for <!-- img --> at runtime */}
        <!-- img -->

    )
  )
}
```

```jsx filename="app/opengraph-image.js" switcher




export default async function Image() {
  const logoData = await readFile(join(process.cwd(), 'logo.png'))
  const logoSrc = Uint8Array.from(logoData).buffer

  return new ImageResponse(
    (
      <!-- div -->
        <!-- img -->

    )
  )
}
```

## Version History

| Version   | Changes                                           |
| --------- | ------------------------------------------------- |
| `v13.3.0` | `opengraph-image` and `twitter-image` introduced. |
