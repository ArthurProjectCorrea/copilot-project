<ApiTable
  rows=
        @media (width >= 48rem) 
        @media (width >= 64rem) 
        @media (width >= 80rem) 
        @media (width >= 96rem) 
      `,
    ],
    ["max-w-(<custom-property>)", "max-width: var(<custom-property>);"],
    ["max-w-[<value>]", "max-width: <value>;"],
  ]}
/>

## Examples

### Basic example

Use `max-w-<number>` utilities like `max-w-24` and `max-w-64` to set an element to a fixed maximum width based on the spacing scale:

### Using a percentage

Use `max-w-full` or `max-w-<fraction>` utilities like `max-w-1/2` and `max-w-2/5` to give an element a percentage-based maximum width:

### Using the container scale

Use utilities like `max-w-sm` and `max-w-xl` to set an element to a fixed maximum width based on the container scale:

### Using breakpoints container

Use the `container` utility to set the maximum width of an element to match the `min-width` of the current breakpoint. This is useful if you'd prefer to design for a fixed set of screen sizes instead of trying to accommodate a fully fluid viewport:

```html
<!-- [!code classes:container] -->
<div class="container">
  <!-- ... -->
</div>
```

Note that unlike containers you might have used in other frameworks, Tailwind's container does not center itself automatically and does not have any built-in horizontal padding. Use `mx-auto` and the `px-<number>` utilities to add these:

```html
<!-- [!code classes:mx-auto,px-4] -->
<div class="container mx-auto px-4">
  <!-- ... -->
</div>
```

### Using a custom value

### Responsive design

## Customizing your theme