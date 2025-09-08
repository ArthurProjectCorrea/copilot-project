<ApiTable
  rows=
/>

## Examples

### Basic example

Use the `list-image-[<value>]` syntax to control the marker image for list items:

### Using a CSS variable

Use the <code>list-image-</code> syntax to control the marker image for list items using a CSS variable:

```html
<!-- [!code classes:list-image-(--my-list-image)] -->
<ul class="list-image-(--my-list-image)">
  <!-- ... -->
</ul>
```

This is just a shorthand for <code>list-image-</code> that adds the `var()` function for you automatically.

### Removing a marker image

Use the `list-image-none` utility to remove an existing marker image from list items:

```html
<!-- [!code classes:list-image-none] -->
<ul class="list-image-none">
  <!-- ... -->
</ul>
```

### Responsive design