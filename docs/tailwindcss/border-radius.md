<ApiTable
rows=-xs`, properties.map((property) => `$: var(--radius-xs); /* 0.125rem (2px) */`).join("\n")],
    [`$-sm`, properties.map((property) => `$: var(--radius-sm); /* 0.25rem (4px) */`).join("\n")],
    [`$-md`, properties.map((property) => `$: var(--radius-md); /* 0.375rem (6px) */`).join("\n")],
    [`$-lg`, properties.map((property) => `$: var(--radius-lg); /* 0.5rem (8px) */`).join("\n")],
    [`$-xl`, properties.map((property) => `$: var(--radius-xl); /* 0.75rem (12px) */`).join("\n")],
    [`$-2xl`, properties.map((property) => `$: var(--radius-2xl); /* 1rem (16px) */`).join("\n")],
    [
      `$-3xl`,
      properties.map((property) => `$: var(--radius-3xl); /* 1.5rem (24px) */`).join("\n"),
    ],
    [`$-4xl`, properties.map((property) => `$: var(--radius-4xl); /* 2rem (32px) */`).join("\n")],
    [`$-none`, properties.map((property) => `$: 0;`).join("\n")],
    [`$-full`, properties.map((property) => `$: calc(infinity * 1px);`).join("\n")],
    [
      `$-(<custom-property>)`,
      properties.map((property) => `$: var(<custom-property>);`).join("\n"),
    ],
    [`$-[<value>]`, properties.map((property) => `$: <value>;`).join("\n")],
])}
/>

## Examples

### Basic example

Use utilities like `rounded-sm` and `rounded-md` to apply different border radius sizes to an element:

### Rounding sides separately

Use utilities like `rounded-t-md` and `rounded-r-lg` to only round one side of an element:

### Rounding corners separately

Use utilities like `rounded-tr-md` and `rounded-tl-lg` utilities to only round one corner of an element:

### Using logical properties

Use utilities like `rounded-s-md` and `rounded-se-xl` to set the border radius using [logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties/Basic_concepts), which map to the appropriate corners based on the text direction:

Here are all the available border radius logical property utilities and their physical property equivalents in both LTR and RTL modes.

For more control, you can also use the [LTR and RTL modifiers](/docs/hover-focus-and-other-states#rtl-support) to conditionally apply specific styles depending on the current text direction.

### Creating pill buttons

Use the `rounded-full` utility to create pill buttons:

### Removing the border radius

Use the `rounded-none` utility to remove an existing border radius from an element:

### Using a custom value

### Responsive design

## Customizing your theme
