---
title: generateImageMetadata
description: Learn how to generate multiple images in a single Metadata API special file.
related:
  title: Next Steps
  description: View all the Metadata API options.
  links:
    - app/api-reference/file-conventions/metadata
---

You can use `generateImageMetadata` to generate different versions of one image or return multiple images for one route segment. This is useful for when you want to avoid hard-coding metadata values, such as for icons.

## Parameters

`generateImageMetadata` function accepts the following parameters:

#### `params` (optional)

An object containing the [dynamic route parameters](/docs/app/api-reference/file-conventions/dynamic-routes) object from the root segment down to the segment `generateImageMetadata` is called from.

```tsx filename="icon.tsx" switcher

  params,
}:
})
```

```jsx filename="icon.js" switcher

  // ...
}
```

| Route                           | URL         | `params`    |
| ------------------------------- | ----------- | ----------- |
| `app/shop/icon.js`              | `/shop`     | `undefined` |
| `app/shop/[slug]/icon.js`       | `/shop/1`   | ``          |
| `app/shop/[tag]/[item]/icon.js` | `/shop/1/2` | ``          |

## Returns

The `generateImageMetadata` function should return an `array` of objects containing the image's metadata such as `alt` and `size`. In addition, each item **must** include an `id` value which will be passed to the props of the image generating function.

| Image Metadata Object | Type                |
| --------------------- | ------------------- |
| `id`                  | `string` (required) |
| `alt`                 | `string`            |
| `size`                | ``                  |
| `contentType`         | `string`            |

```tsx filename="icon.tsx" switcher

  return [
    ,
      id: 'small',
    },
    ,
      id: 'medium',
    },
  ]
}

  return new ImageResponse(
    (
      <div
        style=}
      >
        Icon
      </div>
    )
  )
}
```

```jsx filename="icon.js" switcher

  return [
    ,
      id: 'small',
    },
    ,
      id: 'medium',
    },
  ]
}

  return new ImageResponse(
    (
      <div
        style=}
      >
        Icon
      </div>
    )
  )
}
```

### Examples

#### Using external data

This example uses the `params` object and external data to generate multiple [Open Graph images](/docs/app/api-reference/file-conventions/metadata/opengraph-image) for a route segment.

```tsx filename="app/products/[id]/opengraph-image.tsx" switcher

  params,
}:
}) ,
    alt: image.text,
    contentType: 'image/png',
  }))
}

  params,
  id,
}:
  id: number
})
        }
      >

      </div>
    )
  )
}
```

```jsx filename="app/products/[id]/opengraph-image.js" switcher

  const images = await getOGImages(params.id)

  return images.map((image, idx) => (,
    alt: image.text,
    contentType: 'image/png',
  }))
}

  const productId = (await params).id
  const imageId = id
  const text = await getCaptionForImage(productId, imageId)

  return new ImageResponse(
    (
      <div
        style=
        }
      >

      </div>
    )
  )
}
```

## Version History

| Version   | Changes                             |
| --------- | ----------------------------------- |
| `v13.3.0` | `generateImageMetadata` introduced. |
