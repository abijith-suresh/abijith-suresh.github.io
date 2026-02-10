import type { SearchResult } from "@/pages/api/search-index.json";

export function calculateRelevanceScore(
  result: SearchResult,
  query: string,
  queryLower: string
): number {
  let score = 0;
  const titleLower = result.title.toLowerCase();
  const descLower = result.description.toLowerCase();
  const tagsLower = result.tags.join(" ").toLowerCase();

  if (titleLower === queryLower) {
    score += 1000;
  } else if (titleLower.startsWith(queryLower)) {
    score += 500;
  } else if (titleLower.includes(queryLower)) {
    score += 300;
  }

  const titleWords = titleLower.split(/\s+/);
  const queryWords = queryLower.split(/\s+/);
  for (const qWord of queryWords) {
    for (const tWord of titleWords) {
      if (tWord === qWord) score += 50;
      else if (tWord.startsWith(qWord)) score += 30;
      else if (tWord.includes(qWord)) score += 10;
    }
  }

  if (descLower.includes(queryLower)) {
    score += 100;
  }
  for (const qWord of queryWords) {
    if (descLower.includes(qWord)) score += 20;
  }

  for (const qWord of queryWords) {
    if (tagsLower.includes(qWord)) score += 40;
  }

  try {
    const postDate = new Date(result.date);
    const now = new Date();
    const daysSince = (now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSince < 30) score += 5;
    else if (daysSince < 90) score += 2;
  } catch {
    // Ignore date errors
  }

  return score;
}
