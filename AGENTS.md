# Agent Instructions for Portfolio Repository

This document provides essential information for AI coding agents working in this Astro portfolio repository.

## Project Overview

**Tech Stack:** Astro 5.16+, TypeScript, Tailwind CSS 4, MDX, FlexSearch (search)  
**Package Manager:** Bun 1.3.5+ (preferred) or npm  
**Node Version:** v24+ (ES Module project)  
**Site URL:** https://abijith-suresh.github.io (GitHub Pages)  
**Description:** Personal portfolio and blog built with Astro, featuring content collections for blog posts and projects, with integrated search functionality via FlexSearch.

## Build & Development Commands

### Essential Commands

```bash
# Install dependencies (ALWAYS run first, especially after git pull)
bun install

# Development server (http://localhost:4321)
bun run dev

# Production build (outputs to dist/)
bun run build

# Preview production build locally
bun run preview

# Linting
bun run lint           # Check for issues
bun run lint:fix       # Auto-fix issues

# Formatting
bun run format         # Auto-format with Prettier
bun run format:check   # Check formatting only

# Testing
bun run test           # Run all tests
bun run test:watch     # Run tests in watch mode
bun run test:ui        # Run tests with UI
```

### Pre-commit Validation

**CRITICAL:** Always run before committing to avoid CI/deployment failures:

```bash
bun install && bun run lint && bun run format:check && bun run build
```

If any command fails, fix the issues before committing.

### Running Tests

