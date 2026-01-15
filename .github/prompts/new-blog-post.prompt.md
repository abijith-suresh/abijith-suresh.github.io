---
name: new-blog-post
description: Create a new blog post with proper frontmatter
---

Create a new blog post in this Astro portfolio.

## Instructions

1. Create a new `.md` file in `src/content/blog/`
2. Use kebab-case for the filename (e.g., `my-new-post.md`)
3. Include all required frontmatter fields

## Required Information

- **Title:** ${input:title:What is the title of your blog post?}
- **Description:** ${input:description:Write a brief description (under 160 chars)}
- **Tags:** ${input:tags:Enter tags separated by commas}

## Template

```markdown
---
title: "${title}"
description: "${description}"
publishDate: ${CURRENT_DATE}
tags: [${tags}]
draft: false
---

Write your content here...

## Section 1

Content...

## Conclusion

Wrap up your post here.
```

## Validation

After creating, run:

```bash
bun run build
```
