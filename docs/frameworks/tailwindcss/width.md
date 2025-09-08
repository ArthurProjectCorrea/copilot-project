<ApiTable
  rows=
/>

## Examples

### Basic example

Use `w-<number>` utilities like `w-24` and `w-64` to set an element to a fixed width based on the spacing scale:

### Using a percentage

Use `w-full` or `w-<fraction>` utilities like `w-1/2` and `w-2/5` to give an element a percentage-based width:

### Using the container scale

Use utilities like `w-sm` and `w-xl` to set an element to a fixed width based on the container scale:

### Matching the viewport

Use the `w-screen` utility to make an element span the entire width of the viewport:

```html
<!-- [!code classes:w-screen] -->
<div class="w-screen">
  <!-- ... -->
</div>
```

Alternatively, you can match the width of the large, small or dynamic viewports using the `w-lvw`, `w-svw`, and `w-dvw` utilities.

### Resetting the width

Use the `w-auto` utility to remove an element's assigned width under a specific condition, like at a particular breakpoint:

```html
<!-- [!code classes:w-full,w-auto] -->
<div class="w-full md:w-auto">
  <!-- ... -->
</div>
```

### Setting both width and height

Use utilities like `size-px`, `size-4`, and `size-full` to set both the width and height of an element at the same time:

### Using a custom value

### Responsive design

## Customizing your theme
