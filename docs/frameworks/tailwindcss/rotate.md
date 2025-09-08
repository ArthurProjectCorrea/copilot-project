<ApiTable
  rows=-<number>`, `rotate: <number>deg;`],
      [`-$-<number>`, `rotate: calc(<number>deg * -1);`],
      [`$-(<custom-property>)`, `rotate: var(<custom-property>);`],
      [`$-[<value>]`, `rotate: <value>;`],
    ]),
    ...[
      ["rotate-x", (value) => `rotateX($) var(--tw-rotate-y)`],
      ["rotate-y", (value) => `var(--tw-rotate-x) rotateY($)`],
      ["rotate-z", (value) => `var(--tw-rotate-x) var(--tw-rotate-y) rotateZ($)`],
    ].flatMap(([prefix, getTransform]) => [
      [`$-<number>`, `transform: $;`],
      [`-$-<number>`, `transform: $;`],
      [`$-(<custom-property>)`, `transform: $;`],
      [`$-[<value>]`, `transform: $;`],
    ]),
  ]}
/>

## Examples

### Basic example

Use `rotate-<number>` utilities like `rotate-45` and `rotate-90` to rotate an element by degrees:

### Using negative values

Use `-rotate-<number>` utilities like `-rotate-45` and `-rotate-90` to rotate an element counterclockwise by degrees:

### Rotating in 3D space

Use `rotate-x-<number>`, `rotate-y-<number>`, and `rotate-z-<number>` utilities like `rotate-x-50`, `-rotate-y-30`, and `rotate-z-45` together to rotate an element in 3D space:

### Using a custom value

### Responsive design