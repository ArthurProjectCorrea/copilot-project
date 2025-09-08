---
title: Font Optimization
description: Learn how to optimize fonts in Next.js
related:
  title: API Reference
  description: See the API Reference for the full feature set of Next.js Font
  links:
    - app/api-reference/components/font
---

The [`next/font`](/docs/app/api-reference/components/font) module automatically optimizes your fonts and removes external network requests for improved privacy and performance.

It includes **built-in self-hosting** for any font file. This means you can optimally load web fonts with no layout shift.

To start using `next/font`, import it from [`next/font/local`](#local-fonts) or [`next/font/google`](#google-fonts), call it as a function with the appropriate options, and set the `className` of the element you want to apply the font to. For example:

```tsx filename="app/layout.tsx" highlight= switcher

const geist = Geist()

  return (
    <html lang="en" className=>
      <body></body>
    </html>
  )
}
```

```jsx filename="app/layout.js" highlight= switcher

const geist = Geist()

  return (
    <html className=>
      <body></body>
    </html>
  )
}
```

Fonts are scoped to the component they're used in. To apply a font to your entire application, add it to the [Root Layout](/docs/app/api-reference/file-conventions/layout#root-layout).

## Google fonts

You can automatically self-host any Google Font. Fonts are included stored as static assets and served from the same domain as your deployment, meaning no requests are sent to Google by the browser when the user visits your site.

To start using a Google Font, import your chosen font from `next/font/google`:

```tsx filename="app/layout.tsx" switcher

const geist = Geist()

  children,
}: ) >
      <body></body>
    </html>
  )
}
```

```jsx filename="app/layout.js" switcher

const geist = Geist()

  return (
    <html lang="en" className=>
      <body></body>
    </html>
  )
}
```

We recommend using [variable fonts](https://fonts.google.com/variablefonts) for the best performance and flexibility. But if you can't use a variable font, you will need to specify a weight:

```tsx filename="app/layout.tsx" highlight= switcher

const roboto = Roboto()

  children,
}: ) >
      <body></body>
    </html>
  )
}
```

```jsx filename="app/layout.js"  highlight= switcher

const roboto = Roboto()

  return (
    <html lang="en" className=>
      <body></body>
    </html>
  )
}
```

## Local fonts

To use a local font, import your font from `next/font/local` and specify the [`src`](/docs/app/api-reference/components/font#src) of your local font file. Fonts can be stored in the [`public`](/docs/app/api-reference/file-conventions/public-folder) folder or co-located inside the `app` folder. For example:

```tsx filename="app/layout.tsx" switcher

const myFont = localFont()

  children,
}: ) >
      <body></body>
    </html>
  )
}
```

```jsx filename="app/layout.js" switcher

const myFont = localFont()

  return (
    <html lang="en" className=>
      <body></body>
    </html>
  )
}
```

If you want to use multiple files for a single font family, `src` can be an array:

```js
const roboto = localFont(,
    ,
    ,
    ,
  ],
})
```