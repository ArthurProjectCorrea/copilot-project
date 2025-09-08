<ApiTable
rows=
}
`,
    ],
    [
      "animate-ping",
      dedent`
animation: var(--animate-ping); /_ ping 1s cubic-bezier(0, 0, 0.2, 1) infinite _/

        @keyframes ping
        }
      `,
    ],
    [
      "animate-pulse",
      dedent`
        animation: var(--animate-pulse); /* pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite */

        @keyframes pulse
        }
      `,
    ],
    [
      "animate-bounce",
      dedent`
        animation: var(--animate-bounce); /* bounce 1s infinite */

        @keyframes bounce
          50%
        }
      `,
    ],
    ["animate-none", "animation: none;"],
    ["animate-(<custom-property>)", "animation: var(<custom-property>);"],
    ["animate-[<value>]", "animation: <value>;"],

]}
/>

## Examples

### Adding a spin animation

Use the `animate-spin` utility to add a linear spin animation to elements like loading indicators:

### Adding a ping animation

Use the `animate-ping` utility to make an element scale and fade like a radar ping or ripple of water—useful for things like notification badges:

### Adding a pulse animation

Use the `animate-pulse` utility to make an element gently fade in and out—useful for things like skeleton loaders:

### Adding a bounce animation

Use the `animate-bounce` utility to make an element bounce up and down—useful for things like "scroll down" indicators:

### Supporting reduced motion

For situations where the user has specified that they prefer reduced motion, you can conditionally apply animations and transitions using the `motion-safe` and `motion-reduce` variants:

```html
<!-- [!code classes:motion-safe:animate-spin] -->
<button type="button" class="bg-indigo-600 ..." disabled>
  <svg class="mr-3 size-5 motion-safe:animate-spin ..." viewBox="0 0 24 24">
    <!-- ... -->
  </svg>
  Processing
</button>
```

### Using a custom value

### Responsive design

## Customizing your theme
