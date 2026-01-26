# Portfolio

> Personal portfolio and blog built with Astro, featuring a clean design and content-first approach.

🌐 **Live Site**: [abijith-suresh.github.io](https://abijith-suresh.github.io)

## ✨ Features

- 📝 Blog with MDX support and syntax highlighting
- 🚀 Project showcase with filtering by tags
- 🔍 Full-text search powered by Pagefind
- 🌓 Dark/light theme with Rose Pine color scheme
- 📱 Responsive, mobile-first design
- ♿ Accessibility-focused with ARIA attributes
- 🗺️ Auto-generated sitemap and RSS feed
- ⚡ SPA-like navigation with View Transitions API

## 🛠️ Tech Stack

- **Framework**: [Astro 5.16+](https://astro.build)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **Content**: MDX with Expressive Code
- **Search**: [Pagefind](https://pagefind.app)
- **Package Manager**: Bun 1.3+ (or npm)
- **Deployment**: GitHub Pages

## 🚀 Getting Started

### Prerequisites

- Node.js v24+ (ES Module project)
- Bun 1.3+ (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/abijith-suresh/abijith-suresh.github.io.git
cd abijith-suresh.github.io

# Install dependencies
bun install

# Start development server
bun run dev
```

Visit `http://localhost:4321` to see the site.

## 📜 Commands

| Command                | Description                                       |
| ---------------------- | ------------------------------------------------- |
| `bun run dev`          | Start development server                          |
| `bun run build`        | Build for production (includes Pagefind indexing) |
| `bun run preview`      | Preview production build locally                  |
| `bun run lint`         | Run ESLint                                        |
| `bun run lint:fix`     | Auto-fix ESLint issues                            |
| `bun run format`       | Format code with Prettier                         |
| `bun run format:check` | Check formatting without changes                  |

### Pre-commit Validation

**CRITICAL**: Always run before committing:

```bash
bun install && bun run lint && bun run format:check && bun run build
```

## 📁 Project Structure

```
src/
├── components/       # Reusable Astro components
│   ├── mdx/         # MDX components (Callout, CodeBlock)
│   └── seo/         # SEO components (SEO, JsonLd)
├── content/          # Content collections (validated by Zod)
│   ├── blog/        # Blog posts (.md, .mdx)
│   ├── projects/    # Projects (.md, .mdx)
│   └── config.ts    # Content schemas
├── layouts/          # Page layouts
├── lib/              # Utilities and helpers
├── pages/            # File-based routing
│   ├── blog/        # Blog list and post pages
│   ├── projects/    # Project list and detail pages
│   ├── tags/        # Tag-based content filtering
│   ├── about.astro  # About page
│   ├── index.astro  # Home page
│   └── rss.xml.js   # RSS feed generation
├── styles/           # Global CSS
└── consts.ts         # Site constants
```

## 🎨 Customization

### Site Configuration

Edit `src/consts.ts` to customize:

- Site metadata (title, description, URL)
- Social links (GitHub, Twitter, LinkedIn)
- Posts per page
- Personal information and about content

### Theme Colors

The site uses the Rose Pine theme. To customize colors, edit `src/styles/global.css`.

## 📝 Content Management

### Adding a Blog Post

1. Create a new `.md` or `.mdx` file in `src/content/blog/`
2. Add frontmatter:

```yaml
---
title: "Your Post Title"
description: "Brief description"
publishDate: 2026-01-26
tags: ["tag1", "tag2"]
draft: false
---
```

3. Write your content using Markdown/MDX

### Adding a Project

1. Create a new `.md` file in `src/content/projects/`
2. Add frontmatter:

```yaml
---
title: "Project Name"
description: "Brief description"
tags: ["React", "TypeScript"]
github: "https://github.com/..."
demo: "https://demo.com"
startDate: 2025-12-01
---
```

## 🚢 Deployment

The site is configured for deployment on GitHub Pages. Pushes to `main` trigger automatic deployments via GitHub Actions.

### Deployment Workflow

1. Code is pushed to `main` branch
2. GitHub Actions workflow (`.github/workflows/gh-pages.yml`) triggers
3. Dependencies are installed and site is built
4. Build artifacts are deployed to GitHub Pages
5. Site is live at [abijith-suresh.github.io](https://abijith-suresh.github.io)

## 🧪 Code Quality

This project uses pre-commit hooks to ensure code quality:

- **Husky**: Manages Git hooks
- **lint-staged**: Runs linters/formatters on staged files
  - JS/TS/Astro files: ESLint auto-fix + Prettier
  - JSON/MD/MDX/CSS files: Prettier only

Configuration files:

- `.lintstagedrc.json` - lint-staged rules
- `.husky/pre-commit` - pre-commit hook
- `eslint.config.js` - ESLint configuration
- `.prettierrc` - Prettier configuration

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 👤 Author

**Abijith S**

- Website: [abijith-suresh.github.io](https://abijith-suresh.github.io)
- GitHub: [@abijith-suresh](https://github.com/abijith-suresh)
- Twitter: [@abijith_sh](https://twitter.com/abijith_sh)
- LinkedIn: [abijith-suresh](https://linkedin.com/in/abijith-suresh)
