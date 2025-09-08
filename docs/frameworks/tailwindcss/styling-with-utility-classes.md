## Overview

You style things with Tailwind by combining many single-purpose presentational classes _(utility classes)_ directly in your markup:

For example, in the UI above we've used:

- The [display](/docs/display#flex) and [padding](/docs/padding) utilities (`flex`, `shrink-0`, and `p-6`) to control the overall layout
- The [max-width](/docs/max-width) and [margin](/docs/margin) utilities (`max-w-sm` and `mx-auto`) to constrain the card width and center it horizontally
- The [background-color](/docs/background-color), [border-radius](/docs/border-radius), and [box-shadow](/docs/box-shadow) utilities (`bg-white`, `rounded-xl`, and `shadow-lg`) to style the card's appearance
- The [width](/docs/width) and [height](/docs/height) utilities (`size-12`) to set the width and height of the logo image
- The [gap](/docs/gap) utilities (`gap-x-4`) to handle the spacing between the logo and the text
- The [font-size](/docs/font-size), [color](/docs/text-color), and [font-weight](/docs/font-weight) utilities (`text-xl`, `text-black`, `font-medium`, etc.) to style the card text

Styling things this way contradicts a lot of traditional best practices, but once you try it you'll quickly notice some really important benefits:

- **You get things done faster** — you don't spend any time coming up with class names, making decisions about selectors, or switching between HTML and CSS files, so your designs come together very fast.
- **Making changes feels safer** — adding or removing a utility class to an element only ever affects that element, so you never have to worry about accidentally breaking something another page that's using the same CSS.
- **Maintaining old projects is easier** — changing something just means finding that element in your project and changing the classes, not trying to remember how all of that custom CSS works that you haven't touched in six months.
- **Your code is more portable** — since both the structure and styling live in the same place, you can easily copy and paste entire chunks of UI around, even between different projects.
- **Your CSS stops growing** — since utility classes are so reusable, your CSS doesn't continue to grow linearly with every new feature you add to a project.

These benefits make a big difference on small projects, but they are even more valuable for teams working on long-running projects at scale.

### Why not just use inline styles?

A common reaction to this approach is wondering, “isn’t this just inline styles?” and in some ways it is — you’re applying styles directly to elements instead of assigning them a class name and then styling that class.

But using utility classes has many important advantages over inline styles, for example:

- **Designing with constraints** — using inline styles, every value is a magic number. With utilities, you’re choosing styles from a [predefined design system](/docs/theme), which makes it much easier to build visually consistent UIs.
- **Hover, focus, and other states** — inline styles can’t target states like hover or focus, but Tailwind’s [state variants](/docs/hover-focus-and-other-states) make it easy to style those states with utility classes.
- **Media queries** — you can’t use media queries in inline styles, but you can use Tailwind’s [responsive variants](/docs/responsive-design) to build fully responsive interfaces easily.

This component is fully responsive and includes a button with hover and active styles, and is built entirely with utility classes:

## Thinking in utility classes

### Styling hover and focus states

To style an element on states like hover or focus, prefix any utility with the state you want to target, for example `hover:bg-sky-700`:

These prefixes are called [variants](/docs/hover-focus-and-other-states) in Tailwind, and they only apply the styles from a utility class when the condition for that variant matches.

Here's what the generated CSS looks like for the `hover:bg-sky-700` class:

```css
/* [!code filename: Generated CSS] */
.hover\:bg-sky-700 
}
```

Notice how this class does nothing _unless_ the element is hovered? Its _only_ job is to provide hover styles — nothing else.

This is different from how you'd write traditional CSS, where a single class would usually provide the styles for many states:

```html
/* [!code filename:HTML] */
<button class="btn">Save changes</button>

<style>
  .btn 
  }
</style>
```

You can even stack variants in Tailwind to apply a utility when multiple conditions match, like combining `hover:` and `disabled:`

```html
<!-- [!code classes:disabled:hover:bg-sky-500] -->
<button class="bg-sky-500 disabled:hover:bg-sky-500 ...">Save changes</button>
```

Learn more in the documentation styling elements on [hover, focus, and other states](/docs/hover-focus-and-other-states).

### Media queries and breakpoints

Just like hover and focus states, you can style elements at different breakpoints by prefixing any utility with the breakpoint where you want that style to apply:

In the example above, the `sm:` prefix makes sure that `grid-cols-3` only triggers at the `sm` breakpoint and above, which is 40rem out of the box:

```css
/* [!code filename: Generated CSS] */
.sm\:grid-cols-3 
}
```

Learn more in the [responsive design](/docs/responsive-design) documentation.

### Targeting dark mode

Styling an element in dark mode is just a matter of adding the `dark:` prefix to any utility you want to apply when dark mode is active:

Just like with hover states or media queries, the important thing to understand is that a single utility class will never include _both_ the light and dark styles — you style things in dark mode by using multiple classes, one for the light mode styles and another for the dark mode styles.

```css
/* [!code filename: Generated CSS] */
.dark\:bg-gray-800 
}
```

Learn more in the [dark mode](/docs/dark-mode) documentation.

### Using class composition

A lot of the time with Tailwind you'll even use multiple classes to build up the value for a single CSS property, for example adding multiple filters to an element:

```html
<!-- [!code filename:HTML] -->
<!-- [!code classes:blur-sm,grayscale] -->
<div class="blur-sm grayscale">
  <!-- ... -->
</div>
```

Both of these effects rely on the `filter` property in CSS, so Tailwind uses CSS variables to make it possible to compose these effects together:

```css
/* [!code filename:Generated CSS] */
.blur-sm 
.grayscale 
```

The generated CSS above is slightly simplified, but the trick here is that each utility sets a CSS variable just for the effect it's meant to apply. Then the `filter` property looks at all of these variables, falling back to nothing if the variable hasn't been set.

Tailwind uses this same approach for [gradients](/docs/background-image#adding-a-linear-gradient), [shadow colors](/docs/box-shadow#setting-the-shadow-color), [transforms](/docs/translate), and more.

### Using arbitrary values

Many utilities in Tailwind are driven by [theme variables](/docs/theme), like `bg-blue-500`, `text-xl`, and `shadow-md`, which map to your underlying color palette, type scale, and shadows.

When you need to use a one-off value outside of your theme, use the special square bracket syntax for specifying arbitrary values:

```html
<!-- [!code filename:HTML] -->
<!-- [!code classes:bg-[#316ff6]] -->
<!-- prettier-ignore -->
<button class="bg-[#316ff6] ...">
  Sign in with Facebook
</button>
```

This can be useful for one-off colors outside of your color palette _(like the Facebook blue above)_, but also when you need a complex custom value like a very specific grid:

```html
<!-- [!code filename:HTML] -->
<!-- [!code classes:grid-cols-[24rem_2.5rem_minmax(0,1fr)]] -->
<div class="grid grid-cols-[24rem_2.5rem_minmax(0,1fr)]">
  <!-- ... -->
</div>
```

It's also useful when you need to use CSS features like `calc()`, even if you are using your theme values:

```html
<!-- [!code filename:HTML] -->
<!-- [!code classes:max-h-[calc(100dvh-(--spacing(6)))]] -->
<div class="max-h-[calc(100dvh-(--spacing(6)))]">
  <!-- ... -->
</div>
```

There's even a syntax for generating completely arbitrary CSS including an arbitrary property name, which can be useful for setting CSS variables:

```html
<!-- [!code filename:HTML] -->
<!-- [!code classes:[--gutter-width:1rem],lg:[--gutter-width:2rem]] -->
<div class="[--gutter-width:1rem] lg:[--gutter-width:2rem]">
  <!-- ... -->
</div>
```

Learn more in the documentation on [using arbitrary values](/docs/adding-custom-styles#using-arbitrary-values).

#### How does this even work?

Tailwind CSS isn't one big static stylesheet like you might be used to with other CSS frameworks — it generates the CSS needed based on the classes you're actually using when you compile your CSS.

It does this by scanning all of the files in your project looking for any symbol that looks like it could be a class name:

```jsx
// [!code filename:Button.jsx]
// [!code word:px-4]
// [!code word:py-2]
// [!code word:rounded-md]
// [!code word:text-base]
// [!code word:px-5]
// [!code word:py-3]
// [!code word:rounded-lg]
// [!code word:text-lg]
// [!code word:font-bold]

  let sizeClasses = [size];

  return (
    <button type="button" className=`}>
      
    </button>
  );
}
```

After it's found all of the potential classes, Tailwind generates the CSS for each one and compiles it all into one stylesheet of just the styles you actually need.

Since the CSS is generated based on the class name, Tailwind can recognize classes using arbitrary values like `bg-[#316ff6]` and generate the necessary CSS, even when the value isn't part of your theme.

Learn more about how this works in [detecting classes in source files](/docs/detecting-classes-in-source-files).

### Complex selectors

Sometimes you need to style an element under a combination of conditions, for example in dark mode, at a specific breakpoint, when hovered, and when the element has a specific data attribute.

Here's an example of what that looks like with Tailwind:

Tailwind also supports things like `group-hover`, which let you style an element when a specific parent is hovered:

This `group-*` syntax works with other variants too, like `group-focus`, `group-active`, and [many more](/docs/hover-focus-and-other-states#styling-based-on-parent-state).

For really complex scenarios _(especially when styling HTML you don't control)_, Tailwind supports [arbitrary variants](/docs/adding-custom-styles#arbitrary-variants) which let you write any selector you want, directly in a class name:

### When to use inline styles

Inline styles are still very useful in Tailwind CSS projects, particularly when a value is coming from a dynamic source like a database or API:

```jsx
// [!code filename:branded-button.jsx]

  return (
    <button
      style=}
      className="rounded-md px-3 py-1.5 font-medium"
    >
      
    </button>
  );
}
```

You might also reach for an inline style for very complicated arbitrary values that are difficult to read when formatted as a class name:

```html
<!-- [!code filename:HTML] -->
<!-- prettier-ignore -->
<div class="grid-[2fr_max(0,var(--gutter-width))_calc(var(--gutter-width)+10px)]"> <!-- [!code --] -->
<!-- prettier-ignore -->
<div style="grid-template-columns: 2fr max(0, var(--gutter-width)) calc(var(--gutter-width) + 10px)"> <!-- [!code ++] -->
  <!-- ... -->
</div>
```

Another useful pattern is setting CSS variables based on dynamic sources using inline styles, then referencing those variables with utility classes:

```jsx
// [!code filename:branded-button.jsx]

  return (
    <button
      style=}
      // [!code classes:bg-(--bg-color),text-(--text-color),hover:bg-(--bg-color-hover)]
      className="bg-(--bg-color) text-(--text-color) hover:bg-(--bg-color-hover) ..."
    >
      
    </button>
  );
}
```

## Managing duplication

When you build entire projects with just utility classes, you'll inevitably find yourself repeating certain patterns to recreate the same design in different places.

For example, here the utility classes for each avatar image are repeated five separate times:

Don't panic! In practice this isn't the problem you might be worried it is, and the strategies for dealing with it are things you already do every day.

### Using loops

A lot of the time a design element that shows up more than once in the rendered page is only actually authored once because the actual markup is rendered in a loop.

For example, the duplicate avatars at the beginning of this guide would almost certainly be rendered in a loop in a real project:

When elements are rendered in a loop like this, the actual class list is only written once so there's no actual duplication problem to solve.

### Using multi-cursor editing

When duplication is localized to a group of elements in a single file, the easiest way to deal with it is to use [multi-cursor editing](https://code.visualstudio.com/docs/editor/codebasics#_multiple-selections-multicursor) to quickly select and edit the class list for each element at once:

You'd be surprised at how often this ends up being the best solution. If you can quickly edit all of the duplicated class lists simultaneously, there's no benefit to introducing any additional abstraction.

### Using components

If you need to reuse some styles across multiple files, the best strategy is to create a _component_ if you're using a front-end framework like React, Svelte, or Vue, or a _template partial_ if you're using a templating language like Blade, ERB, Twig, or Nunjucks.

Now you can use this component in as many places as you like, while still having a single source of truth for the styles so they can easily be updated together in one place.

### Using custom CSS

If you're using a templating language like ERB or Twig instead of something like React or Vue, creating a template partial for something as small as a button can feel like overkill compared to a simple CSS class like `btn`.

While it's highly recommended that you create proper template partials for more complex components, writing some custom CSS is totally fine when a template partial feels heavy-handed.

Here's what a `btn-primary` class might look like, using [theme variables](/docs/theme#with-custom-css) to keep the design consistent:

Again though, for anything that's more complicated than just a single HTML element, we highly recommend using template partials so the styles and structure can be encapsulated in one place.

## Managing style conflicts

### Conflicting utility classes

When you add two classes that target the same CSS property, the class that appears later in the stylesheet wins. So in this example, the element will receive `display: grid` even though `flex` comes last in the actual `class` attribute:

In general, you should just never add two conflicting classes to the same element — only ever add the one you actually want to take effect:

```jsx
// [!code filename:example.jsx]
// [!code word:gridLayout\ \?\ \"grid\"\ \:\ \"flex\"]

  return <div className=></div>;
}
```

Using component-based libraries like React or Vue, this often means exposing specific props for styling customizations instead of letting consumers add extra classes from outside of a component, since those styles will often conflict.

### Using the important modifier

When you really need to force a specific utility class to take effect and have no other means of managing the specificity, you can add `!` to the end of the class name to make all of the declarations `!important`:

### Using the important flag

If you're adding Tailwind to a project that has existing complex CSS with high specificity rules, you can use the `important` flag when importing Tailwind to mark _all_ utilities as `!important`:

### Using the prefix option

If your project has class names that conflict with Tailwind CSS utilities, you can prefix all Tailwind-generated classes and CSS variables using the `prefix` option: