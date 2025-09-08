## Overview

Every utility class in Tailwind can be applied conditionally at different breakpoints, which makes it a piece of cake to build complex responsive interfaces without ever leaving your HTML.

First, make sure you've added the [viewport meta tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag) to the `<head>` of your document:

```html
<!-- [!code filename:index.html] -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

Then to add a utility but only have it take effect at a certain breakpoint, all you need to do is prefix the utility with the breakpoint name, followed by the `:` character:

```html
<!-- [!code filename:HTML]  -->
<!-- [!code word:md\:w-32] -->
<!-- [!code word:lg\:w-48] -->
<!-- Width of 16 by default, 32 on medium screens, and 48 on large screens -->
<img class="w-16 md:w-32 lg:w-48" src="..." />
```

There are five breakpoints by default, inspired by common device resolutions:

This works for **every utility class in the framework**, which means you can change literally anything at a given breakpoint — even things like letter spacing or cursor styles.

Here's a simple example of a marketing page component that uses a stacked layout on small screens, and a side-by-side layout on larger screens:

Here's how the example above works:

- By default, the outer `div` is `display: block`, but by adding the `md:flex` utility, it becomes `display: flex` on medium screens and larger.
- When the parent is a flex container, we want to make sure the image never shrinks, so we've added `md:shrink-0` to prevent shrinking on medium screens and larger. Technically we could have just used `shrink-0` since it would do nothing on smaller screens, but since it only matters on `md` screens, it's a good idea to make that clear in the class name.
- On small screens the image is automatically full width by default. On medium screens and up, we've constrained the width to a fixed size and ensured the image is full height using `md:h-full md:w-48`.

We've only used one breakpoint in this example, but you could easily customize this component at other sizes using the `sm`, `lg`, `xl`, or `2xl` responsive prefixes as well.

## Working mobile-first

Tailwind uses a mobile-first breakpoint system, similar to what you might be used to in other frameworks like Bootstrap.

What this means is that unprefixed utilities (like `uppercase`) take effect on all screen sizes, while prefixed utilities (like `md:uppercase`) only take effect at the specified breakpoint _and above_.

### Targeting mobile screens

Where this approach surprises people most often is that to style something for mobile, you need to use the unprefixed version of a utility, not the `sm:` prefixed version. Don't think of `sm:` as meaning "on small screens", think of it as "at the small _breakpoint_".

```html
<!-- [!code filename:HTML]  -->
<!-- This will only center text on screens 640px and wider, not on small screens -->
<div class="sm:text-center"></div>
```

```html
<!-- [!code filename:HTML]  -->
<!-- This will center text on mobile, and left align it on screens 640px and wider -->
<div class="text-center sm:text-left"></div>
```

For this reason, it's often a good idea to implement the mobile layout for a design first, then layer on any changes that make sense for `sm` screens, followed by `md` screens, etc.

### Targeting a breakpoint range

By default, styles applied by rules like `md:flex` will apply at that breakpoint and stay applied at larger breakpoints.

If you'd like to apply a utility _only_ when a specific breakpoint range is active, stack a responsive variant like `md` with a `max-*` variant to limit that style to a specific range:

```html
<!-- [!code filename:HTML]  -->
<div class="md:max-xl:flex">
  <!-- ... -->
</div>
```

Tailwind generates a corresponding `max-*` variant for each breakpoint, so out of the box the following variants are available:

### Targeting a single breakpoint

To target a single breakpoint, target the range for that breakpoint by stacking a responsive variant like `md` with the `max-*` variant for the next breakpoint:

```html
<!-- [!code filename:HTML]  -->
<div class="md:max-lg:flex">
  <!-- ... -->
</div>
```

Read about [targeting breakpoint ranges](#targeting-a-breakpoint-range) to learn more.

## Using custom breakpoints

### Customizing your theme

Use the `--breakpoint-*` theme variables to customize your breakpoints:

```css
/* [!code filename:app.css] */
@import "tailwindcss";

@theme 
```

This updates the `2xl` breakpoint to use `100rem` instead of the default `96rem`, and creates new `xs` and `3xl` breakpoints that can be used in your markup:

```html
<!-- [!code filename:HTML]  -->
<!-- [!code word:xs\:grid-cols-2] -->
<!-- [!code word:3xl\:grid-cols-6] -->
<!-- prettier-ignore -->
<div class="grid xs:grid-cols-2 3xl:grid-cols-6">
  <!-- ... -->
