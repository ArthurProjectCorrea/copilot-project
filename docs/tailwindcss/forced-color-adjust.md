## Examples

### Opting out of forced colors

Use the `forced-color-adjust-none` utility to opt an element out of the colors enforced by forced colors mode. This is useful in situations where enforcing a limited color palette will degrade usability.

You can also use the [forced colors variant](/docs/hover-focus-and-other-states#forced-colors) to conditionally add styles when the user has enabled a forced color mode.

### Restoring forced colors

Use the `forced-color-adjust-auto` utility to make an element adhere to colors enforced by forced colors mode:

```html
<!-- [!code classes:lg:forced-color-adjust-auto] -->
<form>
  <fieldset class="forced-color-adjust-none lg:forced-color-adjust-auto ...">
    <legend>Choose a color:</legend>
    <select class="hidden lg:block">
      <option value="White">White</option>
      <option value="Gray">Gray</option>
      <option value="Black">Black</option>
    </select>
    <div class="lg:hidden">
      <label>
        <input class="sr-only" type="radio" name="color-choice" value="White" />
        <!-- ... -->
      </label>
      <!-- ... -->
    </div>
  </fieldset>
</form>
```

This can be useful if you want to undo the `forced-color-adjust-none` utility, for example on a larger screen size.

### Responsive design
