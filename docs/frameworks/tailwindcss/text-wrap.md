## Examples

### Allowing text to wrap

Use the `text-wrap` utility to wrap overflowing text onto multiple lines at logical points in the text:

### Preventing text from wrapping

Use the `text-nowrap` utility to prevent text from wrapping, allowing it to overflow if necessary:

### Balanced text wrapping

Use the `text-balance` utility to distribute the text evenly across each line:

For performance reasons browsers limit text balancing to blocks that are ~6 lines or less, making it best suited for headings.

### Pretty text wrapping

Use the `text-pretty` utility to prefer better text wrapping and layout at the expense of speed. Behavior varies across browsers but often involves approaches like preventing orphans (a single word on its own line) at the end of a text block:

### Responsive design
