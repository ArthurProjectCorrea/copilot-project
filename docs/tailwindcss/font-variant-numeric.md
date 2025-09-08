## Examples

### Using ordinal glyphs

Use the `ordinal` utility to enable special glyphs for the ordinal markers in fonts that support them:

### Using slashed zeroes

Use the `slashed-zero` utility to force a zero with a slash in fonts that support them:

### Using lining figures

Use the `lining-nums` utility to use numeric glyphs that are aligned by their baseline in fonts that support them:

### Using oldstyle figures

Use the `oldstyle-nums` utility to use numeric glyphs where some numbers have descenders in fonts that support them:

### Using proportional figures

Use the `proportional-nums` utility to use numeric glyphs that have proportional widths in fonts that support them:

### Using tabular figures

Use the `tabular-nums` utility to use numeric glyphs that have uniform/tabular widths in fonts that support them:

### Using diagonal fractions

Use the `diagonal-fractions` utility to replace numbers separated by a slash with common diagonal fractions in fonts that support them:

### Using stacked fractions

Use the `stacked-fractions` utility to replace numbers separated by a slash with common stacked fractions in fonts that support them:

### Stacking multiple utilities

The `font-variant-numeric` utilities are composable so you can enable multiple variants by combining them:

### Resetting numeric font variants

Use the `normal-nums` property to reset numeric font variants:

```html
<!-- [!code classes:slashed-zero,tabular-nums,normal-nums] -->
<p class="slashed-zero tabular-nums md:normal-nums ...">
  <!-- ... -->
</p>
```

### Responsive design
