<ApiTable
rows=-<number>`, `$: calc(var(--spacing) * <number>);`],
      [`-$-<number>`, `$: calc(var(--spacing) * -<number>);`],
      [`$-auto`, `$: auto;`],
      [`$-px`, `$: 1px;`],
      [`-$-px`, `$: -1px;`],
      [`$-(<custom-property>)`, `$: var(<custom-property>);`],
      [`$-[<value>]`, `$: <value>;`],
    ]),
    ...[
      ["space-x", "margin-inline"],
      ["space-y", "margin-block"],
    ].flatMap(([prefix, property]) => [
      [
        `$-<number>`,
        dedent`& > :not(:last-child) -reverse: 0;
$-start: calc(calc(var(--spacing) * <number>) * var(--tw-$-reverse));
$-end: calc(calc(var(--spacing) * <number>) * calc(1 - var(--tw-$-reverse)));
};`,
      ],
      [
        `-$-<number>`,
        dedent`& > :not(:last-child) -reverse: 0;
          $-start: calc(calc(var(--spacing) * -<number>) * var(--tw-$-reverse));
$-end: calc(calc(var(--spacing) * -<number>) * calc(1 - var(--tw-$-reverse)));
};`,
      ],
      [
        `$-px`,
        dedent`& > :not(:last-child) -reverse: 0;
          $-start: calc(1px * var(--tw-$-reverse));
$-end: calc(1px * calc(1 - var(--tw-$-reverse)));
};`,
      ],
      [
        `-$-px`,
        dedent`& > :not(:last-child) -reverse: 0;
          $-start: calc(-1px * var(--tw-$-reverse));
$-end: calc(-1px * calc(1 - var(--tw-$-reverse)));
};`,
      ],
      [
        `$-(<custom-property>)`,
        dedent`& > :not(:last-child) -reverse: 0;
          $-start: calc(var(<custom-property>) * var(--tw-$-reverse));
$-end: calc(var(<custom-property>) * calc(1 - var(--tw-$-reverse)));
};`,
      ],
      [
        `$-[<value>]`,
        dedent`& > :not(:last-child) -reverse: 0;
          $-start: calc(<value> * var(--tw-$-reverse));
$-end: calc(<value> * calc(1 - var(--tw-$-reverse)));
};`,
      ],
    ]),
    [
      "space-x-reverse",
      dedent`& > :not(:last-child)) `,
    ],
    [
      "space-y-reverse",
      dedent`& > :not(:last-child)) `,
],

]}
/>

## Examples

### Basic example

Use `m-<number>` utilities like `m-4` and `m-8` to control the margin on all sides of an element:

### Adding margin to a single side

Use `mt-<number>`, `mr-<number>`, `mb-<number>`, and `ml-<number>` utilities like `ml-2` and `mt-6` to control the margin on one side of an element:

### Adding horizontal margin

Use `mx-<number>` utilities like `mx-4` and `mx-8` to control the horizontal margin of an element:

### Adding vertical margin

Use `my-<number>` utilities like `my-4` and `my-8` to control the vertical margin of an element:

### Using negative values

To use a negative margin value, prefix the class name with a dash to convert it to a negative value:

### Using logical properties

Use `ms-<number>` or `me-<number>` utilities like `ms-4` and `me-8` to set the `margin-inline-start` and `margin-inline-end` logical properties:

### Adding space between children

Use `space-x-<number>` or `space-y-<number>` utilities like `space-x-4` and `space-y-8` to control the space between elements:

#### Reversing children order

If your elements are in reverse order (using say `flex-row-reverse` or `flex-col-reverse`), use the `space-x-reverse` or `space-y-reverse` utilities to ensure the space is added to the correct side of each element:

#### Limitations

The space utilities are really just a shortcut for adding margin to all-but-the-last-item in a group, and aren't designed to handle complex cases like grids, layouts that wrap, or situations where the children are rendered in a complex custom order rather than their natural DOM order.

For those situations, it's better to use the [gap utilities](/docs/gap) when possible, or add margin to every element with a matching negative margin on the parent.

Additionally, the space utilities are not designed to work together with the [divide utilities](/docs/border-width#between-children). For those situations, consider adding margin/padding utilities to the children instead.

### Using a custom value

### Responsive design

## Customizing your theme
