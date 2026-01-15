---
name: validate-changes
description: Run full validation pipeline before committing
---

Run the complete validation sequence to ensure your changes are ready for commit.

## Validation Steps

Execute these commands in order:

```bash
# 1. Install dependencies (always do this first)
bun install

# 2. Run linter
bun run lint

# 3. Check formatting
bun run format:check

# 4. Build the project (validates content schemas too)
bun run build
```

## One-liner

```bash
bun install && bun run lint && bun run format:check && bun run build
```

## Common Issues & Fixes

### Lint Errors

```bash
bun run lint:fix
```

### Formatting Errors

```bash
bun run format
```

### Content Schema Errors

Check frontmatter in `src/content/blog/` or `src/content/projects/` against schemas in `src/content/config.ts`

## Expected Output

- Lint: No errors or warnings
- Format: "All matched files use Prettier code style!"
- Build: "62 page(s) built" (number may vary)
