<ApiTable
  rows=-<number>`, `scale: <number>% <number>%;`],
      [`-$-<number>`, `scale: calc(<number>% * -1) calc(<number>% * -1);`],
      [`$-(<custom-property>)`, `scale: var(<custom-property>) var(<custom-property>);`],
      [`$-[<value>]`, `scale: <value>;`],
    ]),
    ...[
      ["scale-x", (value) => `$ var(--tw-scale-y)`],
      ["scale-y", (value) => `var(--tw-scale-x) $`],
      ["scale-z", (value) => `var(--tw-scale-x) var(--tw-scale-y) $`],
    ].flatMap(([prefix, getScale]) => [
      [`$-<number>`, `scale: $;`],
      [`-$-<number>`, `scale: $;`],
      [`$-(<custom-property>)`, `scale: $;`],
      [`$-[<value>]`, `scale: $;`],
    ]),
    ["scale-3d", "scale: var(--tw-scale-x) var(--tw-scale-y) var(--tw-scale-z);"],
  ]}
/>

## Examples

### Basic example

Use `scale-<number>` utilities like `scale-75` and `scale-150` to scale an element by a percentage of its original size:

### Scaling on the x-axis

Use the `scale-x-<number>` utilities like `scale-x-75` and `-scale-x-150` to scale an element on the x-axis by a percentage of its original width:

### Scaling on the y-axis

Use the `scale-y-<number>` utilities like `scale-y-75` and `scale-y-150` to scale an element on the y-axis by a percentage of its original height:

### Using negative values

Use `-scale-<number>`, `-scale-x-<number>` or `-scale-y-<number>` utilities like `-scale-x-75` and `-scale-125` to mirror and scale down an element by a percentage of its original size:

### Using a custom value

### Applying on hover