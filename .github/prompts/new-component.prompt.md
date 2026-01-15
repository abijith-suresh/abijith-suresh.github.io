---
name: new-component
description: Create a new Astro component following project patterns
---

Create a new Astro component for this portfolio.

## Instructions

1. Create a new `.astro` file in `src/components/`
2. Use PascalCase for the filename (e.g., `MyComponent.astro`)
3. Follow the project's component patterns

## Component Name

- **Name:** ${input:name:What should the component be called? (PascalCase)}

## Template

```astro
---
import { cn } from "@/lib/utils";

interface Props {
  // Add your props here
  title: string;
  class?: string;
}

const { title, class: className } = Astro.props;
---

<div class:list={cn("", className)}>
  {title}
</div>
```

## Checklist

- [ ] TypeScript `Props` interface defined
- [ ] Using `@/*` path alias for imports
- [ ] Accepting `class?: string` prop
- [ ] Using `cn()` for class merging
- [ ] Using semantic color tokens

## Validation

After creating, run:

```bash
bun run lint && bun run build
```
