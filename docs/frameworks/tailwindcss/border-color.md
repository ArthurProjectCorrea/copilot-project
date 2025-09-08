import  from "@/components/content.tsx";

<ApiTable
  rows=`],
      ["border-x", (value) => `border-inline-color: $`],
      ["border-y", (value) => `border-block-color: $`],
      ["border-s", (value) => `border-inline-start-color: $`],
      ["border-e", (value) => `border-inline-end-color: $`],
      ["border-t", (value) => `border-top-color: $`],
      ["border-r", (value) => `border-right-color: $`],
      ["border-b", (value) => `border-bottom-color: $`],
      ["border-l", (value) => `border-left-color: $`],
      ["divide", (value) => `& > :not(:last-child) \n}`],
    ].flatMap(([utility, css]) => [
      [`$-inherit`, css("inherit;")],
      [`$-current`, css("currentColor;")],
      [`$-transparent`, css("transparent;")],
      ...Object.entries(colors).map(([name, value]) => [
        `$-$`,
        css(`var(--color-$); /* $ */`),
      ]),
      [`$-(<custom-property>)`, css("var(<custom-property>);")],
      [`$-[<value>]`, css("<value>;")],
    ]),
  ]}
/>

## Examples

### Basic example

Use utilities like `border-rose-500` and `border-lime-100` to control the border color of an element:

### Changing the opacity

Use the color opacity modifier to control the opacity of an element's border color:

### Individual sides

Use utilities like `border-t-indigo-500` and `border-r-lime-100` to set the border color for one side of an element:

### Horizontal and vertical sides

Use utilities like `border-x-indigo-500` and `border-y-lime-100` to set the border color on two sides of an element at the same time:

### Using logical properties

Use utilities like `border-s-indigo-500` and `border-e-lime-100` to set the `border-inline-start-color` and `border-inline-end-color` [logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties/Basic_concepts), which map to either the left or right border based on the text direction:

### Divider between children

Use utilities like `divide-indigo-500` and `divide-lime-100` to control the border color between child elements:

### Using a custom value

### Applying on focus

### Responsive design

## Customizing your theme