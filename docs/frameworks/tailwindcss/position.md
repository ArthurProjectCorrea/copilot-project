## Examples

### Statically positioning elements

Use the `static` utility to position an element according to the normal flow of the document:

With statically positioned elements, any [offsets](/docs/top-right-bottom-left) will be ignored and the element will not act as a position reference for absolutely positioned children.

### Relatively positioning elements

Use the `relative` utility to position an element according to the normal flow of the document:

With relatively position elements, any [offsets](/docs/top-right-bottom-left) are calculated relative to the element's normal position and the element will act as a position reference for absolutely positioned children.

### Absolutely positioning elements

Use the `absolute` utility to position an element _outside_ of the normal flow of the document, causing neighboring elements to act as if the element doesn't exist:

With absolutely positioned elements, any [offsets](/docs/top-right-bottom-left) are calculated relative to the nearest parent that has a position other than `static`, and the element will act as a position reference for other absolutely positioned children.

### Fixed positioning elements

Use the `fixed` utility to position an element relative to the browser window:

With fixed positioned elements, any [offsets](/docs/top-right-bottom-left) are calculated relative to the viewport and the element will act as a position reference for absolutely positioned children:

### Sticky positioning elements

Use the `sticky` utility to position an element as `relative` until it crosses a specified threshold, then treat it as `fixed` until its parent is off screen:

With sticky positioned elements, any [offsets](/docs/top-right-bottom-left) are calculated relative to the element's normal position and the element will act as a position reference for absolutely positioned children.

### Responsive design
