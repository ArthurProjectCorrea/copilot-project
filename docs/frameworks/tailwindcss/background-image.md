<svg className="hidden">
  <symbol id="gradient-color-stop" viewBox="0 0 32 34">
    <path d="M1 4a4 4 0 0 1 4-4h22a4 4 0 0 1 4 4v19.6a4 4 0 0 1-2.118 3.53L16 34 3.118 27.13A4 4 0 0 1 1 23.6V4Z" />
    <path
      fill="none"
      stroke="#000"
      strokeOpacity=".05"
      d="M5 .5h22A3.5 3.5 0 0 1 30.5 4v19.6a3.5 3.5 0 0 1-1.853 3.088L16 33.433 3.353 26.688A3.5 3.5 0 0 1 1.5 23.6V4A3.5 3.5 0 0 1 5 .5Z"
    />
  </symbol>
</svg>

<ApiTable
  rows=
/>

## Examples

### Basic example

Use the `bg-[<value>]` syntax to set the background image of an element:

### Adding a linear gradient

Use utilities like `bg-linear-to-r` and `bg-linear-<angle>` with the [color stop utilities](#setting-gradient-color-stops) to add a linear gradient to an element:

### Adding a radial gradient

Use the `bg-radial` and `bg-radial-[<position>]` utilities with the [color stop utilities](#setting-gradient-color-stops) to add a radial gradient to an element:

### Adding a conic gradient

Use the `bg-conic` and `bg-conic-<angle>` utilities with the [color stop utilities](#setting-gradient-color-stops) to add a conic gradient to an element:

### Setting gradient color stops

Use utilities like `from-indigo-500`, `via-purple-500`, and `to-pink-500` to set the colors of the gradient stops:

### Setting gradient stop positions

Use utilities like `from-10%`, `via-30%`, and `to-90%` to set more precise positions for the gradient color stops:

### Changing interpolation mode

Use the interpolation modifier to control the interpolation mode of a gradient:

By default gradients are interpolated in the `oklab` color space.

### Removing background images

Use the `bg-none` utility to remove an existing background image from an element:

```html
<!-- [!code classes:bg-none] -->
<div class="bg-none"></div>
```

### Using a custom value

### Responsive design

## Customizing your theme