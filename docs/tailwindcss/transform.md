<ApiTable
  rows=
/>

## Examples

### Hardware acceleration

If your transition performs better when rendered by the GPU instead of the CPU, you can force hardware acceleration by adding the `transform-gpu` utility:

```html
<!-- [!code classes:transform-gpu] -->
<div class="scale-150 transform-gpu">
  <!-- ... -->
</div>
```

Use the `transform-cpu` utility to force things back to the CPU if you need to undo this conditionally.

### Removing transforms

Use the `transform-none` utility to remove all of the transforms on an element at once:

```html
<!-- [!code classes:transform-none] -->
<div class="skew-y-3 md:transform-none">
  <!-- ... -->
</div>
```

### Using a custom value
