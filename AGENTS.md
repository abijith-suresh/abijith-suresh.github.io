# AGENTS.md

This file contains guidelines and commands for AI agents working on this portfolio codebase.

## Project Overview

- **Type**: Personal portfolio website with blog functionality
- **Framework**: Astro 5.16.6 (static site generator)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4.1.18 with custom theming
- **Package Manager**: Bun
- **Content**: Astro Content Collections with Zod validation

## Available Commands

### Development
```bash
bun run dev          # Start development server
bun run build        # Build for production
bun run preview      # Preview production build
bun run astro        # Direct Astro CLI access
```

### Testing & Quality
⚠️ **No linting, formatting, or testing commands currently configured**
- Consider adding: `bun run lint`, `bun run format`, `bun run test`
- Recommend setting up ESLint, Prettier, and Vitest

## Code Style Guidelines

### TypeScript
- Use strict TypeScript configuration
- Define interfaces for component props before implementation
- Use JSDoc comments with examples for complex functions
- Leverage path aliases (`@/*` → `src/*`)

### Astro Components
```astro
---
// Frontmatter: imports and interfaces first
import type { ComponentProps } from 'astro/types';
import { SomeComponent } from '@/components/SomeComponent';

interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<!-- Template: clean separation of logic and presentation -->
<div class="container">
  <h1>{title}</h1>
  {description && <p>{description}</p>}
</div>

<script>
  // Client-side scripts in separate script tags
</script>
```

### CSS & Styling
- Use Tailwind CSS v4 with inline theme configuration
- Leverage CSS custom properties for theming (light/dark mode)
- Follow OKLCH color space conventions
- Use shadcn/ui-inspired design patterns

### File Organization
```
src/
├── components/          # Reusable Astro components
├── content/            # Content collections
│   ├── config.ts       # Zod schemas for validation
│   ├── blog/          # Blog posts (markdown)
│   └── projects/      # Project descriptions (markdown)
├── data/              # Static data (about, skills, experience)
├── layouts/           # Page layout components
├── lib/               # Utility functions and helpers
├── pages/             # Route-based pages
└── styles/           # Global CSS and theming
```

### Naming Conventions
- **Components**: PascalCase (e.g., `BlogCard`, `ProjectGrid`)
- **Functions**: camelCase (e.g., `formatDate`, `filterByTag`)
- **Files**: kebab-case for utilities, PascalCase for components
- **Constants**: UPPER_SNAKE_CASE in `/src/consts.ts`

### Content Management
- Use Astro Content Collections for type-safe content
- Define Zod schemas in `/src/content/config.ts`
- Store blog posts in `/src/content/blog/`
- Store projects in `/src/content/projects/`
- Use frontmatter validation for all content

### Error Handling
- Use TypeScript's strict type checking
- Validate content with Zod schemas
- Provide fallback values for optional props
- Use semantic HTML for accessibility

### Performance Guidelines
- Leverage Astro's static site generation
- Minimize client-side JavaScript
- Use proper image optimization
- Implement lazy loading where appropriate

### Accessibility
- Use semantic HTML5 elements
- Provide ARIA labels where needed
- Ensure keyboard navigation support
- Test with screen readers

## Development Workflow

1. **Before making changes**: Run `bun run dev` to start development server
2. **Content updates**: Edit markdown files in `/src/content/`
3. **Component changes**: Update Astro components in `/src/components/`
4. **Style changes**: Modify Tailwind classes or theme configuration
5. **Build verification**: Run `bun run build` before committing

## Important Notes

- No current linting/formatting setup - consider adding ESLint and Prettier
- No testing framework - consider adding Vitest
- Content is type-safe through Zod validation
- Theme system supports light/dark modes via CSS custom properties
- Uses Bun as package manager (see bun.lock file)

## Configuration Files

- `astro.config.mjs` - Astro configuration with Tailwind
- `tsconfig.json` - TypeScript strict configuration
- `package.json` - Dependencies and scripts
- `.vscode/extensions.json` - Recommended VSCode extensions

## When Adding Features

1. Follow existing component patterns in `/src/components/`
2. Use TypeScript interfaces for props
3. Add responsive design with Tailwind
4. Consider accessibility implications
5. Update content schemas if needed
6. Test both light and dark themes

## Common Patterns

- **Component composition**: Build complex UIs from simple components
- **Content collection queries**: Use `Astro.glob()` for type-safe content access
- **Utility functions**: Leverage `/src/lib/utils.ts` for common operations
- **Constants**: Use `/src/consts.ts` for shared values
- **Data utilities**: Use `/src/lib/data-utils.ts` for content processing