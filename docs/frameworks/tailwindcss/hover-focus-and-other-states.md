Every utility class in Tailwind can be applied _conditionally_ by adding a variant to the beginning of the class name that describes the condition you want to target.

For example, to apply the `bg-sky-700` class on hover, use the `hover:bg-sky-700` class:

<details className="mb-10 rounded-xl border border-gray-200 px-6 py-3 prose open:pb-5 dark:prose-dark dark:border-gray-800">
<summary className="font-medium cursor-default select-none text-gray-900 dark:text-gray-200">How does this compare to traditional CSS?</summary>

When writing CSS the traditional way, a single class name would do different things based on the current state:

```css
.btn-primary 

.btn-primary:hover 
```

In Tailwind, rather than adding the styles for a hover state to an existing class, you add another class to the element that _only_ does something on hover:

```css
.bg-sky-500 

.hover\:bg-sky-700:hover 
```

Notice how `hover:bg-sky-700` _only_ defines styles for the `:hover` state? It does nothing by default, but as soon as you hover over an element with that class, the background color will change to `sky-700`.

This is what we mean when we say a utility class can be applied _conditionally_ — by using variants you can control exactly how your design behaves in different states, without ever leaving your HTML.

</details>

Tailwind includes variants for just about everything you'll ever need, including:

- [Pseudo-classes](#pseudo-classes), like `:hover`, `:focus`, `:first-child`, and `:required`
- [Pseudo-elements](#pseudo-elements), like `::before`, `::after`, `::placeholder`, and `::selection`
- [Media and feature queries](#media-and-feature-queries), like responsive breakpoints, dark mode, and `prefers-reduced-motion`
- [Attribute selectors](#attribute-selectors), like `[dir="rtl"]` and `[open]`
- [Child selectors](#child-selectors), like `& > *` and `& *`

These variants can even be stacked to target more specific situations, for example changing the background color in dark mode, at the medium breakpoint, on hover:

```html
<!-- [!code classes:dark:md:hover:bg-fuchsia-600] -->
<button class="dark:md:hover:bg-fuchsia-600 ...">Save changes</button>
```

In this guide you'll learn about every variant available in the framework, how to use them with your own custom classes, and even how to create your own.

## Pseudo-classes

### :hover, :focus, and :active

Style elements on hover, focus, and active using the `hover`, `focus`, and `active` variants:

Tailwind also includes variants for other interactive states like `:visited`, `:focus-within`, `:focus-visible`, and more.

See the [pseudo-class reference](#pseudo-class-reference) for a complete list of available pseudo-class variants.

### :first, :last, :odd, and :even

Style an element when it is the first-child or last-child using the `first` and `last` variants:

You can also style an element when it's an odd or even child using the `odd` and `even` variants:

Use the `nth-*` and `nth-last-*` variants to style children based on their position in the list:

```html
<!-- [!code classes:nth-3:underline,nth-last-5:underline,nth-of-type-4:underline,nth-last-of-type-6:underline] -->
<div class="nth-3:underline">
  <!-- ... -->
</div>
<div class="nth-last-5:underline">
  <!-- ... -->
</div>
<div class="nth-of-type-4:underline">
  <!-- ... -->
</div>
<div class="nth-last-of-type-6:underline">
  <!-- ... -->
</div>
```

You can pass any number you want to these by default, and use arbitrary values for more complex expressions like `nth-[2n+1_of_li]`.

Tailwind also includes variants for other structural pseudo-classes like `:only-child`, `:first-of-type`, `:empty`, and more.

See the [pseudo-class reference](#pseudo-class-reference) for a complete list of available pseudo-class variants.

### :required and :disabled

Style form elements in different states using variants like `required`, `invalid`, and `disabled`:

Using variants for this sort of thing can reduce the amount of conditional logic in your templates, letting you use the same set of classes regardless of what state an input is in and letting the browser apply the right styles for you.

Tailwind also includes variants for other form states like `:read-only`, `:indeterminate`, `:checked`, and more.

See the [pseudo-class reference](#pseudo-class-reference) for a complete list of available pseudo-class variants.

### :has()

Use the `has-*` variant to style an element based on the state or content of its descendants:

You can use `has-*` with a pseudo-class, like `has-[:focus]`, to style an element based on the state of its descendants. You can also use element selectors, like `has-[img]` or `has-[a]`, to style an element based on the content of its descendants.

#### Styling based on the descendants of a group

If you need to style an element based on the descendants of a parent element, you can mark the parent with the `group` class and use the `group-has-*` variant to style the target element:

#### Styling based on the descendants of a peer

If you need to style an element based on the descendants of a sibling element, you can mark the sibling with the `peer` class and use the `peer-has-*` variant to style the target element:

### :not()

Use the `not-` variant to style an element when a condition is not true.

It's particularly powerful when combined with other pseudo-class variants, for example combining `not-focus:` with `hover:` to only apply hover styles when an element is not focused:

You can also combine the `not-` variant with media query variants like `forced-colors` or `supports` to only style an element when something about the user's environment is not true:

```html
<!-- [!code classes:not-supports-[display:grid]:flex] -->
<div class="not-supports-[display:grid]:flex">
  <!-- ... -->
</div>
```

### Styling based on parent state

When you need to style an element based on the state of some _parent_ element, mark the parent with the `group` class, and use `group-*` variants like `group-hover` to style the target element:

This pattern works with every pseudo-class variant, for example `group-focus`, `group-active`, or even `group-odd`.

#### Differentiating nested groups

When nesting groups, you can style something based on the state of a _specific_ parent group by giving that parent a unique group name using a `group/` class, and including that name in variants using classes like `group-hover/`:

Groups can be named however you like and don’t need to be configured in any way — just name your groups directly in your markup and Tailwind will automatically generate the necessary CSS.

#### Arbitrary groups

You can create one-off `group-*` variants on the fly by providing your own selector as an [arbitrary value](/docs/adding-custom-styles#using-arbitrary-values) between square brackets:

For more control, you can use the `&` character to mark where `.group` should end up in the final selector relative to the selector you are passing in:

#### Implicit groups

The `in-*` variant works similarly to `group` except you don't need to add `group` to the parent element:

```html
<!-- [!code classes:in-focus:opacity-100] -->
<!-- [!code --:3] -->
<div tabindex="0" class="group">
  <div class="opacity-50 group-focus:opacity-100">
<!-- [!code ++:3] -->
<div tabindex="0">
  <div class="opacity-50 in-focus:opacity-100">
    <!-- ... -->
  </div>
</div>
```

The `in-*` variant responds to state changes in any parent, so if you want more fine-grained control you'll need to use `group` instead.

### Styling based on sibling state

When you need to style an element based on the state of a _sibling_ element, mark the sibling with the `peer` class, and use `peer-*` variants like `peer-invalid` to style the target element:

This makes it possible to do all sorts of neat tricks, like [floating labels](https://www.youtube.com/watch?v=nJzKi6oIvBA) for example without any JS.

This pattern works with every pseudo-class variant, for example `peer-focus`, `peer-required`, and `peer-disabled`.

It's important to note that the `peer` marker can only be used on _previous_ siblings because of how the [subsequent-sibling combinator](https://developer.mozilla.org/en-US/docs/Web/CSS/Subsequent-sibling_combinator) works in CSS:

```html
<!-- [!code classes:peer-invalid:text-red-500] -->
<!-- [!code classes:peer] -->
<label>
  <span class="peer-invalid:text-red-500 ...">Email</span>
  <input type="email" class="peer ..." />
</label>
```

#### Differentiating peers

When using multiple peers, you can style something on the state of a _specific_ peer by giving that peer a unique name using a `peer/` class, and including that name in variants using classes like `peer-checked/`:

Peers can be named however you like and don’t need to be configured in any way — just name your peers directly in your markup and Tailwind will automatically generate the necessary CSS.

#### Arbitrary peers

You can create one-off `peer-*` variants on the fly by providing your own selector as an [arbitrary value](/docs/adding-custom-styles#using-arbitrary-values) between square brackets:

For more control, you can use the `&` character to mark where `.peer` should end up in the final selector relative to the selector you are passing in:

## Pseudo-elements

### ::before and ::after

Style the `::before` and `::after` pseudo-elements using the `before` and `after` variants:

When using these variants, Tailwind will automatically add `content: ''` by default so you don't have to specify it unless you want a different value:

It's worth noting that you don't really need `::before` and `::after` pseudo-elements for most things in Tailwind projects — it's usually simpler to just use a real HTML element.

For example, here's the same design from above but using a `<span>` instead of the `::before` pseudo-element, which is a little easier to read and is actually less code:

```html
<blockquote class="text-center text-2xl font-semibold text-gray-900 italic">
  When you look
  <span class="relative">
    <!-- [!code highlight:2] -->
    <span class="absolute -inset-1 block -skew-y-3 bg-pink-500" aria-hidden="true"></span>
    <span class="relative text-white">annoyed</span>
  </span>
  all the time, people think that you're busy.
</blockquote>
```

Save `before` and `after` for situations where it's important that the content of the pseudo-element is not actually in the DOM and can't be selected by the user.

### ::placeholder

Style the placeholder text of any input or textarea using the `placeholder` variant:

### ::file

Style the button in file inputs using the `file` variant:

### ::marker

Style the counters or bullets in lists using the `marker` variant:

We've designed the `marker` variant to be inheritable, so although you can use it directly on an `<li>` element, you can also use it on a parent to avoid repeating yourself.

### ::selection

Style the active text selection using the `selection` variant:

We've designed the `selection` variant to be inheritable, so you can add it anywhere in the tree and it will be applied to all descendant elements.

This makes it easy to set the selection color to match your brand across your entire site:

```html
<!-- [!code classes:selection:bg-pink-300] -->
<html>
  <head>
    <!-- ... -->
  </head>
  <body class="selection:bg-pink-300">
    <!-- ... -->
  </body>
</html>
```

### ::first-line and ::first-letter

Style the first line in a block of content using the `first-line` variant, and the first letter using the `first-letter` variant:

### ::backdrop

Style the backdrop of a [native `<dialog>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) using the `backdrop` variant:

```html
<!-- [!code classes:backdrop:bg-gray-50] -->
<dialog class="backdrop:bg-gray-50">
  <form method="dialog">
    <!-- ... -->
  </form>
</dialog>
```

If you're using native `<dialog>` elements in your project, you may also want to read about [styling open/closed states](/docs/hover-focus-and-other-states#openclosed-state) using the `open` variant.

## Media and feature queries

### Responsive breakpoints

To style an element at a specific breakpoint, use responsive variants like `md` and `lg`.

For example, this will render a 3-column grid on mobile, a 4-column grid on medium-width screens, and a 6-column grid on large-width screens:

```html
<!-- [!code classes:md:grid-cols-4,lg:grid-cols-6] -->
<div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
  <!-- ... -->
</div>
```

To style an element based on the width of a parent element instead of the viewport, use variants like `@md` and `@lg`:

```html
<!-- [!code classes:@container,@md:flex-row] -->
<div class="@container">
  <div class="flex flex-col @md:flex-row">
    <!-- ... -->
  </div>
</div>
```

Check out the [Responsive design](/docs/responsive-design) documentation for an in-depth look at how these features work.

### prefers-color-scheme

The `prefers-color-scheme` media query tells you whether the user prefers a light theme or dark theme, and is usually configured at the operating system level.

Use utilities with no variant to target light mode, and use the `dark` variant to provide overrides for dark mode:

Check out the [Dark Mode](/docs/dark-mode) documentation for an in-depth look at how this feature works.

### prefers-reduced-motion

The `prefers-reduced-motion` media query tells you if the user has requested that you minimize non-essential motion.

Use the `motion-reduce` variant to conditionally add styles when the user has requested reduced motion:

Tailwind also includes a `motion-safe` variant that only adds styles when the user has _not_ requested reduced motion. This can be useful when using the `motion-reduce` helper would mean having to "undo" a lot of styles:

```html
<!-- [!code classes:motion-reduce:hover:translate-y-0] -->
<!-- [!code classes:motion-reduce:transition-none] -->
<!-- [!code classes:motion-safe:hover:-translate-x-0.5] -->
<!-- [!code classes:motion-safe:transition] -->
<!-- Using `motion-reduce` can mean lots of "undoing" styles -->
<button class="transition hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ...">
  Save changes
</button>

<!-- Using `motion-safe` is less code in these situations -->
<button class="motion-safe:transition motion-safe:hover:-translate-x-0.5 ...">Save changes</button>
```

### prefers-contrast

The `prefers-contrast` media query tells you if the user has requested more or less contrast.

Use the `contrast-more` variant to conditionally add styles when the user has requested more contrast:

Tailwind also includes a `contrast-less` variant you can use to conditionally add styles when the user has requested less contrast.

### forced-colors

The `forced-colors` media query indicates if the user is using a forced colors mode. These modes override your site's colors with a user defined palette for text, backgrounds, links and buttons.

Use the `forced-colors` variant to conditionally add styles when the user has enabled a forced color mode:

Use the `not-forced-colors` variant to apply styles based when the user is _not_ using a forced colors mode:

```html
<!-- [!code classes:not-forced-colors:appearance-none] -->
<div class="not-forced-colors:appearance-none ...">
  <!-- ... -->
</div>
```

Tailwind also includes a [forced color adjust](/docs/forced-color-adjust) utilities to opt in and out of forced colors.

### inverted-colors

Use the `inverted-colors` variant to conditionally add styles when the user has enabled an inverted color scheme:

```html
<!-- [!code classes:inverted-colors:shadow-none] -->
<div class="shadow-xl inverted-colors:shadow-none ...">
  <!-- ... -->
</div>
```

### pointer and any-pointer

The `pointer` media query tells you whether the user has a primary pointing device, like a mouse, and the accuracy of that pointing device.

Use the `pointer-fine` variant to target an accurate pointing device, like a mouse or trackpad, or the `pointer-coarse` variant to target a less accurate pointing device, like a touchscreen, which can be useful for providing larger click targets on touch devices:

While `pointer`only targets the primary pointing device, `any-pointer` is used to target any of the pointing devices that might be available. Use the `any-pointer-fine` and `any-pointer-coarse` variants to provide different styles if at least one connected pointing device meets the criteria.

You can use `pointer-none` and `any-pointer-none` to target the absence of a pointing device.

### orientation

Use the `portrait` and `landscape` variants to conditionally add styles when the viewport is in a specific orientation:

```html
<!-- [!code classes:portrait:hidden,landscape:hidden] -->
<div>
  <div class="portrait:hidden">
    <!-- ... -->
  </div>
  <div class="landscape:hidden">
    <p>This experience is designed to be viewed in landscape. Please rotate your device to view the site.</p>
  </div>
</div>
```

### scripting

Use the `noscript` variant to conditionally add styles based on whether the user has scripting, such as JavaScript, enabled:

```html
<!-- [!code classes:noscript:block] -->
<div class="hidden noscript:block">
  <p>This experience requires JavaScript to function. Please enable JavaScript in your browser settings.</p>
</div>
```

### print

Use the `print` variant to conditionally add styles that only apply when the document is being printed:

```html
<!-- [!code classes:print:hidden] -->
<!-- [!code classes:print:block] -->
<div>
  <article class="print:hidden">
    <h1>My Secret Pizza Recipe</h1>
    <p>This recipe is a secret, and must not be shared with anyone</p>
    <!-- ... -->
  </article>
  <div class="hidden print:block">Are you seriously trying to print this? It's secret!</div>
</div>
```

### @supports

Use the `supports-[...]` variant to style things based on whether a certain feature is supported in the user's browser:

```html
<!-- [!code classes:supports-[display:grid]:grid] -->
<div class="flex supports-[display:grid]:grid ...">
  <!-- ... -->
</div>
```

Under the hood the `supports-[...]` variant generates [`@supports rules`](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports) and takes anything you’d use with `@supports (...)` between the square brackets, like a property/value pair, and even expressions using `and` and `or`.

For terseness, if you only need to check if a property is supported (and not a specific value), you can just specify the property name:

```html
<!-- [!code classes:supports-backdrop-filter:bg-black/25,supports-backdrop-filter:backdrop-blur] -->
<div class="bg-black/75 supports-backdrop-filter:bg-black/25 supports-backdrop-filter:backdrop-blur ...">
  <!-- ... -->
</div>
```

Use the `not-supports-[...]` variant to style things based on whether a certain feature is not supported in the user's browser:

```html
<!-- [!code classes:not-supports-[display:grid]:flex] -->
<div class="not-supports-[display:grid]:flex">
  <!-- ... -->
</div>
```

You can configure shortcuts for common `@supports` rules you're using in your project by creating a new variant in the `supports-*` namespace:

```css
@custom-variant supports-grid 
}
```

You can then use these custom `supports-*` variants in your project:

```html
<!-- [!code classes:supports-grid:grid] -->
<div class="supports-grid:grid">
  <!-- ... -->
</div>
```

### @starting-style

Use the `starting` variant to set the appearance of an element when it is first rendered in the DOM, or transitions from `display: none` to visible:

## Attribute selectors

### ARIA states

Use the `aria-*` variant to conditionally style things based on [ARIA attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes).

For example, to apply the `bg-sky-700` class when the `aria-checked` attribute is set to `true`, use the `aria-checked:bg-sky-700` class:

```html
<!-- [!code classes:aria-checked:bg-sky-700] -->
<div aria-checked="true" class="bg-gray-600 aria-checked:bg-sky-700">
  <!-- ... -->
</div>
```

By default we've included variants for the most common boolean ARIA attributes:

You can customize which `aria-*` variants are available by creating a new variant:

```css
@custom-variant aria-asc (&[aria-sort="ascending"]);
@custom-variant aria-desc (&[aria-sort="descending"]);
```

If you need to use a one-off `aria` variant that doesn’t make sense to include in your project, or for more complex ARIA attributes that take specific values, use square brackets to generate a property on the fly using any arbitrary value:

ARIA state variants can also target parent and sibling elements using the `group-aria-*` and `peer-aria-*` variants:

### Data attributes

Use the `data-*` variant to conditionally apply styles based on [data attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes).

To check if a data attribute exists (and not a specific value), you can just specify the attribute name:

```html
<!-- Will apply -->
<!-- [!code classes:data-active:border-purple-500] -->
<div data-active class="border border-gray-300 data-active:border-purple-500">
  <!-- ... -->
</div>

<!-- Will not apply -->
<div class="border border-gray-300 data-active:border-purple-500">
  <!-- ... -->
</div>
```

If you need to check for a specific value you may use an arbitrary value:

```html
<!-- Will apply -->
<!-- [!code classes:data-[size=large]:p-8] -->
<div data-size="large" class="data-[size=large]:p-8">
  <!-- ... -->
</div>

<!-- Will not apply -->
<div data-size="medium" class="data-[size=large]:p-8">
  <!-- ... -->
</div>
```

Alternatively, you can configure shortcuts for common data attributes you're using in your project by creating a new variant in the `data-*` namespace:

```css
<!-- [!code filename:app.css] -->
@import "tailwindcss";

@custom-variant data-checked (&[data-ui~="checked"]);
```

You can then use these custom `data-*` variants in your project:

```html
<!-- [!code classes:data-checked:underline] -->
<div data-ui="checked active" class="data-checked:underline">
  <!-- ... -->
</div>
```

### RTL support

Use the `rtl` and `ltr` variants to conditionally add styles in right-to-left and left-to-right modes respectively when building multi-directional layouts:

Remember, these variants are only useful if you are building a site that needs to support _both_ left-to-right and right-to-left layouts. If you're building a site that only needs to support a single direction, you don't need these variants — just apply the styles that make sense for your content.

### Open/closed state

Use the `open` variant to conditionally add styles when a `<details>` or `<dialog>` element is in an open state:

This variant also targets the `:popover-open` pseudo-class for popovers:

```html
<!-- [!code classes:open:opacity-100] -->
<div>
  <button popovertarget="my-popover">Open Popover</button>
  <div popover id="my-popover" class="opacity-0 open:opacity-100 ...">
    <!-- ... -->
  </div>
</div>
```

### Styling inert elements

The `inert` variant lets you style elements marked with the `inert` attribute:

This is useful for adding visual cues that make it clear that sections of content aren't interactive.

## Child selectors

### Styling direct children

While it's generally preferable to put utility classes directly on child elements, you can use the `*` variant in situations where you need to style direct children that you don’t have control over:

It's important to note that overriding a style with a utility directly on the child itself won't work since children rules are generated after the regular ones and they have the same specificity:

```html
<!-- [!code classes:*:bg-sky-50] -->
<!-- [!code classes:bg-red-50] -->
<ul class="*:bg-sky-50 ...">
  <li class="bg-red-50 ...">Sales</li>
  <li>Marketing</li>
  <li>SEO</li>
  <!-- ... -->
</ul>
```

### Styling all descendants

Like `*`, the `**` variant can be used to style children of an element. The main difference is that `**` will apply styles to _all_ descendants, not just the direct children. This is especially useful when you combine it with another variant for narrowing the thing you're selecting:

## Custom variants

### Using arbitrary variants

Just like [arbitrary values](/docs/adding-custom-styles#using-arbitrary-values) let you use custom values with your utility classes, arbitrary variants let you write custom selector variants directly in your HTML.

Arbitrary variants are just format strings that represent the selector, wrapped in square brackets. For example, this arbitrary variant changes the cursor to `grabbing` when the element has the `is-dragging` class:

Arbitrary variants can be stacked with built-in variants or with each other, just like the rest of the variants in Tailwind:

If you need spaces in your selector, you can use an underscore. For example, this arbitrary variant selects all `p` elements within the element where you've added the class:

You can also use at-rules like `@media` or `@supports` in arbitrary variants:

With at-rule custom variants the `&` placeholder isn't necessary, just like when nesting with a preprocessor.

### Registering a custom variant

If you find yourself using the same arbitrary variant multiple times in your project, it might be worth creating a custom variant using the `@custom-variant` directive:

```css
@custom-variant theme-midnight (&:where([data-theme="midnight"] *));
```

Now you can use the `theme-midnight:<utility>` variant in your HTML:

```html
<!-- [!code classes:theme-midnight:bg-black] -->
<html data-theme="midnight">
  <button class="theme-midnight:bg-black ..."></button>
</html>
```

Learn more about adding custom variants in the [adding custom variants documentation](/docs/adding-custom-styles#adding-custom-variants).

## Appendix

### Quick reference

A quick reference table of every single variant included in Tailwind by default.

 <span className="text-gray-400">&</span>:hover "}
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#focus" className="whitespace-nowrap">
            focus
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:focus
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#focus-within" className="whitespace-nowrap">
            focus-within
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:focus-within
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#focus-visible" className="whitespace-nowrap">
            focus-visible
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:focus-visible
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#active" className="whitespace-nowrap">
            active
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:active
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#visited" className="whitespace-nowrap">
            visited
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:visited
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#target" className="whitespace-nowrap">
            target
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:target
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#styling-direct-children" className="whitespace-nowrap">
            *
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            :is(<span className="text-gray-400">&</span> )
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#styling-all-descendants" className="whitespace-nowrap">
            **
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            :is(<span className="text-gray-400">&</span> )
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#has" className="whitespace-nowrap">
            has-[<span className="text-gray-400">...</span>]
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:has(<span className="text-gray-400">...</span>)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#styling-based-on-parent-state" className="whitespace-nowrap">
            group-[<span className="text-gray-400">...</span>]
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:is(:where(.group)<span className="text-gray-400">...</span> *)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#styling-based-on-sibling-state" className="whitespace-nowrap">
            peer-[<span className="text-gray-400">...</span>]
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:is(:where(.peer)<span className="text-gray-400">...</span> ~ *)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#implicit-groups" className="whitespace-nowrap">
            in-[<span className="text-gray-400">...</span>]
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            :where(<span className="text-gray-400">...</span>) <span className="text-gray-400">&</span>
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#not" className="whitespace-nowrap">
            not-[<span className="text-gray-400">...</span>]
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:not(<span className="text-gray-400">...</span>)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#styling-inert-elements" className="whitespace-nowrap">
            inert
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:is([inert], [inert] *)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#first" className="whitespace-nowrap">
            first
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:first-child
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#last" className="whitespace-nowrap">
            last
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:last-child
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#only" className="whitespace-nowrap">
            only
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:only-child
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#odd" className="whitespace-nowrap">
            odd
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:nth-child(odd)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#even" className="whitespace-nowrap">
            even
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:nth-child(even)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#first-of-type" className="whitespace-nowrap">
            first-of-type
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:first-of-type
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#last-of-type" className="whitespace-nowrap">
            last-of-type
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:last-of-type
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#only-of-type" className="whitespace-nowrap">
            only-of-type
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:only-of-type
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#nth" className="whitespace-nowrap">
            nth-[<span className="text-gray-400">...</span>]
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:nth-child(<span className="text-gray-400">...</span>)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#nth-last" className="whitespace-nowrap">
            nth-last-[<span className="text-gray-400">...</span>]
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:nth-last-child(<span className="text-gray-400">...</span>)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#nth-of-type" className="whitespace-nowrap">
            nth-of-type-[<span className="text-gray-400">...</span>]
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:nth-of-type(<span className="text-gray-400">...</span>)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#nth-last-of-type" className="whitespace-nowrap">
            nth-last-of-type-[<span className="text-gray-400">...</span>]
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:nth-last-of-type(<span className="text-gray-400">...</span>)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#empty" className="whitespace-nowrap">
            empty
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:empty
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#disabled" className="whitespace-nowrap">
            disabled
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:disabled
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#enabled" className="whitespace-nowrap">
            enabled
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:enabled
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#checked" className="whitespace-nowrap">
            checked
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:checked
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#indeterminate" className="whitespace-nowrap">
            indeterminate
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:indeterminate
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#default" className="whitespace-nowrap">
            default
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:default
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#optional" className="whitespace-nowrap">
            optional
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:optional
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#required" className="whitespace-nowrap">
            required
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:required
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#valid" className="whitespace-nowrap">
            valid
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:valid
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#invalid" className="whitespace-nowrap">
            invalid
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:invalid
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#user-valid" className="whitespace-nowrap">
            user-valid
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:user-valid
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#user-invalid" className="whitespace-nowrap">
            user-invalid
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:user-invalid
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#in-range" className="whitespace-nowrap">
            in-range
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:in-range
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#out-of-range" className="whitespace-nowrap">
            out-of-range
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:out-of-range
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#placeholder-shown" className="whitespace-nowrap">
            placeholder-shown
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:placeholder-shown
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#placeholder-shown" className="whitespace-nowrap">
            details-content
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:details-content
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#autofill" className="whitespace-nowrap">
            autofill
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:autofill
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#read-only" className="whitespace-nowrap">
            read-only
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:read-only
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#before-and-after" className="whitespace-nowrap">
            before
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>::before
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#before-and-after" className="whitespace-nowrap">
            after
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>::after
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#first-line-and-first-letter" className="whitespace-nowrap">
            first-letter
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>::first-letter
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#first-line-and-first-letter" className="whitespace-nowrap">
            first-line
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>::first-line
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#marker" className="whitespace-nowrap">
            marker
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>::marker, <span className="text-gray-400">&</span> *::marker
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#selection" className="whitespace-nowrap">
            selection
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>::selection
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#file" className="whitespace-nowrap">
            file
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>::file-selector-button
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#backdrop" className="whitespace-nowrap">
            backdrop
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>::backdrop
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#placeholder" className="whitespace-nowrap">
            placeholder
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>::placeholder
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            sm
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">@media (width  40rem)</code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            md
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">@media (width  48rem)</code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            lg
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">@media (width  64rem)</code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            xl
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">@media (width  80rem)</code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            2xl
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">@media (width  96rem)</code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            min-[<span className="text-gray-400">...</span>]
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @media (width  <span className="text-gray-400">...</span>)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            max-sm
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">@media (width  40rem)</code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            max-md
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">@media (width  48rem)</code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            max-lg
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">@media (width  64rem)</code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            max-xl
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">@media (width  80rem)</code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            max-2xl
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">@media (width  96rem)</code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            max-[<span className="text-gray-400">...</span>]
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @media (width  <span className="text-gray-400">...</span>)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            @3xs
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @container (width  16rem)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            @2xs
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @container (width  18rem)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            @xs
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @container (width  20rem)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            @sm
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @container (width  24rem)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            @md
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @container (width  28rem)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            @lg
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @container (width  32rem)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            @xl
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @container (width  36rem)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            @2xl
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @container (width  42rem)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            @3xl
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @container (width  48rem)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            @4xl
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @container (width  56rem)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            @5xl
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @container (width  64rem)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            @6xl
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @container (width  72rem)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            @7xl
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @container (width  80rem)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            @min-[<span className="text-gray-400">...</span>]
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @container (width  <span className="text-gray-400">...</span>)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            @max-3xs
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @container (width  16rem)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            @max-2xs
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @container (width  18rem)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            @max-xs
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @container (width  20rem)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            @max-sm
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @container (width  24rem)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            @max-md
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @container (width  28rem)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            @max-lg
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @container (width  32rem)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            @max-xl
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @container (width  36rem)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            @max-2xl
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @container (width  42rem)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            @max-3xl
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @container (width  48rem)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            @max-4xl
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @container (width  56rem)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            @max-5xl
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @container (width  64rem)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            @max-6xl
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @container (width  72rem)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            @max-7xl
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @container (width  80rem)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#responsive-breakpoints" className="whitespace-nowrap">
            @max-[<span className="text-gray-400">...</span>]
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @container (width  <span className="text-gray-400">...</span>)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#prefers-color-scheme" className="whitespace-nowrap">
            dark
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @media (prefers-color-scheme: dark)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#prefers-reduced-motion" className="whitespace-nowrap">
            motion-safe
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @media (prefers-reduced-motion: no-preference)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#prefers-reduced-motion" className="whitespace-nowrap">
            motion-reduce
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @media (prefers-reduced-motion: reduce)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#prefers-contrast" className="whitespace-nowrap">
            contrast-more
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @media (prefers-contrast: more)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#prefers-contrast" className="whitespace-nowrap">
            contrast-less
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @media (prefers-contrast: less)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#forced-colors" className="whitespace-nowrap">
            forced-colors
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @media (forced-colors: active)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#inverted-colors" className="whitespace-nowrap">
            inverted-colors
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @media (inverted-colors: inverted)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#pointer-and-any-pointer" className="whitespace-nowrap">
            pointer-fine
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">@media (pointer: fine)</code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#pointer-and-any-pointer" className="whitespace-nowrap">
            pointer-coarse
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">@media (pointer: coarse)</code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#pointer-and-any-pointer" className="whitespace-nowrap">
            pointer-none
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">@media (pointer: none)</code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#pointer-and-any-pointer" className="whitespace-nowrap">
            any-pointer-fine
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">@media (any-pointer: fine)</code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#pointer-and-any-pointer" className="whitespace-nowrap">
            any-pointer-coarse
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">@media (any-pointer: coarse)</code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#pointer-and-any-pointer" className="whitespace-nowrap">
            any-pointer-none
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">@media (any-pointer: none)</code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#orientation" className="whitespace-nowrap">
            portrait
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @media (orientation: portrait)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#orientation" className="whitespace-nowrap">
            landscape
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @media (orientation: landscape)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#scripting" className="whitespace-nowrap">
            noscript
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">@media (scripting: none)</code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#print" className="whitespace-nowrap">
            print
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">@media print</code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#supports" className="whitespace-nowrap">
            supports-[<span className="text-gray-400">&hellip;</span>]
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            @supports (<span className="text-gray-400">&hellip;</span>)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#aria-states" className="whitespace-nowrap">
            aria-busy
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>[aria-busy="true"]
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#aria-states" className="whitespace-nowrap">
            aria-checked
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>[aria-checked="true"]
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#aria-states" className="whitespace-nowrap">
            aria-disabled
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>[aria-disabled="true"]
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#aria-states" className="whitespace-nowrap">
            aria-expanded
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>[aria-expanded="true"]
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#aria-states" className="whitespace-nowrap">
            aria-hidden
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>[aria-hidden="true"]
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#aria-states" className="whitespace-nowrap">
            aria-pressed
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>[aria-pressed="true"]
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#aria-states" className="whitespace-nowrap">
            aria-readonly
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>[aria-readonly="true"]
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#aria-states" className="whitespace-nowrap">
            aria-required
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>[aria-required="true"]
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#aria-states" className="whitespace-nowrap">
            aria-selected
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>[aria-selected="true"]
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#aria-states" className="whitespace-nowrap">
            aria-[<span className="text-gray-400">&hellip;</span>]
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>[aria-<span className="text-gray-400">&hellip;</span>]
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#data-attributes" className="whitespace-nowrap">
            data-[<span className="text-gray-400">&hellip;</span>]
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>[data-<span className="text-gray-400">&hellip;</span>]
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#rtl-support" className="whitespace-nowrap">
            rtl
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:where(:dir(rtl), [dir="rtl"], [dir="rtl"] *)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#rtl-support" className="whitespace-nowrap">
            ltr
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:where(:dir(ltr), [dir="ltr"], [dir="ltr"] *)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#openclosed-state" className="whitespace-nowrap">
            open
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">
            <span className="text-gray-400">&</span>:is([open], :popover-open, :open)
          </code>
        </td>
      </tr>
      <tr>
        <td>
          <a href="#starting-style" className="whitespace-nowrap">
            starting
          </a>
        </td>
        <td>
          <code className="whitespace-nowrap before:content-none after:content-none">@starting-style</code>
        </td>
      </tr>
    </tbody>
  </table>
</div>

}

### Pseudo-class reference

This is a comprehensive list of examples for all the pseudo-class variants included in Tailwind to complement the [pseudo-classes documentation](/docs/hover-focus-and-other-states#pseudo-classes) at the beginning of this guide.

#### :hover

Style an element when the user hovers over it with the mouse cursor using the `hover` variant:

```html
<!-- [!code classes:hover:bg-white] -->
<div class="bg-black hover:bg-white ...">
  <!-- ... -->
</div>
```

#### :focus

Style an element when it has focus using the `focus` variant:

```html
<!-- [!code classes:focus:border-blue-400] -->
<input class="border-gray-300 focus:border-blue-400 ..." />
```

#### :focus-within

Style an element when it or one of its descendants has focus using the `focus-within` variant:

```html
<!-- [!code classes:focus-within:shadow-lg] -->
<div class="focus-within:shadow-lg ...">
  <input type="text" />
</div>
```

#### :focus-visible

Style an element when it has been focused using the keyboard using the `focus-visible` variant:

```html
<!-- [!code classes:focus-visible:outline-2] -->
<button class="focus-visible:outline-2 ...">Submit</button>
```

#### :active

Style an element when it is being pressed using the `active` variant:

```html
<!-- [!code classes:active:bg-blue-600] -->
<button class="bg-blue-500 active:bg-blue-600 ...">Submit</button>
```

#### :visited

Style a link when it has already been visited using the `visited` variant:

```html
<!-- [!code classes:visited:text-purple-600] -->
<a href="https://seinfeldquotes.com" class="text-blue-600 visited:text-purple-600 ..."> Inspiration </a>
```

#### :target

Style an element if its ID matches the current URL fragment using the `target` variant:

```html
<!-- [!code classes:target:shadow-lg] -->
<div id="about" class="target:shadow-lg ...">
  <!-- ... -->
</div>
```

#### :first-child

Style an element if it's the first child using the `first` variant:

```svelte
<!-- [!code classes:first:pt-0] -->
<ul>
  
    <li class="py-4 first:pt-0 ...">
      <!-- ... -->
    </li>
  
</ul>
```

#### :last-child

Style an element if it's the last child using the `last` variant:

```svelte
<!-- [!code classes:last:pb-0] -->
<ul>
  
    <li class="py-4 last:pb-0 ...">
      <!-- ... -->
    </li>
  
</ul>
```

#### :only-child

Style an element if it's the only child using the `only` variant:

```svelte
<!-- [!code classes:only:py-0] -->
<ul>
  
    <li class="py-4 only:py-0 ...">
      <!-- ... -->
    </li>
  
</ul>
```

#### :nth-child(odd)

Style an element if it's an oddly numbered child using the `odd` variant:

```svelte
<!-- [!code classes:odd:bg-gray-100] -->
<table>
  
    <tr class="bg-white odd:bg-gray-100 ...">
      <!-- ... -->
    </tr>
  
</table>
```

#### :nth-child(even)

Style an element if it's an evenly numbered child using the `even` variant:

```svelte
<!-- [!code classes:even:bg-gray-100] -->
<table>
  
    <tr class="bg-white even:bg-gray-100 ...">
      <!-- ... -->
    </tr>
  
</table>
```

#### :first-of-type

Style an element if it's the first child of its type using the `first-of-type` variant:

```svelte
<!-- [!code classes:first-of-type:ml-6] -->
<nav>
  <img src="/logo.svg" alt="Vandelay Industries" />
  
    <a href="#" class="ml-2 first-of-type:ml-6 ...">
      <!-- ... -->
    </a>
  
</nav>
```

#### :last-of-type

Style an element if it's the last child of its type using the `last-of-type` variant:

```svelte
<!-- [!code classes:last-of-type:mr-6] -->
<nav>
  <img src="/logo.svg" alt="Vandelay Industries" />
  
    <a href="#" class="mr-2 last-of-type:mr-6 ...">
      <!-- ... -->
    </a>
  
  <button>More</button>
</nav>
```

#### :only-of-type

Style an element if it's the only child of its type using the `only-of-type` variant:

```svelte
<!-- [!code classes:only-of-type:mx-6] -->
<nav>
  <img src="/logo.svg" alt="Vandelay Industries" />
  
    <a href="#" class="mx-2 only-of-type:mx-6 ...">
      <!-- ... -->
    </a>
  
  <button>More</button>
</nav>
```

#### :nth-child()

Style an element at a specific position using the `nth` variant:

```svelte
<!-- [!code classes:nth-3:mx-6,nth-[3n+1]:mx-7] -->
<nav>
  <img src="/logo.svg" alt="Vandelay Industries" />
  
    <a href="#" class="mx-2 nth-3:mx-6 nth-[3n+1]:mx-7 ...">
      <!-- ... -->
    </a>
  
  <button>More</button>
</nav>
```

#### :nth-last-child()

Style an element at a specific position from the end using the `nth-last` variant:

```svelte
<!-- [!code classes:nth-last-3:mx-6,nth-last-[3n+1]:mx-7] -->
<nav>
  <img src="/logo.svg" alt="Vandelay Industries" />
  
    <a href="#" class="mx-2 nth-last-3:mx-6 nth-last-[3n+1]:mx-7 ...">
      <!-- ... -->
    </a>
  
  <button>More</button>
</nav>
```

#### :nth-of-type()

Style an element at a specific position, of the same type using the `nth-of-type` variant:

```svelte
<!-- [!code classes:nth-of-type-3:mx-6,nth-of-type-[3n+1]:mx-7] -->
<nav>
  <img src="/logo.svg" alt="Vandelay Industries" />
  
    <a href="#" class="mx-2 nth-of-type-3:mx-6 nth-of-type-[3n+1]:mx-7 ...">
      <!-- ... -->
    </a>
  
  <button>More</button>
</nav>
```

#### :nth-last-of-type()

Style an element at a specific position from the end, of the same type using the `nth-last-of-type` variant:

```svelte
<!-- [!code classes:nth-last-of-type-3:mx-6,nth-last-of-type-[3n+1]:mx-7] -->
<nav>
  <img src="/logo.svg" alt="Vandelay Industries" />
  
    <a href="#" class="mx-2 nth-last-of-type-3:mx-6 nth-last-of-type-[3n+1]:mx-7 ...">
      <!-- ... -->
    </a>
  
  <button>More</button>
</nav>
```

#### :empty

Style an element if it has no content using the `empty` variant:

```svelte
<!-- [!code classes:empty:hidden] -->
<ul>
  
    <li class="empty:hidden ..."></li>
  
</ul>
```

#### :disabled

Style an input when it's disabled using the `disabled` variant:

```html
<!-- [!code classes:disabled:opacity-75] -->
<input class="disabled:opacity-75 ..." />
```

#### :enabled

Style an input when it's enabled using the `enabled` variant, most helpful when you only want to apply another style when an element is not disabled:

```html
<!-- [!code classes:enabled:hover:border-gray-400] -->
<input class="enabled:hover:border-gray-400 disabled:opacity-75 ..." />
```

#### :checked

Style a checkbox or radio button when it's checked using the `checked` variant:

```html
<!-- [!code classes:checked:bg-blue-500] -->
<input type="checkbox" class="appearance-none checked:bg-blue-500 ..." />
```

#### :indeterminate

Style a checkbox or radio button in an indeterminate state using the `indeterminate` variant:

```html
<!-- [!code classes:indeterminate:bg-gray-300] -->
<input type="checkbox" class="appearance-none indeterminate:bg-gray-300 ..." />
```

#### :default

Style an option, checkbox or radio button that was the default value when the page initially loaded using the `default` variant:

```html
<!-- [!code classes:default:outline-2] -->
<input type="checkbox" class="default:outline-2 ..." />
```

#### :optional

Style an input when it's optional using the `optional` variant:

```html
<!-- [!code classes:optional:border-red-500] -->
<input class="border optional:border-red-500 ..." />
```

#### :required

Style an input when it's required using the `required` variant:

```html
<!-- [!code classes:required:border-red-500] -->
<input required class="border required:border-red-500 ..." />
```

#### :valid

Style an input when it's valid using the `valid` variant:

```html
<!-- [!code classes:valid:border-green-500] -->
<input required class="border valid:border-green-500 ..." />
```

#### :invalid

Style an input when it's invalid using the `invalid` variant:

```html
<!-- [!code classes:invalid:border-red-500] -->
<input required class="border invalid:border-red-500 ..." />
```

#### :user-valid

Style an input when it's valid and the user has interacted with it, using the `user-valid` variant:

```html
<!-- [!code classes:user-valid:border-green-500] -->
<input required class="border user-valid:border-green-500" />
```

#### :user-invalid

Style an input when it's invalid and the user has interacted with it, using the `user-invalid` variant:

```html
<!-- [!code classes:user-invalid:border-red-500] -->
<input required class="border user-invalid:border-red-500" />
```

#### :in-range

Style an input when its value is within a specified range limit using the `in-range` variant:

```html
<!-- [!code classes:in-range:border-green-500] -->
<input min="1" max="5" class="in-range:border-green-500 ..." />
```

#### :out-of-range

Style an input when its value is outside of a specified range limit using the `out-of-range` variant:

```html
<!-- [!code classes:out-of-range:border-red-500] -->
<input min="1" max="5" class="out-of-range:border-red-500 ..." />
```

#### :placeholder-shown

Style an input when the placeholder is shown using the `placeholder-shown` variant:

```html
<!-- [!code classes:placeholder-shown:border-gray-500] -->
<input class="placeholder-shown:border-gray-500 ..." placeholder="you@example.com" />
```

#### :details-content

Style the content of a `<details>` element using the `details-content` variant:

```html
<!-- [!code classes:details-content:bg-gray-100] -->
<details class="details-content:bg-gray-100 ...">
  <summary>Details</summary>
  This is a secret.
</details>
```

#### :autofill

Style an input when it has been autofilled by the browser using the `autofill` variant:

```html
<!-- [!code classes:autofill:bg-yellow-200] -->
<input class="autofill:bg-yellow-200 ..." />
```

#### :read-only

Style an input when it is read-only using the `read-only` variant:

```html
<!-- [!code classes:read-only:bg-gray-100] -->
<input class="read-only:bg-gray-100 ..." />
```