</div>
```

Note that it's important to always use the same unit for defining your breakpoints or the generated utilities may be sorted in an unexpected order, causing breakpoint classes to override each other in unexpected ways.

Tailwind uses `rem` for the default breakpoints, so if you are adding additional breakpoints to the defaults, make sure you use `rem` as well.

Learn more about customizing your theme in the [theme documentation](/docs/theme).

### Removing default breakpoints

To remove a default breakpoint, reset its value to the `initial` keyword:

```css
/* [!code filename:app.css] */
@import "tailwindcss";

@theme 
```

You can also reset all of the default breakpoints using `--breakpoint-*: initial`, then define all of your breakpoints from scratch:

```css
/* [!code filename:app.css] */
@import "tailwindcss";

@theme 
```

Learn more removing default theme values in the [theme documentation](/docs/theme).

### Using arbitrary values

If you need to use a one-off breakpoint that doesn’t make sense to include in your theme, use the `min` or `max` variants to generate a custom breakpoint on the fly using any arbitrary value.

```html
<!-- [!code word:min-\[320px\]\:text-center] -->
<!-- [!code word:max-\[600px\]\:bg-sky-300] -->
<div class="max-[600px]:bg-sky-300 min-[320px]:text-center">
  <!-- ... -->
</div>
```

Learn more about arbitrary value support in the [arbitrary values](/docs/adding-custom-styles#using-arbitrary-values) documentation.

## Container queries

### What are container queries?

[Container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries) are a modern CSS feature that let you style something based on the size of a parent element instead of the size of the entire viewport. They let you build components that are a lot more portable and reusable because they can change based on the actual space available for that component.

### Basic example

Use the `@container` class to mark an element as a container, then use variants like `@sm` and `@md` to style child elements based on the size of the container:

```html
<!-- [!code filename:HTML] -->
<!-- [!code word:@container] -->
<!-- [!code word:@md\:flex-row] -->
<div class="@container">
  <div class="flex flex-col @md:flex-row">
    <!-- ... -->
  </div>
</div>
```

Just like breakpoint variants, container queries are mobile-first in Tailwind CSS and apply at the target container size and up.

### Max-width container queries

Use variants like `@max-sm` and `@max-md` to apply a style below a specific container size:

```html
<!-- [!code filename:HTML] -->
<!-- [!code word:@max-md\:flex-col] -->
<div class="@container">
  <div class="flex flex-row @max-md:flex-col">
    <!-- ... -->
  </div>
</div>
```

### Container query ranges

Stack a regular container query variant with a max-width container query variant to target a specific range:

```html
<!-- [!code filename:HTML] -->
<!-- [!code word:@sm\:@max-md\:flex-col] -->
<div class="@container">
  <div class="flex flex-row @sm:@max-md:flex-col">
    <!-- ... -->
  </div>
</div>
```

### Named containers

For complex designs that use multiple nested containers, you can name containers using `@container/` and target specific containers with variants like `@sm/` and `@md/`:

```html
<!-- [!code filename:HTML] -->
<!-- [!code word:@container/main] -->
<!-- [!code word:@sm/main\:flex-col] -->
<div class="@container/main">
  <!-- ... -->
  <div class="flex flex-row @sm/main:flex-col">
    <!-- ... -->
  </div>
</div>
```

This makes it possible to style something based on the size of a distant container, rather than just the nearest container.

### Using custom container sizes

Use the `--container-*` theme variables to customize your container sizes:

```css
/* [!code filename:app.css] */
@import "tailwindcss";

@theme 
```

This adds a new `8xl` container query variant that can be used in your markup:

```html
<!-- [!code filename:HTML] -->
<!-- [!code word:@8xl\:flex-row] -->
<div class="@container">
  <!-- prettier-ignore -->
  <div class="flex flex-col @8xl:flex-row">
    <!-- ... -->
  </div>
</div>
```

Learn more about customizing your theme in the [theme documentation](/docs/theme).

<h3 id="using-arbitrary-container-query-values">
  <a href="#using-arbitrary-container-query-values">Using arbitrary values</a>
</h3>

Use variants like `@min-[475px]` and `@max-[960px]` for one-off container query sizes you don't want to add to your theme:

```html
<!-- [!code filename:HTML] -->
<!-- [!code word:@min-\[475px\]\:flex-row] -->
<div class="@container">
  <div class="flex flex-col @min-[475px]:flex-row">
    <!-- ... -->
  </div>
</div>
```

### Using container query units

Use [container query length units](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries#container_query_length_units) like `cqw` as arbitrary values in other utility classes to reference the container size:

```html
<!-- [!code filename:HTML] -->
<!-- [!code word:w-\[50cqw\] -->
<div class="@container">
  <div class="w-[50cqw]">
    <!-- ... -->
  </div>
</div>
```

### Container size reference

By default, Tailwind includes container sizes ranging from 16rem _(256px)_ to 80rem _(1280px)_: