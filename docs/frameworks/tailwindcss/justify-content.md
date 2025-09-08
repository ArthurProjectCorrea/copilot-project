"Utilities for controlling how flex and grid items are positioned along a container's main axis.";

## Examples

### Start

Use the `justify-start` utility to justify items against the start of the container's main axis:

### Center

Use the `justify-center` or `justify-center-safe` utilities to justify items along the center of the container's main axis:

When there is not enough space available, the `justify-center-safe` utility will align items to the start of the container instead of the center.

### End

Use the `justify-end` or `justify-end-safe` utilities to justify items against the end of the container's main axis:

When there is not enough space available, the `justify-end-safe` utility will align items to the start of the container instead of the end.

### Space between

Use the `justify-between` utility to justify items along the container's main axis such that there is an equal amount of space between each item:

### Space around

Use the `justify-around` utility to justify items along the container's main axis such that there is an equal amount of space on each side of each item:

### Space evenly

Use the `justify-evenly` utility to justify items along the container's main axis such that there is an equal amount of space around each item, but also accounting for the doubling of space you would normally see between each item when using `justify-around`:

### Stretch

Use the `justify-stretch` utility to allow auto-sized content items to fill the available space along the container's main axis:

### Normal

Use the `justify-normal` utility to pack content items in their default position as if no `justify-content` value was set:

### Responsive design