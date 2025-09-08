<ApiTable
  rows=-<number>`, css("calc(var(--spacing) * <number>)")],
        [`-$-<number>`, css("calc(var(--spacing) * -<number>)")],
        [`$-<fraction>`, css("calc(<fraction> * 100%)")],
        [`-$-<fraction>`, css("calc(<fraction> * -100%)")],
        [`$-full`, css("100%")],
        [`-$-full`, css("-100%")],
        [`$-px`, css("1px")],
        [`-$-px`, css("-1px")],
        [`$-(<custom-property>)`, css("var(<custom-property>)")],
        [`$-[<value>]`, css("<value>")],
      ];
    }),
    [`translate-z-<number>`, `translate: var(--tw-translate-x) var(--tw-translate-y) calc(var(--spacing) * <number>);`],
    [
      `-translate-z-<number>`,
      `translate: var(--tw-translate-x) var(--tw-translate-y) calc(var(--spacing) * -<number>);`,
    ],
    [`translate-z-px`, `translate: var(--tw-translate-x) var(--tw-translate-y) 1px;`],
    [`-translate-z-px`, `translate: var(--tw-translate-x) var(--tw-translate-y) -1px;`],
    [
      `translate-z-(<custom-property>)`,
      `translate: var(--tw-translate-x) var(--tw-translate-y) var(<custom-property>);`,
    ],
    [`translate-z-[<value>]`, `translate: var(--tw-translate-x) var(--tw-translate-y) <value>;`],
    ["translate-none", "translate: none;"],
  ]}
/>

## Examples

### Using the spacing scale

Use `translate-<number>` utilities like `translate-2` and `-translate-4` to translate an element on both axes based on the spacing scale:

### Using a percentage

Use `translate-<fraction>` utilities like `translate-1/4` and `-translate-full` to translate an element on both axes by a percentage of the element's size:

### Translating on the x-axis

Use `translate-x-<number>` or `translate-x-<fraction>` utilities like `translate-x-4` and `translate-x-1/4` to translate an element on the x-axis:

### Translating on the y-axis

Use `translate-y-<number>` or `translate-y-<fraction>` utilities like `translate-y-6` and `translate-y-1/3` to translate an element on the y-axis:

### Translating on the z-axis

Use `translate-z-<number>` utilities like `translate-z-6` and `-translate-z-12` to translate an element on the z-axis:

Note that the `translate-z-<number>` utilities require the `transform-3d` utility to be applied to the parent element.

### Using a custom value

### Responsive design