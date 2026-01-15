---
applyTo: "src/styles/**/*.css"
---

# Tailwind CSS 4 Styling Guidelines

## Theme System

This project uses CSS custom properties for theming. Colors are defined in `src/styles/global.css`.

## Available Color Tokens

```css
/* Light/Dark mode aware colors */
--background / --foreground       /* Primary bg/text */
--muted / --muted-foreground      /* Secondary/muted elements */
--primary / --primary-foreground  /* Accent/links */
--border                          /* Borders */
--card / --card-foreground        /* Card elements */
```

## Using Colors in Components

```html
<!-- Use semantic color classes -->
<div class="bg-background text-foreground">
  <p class="text-muted-foreground">Secondary text</p>
  <a class="text-primary hover:text-primary/80">Link</a>
</div>
```

## Dark Mode

Dark mode is handled via `data-theme="dark"` attribute on `<html>`.

```css
/* Custom variant for dark mode */
@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));
```

## Layout Constraints

- Max content width: `max-w-3xl` (used consistently across pages)
- Standard padding: `px-4`

## Adding New Colors

If adding new colors, follow the pattern:

1. Add CSS variable in `:root` (light mode)
2. Add override in `[data-theme="dark"]` (dark mode)
3. Map to Tailwind in `@theme inline`
