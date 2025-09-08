---
title: How to set up Vitest with Next.js
nav_title: Vitest
description: Learn how to set up Vitest with Next.js for Unit Testing.
---

Vitest and React Testing Library are frequently used together for **Unit Testing**. This guide will show you how to setup Vitest with Next.js and write your first tests.

> **Good to know:** Since `async` Server Components are new to the React ecosystem, Vitest currently does not support them. While you can still run **unit tests** for synchronous Server and Client Components, we recommend using **E2E tests** for `async` components.

## Quickstart

You can use `create-next-app` with the Next.js [with-vitest](https://github.com/vercel/next.js/tree/canary/examples/with-vitest) example to quickly get started:

```bash filename="Terminal"
npx create-next-app@latest --example with-vitest with-vitest-app
```

## Manual Setup

To manually set up Vitest, install `vitest` and the following packages as dev dependencies:

```bash filename="Terminal"
# Using TypeScript
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom vite-tsconfig-paths
# Using JavaScript
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom
```

Create a `vitest.config.mts|js` file in the root of your project, and add the following options:

```ts filename="vitest.config.mts" switcher

  plugins: [tsconfigPaths(), react()],
  test: ,
})
```

```js filename="vitest.config.js" switcher

  plugins: [react()],
  test: ,
})
```

For more information on configuring Vitest, please refer to the [Vitest Configuration](https://vitest.dev/config/#configuration) docs.

Then, add a `test` script to your `package.json`:

```json filename="package.json"

}
```

When you run `npm run test`, Vitest will **watch** for changes in your project by default.

## Creating your first Vitest Unit Test

Check that everything is working by creating a test to check if the `` component successfully renders a heading:

## Running your tests

Then, run the following command to run your tests:

```bash filename="Terminal"
npm run test
# or
yarn test
# or
pnpm test
# or
bun test
```

## Additional Resources

You may find these resources helpful:

- [Next.js with Vitest example](https://github.com/vercel/next.js/tree/canary/examples/with-vitest)
- [Vitest Docs](https://vitest.dev/guide/)
- [React Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)