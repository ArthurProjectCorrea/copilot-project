## Examples

### Block and Inline

Use the `inline`, `inline-block`, and `block` utilities to control the flow of text and elements:

### Flow Root

Use the `flow-root` utility to create a block-level element with its own [block formatting context](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context):

### Flex

Use the `flex` utility to create a block-level flex container:

### Inline Flex

Use the `inline-flex` utility to create an inline flex container that flows with text:

### Grid

Use the `grid` utility to create a grid container:

### Inline Grid

Use the `inline-grid` utility to create an inline grid container:

### Contents

Use the `contents` utility to create a "phantom" container whose children act like direct children of the parent:

### Table

Use the `table`, `table-row`, `table-cell`, `table-caption`, `table-column`, `table-column-group`, `table-header-group`, `table-row-group`, and `table-footer-group` utilities to create elements that behave like their respective table elements:

### Hidden

Use the `hidden` utility to remove an element from the document:

To visually hide an element but keep it in the document, use the [visibility](/docs/visibility#making-elements-invisible) property instead.

### Screen-reader only

Use `sr-only` to hide an element visually without hiding it from screen readers:

```html
<!-- [!code classes:sr-only] -->
<a href="#">
  <svg><!-- ... --></svg>
  <span class="sr-only">Settings</span>
</a>
```

Use `not-sr-only` to undo `sr-only`, making an element visible to sighted users as well as screen readers:

```html
<!-- [!code classes:sm:not-sr-only] -->
<a href="#">
  <svg><!-- ... --></svg>
  <span class="sr-only sm:not-sr-only">Settings</span>
</a>
```

This can be useful when you want to visually hide something on small screens but show it on larger screens for example.

### Responsive design
