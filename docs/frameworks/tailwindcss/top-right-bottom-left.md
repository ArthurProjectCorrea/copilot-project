<ApiTable
  rows=,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
  ].flatMap(() =>
    [
      ["<number>", "calc(var(--spacing) * <number>)"],
      ["<number>", "calc(var(--spacing) * -<number>)", true],
      ["<fraction>", "calc(<fraction> * 100%)"],
      ["<fraction>", "calc(<fraction> * -100%)", true],
      ["px", "1px"],
      ["px", "-1px", true],
      ["full", "100%"],
      ["full", "-100%", true],
      ["auto", "auto"],
      ["(<custom-property>)", "var(<custom-property>)"],
      ["[<value>]", "<value>"],
    ].map(([suffix, value, negative]) => [`$$-$`, `$: $;`]),
  )}
/>

## Examples

### Basic example

Use `top-<number>`, `right-<number>`, `bottom-<number>`, `left-<number>`, and `inset-<number>` utilities like `top-0` and `bottom-4` to set the horizontal or vertical position of a [positioned element](/docs/position):

### Using negative values

To use a negative top/right/bottom/left value, prefix the class name with a dash to convert it to a negative value:

### Using logical properties

Use `start-<number>` or `end-<number>` utilities like `start-0` and `end-4` to set the `inset-inline-start` and `inset-inline-end` [logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties/Basic_concepts), which map to either the left or right side based on the text direction:

For more control, you can also use the [LTR and RTL modifiers](/docs/hover-focus-and-other-states#rtl-support) to conditionally apply specific styles depending on the current text direction.

### Using a custom value

### Responsive design

## Customizing your theme