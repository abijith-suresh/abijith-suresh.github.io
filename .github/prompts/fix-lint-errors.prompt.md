---
name: fix-lint-errors
description: Automatically fix linting and formatting issues
---

Fix all linting and formatting issues in the codebase.

## Auto-fix Commands

```bash
# Fix ESLint issues
bun run lint:fix

# Fix Prettier formatting
bun run format

# Verify everything is fixed
bun run lint && bun run format:check
```

## Common ESLint Fixes

### Unused Variables

Prefix with underscore:

```typescript
// Before
const { data, error } = await fetch();

// After (if data is unused)
const { data: _data, error } = await fetch();
```

### Console Statements

Replace `console.log` with `console.warn` or `console.error`:

```typescript
// ❌ Not allowed
console.log("debug");

// ✅ Allowed
console.warn("Warning message");
console.error("Error occurred");
```

## After Fixing

Always verify the build still works:

```bash
bun run build
```
