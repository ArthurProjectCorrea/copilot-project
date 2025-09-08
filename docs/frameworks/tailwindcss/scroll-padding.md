<ApiTable
rows=-<number>`, `$: calc(var(--spacing) * <number>);`],
    [`-$-<number>`, `$: calc(var(--spacing) * -<number>);`],
    [`$-(<custom-property>)`, `$: var(<custom-property>);`],
    [`$-[<value>]`, `$: <value>;`],
])}
/>

## Examples

### Basic example

Use the `scroll-pt-<number>`, `scroll-pr-<number>`, `scroll-pb-<number>`, and `scroll-pl-<number>` utilities like `scroll-pl-4` and `scroll-pt-6` to set the scroll offset of an element within a snap container:

### Using logical properties

Use the `scroll-ps-<number>` and `scroll-pe-<number>` utilities to set the `scroll-padding-inline-start` and `scroll-padding-inline-end` logical properties, which map to either the left or right side based on the text direction:

### Using negative values

To use a negative scroll padding value, prefix the class name with a dash to convert it to a negative value:

```html
<!-- [!code classes:-scroll-ps-6] -->
<div class="-scroll-ps-6 snap-x ...">
  <!-- ... -->
</div>
```

### Using a custom value

### Responsive design

## Customizing your theme
