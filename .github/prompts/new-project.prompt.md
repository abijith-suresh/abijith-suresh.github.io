---
name: new-project
description: Create a new project entry with proper frontmatter
---

Create a new project entry in this Astro portfolio.

## Instructions

1. Create a new `.md` file in `src/content/projects/`
2. Use kebab-case for the filename (e.g., `my-project.md`)
3. Include all required frontmatter fields

## Required Information

- **Title:** ${input:title:What is the name of your project?}
- **Description:** ${input:description:Describe what the project does}
- **Tags:** ${input:tags:Enter tech stack tags separated by commas}
- **GitHub URL:** ${input:github:GitHub repository URL (optional)}
- **Demo URL:** ${input:demo:Live demo URL (optional)}

## Template

```markdown
---
title: "${title}"
description: "${description}"
tags: [${tags}]
github: "${github}"
demo: "${demo}"
startDate: ${CURRENT_DATE}
---

Brief introduction to the project.

## Features

- Feature 1
- Feature 2
- Feature 3

## Technical Highlights

Describe the technical aspects...

## Future Enhancements

- Planned improvement 1
- Planned improvement 2
```

## Validation

After creating, run:

```bash
bun run build
```
