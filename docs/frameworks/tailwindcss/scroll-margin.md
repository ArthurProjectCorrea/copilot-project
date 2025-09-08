<ApiTable
  rows=-<number>`, `$: calc(var(--spacing) * <number>);`],
    [`-$-<number>`, `$: calc(var(--spacing) * -<number>);`],
    [`$-(<custom-property>)`, `$: var(<custom-property>);`],
    [`$-[<value>]`, `$: <value>;`],
  ])}
/>

## Examples

### Basic example

Use the `scroll-mt-<number>`, `scroll-mr-<number>`, `scroll-mb-<number>`, and `scroll-ml-<number>` utilities like `scroll-ml-4` and `scroll-mt-6` to set the scroll offset around items within a snap container:

### Using negative values

To use a negative scroll margin value, prefix the class name with a dash to convert it to a negative value:

```html
<!-- [!code classes:-scroll-ml-6] -->
<div class="snap-start -scroll-ml-6 ...">
  <!-- ... -->
</div>
```

### Using logical properties

Use the `scroll-ms-<number>` and `scroll-me-<number>` utilities to set the `scroll-margin-inline-start` and `scroll-margin-inline-end` [logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties/Basic_concepts), which map to either the left or right side based on the text direction:

For more control, you can also use the [LTR and RTL modifiers](/docs/hover-focus-and-other-states#rtl-support) to conditionally apply specific styles depending on the current text direction.

### Using a custom value

### Responsive design

## Customizing your theme