---
title: How to use markdown and MDX in Next.js
nav_title: MDX
description: Learn how to configure MDX and use it in your Next.js apps.
---

[Markdown](https://daringfireball.net/projects/markdown/syntax) is a lightweight markup language used to format text. It allows you to write using plain text syntax and convert it to structurally valid HTML. It's commonly used for writing content on websites and blogs.

You write...

```md
I **love** using [Next.js](https://nextjs.org/)
```

Output:

```html
<p>I <strong>love</strong> using <a href="https://nextjs.org/">Next.js</a></p>
```

[MDX](https://mdxjs.com/) is a superset of markdown that lets you write [JSX](https://react.dev/learn/writing-markup-with-jsx) directly in your markdown files. It is a powerful way to add dynamic interactivity and embed React components within your content.

Next.js can support both local MDX content inside your application, as well as remote MDX files fetched dynamically on the server. The Next.js plugin handles transforming markdown and React components into HTML, including support for usage in Server Components (the default in App Router).

> **Good to know**: View the [Portfolio Starter Kit](https://vercel.com/templates/next.js/portfolio-starter-kit) template for a complete working example.

## Install dependencies

The `@next/mdx` package, and related packages, are used to configure Next.js so it can process markdown and MDX. **It sources data from local files**, allowing you to create pages with a `.md` or `.mdx` extension, directly in your `/pages` or `/app` directory.

Install these packages to render MDX with Next.js:

```bash filename="Terminal"
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
```

## Configure `next.config.mjs`

Update the `next.config.mjs` file at your project's root to configure it to use MDX:

```js filename="next.config.mjs"

/** @type  */
const nextConfig =

const withMDX = createMDX()

// Merge MDX config with Next.js config

```

This allows `.mdx` files to act as pages, routes, or imports in your application.

### Handling `.md` files

By default, `next/mdx` only compiles files with the `.mdx` extension. To handle `.md` files with webpack, update the `extension` option:

```js filename="next.config.mjs"
const withMDX = createMDX();
```

## Add an `mdx-components.tsx` file

Create an `mdx-components.tsx` (or `.js`) file in the root of your project to define global MDX Components. For example, at the same level as `pages` or `app`, or inside `src` if applicable.

```tsx filename="mdx-components.tsx" switcher

const components: MDXComponents =

  return components
}
```

```js filename="mdx-components.js" switcher
const components =

  return components
}
```

> **Good to know**:
>
> - `mdx-components.tsx` is **required** to use `@next/mdx` with App Router and will not work without it.
> - Learn more about the [`mdx-components.tsx` file convention](/docs/app/api-reference/file-conventions/mdx-components).
> - Learn how to [use custom styles and components](#using-custom-styles-and-components).

## Rendering MDX

You can render MDX using Next.js's file based routing or by importing MDX files into other pages.

### Using file based routing

When using file based routing, you can use MDX pages like any other page.

You can use MDX in these files, and even import React components, directly inside your MDX page:

```mdx
# Welcome to my MDX page!

This is some **bold** and _italics_ text.

This is a list in markdown:

- One
- Two
- Three

Checkout my React component:
```

Navigating to the `/mdx-page` route should display your rendered MDX page.

### Using imports

You can use MDX in these files, and even import React components, directly inside your MDX page:

```mdx filename="markdown/welcome.mdx" switcher
# Welcome to my MDX page!

This is some **bold** and _italics_ text.

This is a list in markdown:

- One
- Two
- Three

Checkout my React component:
```

Import the MDX file inside the page to display the content:

Navigating to the `/mdx-page` route should display your rendered MDX page.

## Using custom styles and components

Markdown, when rendered, maps to native HTML elements. For example, writing the following markdown:

```md
## This is a heading

This is a list in markdown:

- One
- Two
- Three
```

Generates the following HTML:

```html
<h2>This is a heading</h2>

<p>This is a list in markdown:</p>

<ul>
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</ul>
```

To style your markdown, you can provide custom components that map to the generated HTML elements. Styles and components can be implemented globally, locally, and with shared layouts.

### Global styles and components

Adding styles and components in `mdx-components.tsx` will affect _all_ MDX files in your application.

```tsx filename="mdx-components.tsx" switcher

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

const components = ) => (
    <h1 style=}></h1>
  ),
  img: (props) => (

  ),
} satisfies MDXComponents

  return components
}
```

```js filename="mdx-components.js" switcher

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

const components = ) => (
    <h1 style=}></h1>
  ),
  img: (props) => (

  ),
}

  return components
}
```

### Local styles and components

You can apply local styles and components to specific pages by passing them into imported MDX components. These will merge with and override [global styles and components](#global-styles-and-components).

### Shared layouts

### Using Tailwind typography plugin

If you are using [Tailwind](https://tailwindcss.com) to style your application, using the [`@tailwindcss/typography` plugin](https://tailwindcss.com/docs/plugins#typography) will allow you to reuse your Tailwind configuration and styles in your markdown files.

The plugin adds a set of `prose` classes that can be used to add typographic styles to content blocks that come from sources, like markdown.

[Install Tailwind typography](https://github.com/tailwindlabs/tailwindcss-typography?tab=readme-ov-file#installation) and use with [shared layouts](#shared-layouts) to add the `prose` you want.

A common use case for this is when you want to iterate over a collection of MDX and extract data. For example, creating a blog index page from all blog posts. You can use packages like [Node's `fs` module](https://nodejs.org/api/fs.html) or [globby](https://www.npmjs.com/package/globby) to read a directory of posts and extract the metadata.

> **Good to know**:
>
> - Using `fs`, `globby`, etc. can only be used server-side.
> - View the [Portfolio Starter Kit](https://vercel.com/templates/next.js/portfolio-starter-kit) template for a complete working example.

## remark and rehype Plugins

You can optionally provide remark and rehype plugins to transform the MDX content.

For example, you can use [`remark-gfm`](https://github.com/remarkjs/remark-gfm) to support GitHub Flavored Markdown.

Since the remark and rehype ecosystem is ESM only, you'll need to use `next.config.mjs` or `next.config.ts` as the configuration file.

```js filename="next.config.mjs"

/** @type  */
const nextConfig =

const withMDX = createMDX(,
})

// Combine MDX and Next.js config

```

### Using Plugins with Turbopack

To use plugins with [Turbopack](/docs/app/api-reference/turbopack), upgrade to the latest `@next/mdx` and specify plugin names using a string:

```js filename="next.config.mjs"

/** @type  */
const nextConfig =

const withMDX = createMDX(],
    ],
    rehypePlugins: [
      // Without options
      'rehype-slug',
      // With options
      ['rehype-katex', ],
    ],
  },
})

```

> **Good to know**:
>
> remark and rehype plugins without serializable options cannot be used yet with [Turbopack](/docs/app/api-reference/turbopack), because JavaScript functions can't be passed to Rust.

## Remote MDX

If your MDX files or content lives _somewhere else_, you can fetch it dynamically on the server. This is useful for content stored in a CMS, database, or anywhere else. A community package for this use is [`next-mdx-remote-client`](https://github.com/ipikuka/next-mdx-remote-client?tab=readme-ov-file#the-part-associated-with-nextjs-app-router).

> **Good to know**: Please proceed with caution. MDX compiles to JavaScript and is executed on the server. You should only fetch MDX content from a trusted source, otherwise this can lead to remote code execution (RCE).

The following example uses `next-mdx-remote-client`:

Navigating to the `/mdx-page-remote` route should display your rendered MDX.

## Deep Dive: How do you transform markdown into HTML?

React does not natively understand markdown. The markdown plaintext needs to first be transformed into HTML. This can be accomplished with `remark` and `rehype`.

`remark` is an ecosystem of tools around markdown. `rehype` is the same, but for HTML. For example, the following code snippet transforms markdown into HTML:

```js

main()

async function main()
```

The `remark` and `rehype` ecosystem contains plugins for [syntax highlighting](https://github.com/atomiks/rehype-pretty-code), [linking headings](https://github.com/rehypejs/rehype-autolink-headings), [generating a table of contents](https://github.com/remarkjs/remark-toc), and more.

When using `@next/mdx` as shown above, you **do not** need to use `remark` or `rehype` directly, as it is handled for you. We're describing it here for a deeper understanding of what the `@next/mdx` package is doing underneath.

## Using the Rust-based MDX compiler (experimental)

Next.js supports a new MDX compiler written in Rust. This compiler is still experimental and is not recommended for production use. To use the new compiler, you need to configure `next.config.js` when you pass it to `withMDX`:

```js filename="next.config.js"
module.exports = withMDX(,
})
```

`mdxRs` also accepts an object to configure how to transform mdx files.

```js filename="next.config.js"
module.exports = withMDX(,
  },
})
```

## Helpful Links

- [MDX](https://mdxjs.com)
- [`@next/mdx`](https://www.npmjs.com/package/@next/mdx)
- [remark](https://github.com/remarkjs/remark)
- [rehype](https://github.com/rehypejs/rehype)
- [Markdoc](https://markdoc.dev/docs/nextjs)
