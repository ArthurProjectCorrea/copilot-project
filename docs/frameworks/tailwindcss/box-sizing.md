## Examples

### Including borders and padding

Use the `box-border` utility to set an element's `box-sizing` to `border-box`, telling the browser to include the element's borders and padding when you give it a height or width.

This means a 100px &times; 100px element with a 2px border and 4px of padding on all sides will be rendered as 100px &times; 100px, with an internal content area of 88px &times; 88px:

Tailwind makes this the default for all elements in our [preflight base styles](/docs/preflight).

### Excluding borders and padding

Use the `box-content` utility to set an element's `box-sizing` to `content-box`, telling the browser to add borders and padding on top of the element's specified width or height.

This means a 100px &times; 100px element with a 2px border and 4px of padding on all sides will actually be rendered as 112px &times; 112px, with an internal content area of 100px &times; 100px:

### Responsive design
