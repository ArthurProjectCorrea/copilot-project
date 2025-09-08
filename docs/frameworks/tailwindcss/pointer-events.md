## Examples

### Ignoring pointer events

Use the `pointer-events-none` utility to make an element ignore pointer events, like `:hover` and `click` events:

The pointer events will still trigger on child elements and pass-through to elements that are "beneath" the target.

### Restoring pointer events

Use the `pointer-events-auto` utility to revert to the default browser behavior for pointer events:

```html
<div class="pointer-events-none md:pointer-events-auto ...">
  <!-- ... -->
</div>
```
