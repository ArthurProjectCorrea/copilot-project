Tailwind CSS includes a vast, beautiful color palette out of the box, carefully crafted by expert designers and suitable for a wide range of different design styles.

<div className="my-10">

</div>

Every color in the default palette includes 11 steps, with 50 being the lightest, and 950 being the darkest:

The entire color palette is available across all color related utilities, including things like [background color](/docs/background-color), [border color](/docs/border-color), [fill](/docs/fill), [caret color](/docs/caret-color), and many more.

## Working with colors

### Using color utilities

Use color utilities like `bg-white`, `border-pink-300`, and `text-gray-950` to set the different color properties of elements in your design:

Here's a full list of utilities that use your color palette:

### Adjusting opacity

You can adjust the opacity of a color using syntax like `bg-black/75`, where `75` sets the alpha channel of the color to 75%:

This syntax also supports arbitrary values and the CSS variable shorthand:

```html
<!-- [!code filename:HTML] -->
<!-- [!code classes:bg-pink-500/[71.37%],bg-cyan-400/(--my-alpha-value)] -->
<div class="bg-pink-500/[71.37%]"><!-- ... --></div>
<div class="bg-cyan-400/(--my-alpha-value)"><!-- ... --></div>
```

### Targeting dark mode

Use the `dark` variant to write classes like `dark:bg-gray-800` that only apply a color when dark mode is active:

Learn more about styling for dark mode in the [dark mode documentation](/docs/dark-mode).

### Referencing in CSS

Colors are exposed as CSS variables in the `--color-*` namespace, so you can reference them in CSS with variables like `--color-blue-500` and `--color-pink-700`:

```css
/* [!code filename:CSS] */
/* [!code word:var(--color-gray-950)] */
/* [!code word:var(--color-blue-500)] */
/* [!code word:var(--color-blue-800)] */
@import "tailwindcss";

@layer components 
    }
  }
}
```

You can also use these as [arbitrary values]() in utility classes:

```html
<!-- [!code filename:HTML] -->
<!-- [!code classes:bg-[light-dark(var(--color-white),var(--color-gray-950))]] -->
<div class="bg-[light-dark(var(--color-white),var(--color-gray-950))]">
  <!-- ... -->
</div>
```

To quickly adjust the opacity of a color when referencing it as a variable in CSS, Tailwind includes a special <code>--alpha()</code> function:

```css
/* [!code filename:CSS] */
/* [!code word:--alpha(var(--color-gray-950) / 10%)] */
@import "tailwindcss";

@layer components 
}
```

## Customizing your colors

Use `@theme` to add custom colors to your project under the `--color-*` theme namespace:

```css
/* [!code filename:CSS] */
@import "tailwindcss";

/* [!code highlight:6] */
@theme 
```

Now utilities like `bg-midnight`, `text-tahiti`, and `fill-bermuda` will be available in your project in addition to the default colors.

Learn more about theme variables in the [theme variables documentation](/docs/theme).

### Overriding default colors

Override any of the default colors by defining new theme variables with the same name:

```css
/* [!code filename:CSS] */
@import "tailwindcss";

/* [!code highlight:14] */
@theme 
```

### Disabling default colors

Disable any default color by setting the theme namespace for that color to `initial`:

```css
/* [!code filename:CSS] */
@import "tailwindcss";

/* [!code highlight:5] */
@theme 
```

This is especially useful for removing the corresponding CSS variables from your output for colors you don't intend to use.

### Using a custom palette

Use `--color-*: initial` to completely disable all of the default colors and define your own custom color palette:

```css
/* [!code filename:CSS] */
@import "tailwindcss";

@theme 
```

### Referencing other variables

Use `@theme inline` when defining colors that reference other colors:

```css
/* [!code filename:CSS] */
@import "tailwindcss";

:root 

[data-theme="dark"] 

/* [!code highlight:4] */
@theme inline 
```

Learn more in the theme documentation on [referencing other variables](/docs/theme#referencing-other-variables).

## Default color palette reference

Here's a complete list of the default colors and their values for reference:

```css
/* [!code filename:CSS] */
@theme 
```

This can be useful if you want to reuse any of these scales but under a different name, like redefining `--color-gray-*` to use the `--color-slate-*` scale.