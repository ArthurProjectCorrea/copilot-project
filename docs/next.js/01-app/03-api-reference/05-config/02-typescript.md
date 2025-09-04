---
title: TypeScript
description: Next.js provides a TypeScript-first development experience for building your React application.
---

{/_ The content of this doc is shared between the app and pages router. You can use the `<!-- PagesOnly -->Content` component to add content that is specific to the Pages Router. Any shared content should not be wrapped in a component. _/}

Next.js comes with built-in TypeScript, automatically installing the necessary packages and configuring the proper settings when you create a new project with `create-next-app`.

To add TypeScript to an existing project, rename a file to `.ts` / `.tsx`. Run `next dev` and `next build` to automatically install the necessary dependencies and add a `tsconfig.json` file with the recommended config options.

> **Good to know**: If you already have a `jsconfig.json` file, copy the `paths` compiler option from the old `jsconfig.json` into the new `tsconfig.json` file, and delete the old `jsconfig.json` file.

<!-- AppOnly -->

## IDE Plugin

Next.js includes a custom TypeScript plugin and type checker, which VSCode and other code editors can use for advanced type-checking and auto-completion.

You can enable the plugin in VS Code by:

1. Opening the command palette (`Ctrl/⌘` + `Shift` + `P`)
2. Searching for "TypeScript: Select TypeScript Version"
3. Selecting "Use Workspace Version"

![Image]

Now, when editing files, the custom plugin will be enabled. When running `next build`, the custom type checker will be used.

The TypeScript plugin can help with:

- Warning if the invalid values for [segment config options](/docs/app/api-reference/file-conventions/route-segment-config) are passed.
- Showing available options and in-context documentation.
- Ensuring the `'use client'` directive is used correctly.
- Ensuring client hooks (like `useState`) are only used in Client Components.

