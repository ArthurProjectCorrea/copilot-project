---
title: Link Component
description: Enable fast client-side navigation with the built-in `next/link` component.
---

`
}

````

```jsx filename="app/page.js" switcher

  return
}
````

</AppOnly>

## Reference

The following props can be passed to the `
)
}

````

```jsx filename="app/page.js" switcher

// Navigate to /about?name=test

  return (

  )
}
````

</AppOnly>

### `replace`

**Defaults to `false`.** When `true`, `next/link` will replace the current history state instead of adding a new URL into the [browser's history](https://developer.mozilla.org/docs/Web/API/History_API) stack.

### `scroll`

**Defaults to `true`.** The default scrolling behavior of `
)
}

````

```jsx filename="app/page.js" switcher

  return (

  )
}
````

</AppOnly>

### `prefetch`

### `onNavigate`

An event handler called during client-side navigation. The handler receives an event object that includes a `preventDefault()` method, allowing you to cancel the navigation if needed.

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

> **Good to know**: While `onClick` and `onNavigate` may seem similar, they serve different purposes. `onClick` executes for all click events, while `onNavigate` only runs during client-side navigation. Some key differences:
>
> - When using modifier keys (`Ctrl`/`Cmd` + Click), `onClick` executes but `onNavigate` doesn't since Next.js prevents default navigation for new tabs.
> - External URLs won't trigger `onNavigate` since it's only for client-side and same-origin navigations.
> - Links with the `download` attribute will work with `onClick` but not `onNavigate` since the browser will treat the linked URL as a download.

## Examples

The following examples demonstrate how to use the `
</li>
))}
</ul>
)
}

````

```jsx filename="app/blog/post-list.js" switcher

  return (
    <ul>
      >

        </li>
      ))}
    </ul>
  )
}
````

### Checking active links

You can use [`usePathname()`](/docs/app/api-reference/functions/use-pathname) to determine if a link is active. For example, to add a class to the active link, you can check if the current `pathname` matches the `href` of the link:

```tsx filename="app/ui/nav-links.tsx" switcher
'use client'

  const pathname = usePathname()

  return (
    <nav>

    </nav>
  )
}
```

```jsx filename="app/ui/nav-links.js" switcher
'use client'

  const pathname = usePathname()

  return (
    <nav>

    </nav>
  )
}
```

</AppOnly>

### Scrolling to an `id`

If you'd like to scroll to a specific `id` on navigation, you can append your URL with a `#` hash link or just pass a hash link to the `href` prop. This is possible since `

// Output
<a href="/dashboard#settings">Settings</a>

```

### Replace the URL instead of push

The default behavior of the `Link` component is to `push` a new URL into the `history` stack. You can use the `replace` prop to prevent adding a new entry, as in the following example:

### Disable scrolling to the top of the page

### Prefetching links in Middleware

It's common to use [Middleware](/docs/app/api-reference/file-conventions/middleware) for authentication or other purposes that involve rewriting the user to a different page. In order for the `
  )
}
```

```js filename="app/page.js" switcher
'use client'

import useIsAuthed from './hooks/useIsAuthed' // Your auth hook

  const isAuthed = useIsAuthed()
  const path = isAuthed ? '/auth/dashboard' : '/public/dashboard'
  return (

  )
}
```

</AppOnly>

## Version history

| Version   | Changes                                                                                                                                                                      |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `v15.4.0` | Add `auto` as an alias to the default `prefetch` behavior.                                                                                                                   |
| `v15.3.0` | Add `onNavigate` API                                                                                                                                                         |
| `v13.0.0` | No longer requires a child `<a>` tag. A [codemod](/docs/app/guides/upgrading/codemods#remove-a-tags-from-link-components) is provided to automatically update your codebase. |
| `v10.0.0` | `href` props pointing to a dynamic route are automatically resolved and no longer require an `as` prop.                                                                      |
| `v8.0.0`  | Improved prefetching performance.                                                                                                                                            |
| `v1.0.0`  | `next/link` introduced.                                                                                                                                                      |
