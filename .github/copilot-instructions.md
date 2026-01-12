# Portfolio Website - GitHub Copilot Instructions

## Quick Reference

This is a personal portfolio and blog website built with **Astro 5** and **TypeScript**. It's a static site that uses **Tailwind CSS v4** for styling with a shadcn/ui-inspired theming system. Content is managed through **Astro Content Collections** with **Zod validation**. The package manager is **Bun**.

---

## Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Astro | ^5.16.6 |
| Language | TypeScript | Strict mode |
| Styling | Tailwind CSS | ^4.1.18 |
| Validation | Zod | ^4.3.5 |
| Icons | lucide-astro | ^0.556.0 |
| Utilities | clsx, tailwind-merge | Latest |
| Package Manager | Bun | - |
| Linting | ESLint v9 (flat config) | ^9.39.2 |
| Formatting | Prettier | ^3.7.4 |

---

## Architecture

### Overview
- **Type**: Static Site (SSG)
- **Pattern**: Component-based with Content Collections
- **Routing**: File-based routing via Astro Pages
- **Data Flow**: Content Collections → Data Utils → Pages → Components

### Directory Structure

```
src/
├── components/     # Reusable Astro components (PascalCase)
├── content/        # Astro Content Collections (markdown files)
│   ├── config.ts   # Zod schemas for content validation
│   ├── blog/       # Blog posts (.md files)
│   └── projects/   # Project descriptions (.md files)
├── data/           # Static TypeScript data (about, skills, experience)
├── layouts/        # Page layout components
├── lib/            # Utility functions and helpers
│   ├── utils.ts    # General utilities (cn, formatBlogDate)
│   └── data-utils.ts # Content fetching and processing
├── pages/          # File-based routing (generates URLs)
│   ├── blog/       # Blog routes ([...page].astro, [...slug].astro)
│   ├── projects/   # Project routes
│   └── tags/       # Tag-filtered blog views
├── styles/         # Global CSS and theming
│   └── global.css  # Tailwind + CSS custom properties
└── consts.ts       # Site-wide configuration constants
```

### Key Architectural Decisions
1. **Zero client-side JavaScript by default** - Only add scripts when necessary
2. **Content-first design** - Markdown for all content, validated with Zod
3. **Type-safe throughout** - Full TypeScript with strict mode
4. **CSS custom properties for theming** - Light/dark mode via `data-theme` attribute
5. **Centralized configuration** - All site config in `src/consts.ts`

---

## Naming Conventions

### Files & Directories
| Type | Convention | Example |
|------|------------|---------|
| Astro Components | PascalCase | `BlogCard.astro`, `RecentPosts.astro` |
| TypeScript utilities | kebab-case | `data-utils.ts`, `utils.ts` |
| Content files | kebab-case | `getting-started-typescript.md` |
| Pages | kebab-case or [...params] | `about.astro`, `[...slug].astro` |

### Code Identifiers
| Type | Convention | Example |
|------|------------|---------|
| Interfaces/Types | PascalCase | `Props`, `TimelineItem`, `SkillCategory` |
| Functions | camelCase | `getAllBlogPosts()`, `formatBlogDate()` |
| Constants | UPPER_SNAKE_CASE | `SITE`, `NAV_LINKS`, `SOCIAL_LINKS` |
| Variables | camelCase | `recentPosts`, `sortedProjects` |
| CSS custom properties | kebab-case | `--muted-foreground`, `--border` |

### Component Props
- Always define `interface Props` in frontmatter
- Use `class?: string` for optional className passthrough
- Destructure with defaults: `const { title, class: className } = Astro.props;`

---

## Astro Component Patterns

### Standard Component Structure
```astro
---
// 1. Imports (types first, then components, then utilities)
import type { CollectionEntry } from "astro:content";
import Link from "@/components/Link.astro";
import { cn } from "@/lib/utils";

// 2. Props interface
interface Props {
  post: CollectionEntry<"blog">;
  class?: string;
}

// 3. Destructure props
const { post, class: className } = Astro.props;

// 4. Data processing
const { title, description, tags } = post.data;
const formattedDate = formatBlogDate(post.data.publishDate);
---

<!-- 5. Template with Tailwind classes -->
<article class:list={cn("group", className)}>
  <h2 class="text-lg font-medium text-foreground">{title}</h2>
  <p class="text-sm text-muted-foreground">{description}</p>
</article>
```

### Export Types for Reuse
When a component defines types that other files need:
```astro
---
// In Skills.astro
export interface SkillCategory {
  name: string;
  skills: string[];
}

interface Props {
  categories: SkillCategory[];
}
---
```

