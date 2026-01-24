export function createSearchTagMeta(tags: string[], limit = 5): string {
  return tags.slice(0, limit).join(", ");
}
