---
applyTo: "src/content/**/*.md"
---

# Content Collection Guidelines

## Blog Post Frontmatter

Required fields are marked with `*`:

```yaml
---
title: "Your Post Title" # * Required
description: "Brief summary under 160 chars" # * Required
publishDate: 2026-01-15 # * Required (YYYY-MM-DD)
updatedDate: 2026-01-16 # Optional
tags: ["JavaScript", "Tutorial"] # * Required, array of strings
draft: false # Optional, defaults to false
image: "/blog/post-image.jpg" # Optional
imageAlt: "Description of image" # Optional
---
```

## Project Frontmatter

```yaml
---
title: "Project Name" # * Required
description: "What the project does" # * Required
tags: ["React", "TypeScript"] # * Required
github: "https://github.com/user/repo" # Optional
demo: "https://live-demo.com" # Optional
image: "/projects/project-image.jpg" # Optional
startDate: 2025-06-01 # * Required (YYYY-MM-DD)
endDate: 2026-01-01 # Optional (omit for ongoing)
order: 1 # Optional, for sorting
---
```

## Content Guidelines

- Use clear headings (`##`, `###`)
- Include code blocks with language specifiers
- Keep descriptions SEO-friendly (under 160 chars)
- Use kebab-case for filenames: `my-new-post.md`

## Date Format

Always use ISO format: `YYYY-MM-DD` (e.g., `2026-01-15`)

## Validation

Run `bun run build` to validate all content against Zod schemas in `src/content/config.ts`.
