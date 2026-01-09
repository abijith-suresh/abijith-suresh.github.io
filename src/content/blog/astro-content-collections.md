---
title: "Building Type-Safe Content with Astro Collections"
description: "Learn how to use Astro's Content Collections API with Zod for type-safe content management."
publishDate: 2026-01-08
tags: ["astro", "typescript", "content-management"]
image: "/blog/astro-collections.jpg"
imageAlt: "Code editor showing Astro content collection configuration"
---

Astro's Content Collections API provides a powerful way to manage your content with full TypeScript support and runtime validation using Zod schemas.

## Why Content Collections?

Before Content Collections, managing blog posts or projects in an Astro site meant:

- Manual file imports and sorting
- No type safety for frontmatter
- Potential runtime errors from missing or incorrect data
- Inconsistent content structure

Content Collections solve these problems by providing:

1. **Type Safety**: Full TypeScript support for your content
2. **Validation**: Runtime checks using Zod schemas
3. **Better DX**: Autocomplete and error checking in your editor
4. **Performance**: Optimized content querying and caching

## Setting Up Collections

First, create a `src/content/config.ts` file:

```typescript
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
```

## Using Collections in Pages

Query your content with the `getCollection` function:

```astro
---
import { getCollection } from 'astro:content';

const posts = await getCollection('blog');
const sortedPosts = posts.sort(
  (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
);
---

<ul>
  {sortedPosts.map(post => (
    <li>
      <a href={`/blog/${post.slug}`}>{post.data.title}</a>
    </li>
  ))}
</ul>
```

## Advanced Features

### Filtering Collections

You can filter content based on frontmatter:

```typescript
const publishedPosts = await getCollection('blog', ({ data }) => {
  return data.draft !== true;
});
```

### Rendering Content

Use the `render()` method to get the compiled content:

```astro
---
import { getEntry } from 'astro:content';

const post = await getEntry('blog', 'welcome');
const { Content } = await post.render();
---

<article>
  <h1>{post.data.title}</h1>
  <Content />
</article>
```

## Benefits in Practice

After migrating to Content Collections, I noticed:

- **Fewer Bugs**: Type checking caught errors at build time
- **Better IDE Support**: Autocomplete for all frontmatter fields
- **Easier Refactoring**: Changing schemas updates all references
- **Faster Development**: Less time debugging content issues

## Conclusion

Content Collections are a game-changer for Astro sites with multiple content types. The combination of TypeScript and Zod validation provides confidence that your content is structured correctly, making development faster and more enjoyable.

If you're building an Astro site with blog posts, projects, or any structured content, I highly recommend using Content Collections from the start.
