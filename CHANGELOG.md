# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### February 2026

#### Added

- Portfolio redesign with Ink & Paper theme featuring editorial design, custom color palette, and Satoshi font
- Custom AS branding favicon replacing default Astro icon
- Font Awesome integration for social media icons
- Redesigned about page with centered layout, labeled content sections, and inline interests
- Year-based organization for blog and project listings
- Bluesky butterfly SVG icon

#### Changed

- Migrated to GitHub Pages deployment, removed Vercel analytics
- Related posts layout changed from grid to row-based design
- Improved content collection schemas with better TypeScript types
- Cleaned up code architecture by removing excessive comments and extracting modular components

#### Fixed

- Search modal view transitions and result URL handling
- Footer alignment and visibility issues
- Tag casing normalization to prevent duplicates

### January 2026

#### Added

- FlexSearch integration replacing Pagefind for improved search experience
- Comprehensive search modal with keyboard navigation and result highlighting
- RSS feed generation at `/rss.xml`
- DevContainer support for both Docker and Podman
- Dual licensing (MIT for code, CC BY 4.0 for content)
- Comprehensive AGENTS.md documentation for development guidelines
- SEO improvements including JsonLd structured data and meta tags
- JSDoc comments throughout codebase
- CI/CD pipeline with GitHub Actions for linting and deployment
- Pre-commit hooks with Husky and lint-staged

#### Changed

- Simplified theme system to two-option toggle (light/dark) with smooth animations
- Extracted shared patterns: consolidated blog and project cards, shared pagination logic
- Unified page transitions with prefetch strategy
- Refactored data utilities by domain (blog.ts, projects.ts, utils.ts)

#### Fixed

- MDX suspense errors in client components
- Build issues with TypeScript and import resolution
- Robots.txt sitemap URL to match canonical site URL
- Image loading optimization and position warnings
- Text readability on project/post cards in light mode

### December 2024

#### Added

- Initial migration from Next.js to Astro with Bun package manager
- Content collections with Zod schema validation for blog posts and projects
- Site configuration system with constants for navigation and social links
- Responsive layout with Header, Hero, Footer components
- Dynamic project listing with filtering and individual project pages
- Blog listing with recent posts and individual blog post pages
- About page with personal introduction
- Table of Contents (TOC) for blog posts
- Theme toggle with CSS custom properties
- Page view transitions with Astro's View Transitions API
- Shadcn/ui component integration with Tailwind CSS

#### Changed

- Migrated from Tailwind CSS v4 to v3 for better ecosystem compatibility
- Reorganized folder structure for better code organization
- Co-located page-specific components with their respective pages

[unreleased]: https://github.com/abijith-suresh/portfolio/compare/HEAD...HEAD
