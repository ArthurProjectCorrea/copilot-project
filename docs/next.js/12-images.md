---
title: Image Optimization
description: Learn how to optimize images in Next.js
related:
  title: API Reference
  description: See the API Reference for the full feature set of Next.js Image.
  links:
    - app/api-reference/components/image
---

The Next.js [`<Image>`](/docs/app/api-reference/components/image) component extends the HTML `<img>` element to provide:

- **Size optimization:** Automatically serving correctly sized images for each device, using modern image formats like WebP.
- **Visual stability:** Preventing [layout shift](https://web.dev/articles/cls) automatically when images are loading.
- **Faster page loads:** Only loading images when they enter the viewport using native browser lazy loading, with optional blur-up placeholders.
- **Asset flexibility:** Resizing images on-demand, even images stored on remote servers.

To start using `<Image>`, import it from `next/image` and render it within your component.

```tsx filename="app/page.tsx" switcher

  return
}
```

```jsx filename="app/page.js" switcher

  return
}
```

The `src` property can be a [local](#local-images) or [remote](#remote-images) image.

> **🎥 Watch:** Learn more about how to use `next/image` → [YouTube (9 minutes)](https://youtu.be/IU_qq_c_lKA).

## Local images

You can store static files, like images and fonts, under a folder called [`public`](/docs/app/api-reference/file-conventions/public-folder) in the root directory. Files inside `public` can then be referenced by your code starting from the base URL (`/`).

```tsx filename="app/page.tsx" switcher

  return (

  )
}
```

```jsx filename="app/page.js" switcher

  return (

  )
}
```

If the image is statically imported, Next.js will automatically determine the intrinsic [`width`](/docs/app/api-reference/components/image#width-and-height) and [`height`](/docs/app/api-reference/components/image#width-and-height). These values are used to determine the image ratio and prevent [Cumulative Layout Shift](https://web.dev/articles/cls) while your image is loading.

```tsx filename="app/page.tsx" switcher

  return (

  )
}
```

```jsx filename="app/page.js" switcher

  return (

  )
}
```

## Remote images

To use a remote image, you can provide a URL string for the `src` property.

```tsx filename="app/page.tsx" switcher

  return (

  )
}
```

```jsx filename="app/page.js" switcher

  return (

  )
}
```

Since Next.js does not have access to remote files during the build process, you'll need to provide the [`width`](/docs/app/api-reference/components/image#width-and-height), [`height`](/docs/app/api-reference/components/image#width-and-height) and optional [`blurDataURL`](/docs/app/api-reference/components/image#blurdataurl) props manually. The `width` and `height` are used to infer the correct aspect ratio of image and avoid layout shift from the image loading in. Alternatively, you can use the [`fill` property](/docs/app/api-reference/components/image#fill) to make the image fill the size of the parent element.

To safely allow images from remote servers, you need to define a list of supported URL patterns in [`next.config.js`](/docs/app/api-reference/config/next-config-js). Be as specific as possible to prevent malicious usage. For example, the following configuration will only allow images from a specific AWS S3 bucket:

```ts filename="next.config.ts" switcher

const config: NextConfig = ,
    ],
  },
}

```

```js filename="next.config.js" switcher
module.exports = ,
    ],
  },
}
```
