<ApiTable
rows=-<number>`, `$: calc(var(--spacing) * <number>);`],
    [`$-px`, `$: 1px;`],
    [`$-(<custom-property>)`, `$: var(<custom-property>);`],
    [`$-[<value>]`, `$: <value>;`],
])}
/>

## Examples

### Basic example

Use `p-<number>` utilities like `p-4` and `p-8` to control the padding on all sides of an element:

### Adding padding to one side

Use `pt-<number>`, `pr-<number>`, `pb-<number>`, and `pl-<number>` utilities like `pt-6` and `pr-4` to control the padding on one side of an element:

### Adding horizontal padding

Use `px-<number>` utilities like `px-4` and `px-8` to control the horizontal padding of an element:

### Adding vertical padding

Use `py-<number>` utilities like `py-4` and `py-8` to control the vertical padding of an element:

### Using logical properties

Use `ps-<number>` or `pe-<number>` utilities like `ps-4` and `pe-8` to set the `padding-inline-start` and `padding-inline-end` logical properties, which map to either the left or right side based on the text direction:

For more control, you can also use the [LTR and RTL modifiers](/docs/hover-focus-and-other-states#rtl-support) to conditionally apply specific styles depending on the current text direction.

### Using a custom value

### Responsive design

## Customizing your theme
