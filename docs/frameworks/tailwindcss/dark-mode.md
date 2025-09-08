## Overview

Now that dark mode is a first-class feature of many operating systems, it's becoming more and more common to design a dark version of your website to go along with the default design.

To make this as easy as possible, Tailwind includes a `dark` variant that lets you style your site differently when dark mode is enabled:

By default this uses the `prefers-color-scheme` CSS media feature, but you can also build sites that support [toggling dark mode manually](#toggling-dark-mode-manually) by overriding the dark variant.

## Toggling dark mode manually

If you want your dark theme to be driven by a CSS selector instead of the `prefers-color-scheme` media query, override the `dark` variant to use your custom selector:

```css
/* [!code filename:app.css] */
@import "tailwindcss";

/* [!code highlight:2] */
@custom-variant dark (&:where(.dark, .dark *));
```

Now instead of `dark:*` utilities being applied based on `prefers-color-scheme`, they will be applied whenever the `dark` class is present earlier in the HTML tree:

```html
<!-- [!code filename:HTML] -->
<!-- [!code word:dark\:bg-black] -->
<!-- [!code word:dark] -->
<html class="dark">
  <body>
    <div class="bg-white dark:bg-black">
      <!-- ... -->
    </div>
  </body>
</html>
```

How you add the `dark` class to the `html` element is up to you, but a common approach is to use a bit of JavaScript that updates the `class` attribute and syncs that preference to somewhere like `localStorage`.

### Using a data attribute

To use a data attribute instead of a class to activate dark mode, just override the `dark` variant with an attribute selector instead:

```css
/* [!code filename:app.css] */
@import "tailwindcss";

/* [!code highlight:2] */
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));
```

Now dark mode utilities will be applied whenever the `data-theme` attribute is set to `dark` somewhere up the tree:

```html
<!-- [!code filename:HTML] -->
<!-- [!code word:dark\:bg-black] -->
<!-- [!code word:data-theme="dark"] -->
<html data-theme="dark">
  <body>
    <div class="bg-white dark:bg-black">
      <!-- ... -->
    </div>
  </body>
</html>
```

### With system theme support

To build three-way theme toggles that support light mode, dark mode, and your system theme, use a custom dark mode selector and the [`window.matchMedia()` API](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) to detect the system theme and update the `html` element when needed.

Here's a simple example of how you can support light mode, dark mode, as well as respecting the operating system preference:

```js
// [!code filename:spaghetti.js]
// On page load or when changing themes, best to add inline in `head` to avoid FOUC
document.documentElement.classList.toggle(
  "dark",
  localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
);

// Whenever the user explicitly chooses light mode
localStorage.theme = "light";

// Whenever the user explicitly chooses dark mode
localStorage.theme = "dark";

// Whenever the user explicitly chooses to respect the OS preference
localStorage.removeItem("theme");
```

Again you can manage this however you like, even storing the preference server-side in a database and rendering the class on the server — it's totally up to you.