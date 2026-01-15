---
applyTo: "src/components/**/*.astro"
---

# Astro Component Guidelines

## Component Structure

Always follow this pattern for Astro components:

```astro
---
import { cn } from "@/lib/utils";

interface Props {
  // Define all props with TypeScript types
  title: string;
  class?: string;
}

const { title, class: className } = Astro.props;
---

<div class:list={cn("base-classes", className)}>
  {title}
</div>
```

## Required Practices

1. **TypeScript Interface:** Always define a `Props` interface
2. **Path Alias:** Use `@/*` imports, never relative paths
3. **Class Handling:** Accept `class?: string` prop and merge with `cn()`
4. **Semantic HTML:** Use appropriate HTML elements (`<article>`, `<nav>`, `<section>`)

## Styling

- Use Tailwind CSS utility classes
- Use design tokens: `text-foreground`, `bg-background`, `text-muted-foreground`
- Use `cn()` from `@/lib/utils` for conditional classes

## Icons

```typescript
import { Calendar, ExternalLink, Github } from "lucide-astro";
// Use with size prop: <Calendar size={16} />
```

## Links

Use the custom Link component for internal navigation:

```astro
import Link from "@/components/Link.astro";
<Link href="/blog" prefetch="hover">Blog</Link>
```