> **🎥 Watch:** Learn about the built-in TypeScript plugin → [YouTube (3 minutes)](https://www.youtube.com/watch?v=pqMqn9fKEf8)

## End-to-End Type Safety

The Next.js App Router has **enhanced type safety**. This includes:

1. **No serialization of data between fetching function and page**: You can `fetch` directly in components, layouts, and pages on the server. This data _does not_ need to be serialized (converted to a string) to be passed to the client side for consumption in React. Instead, since `app` uses Server Components by default, we can use values like `Date`, `Map`, `Set`, and more without any extra steps. Previously, you needed to manually type the boundary between server and client with Next.js-specific types.
2. **Streamlined data flow between components**: With the removal of `_app` in favor of root layouts, it is now easier to visualize the data flow between components and pages. Previously, data flowing between individual `pages` and `_app` were difficult to type and could introduce confusing bugs. With [colocated data fetching](/docs/app/getting-started/fetching-data) in the App Router, this is no longer an issue.

[Data Fetching in Next.js](/docs/app/getting-started/fetching-data) now provides as close to end-to-end type safety as possible without being prescriptive about your database or content provider selection.

We're able to type the response data as you would expect with normal TypeScript. For example:

```tsx filename="app/page.tsx" switcher
async function getData() {
  const res = await fetch('https://api.example.com/...');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  return res.json();
}

export default async function Page() {
  const name = await getData();

  return '...';
}
```

For _complete_ end-to-end type safety, this also requires your database or content provider to support TypeScript. This could be through using an [ORM](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping) or type-safe query builder.

## Route-Aware Type Helpers

Next.js generates global helpers for App Router route types. These are available without imports and are generated during `next dev`, `next build`, or via [`next typegen`](/docs/app/api-reference/cli/next#next-typegen-options):

- [`PageProps`](/docs/app/api-reference/file-conventions/page#page-props-helper)
- [`LayoutProps`](/docs/app/api-reference/file-conventions/layout#layout-props-helper)
- [`RouteContext`](/docs/app/api-reference/file-conventions/route#route-context-helper)

## Examples

### Type checking `next.config.ts`

You can use TypeScript and import types in your Next.js configuration by using `next.config.ts`.

```ts filename="next.config.ts"
const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
```

> **Good to know**: Module resolution in `next.config.ts` is currently limited to `CommonJS`. This may cause incompatibilities with ESM only packages being loaded in `next.config.ts`.

When using the `next.config.js` file, you can add some type checking in your IDE using JSDoc as below:

```js filename="next.config.js"
// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
};

module.exports = nextConfig;
```

### Statically Typed Links

Next.js can statically type links to prevent typos and other errors when using `next/link`, improving type safety when navigating between pages.

Works in both the Pages and App Router for the `href` prop in `next/link`. In the App Router, it also types `next/navigation` methods like `push`, `replace`, and `prefetch`. It does not type `next/router` methods in Pages Router.

Literal `href` strings are validated, while non-literal `href`s may require a cast with `as Route`.

To opt-into this feature, `typedRoutes` need to be enabled and the project needs to be using TypeScript.

```ts filename="next.config.ts"
const nextConfig: NextConfig = {
  typedRoutes: true,
};

export default nextConfig;
```

Next.js will generate a link definition in `.next/types` that contains information about all existing routes in your application, which TypeScript can then use to provide feedback in your editor about invalid links.

> **Good to know**: If you set up your project without `create-next-app`, ensure the generated Next.js types are included by adding `.next/types/**/*.ts` to the `include` array in your `tsconfig.json`:

{/_ prettier-ignore-start _/}

```json filename="tsconfig.json" highlight={4}
{
  "include": ["next-env.d.ts", ".next/types/**/*.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

{/_ prettier-ignore-end _/}

Currently, support includes any string literal, including dynamic segments. For non-literal strings, you need to manually cast with `as Route`. The example below shows both `next/link` and `next/navigation` usage:

```tsx filename="app/example-client.tsx"
'use client'





export default function Example() {
  const router = useRouter()
  const slug = 'nextjs'

  return (
    <>
      {/* Link: literal and dynamic */}
      <!-- Link -->
      <!-- Link -->
      <!-- Link -->
      {/* TypeScript error if href is not a valid route */}
      <!-- Link -->

      {/* Router: literal and dynamic strings are validated */}
      <!-- button --> router.push('/about')}>Push About
      <!-- button --> router.replace(`/blog/${slug}`)}>
        Replace Blog

      <!-- button --> router.prefetch('/contact')}>
        Prefetch Contact


      {/* For non-literal strings, cast to Route */}
      <!-- button --> router.push(('/blog' + slug) as Route)}>
        Push Non-literal Blog

    </>
  )
}
```

The same applies for redirecting routes defined by middleware:

```ts filename="middleware.ts"
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/middleware-redirect') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
```

```tsx filename="app/some/page.tsx"


export default function Page() {
  return <!-- Link -->Link Text
}
```

To accept `href` in a custom component wrapping `next/link`, use a generic:

```tsx



function Card<!-- T -->({ href }: { href: Route<!-- T --> | URL }) {
  return (
    <!-- Link -->
      <!-- div -->My Card

  )
}
```

You can also type a simple data structure and iterate to render links:

```ts filename="components/nav-items.ts"


type NavItem<!-- T --> = {
  href: T
  label: string
}

export const navItems: NavItem<!-- Route -->[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
]
```

Then, map over the items to render `Link`s:

```tsx filename="components/nav.tsx"



export function Nav() {
  return (
    <!-- nav -->
      {navItems.map((item) => (
        <!-- Link -->
          {item.label}

      ))}

  )
}
```

> **How does it work?**
>
> When running `next dev` or `next build`, Next.js generates a hidden `.d.ts` file inside `.next` that contains information about all existing routes in your application (all valid routes as the `href` type of `Link`). This `.d.ts` file is included in `tsconfig.json` and the TypeScript compiler will check that `.d.ts` and provide feedback in your editor about invalid links.

### Type IntelliSense for Environment Variables

During development, Next.js generates a `.d.ts` file in `.next/types` that contains information about the loaded environment variables for your editor's IntelliSense. If the same environment variable key is defined in multiple files, it is deduplicated according to the [Environment Variable Load Order](/docs/app/guides/environment-variables#environment-variable-load-order).

To opt-into this feature, `experimental.typedEnv` needs to be enabled and the project needs to be using TypeScript.

```ts filename="next.config.ts"
const nextConfig: NextConfig = {
  experimental: {
    typedEnv: true,
  },
};

export default nextConfig;
```

> **Good to know**: Types are generated based on the environment variables loaded at development runtime, which excludes variables from `.env.production*` files by default. To include production-specific variables, run `next dev` with `NODE_ENV=production`.

<!-- AppOnly -->

### With Async Server Components

To use an `async` Server Component with TypeScript, ensure you are using TypeScript `5.1.3` or higher and `@types/react` `18.2.8` or higher.

If you are using an older version of TypeScript, you may see a `'Promise<!-- Element -->' is not a valid JSX element` type error. Updating to the latest version of TypeScript and `@types/react` should resolve this issue.

<!-- PagesOnly -->

### Static Generation and Server-side Rendering

For [`getStaticProps`](/docs/pages/api-reference/functions/get-static-props), [`getStaticPaths`](/docs/pages/api-reference/functions/get-static-paths), and [`getServerSideProps`](/docs/pages/api-reference/functions/get-server-side-props), you can use the `GetStaticProps`, `GetStaticPaths`, and `GetServerSideProps` types respectively:

```tsx filename="pages/blog/[slug].tsx"
export const getStaticProps = (async (context) => {
  // ...
}) satisfies GetStaticProps;

export const getStaticPaths = (async () => {
  // ...
}) satisfies GetStaticPaths;

export const getServerSideProps = (async (context) => {
  // ...
}) satisfies GetServerSideProps;
```

> **Good to know:** `satisfies` was added to TypeScript in [4.9](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html). We recommend upgrading to the latest version of TypeScript.

### With API Routes

The following is an example of how to use the built-in types for API routes:

```ts filename="pages/api/hello.ts"
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ name: 'John Doe' });
}
```

You can also type the response data:

```ts filename="pages/api/hello.ts"


