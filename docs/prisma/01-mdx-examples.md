---
title: 'MDX components'
metaTitle: 'MDX components in the Prisma docs'
metaDescription: 'MDX components components available on the Prisma documentation site.'
sidebar_label: 'MDX components'
search: false
---

## `TopBlock`

Required at the top of the page to avoid styling issues:

```md

```

## Code blocks

Example:

```js
async function main()
```

Code:

````
```js
async function main()
```
````

### Prisma schema

Example:

```prisma
datasource db

generator client

model Post

model User
```

Code:

````
```prisma
datasource db

generator client

model Post

model User
```
````

### Code block with file icon

Example:

```prisma file=schema.prisma
datasource db

generator client

model Post

model User
```

Code:

````
```prisma file=schema.prisma
datasource db

generator client

model Post

model User
```
````

### Code block with no copy option

By default, all the code blocks will have a `copy` icon for copying the code. If you want to disable the `copy` option in the code block, please use `no-copy` property.

Example:

```js no-copy
async function main()
```

Code:

````no-copy
```js no-copy
async function main()
```
````

### Code block without line numbers

Example:

```js no-lines
async function main()
```

Code:

````
```js no-lines
async function main()
```
````

### Terminal styled code block

Example:

```terminal
npm run dev
```

Code:

````
```terminal
npm run dev
```
````

### Code block wrapped

For code blocks where we _don't_ want to have a scrollable box.

Example with `wrap`:

```code wrap
$ this is a single, really long line of code that shouldn't need to be scrollable to check what it says and simply wraps over to the next line, making it all visible in the same box
```

Example without `wrap`:

```code
$ this is a single, really long line of code that shouldn't need to be scrollable to check what it says and simply wraps over to the next line, making it all visible in the same box
```

Code:

````
```code wrap
$ this is a single, really long line of code that shouldn't need to be scrollable to check what it says and simply wraps over to the next line, making it all visible in the same box
```
````

### Code block with highlighted code

Example:

```js file=test.ts highlight=2;add|4;delete|6,7;edit|9-12;normal
async function main()
```

Code:

````
```js file=test.ts highlight=2;add|4;delete|6,7;edit|9-12;normal
async function main() ```
````

## Expand/Collapse section

Example:

<details>
<summary>Expand if you want to view more</summary>

Here's more!

</details>

```
<details>
<summary>Expand if you want to view more</summary>

Here's more!

</details>
```

## Code with result

Example:

Code:

```

```

Example with custom output text

Code:

```

```

## Parallel blocks

Example:

Code:

```

```
