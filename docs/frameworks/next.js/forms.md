---
title: How to create forms with API Routes
nav_title: Forms
description: Learn how to handle form submissions and data mutations with Next.js.
---

Forms enable you to create and update data in web applications. Next.js provides a powerful way to handle data mutations using **API Routes**. This guide will walk you through how to handle form submission on the server.

## Server Forms

To handle form submissions on the server, create an API endpoint that securely mutates data.

```ts filename="pages/api/submit.ts" switcher

  req: NextApiRequest,
  res: NextApiResponse
) )
}
```

```js filename="pages/api/submit.js" switcher

  const data = req.body
  // call your database, etc.
  // const id = await createItem(data)
  // ...
  res.status(200).json()
}
```

Then, call the API Route from the client with an event handler:

```tsx filename="pages/index.tsx" switcher

  async function onSubmit(event: FormEvent<HTMLFormElement>) )

    // Handle response if necessary
    const data = await response.json()
    // ...
  }

  return (
    <form onSubmit=>
      <input type="text" name="name" />
      <button type="submit">Submit</button>
    </form>
  )
}
```

```jsx filename="pages/index.jsx" switcher

  async function onSubmit(event) )

    // Handle response if necessary
    const data = await response.json()
    // ...
  }

  return (
    <form onSubmit=>
      <input type="text" name="name" />
      <button type="submit">Submit</button>
    </form>
  )
}
```

> **Good to know:**
>
> - API Routes [do not specify CORS headers](https://developer.mozilla.org/docs/Web/HTTP/CORS), meaning they are same-origin only by default.
> - Since API Routes run on the server, we're able to use sensitive values (like API keys) through [Environment Variables](/docs/pages/guides/environment-variables) without exposing them to the client. This is critical for the security of your application.

## Form validation

We recommend using HTML validation like `required` and `type="email"` for basic client-side form validation.

For more advanced server-side validation, you can use a schema validation library like [zod](https://zod.dev/) to validate the form fields before mutating the data:

```ts filename="pages/api/submit.ts" switcher

const schema = z.object()

  req: NextApiRequest,
  res: NextApiResponse
) 
```

```js filename="pages/api/submit.js" switcher

const schema = z.object()

  const parsed = schema.parse(req.body)
  // ...
}
```

### Error handling

You can use React state to show an error message when a form submission fails:

```tsx filename="pages/index.tsx" switcher

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(event: FormEvent<HTMLFormElement>) )

      if (!response.ok) 

      // Handle response if necessary
      const data = await response.json()
      // ...
    } catch (error)  finally 
  }

  return (
    <div>
      }></div>}
      <form onSubmit=>
        <input type="text" name="name" />
        <button type="submit" disabled=>
          
        </button>
      </form>
    </div>
  )
}
```

```jsx filename="pages/index.jsx" switcher

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  async function onSubmit(event) )

      if (!response.ok) 

      // Handle response if necessary
      const data = await response.json()
      // ...
    } catch (error)  finally 
  }

  return (
    <div>
      }></div>}
      <form onSubmit=>
        <input type="text" name="name" />
        <button type="submit" disabled=>
          
        </button>
      </form>
    </div>
  )
}
```

## Displaying loading state

You can use React state to show a loading state when a form is submitting on the server:

```tsx filename="pages/index.tsx" switcher

  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) )

      // Handle response if necessary
      const data = await response.json()
      // ...
    } catch (error)  finally 
  }

  return (
    <form onSubmit=>
      <input type="text" name="name" />
      <button type="submit" disabled=>
        
      </button>
    </form>
  )
}
```

```jsx filename="pages/index.jsx" switcher

  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event) )

      // Handle response if necessary
      const data = await response.json()
      // ...
    } catch (error)  finally 
  }

  return (
    <form onSubmit=>
      <input type="text" name="name" />
      <button type="submit" disabled=>
        
      </button>
    </form>
  )
}
```

### Redirecting

If you would like to redirect the user to a different route after a mutation, you can [`redirect`](/docs/pages/building-your-application/routing/api-routes#response-helpers) to any absolute or relative URL:

```ts filename="pages/api/submit.ts" switcher

  req: NextApiRequest,
  res: NextApiResponse
) `)
}
```

```js filename="pages/api/submit.js" switcher

  const id = await addPost()
  res.redirect(307, `/post/$`)
}
```