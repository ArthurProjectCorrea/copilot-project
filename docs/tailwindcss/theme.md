## Overview

Tailwind is a framework for building custom designs, and different designs need different typography, colors, shadows, breakpoints, and more.

These low-level design decisions are often called _design tokens_, and in Tailwind projects you store those values in _theme variables_.

### What are theme variables?

Theme variables are special CSS variables defined using the `@theme` directive that influence which utility classes exist in your project.

For example, you can add a new color to your project by defining a theme variable like `--color-mint-500`:

```css
/* [!code filename:app.css] */
@import 'tailwindcss';

/* [!code highlight:4] */
@theme;
```

Now you can use utility classes like `bg-mint-500`, `text-mint-500`, or `fill-mint-500` in your HTML:

```html
<!-- [!code filename:HTML] -->
<!-- [!code word:bg-mint-500] -->
<div class="bg-mint-500">
  <!-- ... -->
</div>
```

Tailwind also generates regular CSS variables for your theme variables so you can reference your design tokens in arbitrary values or inline styles:

```html
<!-- [!code filename:HTML] -->
<!-- [!code word:var(--color-mint-500)] -->
<div style="background-color: var(--color-mint-500)">
  <!-- ... -->
</div>
```

Learn more about how theme variables map to different utility classes in the [theme variable namespaces](#theme-variable-namespaces) documentation.

#### Why `@theme` instead of `:root`?

Theme variables aren't _just_ CSS variables — they also instruct Tailwind to create new utility classes that you can use in your HTML.

Since they do more than regular CSS variables, Tailwind uses special syntax so that defining theme variables is always explicit. Theme variables are also required to be defined top-level and not nested under other selectors or media queries, and using a special syntax makes it possible to enforce that.

Defining regular CSS variables with `:root` can still be useful in Tailwind projects when you want to define a variable that isn't meant to be connected to a utility class. Use `@theme` when you want a design token to map directly to a utility class, and use `:root` for defining regular CSS variables that shouldn't have corresponding utility classes.

### Relationship to utility classes

Some utility classes in Tailwind like `flex` and `object-cover` are static, and are always the same from project to project. But many others are driven by theme variables, and only exist because of the theme variables you've defined.

For example, theme variables defined in the `--font-*` namespace determine all of the `font-family` utilities that exist in a project:

```css
/* [!code filename:./node_modules/tailwindcss/theme.css] */
@theme;
```

The `font-sans`, `font-serif`, and `font-mono` utilities only exist by default because Tailwind's default theme defines the `--font-sans`, `--font-serif`, and `--font-mono` theme variables.

If another theme variable like `--font-poppins` were defined, a `font-poppins` utility class would become available to go with it:

```css
/* [!code filename:app.css] */
@import 'tailwindcss';

@theme;
```

```html
<!-- [!code filename:HTML] -->
<!-- [!code word:font-poppins] -->
<h1 class="font-poppins">This headline will use Poppins.</h1>
```

You can name your theme variables whatever you want within these namespaces, and a corresponding utility with the same name will become available to use in your HTML.

#### Relationship to variants

Some theme variables are used to define variants rather than utilities. For example theme variables in the `--breakpoint-*` namespace determine which responsive breakpoint variants exist in your project:

```css
/* [!code filename:app.css] */
@import 'tailwindcss';

@theme;
```

Now you can use the `3xl:*` variant to only trigger a utility when the viewport is 120rem or wider:

```html
<!-- [!code filename:HTML] -->
<!-- [!code word:3xl\:grid-cols-6] -->
<div class="3xl:grid-cols-6 grid grid-cols-2 md:grid-cols-4">
  <!-- ... -->
</div>
```

Learn more about how theme variables map to different utility classes and variants in the [theme variable namespaces](#theme-variable-namespaces) documentation.

### Theme variable namespaces

Theme variables are defined in _namespaces_ and each namespace corresponds to one or more utility class or variant APIs.

Defining new theme variables in these namespaces will make new corresponding utilities and variants available in your project:

For a list of all of the default theme variables, see the [default theme variable reference](#default-theme-variable-reference).

### Default theme variables

When you import `tailwindcss` at the top of your CSS file, it includes a set of default theme variables to get you started.

Here's what you're actually importing when you import `tailwindcss`:

```css
/* [!code filename:node_modules/tailwindcss/index.css] */
@layer theme, base, components, utilities;

/* [!code highlight:2] */
@import './theme.css' layer(theme);
@import './preflight.css' layer(base);
@import './utilities.css' layer(utilities);
```

That `theme.css` file includes the default color palette, type scale, shadows, fonts, and more:

```css
/* [!code filename:node_modules/tailwindcss/theme.css] */
@theme;
```

This is why utilities like `bg-red-200`, `font-serif`, and `shadow-sm` exist out of the box — they're driven by the default theme, not hardcoded into the framework like `flex-col` or `pointer-events-none`.

For a list of all of the default theme variables, see the [default theme variable reference](#default-theme-variable-reference).

## Customizing your theme

The default theme variables are very general purpose and suitable for building dramatically different designs, but they are still just a starting point. It's very common to customize things like the color palette, fonts, and shadows to build exactly the design you have in mind.

### Extending the default theme

Use `@theme` to define new theme variables and extend the default theme:

```css
/* [!code filename:app.css] */
@import 'tailwindcss';

@theme;
```

This makes a new `font-script` utility class available that you can use in your HTML, just like the default `font-sans` or `font-mono` utilities:

```html
<!-- [!code filename:HTML] -->
<!-- [!code word:font-script] -->
<p class="font-script">This will use the Great Vibes font family.</p>
```

Learn more about how theme variables map to different utility classes and variants in the [theme variable namespaces](#theme-variable-namespaces) documentation.

### Overriding the default theme

Override a default theme variable value by redefining it within `@theme`:

```css
/* [!code filename:app.css] */
@import 'tailwindcss';

@theme;
```

Now the `sm:*` variant will trigger at 30rem instead of the default 40rem viewport size:

```html
<!-- [!code filename:HTML] -->
<!-- [!code word:sm\:grid-cols-3] -->
<div class="grid grid-cols-1 sm:grid-cols-3">
  <!-- ... -->
</div>
```

To completely override an entire namespace in the default theme, set the entire namespace to `initial` using the special asterisk syntax:

```css
/* [!code filename:app.css] */
@import 'tailwindcss';

@theme;
```

When you do this, all of the default utilities that use that namespace _(like `bg-red-500`)_ will be removed, and only your custom values _(like `bg-midnight`)_ will be available.

Learn more about how theme variables map to different utility classes and variants in the [theme variable namespaces](#theme-variable-namespaces) documentation.

### Using a custom theme

To completely disable the default theme and use only custom values, set the global theme variable namespace to `initial`:

```css
/* [!code filename:app.css] */
@import 'tailwindcss';

@theme;
```

Now none of the default utility classes that are driven by theme variables will be available, and you'll only be able to use utility classes matching your custom theme variables like `font-body` and `text-dusk`.

### Defining animation keyframes

Define the `@keyframes` rules for your `--animate-*` theme variables within `@theme` to include them in your generated CSS:

```css
/* [!code filename:app.css] */
@import "tailwindcss";

@theme
    100%
  }
}
```

If you want your custom `@keyframes` rules to always be included even when not adding an `--animate-*` theme variable, define them outside of `@theme` instead.

### Referencing other variables

When defining theme variables that reference other variables, use the `inline` option:

```css
/* [!code filename:app.css] */
@import 'tailwindcss';

/* [!code word:inline] */
@theme inline;
```

Using the `inline` option, the utility class will use the theme variable _value_ instead of referencing the actual theme variable:

```css
/* [!code filename:dist.css] */
.font-sans
```

Without using `inline`, your utility classes might resolve to unexpected values because of how variables are resolved in CSS.

For example, this text will fall back to `sans-serif` instead of using `Inter` like you might expect:

```html
<!-- [!code filename:HTML] -->
<!-- [!code word:--font-sans\: var(--font-inter, sans-serif);] -->
<div id="parent" style="--font-sans: var(--font-inter, sans-serif);">
  <!-- [!code word:--font-inter\: Inter; font-family\: var(--font-sans);] -->
  <div id="child" style="--font-inter: Inter; font-family: var(--font-sans);">
    This text will use the sans-serif font, not Inter.
  </div>
</div>
```

This happens because `var(--font-sans)` is resolved where `--font-sans` is defined _(on `#parent`)_, and `--font-inter` has no value there since it's not defined until deeper in the tree _(on `#child`)_.

### Generating all CSS variables

By default only used CSS variables will be generated in the final CSS output. If you want to always generate all CSS variables, you can use the `static` theme option:

```css
/* [!code filename:app.css] */
/* [!code word:static] */
@import 'tailwindcss';

@theme static;
```

### Sharing across projects

Since theme variables are defined in CSS, sharing them across projects is just a matter of throwing them into their own CSS file that you can import in each project:

```css
/* [!code filename:./packages/brand/theme.css] */
@theme;
```

Then you can use `@import` to include your theme variables in other projects:

```css
/* [!code filename:./packages/admin/app.css] */
@import 'tailwindcss';
/* [!code highlight:2] */
@import '../brand/theme.css';
```

You can put shared theme variables like this in their own package in monorepo setups or even publish them to NPM and import them just like any other third-party CSS files.

## Using your theme variables

All of your theme variables are turned into regular CSS variables when you compile your CSS:

```css
/* [!code filename:dist.css] */
:root;
```

This makes it easy to reference all of your design tokens in any of your custom CSS or inline styles.

### With custom CSS

Use your theme variables to get access to your design tokens when you're writing custom CSS that needs to use the same values:

```css
/* [!code filename:app.css] */
/* [!code word:var(--text-base)] */
/* [!code word:var(--color-gray-700)] */
/* [!code word:var(--text-2xl)] */
/* [!code word:var(--font-weight-semibold)] */
/* [!code word:var(--color-gray-950)] */
/* [!code word:var(--text-xl)] */
@import "tailwindcss";

@layer components

    h1

    h2
  }
}
```

This is often useful when styling HTML you don't control, like Markdown content coming from a database or API and rendered to HTML.

### With arbitrary values

Using theme variables in arbitrary values can be useful, especially in combination with the `calc()` function.

```html
<!-- [!code filename:HTML] -->
<!-- [!code word:rounded-xl] -->
<div class="relative rounded-xl">
  <!-- [!code word:rounded-\[calc(var(--radius-xl)-1px)\]] -->
  <div class="absolute inset-px rounded-[calc(var(--radius-xl)-1px)]">
    <!-- ... -->
  </div>
  <!-- ... -->
</div>
```

In the above example, we're subtracting 1px from the `--radius-xl` value on a nested inset element to make sure it has a concentric border radius.

### Referencing in JavaScript

Most of the time when you need to reference your theme variables in JS you can just use the CSS variables directly, just like any other CSS value.

For example, the popular [Motion](https://motion.dev/docs/react-quick-start) library for React lets you animate to and from CSS variable values:

```jsx
// [!code filename:JSX]
// [!code word:var(--color-blue-500)]
<motion.div animate=} />
```

If you need access to a resolved CSS variable value in JS, you can use `getComputedStyle` to get the value of a theme variable on the document root:

```js
// [!code filename:spaghetti.js]
let styles = getComputedStyle(document.documentElement);
let shadow = styles.getPropertyValue('--shadow-xl');
```

## Default theme variable reference

For reference, here's a complete list of the theme variables included by default when you import Tailwind CSS into your project:

```css
/* [!code filename:tailwindcss/theme.css] */
@theme
  }

  @keyframes ping
  }

  @keyframes pulse
  }

  @keyframes bounce

    50%
  }
}
```
