<svg className="sr-only">
  <defs>
    <pattern id="checkerboard" x="0.5" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
      <rect x="0" y="0" width="5" height="5" fill="#fff" />
      <rect x="5" y="0" width="5" height="5" fill="#808080" />
      <rect x="0" y="5" width="5" height="5" fill="#808080" />
      <rect x="5" y="5" width="5" height="5" fill="#fff" />
    </pattern>
  </defs>
</svg>

<svg className="hidden">
  <symbol id="gradient-color-stop" viewBox="0 0 32 34">
    <path
      fill="url(#checkerboard)"
      stroke="#000"
      strokeOpacity=".05"
      d="M5 .5h22A3.5 3.5 0 0 1 30.5 4v19.6a3.5 3.5 0 0 1-1.853 3.088L16 33.433 3.353 26.688A3.5 3.5 0 0 1 1.5 23.6V4A3.5 3.5 0 0 1 5 .5Z"
    />
    <path
      fill="currentColor"
      d="M1 4a4 4 0 0 1 4-4h22a4 4 0 0 1 4 4v19.6a4 4 0 0 1-2.118 3.53L16 34 3.118 27.13A4 4 0 0 1 1 23.6V4Z"
    />
  </symbol>
</svg>

<ApiTable
  rows=
/>

## Examples

### Using an image mask

Use the `mask-[<value>]` syntax to set the mask image of an element:

### Masking edges

Use utilities like `mask-b-from-<value>` and `mask-t-to-<value>` to add a linear gradient mask to a single side of an element:

Additionally, use utilities like `mask-x-from-70%` and `mask-y-to-90%` to apply a mask to two sides of an element at the same time:

By default, linear gradient masks transition from black to transparent, but you can customize the gradient colors using the `mask-<side>-from-<color>` and `mask-<side>-to-<color>` utilities.

### Adding an angled linear mask

Use utilities like `mask-linear-<angle>`, `mask-linear-from-20`, and `mask-linear-to-40` to add a custom linear gradient mask to an element:

### Adding a radial mask

Use the `mask-radial-from-<value>` and `mask-radial-to-<value>` utilities to add a radial gradient mask to an element:

By default, radial gradient masks transition from black to transparent, but you can customize the gradient colors using the `mask-radial-from-<color>` and `mask-radial-to-<color>` utilities.

#### Setting the radial position

Use utilities like `mask-radial-at-bottom-left` and `mask-radial-at-[35%_35%]` to set the position of the center of the radial gradient mask:

This is different from [`mask-position`](/docs/mask-position) which sets the position of the mask image itself, not the radial gradient.

#### Setting the radial size

Use utilities like `mask-radial-closest-corner` and `mask-radial-farthest-side` to set the size of the radial gradient mask:

When setting a custom radial gradient size, the units you can use depend on the `<ending-shape>` of the gradient which is set to `ellipse` by default.

With `mask-circle`, you can only use a single fixed length, like `mask-radial-[5rem]`. Whereas with `mask-ellipse`, you can specify each axis as a fixed length or percentage, like `mask-radial-[40%_80%]`.

### Adding a conic mask

Use the `mask-conic-from-<value>`, `mask-conic-to-<value>` and `mask-conic-<angle>` utilities to add a conic gradient mask to an element:

By default, conic gradient masks transition from black to transparent, but you can customize the gradient colors using the `mask-conic-from-<color>` and `mask-conic-to-<color>` utilities.

### Combining masks

Gradient mask utilities, like `mask-radial-from-<value>`, `mask-conic-to-<value>`, and `mask-l-from-<value>` can be combined to create more complex gradient masks:

This behavior relies on the fact that Tailwind sets the [`mask-composite` property](/docs/mask-composite) to `intersect` by default. Changing this property will affect how the gradient masks are combined.

### Removing mask images

Use the `mask-none` utility to remove an existing mask image from an element:

```html
<!-- [!code classes:mask-none] -->
<div class="mask-none">
  <!-- ... -->
</div>
```

### Using a custom value

### Responsive design

## Customizing your theme