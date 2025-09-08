import from "@/components/content.tsx";

<ApiTable
rows=`,
      `--tw-shadow-color: var(--color-$); /* $ */`,
    ]),
    // Inset shadows
    ["inset-shadow-2xs", "box-shadow: var(--inset-shadow-2xs); /* inset 0 1px rgb(0 0 0 / 0.05) */"],
    ["inset-shadow-xs", "box-shadow: var(--inset-shadow-xs); /* inset 0 1px 1px rgb(0 0 0 / 0.05) */"],
    ["inset-shadow-sm", "box-shadow: var(--inset-shadow-sm); /* inset 0 2px 4px rgb(0 0 0 / 0.05) */"],
    ["inset-shadow-none", "box-shadow: inset 0 0 #0000;"],
    ["inset-shadow-(<custom-property>)", "box-shadow: var(<custom-property>);"],
    ["inset-shadow-[<value>]", "box-shadow: <value>;"],
    // Inset shadow colors
    ["inset-shadow-inherit", "--tw-inset-shadow-color: inherit;"],
    ["inset-shadow-current", "--tw-inset-shadow-color: currentColor;"],
    ["inset-shadow-transparent", "--tw-inset-shadow-color: transparent;"],
    ...Object.entries(colors).map(([name, value]) => [
      `inset-shadow-$`,
      `--tw-inset-shadow-color: var(--color-$); /* $ */`,
    ]),
    // Rings
    ["ring", "--tw-ring-shadow: 0 0 0 1px;"],
    ["ring-<number>", "--tw-ring-shadow: 0 0 0 <number>px;"],
    ["ring-(<custom-property>)", "--tw-ring-shadow: 0 0 0 var(<custom-property>);"],
    ["ring-[<value>]", "--tw-ring-shadow: 0 0 0 <value>;"],
    // Ring colors
    ["ring-inherit", "--tw-ring-color: inherit;"],
    ["ring-current", "--tw-ring-color: currentColor;"],
    ["ring-transparent", "--tw-ring-color: transparent;"],
    ...Object.entries(colors).map(([name, value]) => [
      `ring-$`,
      `--tw-ring-color: var(--color-$); /* $ */`,
    ]),
    // Inset rings
    ["inset-ring", "--tw-inset-ring-shadow: inset 0 0 0 1px"],
    ["inset-ring-<number>", "--tw-inset-ring-shadow: inset 0 0 0 <number>px"],
    ["inset-ring-(<custom-property>)", "--tw-inset-ring-shadow: inset 0 0 0 var(<custom-property>);"],
    ["inset-ring-[<value>]", "--tw-inset-ring-shadow: inset 0 0 0 <value>;"],
    // Inset ring colors
    ["inset-ring-inherit", "--tw-inset-ring-color: inherit;"],
    ["inset-ring-current", "--tw-inset-ring-color: currentColor;"],
    ["inset-ring-transparent", "--tw-inset-ring-color: transparent;"],
    ...Object.entries(colors).map(([name, value]) => [
      `inset-ring-$`,
      `--tw-inset-ring-color: var(--color-$); /_ $ _/`,
]),
]}
/>

## Examples

### Basic example

Use utilities like `shadow-sm` and `shadow-lg` to apply different sized outer box shadows to an element:

### Changing the opacity

Use the opacity modifier to adjust the opacity of the box shadow:

The default box shadow opacities are quite low (25% or less), so increasing the opacity (to like 50%) will make the box shadows more pronounced.

### Setting the shadow color

Use utilities like `shadow-indigo-500` and `shadow-cyan-500/50` to change the color of a box shadow:

By default colored shadows have an opacity of 100% but you can adjust this using the opacity modifier.

### Adding an inset shadow

Use utilities like `inset-shadow-xs` and `inset-shadow-sm` to apply an inset box shadow to an element:

You can adjust the opacity of an inset shadow using the opacity modifier, like `inset-shadow-sm/50`. The default inset shadow opacities are quite low (5%), so increasing the opacity (to like 50%) will make the inset shadows more pronounced.

### Setting the inset shadow color

Use utilities like `inset-shadow-indigo-500` and `inset-shadow-cyan-500/50` to change the color of an inset box shadow:

By default colored shadows have an opacity of 100% but you can adjust this using the opacity modifier.

### Adding a ring

Use `ring` or `ring-<number>` utilities like `ring-2` and `ring-4` to apply a solid box-shadow to an element:

By default rings match the `currentColor` of the element they are applied to.

### Setting the ring color

Use utilities like `ring-indigo-500` and `ring-cyan-500/50` to change the color of a ring:

By default rings have an opacity of 100% but you can adjust this using the opacity modifier.

### Adding an inset ring

Use `inset-ring` or `inset-ring-<number>` utilities like `inset-ring-2` and `inset-ring-4` to apply a solid inset box-shadow to an element:

By default inset rings match the `currentColor` of the element they are applied to.

### Setting the inset ring color

Use utilities like `inset-ring-indigo-500` and `inset-ring-cyan-500/50` to change the color of an inset ring:

By default inset rings have an opacity of 100% but you can adjust this using the opacity modifier.

### Removing a box shadow

Use the `shadow-none`, `inset-shadow-none`,`ring-0`, and `inset-ring-0` utilities to remove an existing box shadow from an element:

### Using a custom value

### Responsive design

## Customizing your theme

### Customizing shadows

### Customizing inset shadows

### Customizing shadow colors
