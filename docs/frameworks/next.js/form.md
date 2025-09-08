---

title: Form Component
description: Learn how to use the `
)
}

````

```jsx filename="/app/ui/search.js" switcher

  return (

  )
}
````

</AppOnly>

## Reference

The behavior of the `
)
}

````

```jsx filename="/app/page.js" switcher

  return (

  )
}
````

When the user updates the query input field and submits the form, the form data will be encoded into the URL as search params, e.g. `/search?query=abc`.

> **Good to know**: If you pass an empty string `""` to `action`, the form will navigate to the same route with updated search params.

On the results page, you can access the query using the [`searchParams`](/docs/app/api-reference/file-conventions/page#searchparams-optional) `page.js` prop and use it to fetch data from an external source.

```tsx filename="/app/search/page.tsx" switcher

  searchParams,
}: >
})
```

```jsx filename="/app/search/page.js" switcher

  const results = await getSearchResults((await searchParams).query)

  return <div>...</div>
}
```

When the `
)
}

````

```jsx filename="/app/ui/search-button.js" switcher

  return (

  )
}
````

### Mutations with Server Actions

You can perform mutations by passing a function to the `action` prop.

```tsx filename="/app/posts/create/page.tsx" switcher

  return (

  )
}
```

```jsx filename="/app/posts/create/page.js" switcher

  return (

  )
}
```

After a mutation, it's common to redirect to the new resource. You can use the [`redirect`](/docs/app/guides/redirecting) function from `next/navigation` to navigate to the new post page.

> **Good to know**: Since the "destination" of the form submission is not known until the action is executed, `<Form>` cannot automatically prefetch shared UI.

```tsx filename="/app/posts/actions.ts" switcher
'use server'

  // Create a new post
  // ...

  // Redirect to the new post
  redirect(`/posts/$`)
}
```

```jsx filename="/app/posts/actions.js" switcher
'use server'

  // Create a new post
  // ...

  // Redirect to the new post
  redirect(`/posts/$`)
}
```

Then, in the new page, you can fetch data using the `params` prop:

```tsx filename="/app/posts/[id]/page.tsx" switcher

  params,
}: >
})  = await params
  const data = await getPost(id)

  return (
    <div>
      <h1></h1>

    </div>
  )
}
```

```jsx filename="/app/posts/[id]/page.js" switcher

  const  = await params
  const data = await getPost(id)

  return (
    <div>
      <h1></h1>

    </div>
  )
}
```

See the [Server Actions](/docs/app/getting-started/updating-data) docs for more examples.

</AppOnly>
