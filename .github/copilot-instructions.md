# Copilot Instructions for Portfolio Repository

## Project Overview

This is a personal portfolio and blog website built with **Astro 5** and **Tailwind CSS 4**. The site showcases projects and blog posts with a minimal, content-first design philosophy inspired by [astro-erudite](https://github.com/jktrn/astro-erudite).

**Tech Stack:** Astro 5.16+, TypeScript, Tailwind CSS 4, Zod for content validation
**Package Manager:** Bun 1.3+ (preferred) or npm
**Node.js:** v24+ (ES Module project)

---

## Commands

**Always run `bun install` before building or running any other commands.**

| Command                | Description                               |
| ---------------------- | ----------------------------------------- |
| `bun install`          | Install dependencies (required first)     |
| `bun run dev`          | Start dev server at http://localhost:4321 |
| `bun run build`        | Build production site to `dist/` (~4s)    |
| `bun run preview`      | Preview production build                  |
| `bun run lint`         | Run ESLint                                |
| `bun run lint:fix`     | Auto-fix ESLint issues                    |
| `bun run format:check` | Check Prettier formatting                 |
| `bun run format`       | Auto-format all files with Prettier       |

### Validation Sequence (run before committing)

```bash
bun install && bun run lint && bun run format:check && bun run build
```

---

## Project Structure

```
├── src/
│   ├── components/        # Astro components (.astro files)
│   │   └── seo/          # SEO-related components (SEO.astro, JsonLd.astro)
│   ├── content/          # Content collections (Markdown)
│   │   ├── blog/         # Blog posts (.md files)
│   │   ├── projects/     # Project entries (.md files)
│   │   └── config.ts     # Zod schemas for content validation
│   ├── data/             # Static TypeScript data (about.ts)
│   ├── layouts/          # Page layouts (Layout.astro)
│   ├── lib/              # Utilities (utils.ts, data-utils.ts)
│   ├── pages/            # File-based routing
│   │   ├── blog/         # Blog routes ([...slug].astro, [...page].astro)
│   │   ├── projects/     # Project routes
│   │   └── tags/         # Tag pages
│   ├── styles/           # Global CSS (global.css with Tailwind)
│   └── consts.ts         # Site configuration constants
├── public/               # Static assets (served as-is)
├── astro.config.mjs      # Astro configuration
├── eslint.config.js      # ESLint flat config
├── tsconfig.json         # TypeScript config with @/* alias
└── .prettierrc           # Prettier config
```

---

## Key Files & Patterns

### Content Collections

Blog posts and projects use Astro Content Collections with Zod validation:

- **Blog schema** (`src/content/config.ts`): `title`, `description`, `publishDate`, `tags[]`, `draft`, `image`
- **Project schema**: `title`, `description`, `tags[]`, `github`, `demo`, `startDate`, `endDate`

When adding content, ensure frontmatter matches the schema in `src/content/config.ts`.

### Path Alias

The project uses `@/*` to map to `src/*`. Always use this alias:

```typescript
// ✅ Good
import { SITE } from "@/consts";
import Layout from "@/layouts/Layout.astro";

// ❌ Bad
import { SITE } from "../consts";
```

### Component Patterns

- Use `cn()` from `@/lib/utils` for conditional Tailwind classes
- Components accept `class` prop as `class?: string` and apply with `class:list={cn(...)}`
- Icons from `lucide-astro` (e.g., `import { Calendar } from "lucide-astro"`)

---

## Code Style

**ESLint + Prettier** with these key rules:

- Double quotes for strings (not single quotes)
- Semicolons required
- 2-space indentation
- Trailing commas in ES5 style
- `@typescript-eslint/no-unused-vars` ignores `_` prefixed variables
- `no-console` warns (use `console.warn/error` only)

**Good example:**

```typescript
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  class?: string;
}

const { title, class: className } = Astro.props;
```

---

## Styling

- **Tailwind CSS 4** with custom theme in `src/styles/global.css`
- Uses CSS custom properties for theming (`--background`, `--foreground`, etc.)
- Dark/light mode via `data-theme` attribute on `<html>`
- Max content width: `max-w-3xl` (consistent across pages)

---

## Boundaries

### ✅ Always Do

- Run `bun run lint` and `bun run format:check` before commits
- Use TypeScript strict mode (extends `astro/tsconfigs/strict`)
- Follow existing component patterns
- Keep content frontmatter valid against Zod schemas

### ⚠️ Ask First

- Adding new dependencies
- Modifying `astro.config.mjs`
- Changing content collection schemas
- Modifying the theme/design system

### 🚫 Never Do

- Commit to `dist/`, `.astro/`, or `node_modules/`
- Use `var` (use `const`/`let`)
- Skip TypeScript types
- Use single quotes (project uses double quotes)
- Modify `eslint.config.js` ignore patterns for linted files

---

## Output Directories (gitignored)

- `dist/` - Production build output
- `.astro/` - Astro generated types and cache
- `node_modules/` - Dependencies

---

## Notes

- Site URL is configured as `https://abijith.sh` in `astro.config.mjs`
- View Transitions enabled with hover prefetch strategy
- RSS feed generated at `/rss.xml`
- Sitemap auto-generated via `@astrojs/sitemap`

Trust these instructions. Only search the codebase if information here is incomplete or incorrect.
