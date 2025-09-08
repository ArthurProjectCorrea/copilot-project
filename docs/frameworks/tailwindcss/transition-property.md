<ApiTable
  rows=
/>

## Examples

### Basic example

Use utilities like `transition` and `transition-colors` to specify which properties should transition when they change:

### Supporting reduced motion

For situations where the user has specified that they prefer reduced motion, you can conditionally apply animations and transitions using the `motion-safe` and `motion-reduce` variants:

```html
<!-- [!code classes:motion-reduce:transition-none,motion-reduce:hover:transform-none] -->
<!-- prettier-ignore -->
<button class="transform transition hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none ...">
  <!-- ... -->
</button>
```

### Using a custom value

### Responsive design