### Client-Side Scripts
```astro
<!-- Inline script that reruns on navigation -->
<script is:inline data-astro-rerun>
  // Theme initialization
</script>

<!-- Module script (runs once, bundled) -->
<script>
  document.getElementById("theme-toggle")?.addEventListener("click", handleToggleClick);
</script>
```

---

## Tailwind CSS Patterns

### Class Merging with cn()
Always use the `cn()` utility for conditional or merged classes:
```typescript
import { cn } from "@/lib/utils";

// Basic usage
cn("text-red-500", "bg-blue-500")

// Conditional classes
cn("p-4", isActive && "bg-muted", className)

// With class:list directive
<div class:list={cn("base-class", condition && "conditional-class", className)}>
```

### Theming System
Use semantic color tokens, not raw colors:
```typescript
// ✅ Correct - uses theme tokens
"text-foreground"
"bg-background"
"text-muted-foreground"
"border-border"
"bg-muted"
"text-primary"

// ❌ Avoid - raw colors
"text-gray-900"
"bg-white"
"border-gray-200"
```

### Common Tailwind Patterns
```typescript
// Card/container styling
"border border-border rounded-lg"

// Interactive hover states
"hover:bg-muted/50 transition-all duration-300 ease-in-out"
"hover:text-foreground transition-colors"

// Responsive flex layouts
"flex flex-col sm:flex-row gap-4"

// Typography hierarchy
"text-3xl font-bold text-foreground"    // H1
"text-2xl font-semibold text-foreground" // H2
"text-lg font-medium text-foreground"    // H3
"text-sm text-muted-foreground"          // Body/meta

// Icon button pattern
cn(
  "inline-flex items-center justify-center",
  "size-9 rounded-md",
  "border border-border bg-background",
  "text-foreground/60 hover:text-foreground",
  "hover:bg-muted transition-colors"
)
```

### Dark Mode
Dark mode is handled via `data-theme="dark"` attribute on `<html>`:
```css
@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));
```

Toggle classes with the dark variant selector:
```astro
<Sun class="[html[data-theme='dark']_&]:hidden" />
<Moon class="hidden [html[data-theme='dark']_&]:block" />
```

---

## Content Collections

### Schema Definition (src/content/config.ts)
```typescript
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    image: z.string().optional(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    order: z.number().optional(),
  }),
});

export const collections = { projects, blog };
```

### Frontmatter Examples

**Blog Post:**
```markdown
---
title: "Welcome to My Portfolio"
description: "An introduction to this website."
publishDate: 2026-01-09
tags: ["meta", "portfolio"]
image: "/blog/welcome.jpg"
imageAlt: "Welcome banner"
draft: false
---
```

**Project:**
```markdown
---
title: "Personal Portfolio Website"
description: "A minimal portfolio built with Astro."
tags: ["Astro", "TypeScript", "Tailwind CSS"]
github: "https://github.com/username/portfolio"
demo: "https://example.com"
image: "/projects/portfolio.jpg"
startDate: 2025-12-01
endDate: 2026-01-01
---
```

### Fetching Content
Use helpers from `@/lib/data-utils`:
```typescript
import { getAllBlogPosts, getAllProjects, sortProjects } from "@/lib/data-utils";

// Get all published posts (excludes drafts)
const posts = await getAllBlogPosts();

// With options
const posts = await getAllBlogPosts({ limit: 5, includeDrafts: false });

// Get projects
const projects = await getAllProjects();
const sortedProjects = sortProjects(projects, "date"); // "date" | "title" | "order"
```

---

## Page Patterns

### Static Page
```astro
---
import Header from "@/components/Header.astro";
import { SITE } from "@/consts";
import Layout from "@/layouts/Layout.astro";
import "@/styles/global.css";
---

<Layout title={`About - ${SITE.title}`}>
  <Header />
  <main class="w-full mx-auto flex grow flex-col gap-y-6 px-4 max-w-3xl">
    <!-- Page content -->
  </main>
</Layout>
```

### Dynamic Routes with getStaticPaths
```astro
---
import { getCollection } from "astro:content";

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

interface Props {
  post: CollectionEntry<"blog">;
}

const { post } = Astro.props;
const { Content } = await post.render();
---
```

### Paginated Routes
```astro
---
export async function getStaticPaths() {
  const allPosts = await getAllBlogPosts();
  const totalPages = Math.ceil(allPosts.length / SITE.postsPerPage);

  return Array.from({ length: totalPages }, (_, i) => {
    const page = i + 1;
    return {
      params: { page: page === 1 ? undefined : String(page) },
      props: { /* pagination data */ },
    };
  });
}
---
```

