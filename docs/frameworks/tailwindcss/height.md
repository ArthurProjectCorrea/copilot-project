<ApiTable
  rows=
/>

## Examples

### Basic example

Use `h-<number>` utilities like `h-24` and `h-64` to set an element to a fixed height based on the spacing scale:

### Using a percentage

Use `h-full` or `h-<fraction>` utilities like `h-1/2` and `h-2/5` to give an element a percentage-based height:

### Matching viewport

Use the `h-screen` utility to make an element span the entire height of the viewport:

```html
<!-- [!code classes:h-screen] -->
<div class="h-screen">
  <!-- ... -->
</div>
```

### Matching dynamic viewport

Use the `h-dvh` utility to make an element span the entire height of the viewport, which changes as the browser UI expands or contracts:

### Matching large viewport

Use the `h-lvh` utility to set an element's height to the largest possible height of the viewport:

### Matching small viewport

Use the `h-svh` utility to set an element's height to the smallest possible height of the viewport:

### Setting both width and height

Use utilities like `size-px`, `size-4`, and `size-full` to set both the width and height of an element at the same time:

### Using a custom value

### Responsive design

## Customizing your theme