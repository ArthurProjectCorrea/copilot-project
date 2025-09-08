## Examples

### Making elements invisible

Use the `invisible` utility to hide an element, but still maintain its place in the document, affecting the layout of other elements:

To completely remove an element from the document, use the [display](/docs/display#hidden) property instead.

### Collapsing elements

Use the `collapse` utility to hide table rows, row groups, columns, and column groups as if they were set to `display: none`, but without impacting the size of other rows and columns:

This makes it possible to dynamically toggle rows and columns without affecting the table layout.

### Making elements visible

Use the `visible` utility to make an element visible:

This is mostly useful for undoing the `invisible` utility at different screen sizes.

### Responsive design