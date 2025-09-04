---
title: forbidden.js
description: API reference for the forbidden.js special file.
related:
  links:
    - app/api-reference/functions/forbidden
version: experimental
---

The **forbidden** file is used to render UI when the [`forbidden`](/docs/app/api-reference/functions/forbidden) function is invoked during authentication. Along with allowing you to customize the UI, Next.js will return a `403` status code.

```tsx filename="app/forbidden.tsx" switcher


export default function Forbidden() {
  return (
    <!-- div -->
      <!-- h2 -->Forbidden
      <!-- p -->You are not authorized to access this resource.
      <!-- Link -->Return Home

  )
}
```

```jsx filename="app/forbidden.jsx" switcher


export default function Forbidden() {
  return (
    <!-- div -->
      <!-- h2 -->Forbidden
      <!-- p -->You are not authorized to access this resource.
      <!-- Link -->Return Home

  )
}
```

## Reference

### Props

`forbidden.js` components do not accept any props.

## Version History

| Version   | Changes                    |
| --------- | -------------------------- |
| `v15.1.0` | `forbidden.js` introduced. |
