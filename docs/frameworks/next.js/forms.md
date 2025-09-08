---
title: How to create forms with Server Actions
nav_title: Forms
description: Learn how to create forms in Next.js with React Server Actions.
---

React Server Actions are [Server Functions](https://react.dev/reference/rsc/server-functions) that execute on the server. They can be called in Server and Client Components to handle form submissions. This guide will walk you through how to create forms in Next.js with Server Actions.

## How it works

React extends the HTML [`<form>`](https://developer.mozilla.org/docs/Web/HTML/Element/form) element to allow Server Actions to be invoked with the [`action`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form#action) attribute.

When used in a form, the function automatically receives the [`FormData`](https://developer.mozilla.org/docs/Web/API/FormData/FormData) object. You can then extract the data using the native [`FormData` methods](https://developer.mozilla.org/en-US/docs/Web/API/FormData#instance_methods):

```tsx filename="app/invoices/page.tsx" switcher

  async function createInvoice(formData: FormData)

    // mutate data
    // revalidate the cache
  }

  return <form action=>...</form>
}
```

```jsx filename="app/invoices/page.js" switcher

  async function createInvoice(formData)

    // mutate data
    // revalidate the cache
  }

  return <form action=>...</form>
}
```

> **Good to know:** When working with forms that have multiple fields, you can use the [`entries()`](https://developer.mozilla.org/en-US/docs/Web/API/FormData/entries) method with JavaScript's [`Object.fromEntries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries). For example: `const rawFormData = Object.fromEntries(formData)`.

## Passing additional arguments

Outside of form fields, you can pass additional arguments to a Server Function using the JavaScript [`bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) method. For example, to pass the `userId` argument to the `updateUser` Server Function:

```tsx filename="app/client-component.tsx" highlight= switcher
'use client'

  const updateUserWithId = updateUser.bind(null, userId)

  return (
    <form action=>
      <input type="text" name="name" />
      <button type="submit">Update User Name</button>
    </form>
  )
}
```

```jsx filename="app/client-component.js" highlight= switcher
'use client'

  const updateUserWithId = updateUser.bind(null, userId)

  return (
    <form action=>
      <input type="text" name="name" />
      <button type="submit">Update User Name</button>
    </form>
  )
}
```

The Server Function will receive the `userId` as an additional argument:

```ts filename="app/actions.ts" switcher
'use server';
```

```js filename="app/actions.js" switcher
'use server';
```

> **Good to know**:
>
> - An alternative is to pass arguments as hidden input fields in the form (e.g. `<input type="hidden" name="userId" value= />`). However, the value will be part of the rendered HTML and will not be encoded.
> - `bind` works in both Server and Client Components and supports progressive enhancement.

## Form validation

Forms can be validated on the client or server.

- For **client-side validation**, you can use the HTML attributes like `required` and `type="email"` for basic validation.
- For **server-side validation**, you can use a library like [zod](https://zod.dev/) to validate the form fields. For example:

```tsx filename="app/actions.ts" switcher
'use server'

const schema = z.object(),
})

  const validatedFields = schema.safeParse()

  // Return early if the form data is invalid
  if (!validatedFields.success)
  }

  // Mutate data
}
```

```jsx filename="app/actions.js" switcher
'use server'

const schema = z.object(),
})

  const validatedFields = schema.safeParse()

  // Return early if the form data is invalid
  if (!validatedFields.success)
  }

  // Mutate data
}
```

## Validation errors

To display validation errors or messages, turn the component that defines the `<form>` into a Client Component and use React [`useActionState`](https://react.dev/reference/react/useActionState).

When using `useActionState`, the Server function signature will change to receive a new `prevState` or `initialState` parameter as its first argument.

```tsx filename="app/actions.ts" highlight= switcher
'use server'

  const validatedFields = schema.safeParse()
  // ...
}
```

```jsx filename="app/actions.ts" highlight= switcher
'use server'

// ...

  const validatedFields = schema.safeParse()
  // ...
}
```

You can then conditionally render the error message based on the `state` object.

```tsx filename="app/ui/signup.tsx" highlight= switcher
'use client'

