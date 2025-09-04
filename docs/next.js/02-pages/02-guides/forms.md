---
title: How to create forms with API Routes
nav_title: Forms
description: Learn how to handle form submissions and data mutations with Next.js.
---

Forms enable you to create and update data in web applications. Next.js provides a powerful way to handle data mutations using **API Routes**. This guide will walk you through how to handle form submission on the server.

## Server Forms

To handle form submissions on the server, create an API endpoint that securely mutates data.

```ts filename="pages/api/submit.ts" switcher
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  const id = await createItem(data);
  res.status(200).json({ id });
}
```

```js filename="pages/api/submit.js" switcher
export default function handler(req, res) {
  const data = req.body;
  // call your database, etc.
  // const id = await createItem(data)
  // ...
  res.status(200).json({ data });
}
```

Then, call the API Route from the client with an event handler:

```tsx filename="pages/index.tsx" switcher


export default function Page() {
  async function onSubmit(event: FormEvent<!-- HTMLFormElement -->) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: formData,
    })

    // Handle response if necessary
    const data = await response.json()
    // ...
  }

  return (
    <!-- form -->
      <!-- input -->
      <!-- button -->Submit

  )
}
```

```jsx filename="pages/index.jsx" switcher
export default function Page() {
  async function onSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: formData,
    })

    // Handle response if necessary
    const data = await response.json()
    // ...
  }

  return (
    <!-- form -->
      <!-- input -->
      <!-- button -->Submit

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
const schema = z.object({
  // ...
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const parsed = schema.parse(req.body);
  // ...
}
```

```js filename="pages/api/submit.js" switcher
const schema = z.object({
  // ...
});

export default async function handler(req, res) {
  const parsed = schema.parse(req.body);
  // ...
}
```

### Error handling

You can use React state to show an error message when a form submission fails:

```tsx filename="pages/index.tsx" switcher


export default function Page() {
  const [isLoading, setIsLoading] = useState<!-- boolean -->(false)
  const [error, setError] = useState<!-- string -->(null)

  async function onSubmit(event: FormEvent<!-- HTMLFormElement -->) {
    event.preventDefault()
    setIsLoading(true)
    setError(null) // Clear previous errors when a new request starts

    try {
      const formData = new FormData(event.currentTarget)
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to submit the data. Please try again.')
      }

      // Handle response if necessary
      const data = await response.json()
      // ...
    } catch (error) {
      // Capture the error message to display to the user
      setError(error.message)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <!-- div -->
      {error && <!-- div -->{error}}
      <!-- form -->
        <!-- input -->
        <!-- button -->
          {isLoading ? 'Loading...' : 'Submit'}



  )
}
```

```jsx filename="pages/index.jsx" switcher


export default function Page() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
    setError(null) // Clear previous errors when a new request starts

    try {
      const formData = new FormData(event.currentTarget)
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to submit the data. Please try again.')
      }

      // Handle response if necessary
      const data = await response.json()
      // ...
    } catch (error) {
      // Capture the error message to display to the user
      setError(error.message)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <!-- div -->
      {error && <!-- div -->{error}}
      <!-- form -->
        <!-- input -->
        <!-- button -->
          {isLoading ? 'Loading...' : 'Submit'}



  )
}
```

## Displaying loading state

You can use React state to show a loading state when a form is submitting on the server:

```tsx filename="pages/index.tsx" switcher


export default function Page() {
  const [isLoading, setIsLoading] = useState<!-- boolean -->(false)

  async function onSubmit(event: FormEvent<!-- HTMLFormElement -->) {
    event.preventDefault()
    setIsLoading(true) // Set loading to true when the request starts

    try {
      const formData = new FormData(event.currentTarget)
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: formData,
      })

      // Handle response if necessary
      const data = await response.json()
      // ...
    } catch (error) {
      // Handle error if necessary
      console.error(error)
    } finally {
      setIsLoading(false) // Set loading to false when the request completes
    }
  }

  return (
    <!-- form -->
      <!-- input -->
      <!-- button -->
        {isLoading ? 'Loading...' : 'Submit'}


  )
}
```

```jsx filename="pages/index.jsx" switcher


export default function Page() {
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(true) // Set loading to true when the request starts

    try {
      const formData = new FormData(event.currentTarget)
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: formData,
      })

      // Handle response if necessary
      const data = await response.json()
      // ...
    } catch (error) {
      // Handle error if necessary
      console.error(error)
    } finally {
      setIsLoading(false) // Set loading to false when the request completes
    }
  }

  return (
    <!-- form -->
      <!-- input -->
      <!-- button -->
        {isLoading ? 'Loading...' : 'Submit'}


  )
}
```

### Redirecting

If you would like to redirect the user to a different route after a mutation, you can [`redirect`](/docs/pages/building-your-application/routing/api-routes#response-helpers) to any absolute or relative URL:

```ts filename="pages/api/submit.ts" switcher
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = await addPost();
  res.redirect(307, `/post/${id}`);
}
```

```js filename="pages/api/submit.js" switcher
export default async function handler(req, res) {
  const id = await addPost();
  res.redirect(307, `/post/${id}`);
}
```
