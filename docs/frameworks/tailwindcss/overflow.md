"Utilities for controlling how an element handles content that is too large for the container.";

## Examples

### Showing content that overflows

Use the `overflow-visible` utility to prevent content within an element from being clipped:

Note that any content that overflows the bounds of the element will then be visible.

### Hiding content that overflows

Use the `overflow-hidden` utility to clip any content within an element that overflows the bounds of that element:

### Scrolling if needed

Use the `overflow-auto` utility to add scrollbars to an element in the event that its content overflows the bounds of that element:

Unlike `overflow-scroll`, which always shows scrollbars, this utility will only show them if scrolling is necessary.

### Scrolling horizontally if needed

Use the `overflow-x-auto` utility to allow horizontal scrolling if needed:

### Scrolling vertically if needed

Use the `overflow-y-auto` utility to allow vertical scrolling if needed:

### Scrolling horizontally always

Use the `overflow-x-scroll` utility to allow horizontal scrolling and always show scrollbars unless always-visible scrollbars are disabled by the operating system:

### Scrolling vertically always

Use the `overflow-y-scroll` utility to allow vertical scrolling and always show scrollbars unless always-visible scrollbars are disabled by the operating system:

### Scrolling in all directions

Use the `overflow-scroll` utility to add scrollbars to an element:

Unlike `overflow-auto`, which only shows scrollbars if they are necessary, this utility always shows them. Note that some operating systems (like macOS) hide unnecessary scrollbars regardless of this setting.

### Responsive design