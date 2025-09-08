---
title: Linking and Navigating
description: Learn how navigation works in Next.js, and how to use the Link Component and `useRouter` hook.
---

The Next.js router allows you to do client-side route transitions between pages, similar to a single-page application.

A React component called `Link` is provided to do this client-side route transition.

```jsx

function Home() 

```

The example above uses multiple links. Each one maps a path (`href`) to a known page:

- `/` → `pages/index.js`
- `/about` → `pages/about.js`
- `/blog/hello-world` → `pages/blog/[slug].js`

Any `
        </li>
      ))}
    </ul>
  )
}

```

> [`encodeURIComponent`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) is used in the example to keep the path utf-8 compatible.

Alternatively, using a URL Object:

```jsx

function Posts() >
          
        </li>
      ))}
    </ul>
  )
}

```

Now, instead of using interpolation to create the path, we use a URL object in `href` where:

- `pathname` is the name of the page in the `pages` directory. `/blog/[slug]` in this case.
- `query` is an object with the dynamic segment. `slug` in this case.

## Injecting the router

To access the [`router` object](/docs/pages/api-reference/functions/use-router#router-object) in a React component you can use [`useRouter`](/docs/pages/api-reference/functions/use-router) or [`withRouter`](/docs/pages/api-reference/functions/use-router#withrouter).

In general we recommend using [`useRouter`](/docs/pages/api-reference/functions/use-router).

## Imperative Routing

[`next/link`](/docs/pages/api-reference/components/link) should be able to cover most of your routing needs, but you can also do client-side navigations without it, take a look at the [documentation for `next/router`](/docs/pages/api-reference/functions/use-router).

The following example shows how to do basic page navigations with [`useRouter`](/docs/pages/api-reference/functions/use-router):

```jsx

  const router = useRouter()

  return (
    <button onClick=>
      Click here to read more
    </button>
  )
}
```

## Shallow Routing

<details>
  <summary>Examples</summary>

- [Shallow Routing](https://github.com/vercel/next.js/tree/canary/examples/with-shallow-routing)

</details>

Shallow routing allows you to change the URL without running data fetching methods again, that includes [`getServerSideProps`](/docs/pages/building-your-application/data-fetching/get-server-side-props), [`getStaticProps`](/docs/pages/building-your-application/data-fetching/get-static-props), and [`getInitialProps`](/docs/pages/api-reference/functions/get-initial-props).

You'll receive the updated `pathname` and the `query` via the [`router` object](/docs/pages/api-reference/functions/use-router#router-object) (added by [`useRouter`](/docs/pages/api-reference/functions/use-router) or [`withRouter`](/docs/pages/api-reference/functions/use-router#withrouter)), without losing state.

To enable shallow routing, set the `shallow` option to `true`. Consider the following example:

```jsx

// Current URL is '/'
function Page() )
  }, [])

  useEffect(() => , [router.query.counter])
}

```

The URL will get updated to `/?counter=10` and the page won't get replaced, only the state of the route is changed.

You can also watch for URL changes via [`componentDidUpdate`](https://react.dev/reference/react/Component#componentdidupdate) as shown below:

```jsx
componentDidUpdate(prevProps)  = this.props.router
  // verify props have changed to avoid an infinite loop
  if (query.counter !== prevProps.router.query.counter) 
}
```

### Caveats

Shallow routing **only** works for URL changes in the current page. For example, let's assume we have another page called `pages/about.js`, and you run this:

```js
router.push('/?counter=10', '/about?counter=10', )
```

Since that's a new page, it'll unload the current page, load the new one and wait for data fetching even though we asked to do shallow routing.

When shallow routing is used with middleware it will not ensure the new page matches the current page like previously done without middleware. This is due to middleware being able to rewrite dynamically and can't be verified client-side without a data fetch which is skipped with shallow, so a shallow route change must always be treated as shallow.