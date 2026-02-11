# MDX Components Cheatsheet

Quick reference for all available MDX components in this project.

## Table of Contents

- [Callout](#callout)
- [Image](#image)
- [Video](#video)

---

## Callout

Import:

```mdx
import Callout from "@/components/mdx/Callout.astro";
```

### Basic Usage

```mdx
<Callout variant="note">This is a note callout.</Callout>
```

### Variants

- `variant="note"` - Blue, informational
- `variant="tip"` - Green, helpful suggestions
- `variant="warning"` - Yellow, cautions
- `variant="danger"` - Red, critical warnings

### Custom Title

```mdx
<Callout variant="tip" title="Pro Tip">
  Content here
</Callout>
```

### Collapsible

```mdx
<Callout variant="note" title="Click to expand" collapsible>
  Hidden content here
</Callout>
```

---

## Image

Import:

```mdx
import Image from "@/components/mdx/Image.astro";
```

### Basic Usage

```mdx
<Image src="/path/to/image.jpg" alt="Descriptive text" />
```

### With Caption

```mdx
<Image src="/path/to/image.jpg" alt="Descriptive text" caption="Photo by Author" />
```

### External Images

```mdx
<Image src="https://example.com/image.jpg" alt="Descriptive text" />
```

---

## Video

Import:

```mdx
import Video from "@/components/mdx/Video.astro";
```

### YouTube Embed

```mdx
<Video id="YOUTUBE_VIDEO_ID" title="Video Title" />
```

**Note:** Use only the video ID, not the full URL.

**Example:**

- URL: `https://www.youtube.com/watch?v=dsTXcSeAZq8`
- ID: `dsTXcSeAZq8`

---

## Combining Components

You can use multiple components in the same file:

```mdx
---
title: "My Post"
description: "Description here"
publishDate: 2026-01-01
tags: []
draft: true
---

import Callout from "@/components/mdx/Callout.astro";
import Image from "@/components/mdx/Image.astro";
import Video from "@/components/mdx/Video.astro";

## Introduction

<Callout variant="tip">This post covers advanced techniques.</Callout>

## Visual Demo

<Image src="/images/demo.jpg" alt="Demo screenshot" caption="The final result" />

## Video Tutorial

<Video id="abc123" title="Step-by-step guide" />
```

---

## Markdown Within Components

All components support Markdown formatting inside:

```mdx
<Callout variant="note">
  You can use **bold**, *italic*, `code`, and [links](https://example.com).
</Callout>
```

## Tips

1. **Always** include component imports at the top after frontmatter
2. **Use descriptive** alt text for images
3. **Keep callouts** concise and focused
4. **Test locally** before setting `draft: false`
5. **Use captions** to add context to images