This project uses [Vitest](https://vitest.dev/) for unit testing.

```bash
# Run all tests
bun run test

# Run tests in watch mode
bun run test:watch

# Run tests with UI
bun run test:ui
```

Test files live in `src/test/` and alongside source files (`*.test.ts`). A placeholder test is included at `src/test/example.test.ts`.

**Additional validation:**

1. **TypeScript type checking** - `bun run type-check`
2. **ESLint checks** - `bun run lint`
3. **Prettier formatting** - `bun run format:check`
4. **Successful build** - `bun run build`

## DevContainer Setup

The DevContainer configuration provides a fully containerized development environment with all dependencies pre-installed. This ensures consistency across different development machines and eliminates environment-specific issues.

The DevContainer includes:

- Node.js 24
- Bun (package manager)
- GitHub CLI (gh)
- Essential VSCode extensions for Astro, TypeScript, Tailwind CSS, and ESLint

### Docker Setup

**Prerequisites:** Docker Desktop installed and running

1. Install Docker Desktop from [docker.com](https://www.docker.com/products/docker-desktop)
2. Install the VSCode **Dev Containers** extension (`ms-vscode-remote.remote-containers`)
3. Open the repository in VSCode
4. Run `F1` → **"Dev Containers: Reopen in Container"**

### Podman Setup

**Prerequisites:** Podman installed

1. Install Podman from [podman.io](https://podman.io/get-started)
2. Install the VSCode **Dev Containers** extension (`ms-vscode-remote.remote-containers`)
3. Configure VSCode to use Podman:
   - Open VSCode Settings (`Ctrl/Cmd + ,`)
   - Search for "remote.containers.dockerPath"
   - Set to `podman`
4. Open the repository in VSCode
5. Run `F1` → **"Dev Containers: Reopen in Container"**

**Note:** Both Docker and Podman are fully supported for this project's DevContainer.

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

## Content Creation

This project includes templates and scripts for creating new blog posts and projects.

### Quick Start

```bash
# Create a new blog post
bun run new:blog

# Create a new project
bun run new:project
```

### Blog Posts

**Frontmatter Schema:**

```yaml
---
title: "Your Post Title"
description: "Brief description of the post"
publishDate: 2026-01-15
tags: ["tag1", "tag2"]
draft: true # Set to false when ready to publish
---
```

**Process:**

1. Run `bun run new:blog`
2. Enter title and description
3. Choose format (md or mdx)
4. Edit the generated file
5. Set `draft: false` when ready to publish
6. Commit and push

**File Location:** Posts are created in `src/content/blog/YYYY/` where `YYYY` is the current year.

**MDX Components:** When creating MDX posts, components are auto-imported:

- `Callout` - For notes, tips, warnings, and danger alerts
- `Image` - For images with optional captions
- `Video` - For YouTube embeds

See `.templates/mdx-cheatsheet.md` for full component documentation.

### Projects

**Frontmatter Schema:**

```yaml
---
title: "Project Name"
description: "Brief description of the project"
date: 2026-01-15
tags: ["React", "TypeScript"]
github: "https://github.com/username/repo" # Optional
demo: "https://example.com" # Optional
---
```

**Process:**

1. Run `bun run new:project`
2. Enter title and description
3. Optionally add GitHub and demo URLs
4. Edit the generated file
5. Commit and push

**File Location:** Projects are created in `src/content/projects/`.

### Templates

All templates are stored in `.templates/`:

- `blog-post.md` - Basic Markdown template
- `blog-post.mdx` - MDX template with component imports
- `project.md` - Project template
- `mdx-cheatsheet.md` - Component usage reference
- `README.md` - Template documentation

### Manual Content Creation

If you prefer not to use the scripts:

1. Copy the appropriate template from `.templates/`
2. Rename with a kebab-case slug (e.g., `my-post.md`)
3. Place in the correct directory
4. Update frontmatter fields
5. Write content

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
}

// Project schema
{
  title: string;
  description: string;
  tags: string[];
  startDate: Date;
  endDate?: Date;
}
```

## Project Structure

```
src/
├── components/       # Astro components (.astro)
│   ├── mdx/         # MDX components (Callout.astro, CodeBlock.astro)
│   └── seo/         # SEO components (SEO.astro, JsonLd.astro)
├── content/         # Content collections (validated by Zod)
│   ├── blog/        # Blog posts (.md, .mdx)
│   ├── projects/    # Projects (.md, .mdx)
│   └── config.ts    # Content schemas
├── layouts/         # Page layouts (Layout.astro)
├── lib/             # Utilities (utils.ts, blog.ts, projects.ts, toc.ts, group-by-year.ts)
├── pages/           # File-based routing
│   ├── blog/        # Blog list and post pages
│   ├── projects/    # Project list and detail pages
│   ├── tags/        # Tag-based content filtering
│   ├── about.astro  # About page
│   ├── index.astro  # Home page
│   └── rss.xml.js   # RSS feed generation
├── styles/          # Global CSS (global.css)
├── themes/          # Theme definitions (ink-and-paper.ts, index.ts, types.ts)
├── types/           # TypeScript type definitions
└── consts.ts        # Site constants (SITE, NAV_LINKS, SOCIAL_LINKS, AUTHOR)
```

## Key Configuration Files

- `astro.config.ts` - Astro configuration, integrations, Vite settings
- `eslint.config.ts` - ESLint flat config with TypeScript, Astro, a11y rules
- `.prettierrc` - Prettier formatting config
- `tsconfig.json` - TypeScript strict mode with @ path alias
- `src/content/config.ts` - Zod schemas for content validation
- `.lintstagedrc.json` - Lint-staged configuration for pre-commit hooks
- `CHANGELOG.md` - Project changelog following Keep a Changelog 1.1.0 spec

## Pre-commit Hooks

This project uses Husky and lint-staged for automated code quality checks:

- **Husky:** Manages Git hooks (configured via `bun run prepare`)
- **lint-staged:** Runs linters/formatters on staged files only
  - JS/TS/Astro files: ESLint auto-fix + Prettier
  - JSON/MD/MDX/CSS files: Prettier only

**Configuration:** See `.lintstagedrc.json` and `.husky/pre-commit`

## CI/CD Pipeline

### GitHub Actions Workflows

1. **CI Workflow** (`.github/workflows/ci.yml`)
   - Triggers: Pull requests to `main`
   - Runs: ESLint, Prettier check, build validation
   - Uses: Bun 1.3.5, frozen lockfile

2. **GitHub Pages Deployment** (`.github/workflows/gh-pages.yml`)
   - Triggers: Push to `main`, manual dispatch
   - Steps: Install deps → Build → Upload artifact → Deploy
   - Output: Deploys to https://abijith-suresh.github.io

**Note:** Vercel deployment was removed in PR #136 (2026-01-25)

## Development Rules & Best Practices

### Required Practices

- Run `bun run lint` and `bun run format:check` before commits
- Use TypeScript strict mode
- Follow existing component patterns
- Keep content frontmatter valid against Zod schemas
- Use `@/*` path alias for all src/ imports

### Approval Required

- Adding new dependencies
- Modifying `astro.config.mjs`
- Changing content collection schemas
- Modifying the theme/design system

### Prohibited Actions

- Commit to `dist/`, `.astro/`, or `node_modules/`
- Use `var` (use `const`/`let`)
- Skip TypeScript types
- Use single quotes (project uses double quotes)
- Modify ESLint ignore patterns for linted files

## Theme System

- **Active Theme:** Ink & Paper (`src/themes/ink-and-paper.ts`)
- **Theme Config:** `src/themes/index.ts` controls `ACTIVE_THEME`
- **CSS Variables:** Defined in `src/styles/global.css` (`:root` for light, `[data-theme="dark"]` for dark)
- **Warm Accent:** `--color-warm` (teal: `#4a8f8c` light / `#6db3b0` dark) used for logo, decorative lines, reading progress, tag counts, 404 number, footer dot
- **Font:** Satoshi from Fontshare

## Astro-Specific Guidelines

- **View Transitions:** Enabled with hover prefetch strategy
- **Dark Mode:** Via `data-theme` attribute on `<html>` (light/dark)
- **Max Width:** Use `max-w-3xl` for consistent content width
- **Code Blocks:** Using `astro-expressive-code` with GitHub themes
- **Script Reinitialization:** Use `astro:after-swap` event for view transitions — scripts that capture DOM references must use an `init()` pattern that re-queries DOM after swap (see SearchModal.astro for reference)

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
import { getAllBlogPosts, getAllProjects } from "@/lib/blog" or "@/lib/projects";
await getAllBlogPosts({ limit: 5 });
```

## Git Workflow

### Branch Naming

- Format: `type/description` (kebab-case)
- Examples: `feat/add-og-images`, `fix/broken-nav`, `chore/update-deps`
- Types: `feat`, `fix`, `docs`, `refactor`, `chore`, `test`

### Commit Message Format

Follows [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject
```

- **type**: `feat`, `fix`, `docs`, `refactor`, `chore`, `test`
- **scope**: optional, e.g., `feat(nav): add mobile menu`
- **subject**: present tense, ≤50 chars, no period at end

| Type       | When to use                     |
| ---------- | ------------------------------- |
| `feat`     | New feature                     |
| `fix`      | Bug fix                         |
| `docs`     | Documentation only              |
| `refactor` | Code change without feature/fix |
| `chore`    | Build, deps, config             |
| `test`     | Tests only                      |

### PR Workflow

1. Pull latest main: `git checkout main && git pull origin main`
2. Cut branch: `git checkout -b type/description`
3. Make atomic commits (one logical change per commit)
4. Push branch: `git push -u origin type/description`
5. Open PR: `gh pr create --title "type: description" --body "..."`
6. Wait for CI to pass
7. **Merge using squash merge** (keeps main history linear)
8. Delete branch after merge
9. Update `CHANGELOG.md` with a summary of changes

### Key Rules

- Never commit directly to `main`
- Pre-commit hook runs lint-staged automatically
- `commit-msg` hook validates commit format via commitlint
- Keep commits atomic — one logical change, one commit

## Site Configuration

Site URL: `https://abijith-suresh.github.io` (configured in `astro.config.mjs`)
Features: RSS feed at `/rss.xml`, auto-generated sitemap

## Recent Important Changes

- **2026-02-12:** Redesigned about page — centered layout with labeled content sections and inline interests
- **2026-02-06:** Portfolio redesign — Ink & Paper theme, editorial Hero, about page with avatar, search fixes
- **2026-01-31:** Migrated from Pagefind to FlexSearch for improved search experience (PR #176)
- **2026-01-25:** Migrated to GitHub Pages deployment, removed Vercel analytics (PR #136)
- **2026-01-24:** Added comprehensive search modal with FlexSearch integration (PR #130)
- **2026-01-24:** Improved SPA-like motion and navigation (PR #135)
- **2026-01-24:** Refactored shared content patterns and improved type safety (PR #132-#134)
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

- GitHub Pages builds require all imports to have corresponding dependencies
- Check that RSS generation works: look for `dist/rss.xml` after build
- Ensure `site` is configured in `astro.config.mjs` for absolute URLs