type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<!-- Data -->
) {
  res.status(200).json({ name: 'John Doe' })
}
```

### With custom `App`

If you have a [custom `App`](/docs/pages/building-your-application/routing/custom-app), you can use the built-in type `AppProps` and change file name to `./pages/_app.tsx` like so:

```ts


export default function MyApp({ Component, pageProps }: AppProps) {
  return <!-- Component -->
}
```

### Incremental type checking

Since `v10.2.1` Next.js supports [incremental type checking](https://www.typescriptlang.org/tsconfig#incremental) when enabled in your `tsconfig.json`, this can help speed up type checking in larger applications.

### Custom `tsconfig` path

In some cases, you might want to use a different TypeScript configuration for builds or tooling. To do that, set `typescript.tsconfigPath` in `next.config.ts` to point Next.js to another `tsconfig` file.

```ts filename="next.config.ts"
const nextConfig: NextConfig = {
  typescript: {
    tsconfigPath: 'tsconfig.build.json',
  },
};

export default nextConfig;
```

For example, switch to a different config for production builds:

```ts filename="next.config.ts"
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  typescript: {
    tsconfigPath: isProd ? 'tsconfig.build.json' : 'tsconfig.json',
  },
};

export default nextConfig;
```

<!-- details -->
<!-- summary -->Why you might use a separate `tsconfig` for builds

You might need to relax checks in scenarios like monorepos, where the build also validates shared dependencies that don't match your project's standards, or when loosening checks in CI to continue delivering while migrating locally to stricter TypeScript settings (and still wanting your IDE to highlight misuse).

For example, if your project uses `useUnknownInCatchVariables` but some monorepo dependencies still assume `any`:

```json filename="tsconfig.build.json"
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "useUnknownInCatchVariables": false
  }
}
```

This keeps your editor strict via `tsconfig.json` while allowing the production build to use relaxed settings.

> **Good to know**:
>
> - IDEs typically read `tsconfig.json` for diagnostics and IntelliSense, so you can still see IDE warnings while production builds use the alternate config. Mirror critical options if you want parity in the editor.
> - In development, only `tsconfig.json` is watched for changes. If you edit a different file name via `typescript.tsconfigPath`, restart the dev server to apply changes.
> - The configured file is used in `next dev`, `next build`, `next lint`, and `next typegen`.

### Disabling TypeScript errors in production

Next.js fails your **production build** (`next build`) when TypeScript errors are present in your project.

If you'd like Next.js to dangerously produce production code even when your application has errors, you can disable the built-in type checking step.

If disabled, be sure you are running type checks as part of your build or deploy process, otherwise this can be very dangerous.

Open `next.config.ts` and enable the `ignoreBuildErrors` option in the `typescript` config:

```ts filename="next.config.ts"
const nextConfig: NextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
```

> **Good to know**: You can run `tsc --noEmit` to check for TypeScript errors yourself before building. This is useful for CI/CD pipelines where you'd like to check for TypeScript errors before deploying.

### Custom type declarations

When you need to declare custom types, you might be tempted to modify `next-env.d.ts`. However, this file is automatically generated, so any changes you make will be overwritten. Instead, you should create a new file, let's call it `new-types.d.ts`, and reference it in your `tsconfig.json`:

```json filename="tsconfig.json"
{
  "compilerOptions": {
    "skipLibCheck": true
    //...truncated...
  },
  "include": ["new-types.d.ts", "next-env.d.ts", ".next/types/**/*.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

## Version Changes

| Version   | Changes                                                                                                                              |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `v15.0.0` | [`next.config.ts`](#type-checking-nextconfigts) support added for TypeScript projects.                                               |
| `v13.2.0` | Statically typed links are available in beta.                                                                                        |
| `v12.0.0` | [SWC](/docs/architecture/nextjs-compiler) is now used by default to compile TypeScript and TSX for faster builds.                    |
| `v10.2.1` | [Incremental type checking](https://www.typescriptlang.org/tsconfig#incremental) support added when enabled in your `tsconfig.json`. |
