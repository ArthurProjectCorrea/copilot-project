<ApiTable
  rows=
/>

## Examples

### Basic example

Use the `content-[<value>]` syntax, along with the `before` and `after` variants, to set the contents of the `::before` and `::after` pseudo-elements:

### Referencing an attribute value

Use the `content-[attr(<name>)]` syntax to reference a value stored in an attribute using the `attr()` CSS function:

### Using spaces and underscores

Since whitespace denotes the end of a class in HTML, replace any spaces in an arbitrary value with an underscore:

If you need to include an actual underscore, you can do this by escaping it with a backslash:

### Using a CSS variable

Use the <code>content-</code> syntax to control the contents of the `::before` and `::after` pseudo-elements using a CSS variable:

```html
<!-- [!code classes:content-(--my-content)] -->
<p class="content-(--my-content)"></p>
```

This is just a shorthand for <code>content-</code> that adds the `var()` function for you automatically.

### Responsive design
