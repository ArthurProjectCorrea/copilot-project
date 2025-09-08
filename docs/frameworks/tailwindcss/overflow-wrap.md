## Examples

### Wrapping mid-word

Use the `wrap-break-word` utility to allow line breaks between letters in a word if needed:

### Wrapping anywhere

The `wrap-anywhere` utility behaves similarly to `wrap-break-word`, except that the browser factors in mid-word line breaks when calculating the intrinsic size of the element:

This is useful for wrapping text inside of `flex` containers, where you would usually need to set `min-width: 0` on the child element to allow it to shrink below its content size.

### Wrapping normally

Use the `wrap-normal` utility to only allow line breaks at natural wrapping points, like spaces, hyphens, and punctuation:

### Responsive design
