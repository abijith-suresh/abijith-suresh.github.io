export function extractSnippet(content: string, query: string, maxLength: number = 150): string {
  if (!content) return "";
  if (!query) return content.substring(0, maxLength) + (content.length > maxLength ? "..." : "");

  const queryLower = query.toLowerCase();
  const contentLower = content.toLowerCase();
  const index = contentLower.indexOf(queryLower);

  if (index === -1) {
    return content.substring(0, maxLength) + (content.length > maxLength ? "..." : "");
  }

  const start = Math.max(0, index - 50);
  const end = Math.min(content.length, index + query.length + maxLength - 50);
  let snippet = content.substring(start, end);

  if (start > 0) snippet = "..." + snippet;
  if (end < content.length) snippet = snippet + "...";

  return snippet;
}

export function highlightText(text: string, query: string): string {
  if (!query.trim() || !text) return text;

  try {
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escapedQuery})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  } catch {
    return text;
  }
}
