---
applyTo: "**/*.ts,**/*.tsx,**/*.astro"
---

# TypeScript Code Style

## Import Conventions

```typescript
// ✅ Always use path alias
import { cn } from "@/lib/utils";
import { SITE } from "@/consts";
import Layout from "@/layouts/Layout.astro";

// ❌ Never use relative paths
import { cn } from "../../lib/utils";
```

## Naming Conventions

- **Functions:** camelCase (`getUserData`, `formatBlogDate`)
- **Types/Interfaces:** PascalCase (`Props`, `CollectionEntry`)
- **Constants:** UPPER_SNAKE_CASE (`SITE`, `NAV_LINKS`)
- **Files:** kebab-case (`data-utils.ts`, `blog-card.astro`)

## Type Definitions

```typescript
// ✅ Good - explicit interface
interface Props {
  title: string;
  description?: string;
  class?: string;
}

// ✅ Good - using imported types
import type { CollectionEntry } from "astro:content";
type BlogPost = CollectionEntry<"blog">;
```

## Error Handling

```typescript
// Unused variables - prefix with underscore
const { data: _unused, error } = await fetch();

// Console - use warn/error only
console.warn("Warning message");
console.error("Error message");
// ❌ console.log is not allowed
```

## Formatting Rules

- Double quotes: `"string"`
- Semicolons required
- 2-space indentation
- Trailing commas (ES5)