const initialState =

  const [state, formAction, pending] = useActionState(createUser, initialState)

  return (
    <form action=>
      <label htmlFor="email">Email</label>
      <input type="text" id="email" name="email" required />

      <p aria-live="polite"></p>
      <button disabled=>Sign up</button>
    </form>
  )
}
```

```jsx filename="app/ui/signup.js" highlight= switcher
'use client'

const initialState =

  const [state, formAction, pending] = useActionState(createUser, initialState)

  return (
    <form action=>
      <label htmlFor="email">Email</label>
      <input type="text" id="email" name="email" required />

      <p aria-live="polite"></p>
      <button disabled=>Sign up</button>
    </form>
  )
}
```

## Pending states

The [`useActionState`](https://react.dev/reference/react/useActionState) hook exposes a `pending` boolean that can be used to show a loading indicator or disable the submit button while the action is being executed.

```tsx filename="app/ui/signup.tsx" highlight= switcher
'use client'

  const [state, formAction, pending] = useActionState(createUser, initialState)

  return (
    <form action=>

      <button disabled=>Sign up</button>
    </form>
  )
}
```

```jsx filename="app/ui/signup.js" highlight= switcher
'use client'

  const [state, formAction, pending] = useActionState(createUser, initialState)

  return (
    <form action=>

      <button disabled=>Sign up</button>
    </form>
  )
}
```

Alternatively, you can use the [`useFormStatus`](https://react.dev/reference/react-dom/hooks/useFormStatus) hook to show a loading indicator while the action is being executed. When using this hook, you'll need to create a separate component to render the loading indicator. For example, to disable the button when the action is pending:

```tsx filename="app/ui/button.tsx" highlight= switcher
'use client'

  const  = useFormStatus()

  return (
    <button disabled= type="submit">
      Sign Up
    </button>
  )
}
```

```jsx filename="app/ui/button.js" highlight= switcher
'use client'

  const  = useFormStatus()

  return (
    <button disabled= type="submit">
      Sign Up
    </button>
  )
}
```

You can then nest the `SubmitButton` component inside the form:

```tsx filename="app/ui/signup.tsx" switcher

  return (
    <form action=>

    </form>
  )
}
```

```jsx filename="app/ui/signup.js" switcher

  return (
    <form action=>

    </form>
  )
}
```

> **Good to know:** In React 19, `useFormStatus` includes additional keys on the returned object, like data, method, and action. If you are not using React 19, only the `pending` key is available.

## Optimistic updates

You can use the React [`useOptimistic`](https://react.dev/reference/react/useOptimistic) hook to optimistically update the UI before the Server Function finishes executing, rather than waiting for the response:

```tsx filename="app/page.tsx" switcher
'use client'

type Message =

  const [optimisticMessages, addOptimisticMessage] = useOptimistic<
    Message[],
    string
  >(messages, (state, newMessage) => [...state, ])

  const formAction = async (formData: FormData) =>

  return (
    <div>
      ></div>
      ))}
      <form action=>
        <input type="text" name="message" />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
```

```jsx filename="app/page.js" switcher
'use client'

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [...state, ]
  )

  const formAction = async (formData) =>

  return (
    <div>
      </div>
      ))}
      <form action=>
        <input type="text" name="message" />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
```

## Nested form elements

You can call Server Actions in elements nested inside `<form>` such as `<button>`, `<input type="submit">`, and `<input type="image">`. These elements accept the `formAction` prop or event handlers.

This is useful in cases where you want to call multiple Server Actions within a form. For example, you can create a specific `<button>` element for saving a post draft in addition to publishing it. See the [React `<form>` docs](https://react.dev/reference/react-dom/components/form#handling-multiple-submission-types) for more information.

## Programmatic form submission

You can trigger a form submission programmatically using the [`requestSubmit()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/requestSubmit) method. For example, when the user submits a form using the `⌘` + `Enter` keyboard shortcut, you can listen for the `onKeyDown` event:

```tsx filename="app/entry.tsx" switcher
'use client'

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) =>
  }

  return (
    <div>
      <textarea name="entry" rows= required onKeyDown= />
    </div>
  )
}
```

```jsx filename="app/entry.js" switcher
'use client'

  const handleKeyDown = (e) =>
  }

  return (
    <div>
      <textarea name="entry" rows= required onKeyDown= />
    </div>
  )
}
```

This will trigger the submission of the nearest `<form>` ancestor, which will invoke the Server Function.
