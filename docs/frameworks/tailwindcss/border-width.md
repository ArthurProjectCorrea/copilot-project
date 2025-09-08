<ApiTable
  rows=
    `,
    ],
    [
      "divide-x-<number>",
      dedent`
        & > :not(:last-child) 
    `,
    ],
    [
      "divide-x-(length:<custom-property>)",
      dedent`
        & > :not(:last-child) 
    `,
    ],
    [
      "divide-x-[<value>]",
      dedent`
        & > :not(:last-child) 
    `,
    ],
    [
      "divide-y",
      dedent`
        & > :not(:last-child) 
    `,
    ],
    [
      "divide-y-<number>",
      dedent`
        & > :not(:last-child) 
    `,
    ],
    [
      "divide-y-(length:<custom-property>)",
      dedent`
        & > :not(:last-child) 
    `,
    ],
    [
      "divide-y-[<value>]",
      dedent`
        & > :not(:last-child) 
    `,
    ],
    ["divide-x-reverse", "--tw-divide-x-reverse: 1;"],
    ["divide-y-reverse", "--tw-divide-y-reverse: 1;"],
  ]}
/>

## Examples

### Basic example

Use `border` or `border-<number>` utilities like `border-2` and `border-4` to set the border width for all sides of an element:

### Individual sides

Use utilities like `border-r` and `border-t-4` to set the border width for one side of an element:

### Horizontal and vertical sides

Use utilities like `border-x` and `border-y-4` to set the border width on two sides of an element at the same time:

### Using logical properties

Use utilities like `border-s` and `border-e-4` to set the `border-inline-start-width` and `border-inline-end-width` [logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties/Basic_concepts), which map to either the left or right border based on the text direction:

### Between children

Use utilities like `divide-x` and `divide-y-4` to add borders between child elements:

#### Reversing children order

If your elements are in reverse order (using say `flex-row-reverse` or `flex-col-reverse`), use the `divide-x-reverse` or `divide-y-reverse` utilities to ensure the border is added to the correct side of each element:

### Using a custom value

### Responsive design