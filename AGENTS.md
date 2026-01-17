# Agent Instructions for Portfolio Repository

This document provides essential information for AI coding agents working in this Astro portfolio repository.

## Project Overview

**Tech Stack:** Astro 5.16+, TypeScript, Tailwind CSS 4, MDX
**Package Manager:** Bun 1.3+ (preferred) or npm
**Node Version:** v24+ (ES Module project)
**Description:** Personal portfolio and blog built with Astro, featuring content collections for blog posts and projects.

## Build & Development Commands

### Essential Commands

```bash
# Install dependencies (ALWAYS run first, especially after git pull)
bun install

# Development server (http://localhost:4321)
bun run dev

# Production build (~4s, outputs to dist/)
bun run build

# Preview production build locally
bun run preview

# Linting
bun run lint           # Check for issues
bun run lint:fix       # Auto-fix issues

# Formatting
bun run format         # Auto-format with Prettier
bun run format:check   # Check formatting only
```

### Pre-commit Validation

**CRITICAL:** Always run before committing to avoid CI/deployment failures:

```bash
bun install && bun run lint && bun run format:check && bun run build
```

If any command fails, fix the issues before committing.

### Running Tests

This project does not have automated tests configured yet (see Issue #26). Validation is done through:

1. **TypeScript type checking** - Runs during `bun run build`
2. **ESLint checks** - Run `bun run lint`
3. **Prettier formatting** - Run `bun run format:check`
4. **Successful build** - Run `bun run build` (must complete without errors)

**Note:** To run a "single test", validate one specific file/component by building the project, as Astro validates all dependencies during build.

## Code Style Guidelines

### Imports

```typescript
// ✅ Always use @ path alias for src/ imports
import { SITE } from "@/consts";
import Layout from "@/layouts/Layout.astro";
import { cn } from "@/lib/utils";

// ❌ Never use relative imports for src/ files
import { SITE } from "../consts";
```

**Import ordering:** Case-insensitive alphabetical within declaration groups (enforced by ESLint sort-imports).

### Formatting

- **Quotes:** Double quotes (not single)
- **Semicolons:** Required
- **Indentation:** 2 spaces (no tabs)
- **Line width:** 100 characters max
- **Trailing commas:** ES5 style (objects, arrays)
- **Arrow functions:** Always use parens `(x) => x`

### TypeScript

```typescript
// ✅ Use strict typing (extends astro/tsconfigs/strict)
interface Props {
  title: string;
  class?: string;
}

// ✅ Destructure Astro.props
const { title, class: className } = Astro.props;

// ✅ Prefix unused variables with underscore
const { data, _meta } = result;

// ❌ Never use 'var'
var x = 1; // ERROR

// ✅ Use const/let
const x = 1;
let y = 2;
```

**Type inference:** Explicit return types are optional (eslint rule disabled).

### Naming Conventions

- **Components:** PascalCase (e.g., `Header.astro`, `RecentPosts.astro`)
- **Utilities:** camelCase (e.g., `formatBlogDate`, `getAllProjects`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `SITE`, `NAV_LINKS`)
- **Props interface:** Always named `Props`
- **Collection types:** Use `CollectionEntry<"blog">` from `astro:content`

### Component Patterns

```astro
---
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  class?: string;
}

const { title, class: className } = Astro.props;
---

<div class:list={cn("base-classes", className)}>
  {title}
</div>
```

**Key patterns:**

- Accept `class` prop as `class?: string`
- Apply with `class:list={cn(...)}`
- Use `cn()` from `@/lib/utils` for conditional Tailwind classes
- Icons from `lucide-astro` (e.g., `import { Calendar } from "lucide-astro"`)

### Error Handling

```typescript
// ✅ Use console.warn or console.error (allowed)
console.warn("Failed to load data");

// ⚠️ console.log triggers ESLint warning
console.log("Debug info"); // Avoid in production code
```

### Content Collections

Blog and project content must match Zod schemas in `src/content/config.ts`:

```typescript
// Blog schema
{
  title: string;
  description: string;
  publishDate: Date;
  updatedDate?: Date;
  tags: string[];
  draft: boolean;  // default: false
  image?: string;
  imageAlt?: string;
}

// Project schema
{
  title: string;
  description: string;
  tags: string[];
  github?: string;  // URL
  demo?: string;    // URL
  image?: string;
  startDate: Date;
  endDate?: Date;
  order?: number;
}
```

## Project Structure

```
src/
├── components/       # Astro components (.astro)
│   └── seo/         # SEO components (SEO.astro, JsonLd.astro)
├── content/         # Content collections (validated by Zod)
│   ├── blog/        # Blog posts (.md, .mdx)
│   ├── projects/    # Projects (.md, .mdx)
│   └── config.ts    # Content schemas
├── data/            # TypeScript data files (about.ts)
├── layouts/         # Page layouts (Layout.astro)
├── lib/             # Utilities (utils.ts, data-utils.ts)
├── pages/           # File-based routing
├── styles/          # Global CSS (global.css)
└── consts.ts        # Site constants
```

## Key Configuration Files

- `astro.config.mjs` - Astro configuration, integrations, Vite settings
- `eslint.config.js` - ESLint flat config with TypeScript, Astro, a11y rules
- `.prettierrc` - Prettier formatting config
- `tsconfig.json` - TypeScript strict mode with @ path alias
- `src/content/config.ts` - Zod schemas for content validation

## Rules from .github/copilot-instructions.md

### Always Do

- Run `bun run lint` and `bun run format:check` before commits
- Use TypeScript strict mode
- Follow existing component patterns
- Keep content frontmatter valid against Zod schemas
- Use `@/*` path alias for all src/ imports

### Ask First

- Adding new dependencies
- Modifying `astro.config.mjs`
- Changing content collection schemas
- Modifying the theme/design system

### Never Do

- Commit to `dist/`, `.astro/`, or `node_modules/`
- Use `var` (use `const`/`let`)
- Skip TypeScript types
- Use single quotes (project uses double quotes)
- Modify ESLint ignore patterns for linted files

## Astro-Specific Guidelines

- **View Transitions:** Enabled with hover prefetch strategy
- **Dark Mode:** Via `data-theme` attribute on `<html>` (light/dark)
- **Max Width:** Use `max-w-3xl` for consistent content width
- **Code Blocks:** Using `astro-expressive-code` with GitHub themes
- **Script Reinitialization:** Use `astro:after-swap` event for view transitions

## Common Utilities

```typescript
// Class name merging (shadcn/ui pattern)
import { cn } from "@/lib/utils";
cn("text-red-500", condition && "bg-blue-500");

// Date formatting
import { formatBlogDate } from "@/lib/utils";
formatBlogDate(new Date()); // "January 8th, 2026"

// Reading time
import { calculateReadingTime } from "@/lib/utils";
calculateReadingTime(content); // Returns number of minutes

// Get content
import { getAllBlogPosts, getAllProjects } from "@/lib/data-utils";
await getAllBlogPosts({ limit: 5 });
```

## Site Configuration

Site URL: `https://abijith.sh` (configured in `astro.config.mjs`)
Features: RSS feed at `/rss.xml`, auto-generated sitemap

## Recent Important Changes

- **2026-01-17:** Added `@astrojs/rss` dependency (PR #29) - Required for RSS feed generation
- **2026-01-17:** Created 18 GitHub issues for feature tracking (#11-#28)
- **2026-01-17:** Added AGENTS.md documentation (PR #10)

## Troubleshooting

### Build Failures

- Ensure all dependencies are installed: `bun install`
- Check for missing packages in `package.json`
- Verify content frontmatter matches Zod schemas in `src/content/config.ts`
- Clear cache: `rm -rf .astro dist node_modules && bun install`

### Deployment Issues

- Vercel/Netlify builds require all imports to have corresponding dependencies
- Check that RSS generation works: look for `dist/rss.xml` after build
- Ensure `site` is configured in `astro.config.mjs` for absolute URLs
