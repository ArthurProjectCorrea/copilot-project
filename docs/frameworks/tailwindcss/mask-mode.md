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

## Examples

### Basic example

Use the `mask-alpha`, `mask-luminance` and `mask-match` utilities to control the mode of an element's mask:

When using `mask-luminance` the luminance value of the mask determines visibility, so sticking with grayscale colors will produce the most predictable results. With `mask-alpha`, the opacity of the mask determines the visibility of the masked element.

### Responsive design