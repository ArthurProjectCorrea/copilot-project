---
title: ImageResponse
description: API Reference for the ImageResponse constructor.
---

The `ImageResponse` constructor allows you to generate dynamic images using JSX and CSS. This is useful for generating social media images such as Open Graph images, Twitter cards, and more.

## Reference

### Parameters

The following parameters are available for `ImageResponse`:

```jsx

new ImageResponse(
  element: ReactElement,
  options: []
    debug?: boolean = false

    // Options that will be passed to the HTTP response
    status?: number = 200
    statusText?: string
    headers?: Record<string, string>
  },
)
```

> Examples are available in the [Vercel OG Playground](https://og-playground.vercel.app/).

### Supported HTML and CSS features

`ImageResponse` supports common CSS properties including flexbox and absolute positioning, custom fonts, text wrapping, centering, and nested images.

Please refer to [Satori’s documentation](https://github.com/vercel/satori#css) for a list of supported HTML and CSS features.

## Behavior

- `ImageResponse` uses [@vercel/og](https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation), [Satori](https://github.com/vercel/satori), and Resvg to convert HTML and CSS into PNG.
- Only flexbox and a subset of CSS properties are supported. Advanced layouts (e.g. `display: grid`) will not work.
- Maximum bundle size of `500KB`. The bundle size includes your JSX, CSS, fonts, images, and any other assets. If you exceed the limit, consider reducing the size of any assets or fetching at runtime.
- Only `ttf`, `otf`, and `woff` font formats are supported. To maximize the font parsing speed, `ttf` or `otf` are preferred over `woff`.

## Examples

### Route Handlers

`ImageResponse` can be used in Route Handlers to generate images dynamically at request time.

```js filename="app/api/route.js"

  try }
        >
          <div
            style=}
          >
            Welcome to My Site
          </div>
          <div
            style=}
          >
            Generated with Next.js ImageResponse
          </div>
        </div>
      ),

    )
  } catch (e) `)
    return new Response(`Failed to generate the image`, )
  }
}
```

### File-based Metadata

You can use `ImageResponse` in a [`opengraph-image.tsx`](/docs/app/api-reference/file-conventions/metadata/opengraph-image) file to generate Open Graph images at build time or dynamically at request time.

```tsx filename="app/opengraph-image.tsx"

// Image metadata

  width: 1200,
  height: 630,
}

// Image generation

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style=}
      >
        My site
      </div>
    ),
    // ImageResponse options

  )
}
```

### Custom fonts

You can use custom fonts in your `ImageResponse` by providing a `fonts` array in the options.

```tsx filename="app/opengraph-image.tsx"

// Image metadata

  width: 1200,
  height: 630,
}

// Image generation

  // Font loading, process.cwd() is Next.js project directory
  const interSemiBold = await readFile(
    join(process.cwd(), 'assets/Inter-SemiBold.ttf')
  )

  return new ImageResponse(
    (
      // ...
    ),
    // ImageResponse options
    ,
      ],
    }
  )
}
```

## Version History

| Version   | Changes                                               |
| --------- | ----------------------------------------------------- |
| `v14.0.0` | `ImageResponse` moved from `next/server` to `next/og` |
| `v13.3.0` | `ImageResponse` can be imported from `next/server`.   |
| `v13.0.0` | `ImageResponse` introduced via `@vercel/og` package.  |