---

## Utility Functions

### cn() - Class Merging
```typescript
import { cn } from "@/lib/utils";

cn("base", condition && "conditional", props.class)
```

### Date Formatting
```typescript
import { formatBlogDate } from "@/lib/utils";
import { formatProjectDate } from "@/lib/data-utils";

formatBlogDate(new Date("2026-01-08")) // "January 8th, 2026"
formatProjectDate(startDate, endDate)  // "Dec 2025 - Jan 2026" or "Dec 2025 - Present"
```

### Pagination
```typescript
import { paginate } from "@/lib/data-utils";

const { items, currentPage, totalPages, hasNext, hasPrev } = paginate(allPosts, page);
```

---

## Configuration

### Site Constants (src/consts.ts)
```typescript
export const SITE = {
  title: "Site Name",
  description: "Site description",
  author: "Author Name",
  url: "https://example.com",
  postsPerPage: 10,
  projectsPerPage: 12,
} as const;

export const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
] as const;

export const SOCIAL_LINKS = {
  github: "https://github.com/username",
  twitter: "https://x.com/username",
} as const;
```

### Path Aliases
Use `@/*` to reference `src/*`:
```typescript
import { cn } from "@/lib/utils";
import BlogCard from "@/components/BlogCard.astro";
import { SITE } from "@/consts";
```

---

## Icons

Use **lucide-astro** for all icons:
```astro
---
import { Github, ArrowRight, Calendar, Tag } from "lucide-astro";
---

<Github size={18} />
<ArrowRight size={14} class="transition-transform group-hover:translate-x-1" />
```

---

## Common UI Components

### Link Component
Always use the custom Link component for proper external link handling:
```astro
import Link from "@/components/Link.astro";

<Link href="/about">Internal Link</Link>
<Link href="https://github.com" external>External Link</Link>
<Link href="/blog" underline>Underlined Link</Link>
```

### Card Pattern
```astro
<article class:list={cn("group", className)}>
  <Link
    href={url}
    class:list={cn(
      "flex flex-col sm:flex-row gap-4 overflow-hidden border border-border rounded-lg",
      "hover:bg-muted/50 transition-all duration-300 ease-in-out",
      "hover:shadow-md"
    )}
  >
    <!-- Image -->
    <div class="aspect-video sm:aspect-auto w-full sm:max-w-[256px] overflow-hidden bg-muted">
      <img class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
    </div>
    <!-- Content -->
    <div class="p-4 grow">
      <h3 class="text-lg font-medium text-foreground">{title}</h3>
      <p class="text-sm text-muted-foreground">{description}</p>
    </div>
  </Link>
</article>
```

### Tag Badge
```astro
<span class="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-md">
  {tag}
</span>
```

### Section with "View All" Link
```astro
<section class="flex flex-col gap-y-4">
  <div class="flex items-center justify-between">
    <h2 class="text-2xl font-medium text-foreground">Section Title</h2>
    <Link
      href="/path"
      class:list={cn(
        "inline-flex items-center gap-1.5 text-sm",
        "text-foreground/60 hover:text-foreground",
        "transition-colors group"
      )}
    >
      View all
      <ArrowRight size={14} class="transition-transform group-hover:translate-x-1" />
    </Link>
  </div>
  <!-- Section content -->
</section>
```

---

## Critical Don'ts

### ❌ Never Do These

1. **Don't use raw Tailwind colors** - Use semantic tokens (`text-foreground`, not `text-gray-900`)

2. **Don't skip TypeScript interfaces** - Always define `interface Props` for components

3. **Don't import global CSS multiple times** - Import `@/styles/global.css` only in pages, not components

4. **Don't use inline styles** - Use Tailwind classes or CSS custom properties

5. **Don't hardcode site configuration** - Use `SITE`, `NAV_LINKS`, `SOCIAL_LINKS` from `@/consts`

6. **Don't fetch content directly** - Use helper functions from `@/lib/data-utils`

7. **Don't use `<a>` tags directly** - Use the `Link` component for proper external link handling

8. **Don't skip accessibility** - Always include alt text, ARIA labels, semantic HTML

9. **Don't add unnecessary client JavaScript** - Astro is static-first; keep scripts minimal

10. **Don't use `console.log`** - Use `console.warn` or `console.error` only (enforced by ESLint)

---

## Code Quality

