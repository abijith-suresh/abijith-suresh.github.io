# 🗺️ Production-Ready Portfolio: Remaining Features

> **Last Updated:** January 12, 2026  
> **Status:** In Progress  
> **Inspiration:** [astro-erudite](https://github.com/jktrn/astro-erudite) | [merox-erudite](https://github.com/meroxdotdev/merox-erudite)

This document outlines the remaining features and improvements needed to make this portfolio/blog production-ready.

---

## ✅ Completed Features

- ✅ **SEO & Meta Tags** - Full OG, Twitter cards, JSON-LD structured data
- ✅ **Sitemap** - Auto-generated with @astrojs/sitemap
- ✅ **Robots.txt** - Search engine crawler configuration
- ✅ **Site URL Configuration** - Configured in astro.config.mjs
- ✅ **View Transitions** - SPA-like navigation with prefetching
- ✅ **Footer** - Navigation and social links
- ✅ **404 Page** - Custom styled error page
- ✅ **Performance** - Link prefetching for faster navigation

---

## 📊 Remaining Features

| Category              | Target State                 | Priority  |
| --------------------- | ---------------------------- | --------- |
| **Content Format**    | MDX with components          | 🟡 High   |
| **Code Blocks**       | Expressive Code/Shiki        | 🟡 High   |
| **Typography**        | Full prose/typography plugin | 🟡 High   |
| **Favicons**          | Full favicon set             | 🟡 High   |
| **Reading Time**      | Calculated per post          | 🟢 Medium |
| **Table of Contents** | Auto-generated               | 🟢 Medium |
| **Author System**     | Full author profiles         | 🟢 Medium |
| **Comments**          | Giscus/Disqus                | 🟢 Medium |
| **Analytics**         | GA/Umami support             | 🟢 Medium |
| **Newsletter**        | Email integration            | 🔵 Low    |
| **Series/Subposts**   | Related posts                | 🔵 Low    |

---

## 🟡 High Priority (Should Have)

### 1. MDX Support for Rich Content

**Current State:** Plain Markdown only (`.md` files)

**Dependencies:**

```bash
bun add @astrojs/mdx
```

**Components to Create:**

```
src/components/mdx/
├── Callout.astro       # Note, Warning, Info, Tip callouts
├── CodeBlock.astro     # Enhanced code display (if needed beyond Expressive Code)
├── Image.astro         # Optimized image component with captions
├── Video.astro         # YouTube/video embeds
├── LinkCard.astro      # Rich link previews
└── index.ts            # Export all MDX components
```

**Callout Variants:**

- `note` - General information (blue)
- `tip` - Helpful suggestions (green)
- `warning` - Cautions (yellow)
- `danger` - Critical warnings (red)

**Acceptance Criteria:**

- [ ] MDX integration installed and configured
- [ ] Existing `.md` files still work
- [ ] Custom components available in MDX files
- [ ] Callout component with all variants

---

### 6. Code Syntax Highlighting (Expressive Code)

**Current State:** No syntax highlighting configuration

**Dependencies:**

```bash
bun add astro-expressive-code
```

**Configuration in `astro.config.mjs`:**

```typescript
import expressiveCode from "astro-expressive-code";

export default defineConfig({
  integrations: [
    expressiveCode({
      themes: ["github-dark", "github-light"],
      themeCssSelector: (theme) => `[data-theme="${theme.type}"]`,
      styleOverrides: {
        borderRadius: "0.5rem",
        borderColor: "var(--border)",
      },
      defaultProps: {
        wrap: true,
      },
    }),
    mdx(), // Must come after expressiveCode
  ],
});
```

**Features to Enable:**

- [ ] Syntax highlighting with theme support
- [ ] Code block titles/filenames
- [ ] Line highlighting (`{1,3-5}`)
- [ ] Line numbers (optional)
- [ ] Copy button
- [ ] Word wrap

**Acceptance Criteria:**

- [ ] Code blocks have proper syntax highlighting
- [ ] Theme switches with light/dark mode
- [ ] Copy button works
- [ ] Filenames display above code blocks

---

### 3. Typography/Prose Styling

**Current State:** Using `prose` classes but no typography plugin

**Dependencies:**

```bash
bun add -D @tailwindcss/typography
```

**Additional Packages for Heading Anchors:**

```bash
bun add rehype-slug rehype-autolink-headings
```

**CSS Customization in `global.css`:**

```css
.prose {
  --tw-prose-body: var(--foreground);
  --tw-prose-headings: var(--foreground);
  --tw-prose-links: var(--primary);
  --tw-prose-code: var(--foreground);
  /* ... more customizations */
}
```

**Acceptance Criteria:**

- [ ] Consistent typography in blog posts
- [ ] Headings have anchor links
- [ ] Code inline styling matches theme
- [ ] Links are properly styled

---

### 4. Favicon Set

**Current State:** Only `favicon.svg` in public folder

**Files to Create in `public/`:**

- [ ] `favicon.ico` (for legacy browsers)
- [ ] `favicon.svg` (already exists)
- [ ] `apple-touch-icon.png` (180x180)
- [ ] `favicon-96x96.png`
- [ ] `favicon-32x32.png`
- [ ] `favicon-16x16.png`
- [ ] `site.webmanifest`

**Create `src/components/Favicons.astro`:**

```astro
<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="shortcut icon" href="/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<meta name="apple-mobile-web-app-title" content="Abijith S" />
<link rel="manifest" href="/site.webmanifest" />
```

**Tool:** Use [RealFaviconGenerator](https://realfavicongenerator.net/) to generate all sizes

**Acceptance Criteria:**

- [ ] Favicon displays in all browsers
- [ ] Apple touch icon works on iOS
- [ ] Web manifest is valid

---

## 🟢 Medium Priority (Nice to Have)

### 5. Reading Time Calculation

**Current State:** ❌ Not shown

**Add to `src/lib/utils.ts`:**

```typescript
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
```

**Display Location:** Blog post header, blog card preview

**Acceptance Criteria:**

- [ ] Reading time shown on blog posts
- [ ] Accurate calculation based on word count
- [ ] Displayed as "X min read"

---

### 6. Table of Contents

**Current State:** ❌ Missing

**Create `src/components/TableOfContents.astro`:**

**Features:**

- [ ] Auto-generated from headings
- [ ] Collapsible on mobile
- [ ] Highlight current section on scroll
- [ ] Smooth scroll to section

**Implementation Options:**

1. Sticky sidebar (desktop)
2. Collapsible at top of post
3. Floating button that opens TOC

**Acceptance Criteria:**

- [ ] TOC generated from h2/h3 headings
- [ ] Clicking navigates to section
- [ ] Current section highlighted
- [ ] Works on mobile

---

### 7. Author System

**Current State:** No author content collection

**Create `src/content/authors/` collection:**

**Add to `src/content/config.ts`:**

```typescript
const authors = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    pronouns: z.string().optional(),
    avatar: z.string(),
    bio: z.string().optional(),
    website: z.string().url().optional(),
    twitter: z.string().url().optional(),
    github: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    mail: z.string().email().optional(),
  }),
});

export const collections = { projects, blog, authors };
```

**Update blog schema:**

```typescript
const blog = defineCollection({
  schema: z.object({
    // ... existing fields
    authors: z.array(z.string()).default(["abijith"]), // Reference author IDs
  }),
});
```

**Files to Create:**

- [ ] `src/content/authors/abijith.md`
- [ ] `src/pages/authors/[slug].astro`
- [ ] `src/components/AuthorCard.astro`

**Acceptance Criteria:**

- [ ] Author info displayed on blog posts
- [ ] Author profile pages exist
- [ ] Multiple authors per post supported

---

### 8. Comments System

**Current State:** ❌ No comments

**Recommended: Giscus (GitHub Discussions)**

**Create `src/components/Comments.astro`:**

```astro
---
interface Props {
  slug: string;
}
const { slug } = Astro.props;
---

<script
  src="https://giscus.app/client.js"
  data-repo="abijith-suresh/portfolio"
  data-repo-id="YOUR_REPO_ID"
  data-category="Blog Comments"
  data-category-id="YOUR_CATEGORY_ID"
  data-mapping="pathname"
  data-strict="0"
  data-reactions-enabled="1"
  data-emit-metadata="0"
  data-input-position="top"
  data-theme="preferred_color_scheme"
  data-lang="en"
  data-loading="lazy"
  crossorigin="anonymous"
  async></script>
```

**Setup Steps:**

1. [ ] Enable GitHub Discussions on repo
2. [ ] Install Giscus app on repo
3. [ ] Get repo ID and category ID
4. [ ] Add Comments component to blog post page

**Acceptance Criteria:**

- [ ] Comments load on blog posts
- [ ] Theme matches site theme
- [ ] Lazy loaded for performance

---

### 9. Post Navigation (Previous/Next)

**Current State:** ❌ No post navigation

**Create `src/components/PostNavigation.astro`:**

**Features:**

- [ ] Previous post link
- [ ] Next post link
- [ ] Show post title
- [ ] Keyboard navigation support

**Acceptance Criteria:**

- [ ] Navigation appears at bottom of posts
- [ ] Correct chronological order
- [ ] Links work correctly

---

### 10. Related Posts

**Current State:** ❌ Missing

**Create `src/components/RelatedPosts.astro`:**

**Logic:**

- Find posts with matching tags
- Exclude current post
- Limit to 3 related posts
- Fallback to recent posts if no matches

**Acceptance Criteria:**

- [ ] Shows related posts by tags
- [ ] Falls back gracefully
- [ ] Links work correctly

---

### 11. Analytics Support

**Current State:** ❌ No analytics

**Add to `src/consts.ts`:**

```typescript
export const ANALYTICS = {
  googleAnalyticsId: "", // G-XXXXXXX
  umamiWebsiteId: "", // uuid
  plausibleDomain: "", // domain
} as const;
```

**Create `src/components/Analytics.astro`:**

**Options:**

- [ ] Google Analytics 4
- [ ] Umami (privacy-focused, self-hosted)
- [ ] Plausible (privacy-focused, hosted)

**Acceptance Criteria:**

- [ ] Analytics loads only if configured
- [ ] Respects user privacy preferences
- [ ] Works with View Transitions

---

### 12. Back to Top Button

**Current State:** ❌ Missing

**Create `src/components/BackToTop.astro`:**

**Features:**

- [ ] Appears after scrolling down
- [ ] Smooth scroll to top
- [ ] Accessible (keyboard, screen reader)
- [ ] Animated appearance

**Acceptance Criteria:**

- [ ] Button appears after scrolling
- [ ] Clicking scrolls to top smoothly
- [ ] Accessible to all users

---

### 13. Skip to Content Link

**Current State:** ❌ Missing (accessibility)

**Add to `src/layouts/Layout.astro`:**

```astro
<a href="#main-content" class="sr-only focus:not-sr-only ..."> Skip to content </a>
```

**Acceptance Criteria:**

- [ ] Hidden by default
- [ ] Visible on keyboard focus
- [ ] Skips to main content area

---

### 14. Search Functionality

**Current State:** ❌ No search

**Recommended: Pagefind (static search)**

**Dependencies:**

```bash
bun add -D pagefind
```

**Build Script:**

```json
{
  "scripts": {
    "build": "astro build && pagefind --site dist"
  }
}
```

**Create `src/components/Search.astro`:**

**Acceptance Criteria:**

- [ ] Search works across all content
- [ ] Results show post titles and excerpts
- [ ] Keyboard navigable
- [ ] Works offline (static index)

---

## 🔵 Low Priority (Optional Enhancements)

### 15. Newsletter Integration

**Options:**

- Brevo (formerly Sendinblue)
- Buttondown
- ConvertKit
- Mailchimp

**Create `src/components/Newsletter.astro`:**

---

### 16. OG Image Generation

Auto-generate Open Graph images for blog posts.

**Dependencies:**

```bash
bun add satori @resvg/resvg-js
```

**Create `src/pages/og/[...slug].png.ts`:**

---

### 17. Share Buttons

**Create `src/components/ShareButtons.astro`:**

**Platforms:**

- [ ] Twitter/X
- [ ] LinkedIn
- [ ] Copy link
- [ ] Native share (mobile)

---

### 18. Post Series / Subposts

Group related posts into a series with navigation.

**Schema Addition:**

```typescript
const blog = defineCollection({
  schema: z.object({
    // ... existing
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
  }),
});
```

---

### 19. PWA Support

**Files to Create:**

- [ ] `public/site.webmanifest`
- [ ] Service worker for offline support
- [ ] Install prompt component

---

### 20. Copy Code Button Enhancement

If using custom code blocks instead of Expressive Code.

---

### 21. Image Optimization

**Use Astro's built-in image optimization:**

```astro
---
import { Image } from "astro:assets";
---

<Image src={import("./image.png")} alt="Description" />
```

---

## 📁 Remaining File Structure Changes

```
src/
├── components/
│   ├── mdx/
│   │   ├── Callout.astro
│   │   ├── CodeBlock.astro
│   │   ├── Image.astro
│   │   ├── LinkCard.astro
│   │   └── index.ts
│   ├── Analytics.astro         # NEW
│   ├── AuthorCard.astro        # NEW
│   ├── BackToTop.astro         # NEW
│   ├── Comments.astro          # NEW
│   ├── Favicons.astro          # NEW
│   ├── Newsletter.astro        # NEW (optional)
│   ├── PostNavigation.astro    # NEW
│   ├── ReadingTime.astro       # NEW
│   ├── RelatedPosts.astro      # NEW
│   ├── Search.astro            # NEW
│   ├── ShareButtons.astro      # NEW
│   ├── SkipToContent.astro     # NEW
│   └── TableOfContents.astro   # NEW
├── content/
│   ├── authors/                # NEW collection
│   │   └── abijith.md
│   ├── blog/
│   └── projects/
├── pages/
│   ├── authors/                # NEW
│   │   └── [slug].astro
│   ├── og/                     # NEW (optional)
│   │   └── [...slug].png.ts
│   └── ...
public/
├── favicon.ico                 # NEW
├── apple-touch-icon.png        # NEW
├── favicon-96x96.png           # NEW
├── favicon-32x32.png           # NEW
├── favicon-16x16.png           # NEW
├── site.webmanifest            # NEW
└── og/                         # NEW (optional) - static OG images
```

---

## 📦 Dependencies to Add

### Required (High Priority)

```bash
bun add @astrojs/mdx astro-expressive-code
bun add -D @tailwindcss/typography rehype-slug rehype-autolink-headings
```

### Optional (Medium + Low Priority)

```bash
# For math support
bun add remark-math rehype-katex

# For search
bun add -D pagefind

# For OG image generation
bun add satori @resvg/resvg-js
```

---

## 🎯 Implementation Phases

### Phase 1: Content Experience

- [ ] Add MDX support
- [ ] Install and configure Expressive Code
- [ ] Install typography plugin
- [ ] Configure prose styling
- [ ] Add heading anchors
- [ ] Full favicon set
- [ ] Create Favicons component

### Phase 2: Blog Enhancements

- [ ] Add reading time calculation
- [ ] Create Table of Contents component
- [ ] Add post navigation (prev/next)
- [ ] Create related posts component
- [ ] Back to top button
- [ ] Skip to content link

### Phase 3: Engagement Features

- [ ] Add comments (Giscus)
- [ ] Create search functionality (Pagefind)
- [ ] Add analytics support
- [ ] Share buttons

### Phase 4: Advanced Features (Optional)

- [ ] Author system & profiles
- [ ] Newsletter integration
- [ ] OG image generation
- [ ] PWA support
- [ ] Post series/subposts
- [ ] Callout components

---

## ✅ Quick Wins (< 1 hour each)

These can be done quickly to improve the site immediately:

1. [ ] Add reading time to blog posts
2. [ ] Add skip to content link
3. [ ] Back to top button
4. [ ] Install typography plugin
5. [ ] Add heading anchors

---

## 🧪 Testing Checklist

Before considering each feature complete:

- [ ] Works in light and dark mode
- [ ] Responsive on mobile, tablet, desktop
- [ ] Accessible (keyboard navigation, screen reader)
- [ ] No console errors
- [ ] Build succeeds without warnings
- [ ] Lighthouse score maintained (>90)

---

## 📚 Resources

### Documentation

- [Astro Documentation](https://docs.astro.build/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Expressive Code](https://expressive-code.com/)
- [MDX Documentation](https://mdxjs.com/)

### Inspiration Repositories

- [astro-erudite](https://github.com/jktrn/astro-erudite) - Original inspiration
- [merox-erudite](https://github.com/meroxdotdev/merox-erudite) - Extended features

### Tools

- [RealFaviconGenerator](https://realfavicongenerator.net/) - Favicon generation
- [Giscus](https://giscus.app/) - GitHub Discussions comments
- [Pagefind](https://pagefind.app/) - Static search

---

## 🤝 Contributing
