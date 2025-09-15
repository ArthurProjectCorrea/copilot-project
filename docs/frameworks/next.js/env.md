---
title: env
description: Learn to add and access environment variables in your Next.js application at build time.
version: legacy
---

To add environment variables to the JavaScript bundle, open `next.config.js` and add the `env` config:

```js filename="next.config.js"
module.exports = ,
}
```

Now you can access `process.env.customKey` in your code. For example:

```jsx
function Page() </h1>
}

```

Next.js will replace `process.env.customKey` with `'my-value'` at build time. Trying to destructure `process.env` variables won't work due to the nature of webpack [DefinePlugin](https://webpack.js.org/plugins/define-plugin/).

For example, the following line:

```jsx
return <h1>The value of customKey is: </h1>;
```

Will end up being:

```jsx
return <h1>The value of customKey is: </h1>;
```
