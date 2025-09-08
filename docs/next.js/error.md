---
title: error.js
description: API reference for the error.js special file.
related:
  title: Learn more about error handling
  links:
    - app/getting-started/error-handling
---

An **error** file allows you to handle unexpected runtime errors and display fallback UI.

```tsx filename="app/dashboard/error.tsx" switcher
'use client' // Error boundaries must be Client Components

  error,
  reset,
}:
  reset: () => void
}) , [error])

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick=
      >
        Try again
      </button>
    </div>
  )
}
```

```jsx filename="app/dashboard/error.js" switcher
'use client' // Error boundaries must be Client Components

  useEffect(() => , [error])

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick=
      >
        Try again
      </button>
    </div>
  )
}
```

`error.js` wraps a route segment and its nested children in a [React Error Boundary](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary). When an error throws within the boundary, the `error` component shows as the fallback UI.

> **Good to know**:
>
> - The [React DevTools](https://react.dev/learn/react-developer-tools) allow you to toggle error boundaries to test error states.
> - If you want errors to bubble up to the parent error boundary, you can `throw` when rendering the `error` component.

## Reference

### Props

#### `error`

An instance of an [`Error`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error) object forwarded to the `error.js` Client Component.

> **Good to know:** During development, the `Error` object forwarded to the client will be serialized and include the `message` of the original error for easier debugging. However, **this behavior is different in production** to avoid leaking potentially sensitive details included in the error to the client.

#### `error.message`

- Errors forwarded from Client Components show the original `Error` message.
- Errors forwarded from Server Components show a generic message with an identifier. This is to prevent leaking sensitive details. You can use the identifier, under `errors.digest`, to match the corresponding server-side logs.

#### `error.digest`

An automatically generated hash of the error thrown. It can be used to match the corresponding error in server-side logs.

#### `reset`

The cause of an error can sometimes be temporary. In these cases, trying again might resolve the issue.

An error component can use the `reset()` function to prompt the user to attempt to recover from the error. When executed, the function will try to re-render the error boundary's contents. If successful, the fallback error component is replaced with the result of the re-render.

```tsx filename="app/dashboard/error.tsx" switcher
'use client' // Error boundaries must be Client Components

  error,
  reset,
}:
  reset: () => void
}) >Try again</button>
    </div>
  )
}
```

```jsx filename="app/dashboard/error.js" switcher
'use client' // Error boundaries must be Client Components

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick=>Try again</button>
    </div>
  )
}
```

## Examples

### Global Error

While less common, you can handle errors in the root layout or template using `global-error.jsx`, located in the root app directory, even when leveraging [internationalization](/docs/app/guides/internationalization). Global error UI must define its own `<html>` and `<body>` tags, global styles, fonts, or other dependencies that your error page requires. This file replaces the root layout or template when active.

> **Good to know**: Error boundaries must be [Client Components](/docs/app/getting-started/server-and-client-components#using-client-components), which means that [`metadata` and `generateMetadata`](/docs/app/getting-started/metadata-and-og-images) exports are not supported in `global-error.jsx`. As an alternative, you can use the React [`<title>`](https://react.dev/reference/react-dom/components/title) component.

```tsx filename="app/global-error.tsx" switcher
'use client' // Error boundaries must be Client Components

  error,
  reset,
}:
  reset: () => void
}) >Try again</button>
      </body>
    </html>
  )
}
```

```jsx filename="app/global-error.js" switcher
'use client' // Error boundaries must be Client Components

  return (
    // global-error must include html and body tags
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick=>Try again</button>
      </body>
    </html>
  )
}
```

### Graceful error recovery with a custom error boundary

When rendering fails on the client, it can be useful to show the last known server rendered UI for a better user experience.

The `GracefullyDegradingErrorBoundary` is an example of a custom error boundary that captures and preserves the current HTML before an error occurs. If a rendering error happens, it re-renders the captured HTML and displays a persistent notification bar to inform the user.

```tsx filename="app/dashboard/error.tsx" switcher
'use client'

interface ErrorBoundaryProps

interface ErrorBoundaryState

  ErrorBoundaryProps,
  ErrorBoundaryState
>
    this.contentRef = React.createRef()
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo)
  }

  render()
            suppressHydrationWarning
            dangerouslySetInnerHTML=}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-red-600 text-white py-4 px-6 text-center">
            <p className="font-semibold">
              An error occurred during page rendering
            </p>
          </div>
        </>
      )
    }

    return <div ref=></div>
  }
}

```

```jsx filename="app/dashboard/error.js" switcher
'use client'

class GracefullyDegradingErrorBoundary extends Component
    this.contentRef = createRef()
  }

  static getDerivedStateFromError(_)
  }

  componentDidCatch(error, errorInfo)
  }

  render()
            suppressHydrationWarning
            dangerouslySetInnerHTML=}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-red-600 text-white py-4 px-6 text-center">
            <p className="font-semibold">
              An error occurred during page rendering
            </p>
          </div>
        </>
      )
    }

    return <div ref=></div>
  }
}

```

## Version History

| Version   | Changes                                     |
| --------- | ------------------------------------------- |
| `v15.2.0` | Also display `global-error` in development. |
| `v13.1.0` | `global-error` introduced.                  |
| `v13.0.0` | `error` introduced.                         |