### Before Committing
```bash
bun run lint:fix    # Fix ESLint issues
bun run format      # Format with Prettier
bun run build       # Verify production build
```

### ESLint Rules
- Unused variables must be prefixed with `_`
- No `console.log` (only `warn`/`error` allowed)
- Prefer `const` over `let`
- No `var` declarations

### Import Organization
1. Type imports first
2. External packages
3. Internal components (`@/components/*`)
4. Internal utilities (`@/lib/*`)
5. Constants and data (`@/consts`, `@/data/*`)

---

## Quick Reference Examples

### Adding a New Blog Post
Create `src/content/blog/my-new-post.md`:
```markdown
---
title: "My New Post"
description: "A brief description of the post."
publishDate: 2026-01-15
tags: ["topic", "another-topic"]
---

Post content in Markdown...
```

### Adding a New Component
Create `src/components/MyComponent.astro`:
```astro
---
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  variant?: "default" | "outline";
  class?: string;
}

const { title, variant = "default", class: className } = Astro.props;
---

<div
  class:list={cn(
    "p-4 rounded-lg",
    variant === "default" && "bg-muted",
    variant === "outline" && "border border-border",
    className
  )}
>
  <h3 class="text-lg font-medium text-foreground">{title}</h3>
  <slot />
</div>
```

### Adding a New Data Utility Function
Add to `src/lib/data-utils.ts`:
```typescript
/**
 * Description of what this function does
 *
 * @param param - Parameter description
 * @returns Return value description
 *
 * @example
 * myFunction("input") // "output"
 */
export function myFunction(param: string): string {
  // Implementation
}
```

### Adding a New Page
Create `src/pages/my-page.astro`:
```astro
---
import Header from "@/components/Header.astro";
import { SITE } from "@/consts";
import Layout from "@/layouts/Layout.astro";
import "@/styles/global.css";
---

<Layout title={`My Page - ${SITE.title}`} description="Page description">
  <Header />
  <main class="w-full mx-auto flex grow flex-col gap-y-6 px-4 max-w-3xl pb-12">
    <h1 class="text-3xl font-bold text-foreground">My Page</h1>
    <!-- Content -->
  </main>
</Layout>
```

---

## Integration Points

### RSS Feed
The RSS feed is generated at `/rss.xml` via `src/pages/rss.xml.js`. It automatically includes all non-draft blog posts.

### External Links
External links automatically get `target="_blank"` and `rel="noopener noreferrer"` via the Link component.

### Theme Persistence
Theme preference is stored in `localStorage` and applied on page load via inline script in Layout.astro.

### Content Validation
All content is validated at build time via Zod schemas in `src/content/config.ts`. Invalid frontmatter will cause build failures.

---

## Keeping Instructions in Sync

> **IMPORTANT**: This instructions file must stay synchronized with the codebase.

### When to Update These Instructions

Update this file whenever you make changes that affect:

1. **Tech Stack Changes**
   - Adding/removing dependencies in `package.json`
   - Upgrading major versions of frameworks or libraries
   - Changing build tools or package manager

2. **Architecture Changes**
   - Adding new directories or reorganizing structure
   - Creating new content collections
   - Changing routing patterns
   - Adding new data layers or utilities

3. **New Patterns or Conventions**
   - Introducing new component patterns
   - Adding new utility functions to `@/lib/`
   - Creating new shared types or interfaces
   - Establishing new naming conventions

4. **Configuration Changes**
   - Modifying `src/consts.ts` structure
   - Changing Zod schemas in `src/content/config.ts`
   - Updating ESLint or Prettier rules
   - Adding new environment variables

5. **New UI Components**
   - Adding reusable components that should be documented
   - Creating new design patterns (cards, badges, sections)
   - Introducing new icon usage patterns

### How to Update

When making codebase changes, also update the relevant sections:

| Change Type | Sections to Update |
|-------------|-------------------|
| New dependency | Tech Stack |
| New directory | Architecture > Directory Structure |
| New component pattern | Astro Component Patterns, Common UI Components |
| New utility function | Utility Functions |
| New content schema | Content Collections |
| New page pattern | Page Patterns |
| Style/theming changes | Tailwind CSS Patterns |
| New anti-pattern discovered | Critical Don'ts |

### Sync Checklist

Before completing any significant PR or change:

- [ ] Tech Stack table reflects current `package.json`
- [ ] Directory Structure matches actual `src/` layout
- [ ] Code examples use current patterns (not deprecated ones)
- [ ] New utilities are documented with examples
- [ ] New components have usage examples
- [ ] Critical Don'ts list is current
