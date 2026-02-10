import { Index } from "flexsearch";

import type { SearchResult } from "@/pages/api/search-index.json";

const INDEX_CACHE_KEY = "search_index_data";
const INDEX_VERSION = "1.0";
const CACHE_VERSION_KEY = "search_index_version";
const SEARCH_DEBOUNCE = 150;

let searchIndex: Index | null = null;
let searchData: SearchResult[] = [];
let searchTimer: ReturnType<typeof setTimeout> | null = null;
let resultsCallback: ((results: SearchResult[]) => void) | null = null;
let loadingCallback: ((loading: boolean) => void) | null = null;
let errorCallback: ((error: string | null) => void) | null = null;

function getCachedIndex(): SearchResult[] | null {
  try {
    const cachedVersion = localStorage.getItem(CACHE_VERSION_KEY);
    if (cachedVersion !== INDEX_VERSION) {
      localStorage.removeItem(INDEX_CACHE_KEY);
      localStorage.setItem(CACHE_VERSION_KEY, INDEX_VERSION);
      return null;
    }

    const cached = localStorage.getItem(INDEX_CACHE_KEY);
    if (cached) {
      return JSON.parse(cached) as SearchResult[];
    }
  } catch {
    // localStorage not available or error
  }
  return null;
}

function cacheIndex(data: SearchResult[]): void {
  try {
    localStorage.setItem(INDEX_CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_VERSION_KEY, INDEX_VERSION);
  } catch {
    // localStorage not available or quota exceeded
  }
}

function calculateRelevanceScore(result: SearchResult, query: string, queryLower: string): number {
  let score = 0;
  const titleLower = result.title.toLowerCase();
  const descLower = result.description.toLowerCase();
  const tagsLower = result.tags.join(" ").toLowerCase();

  // Exact title match (highest priority)
  if (titleLower === queryLower) {
    score += 1000;
  } else if (titleLower.startsWith(queryLower)) {
    score += 500;
  } else if (titleLower.includes(queryLower)) {
    score += 300;
  }

  // Title word matches
  const titleWords = titleLower.split(/\s+/);
  const queryWords = queryLower.split(/\s+/);
  for (const qWord of queryWords) {
    for (const tWord of titleWords) {
      if (tWord === qWord) score += 50;
      else if (tWord.startsWith(qWord)) score += 30;
      else if (tWord.includes(qWord)) score += 10;
    }
  }

  // Description match
  if (descLower.includes(queryLower)) {
    score += 100;
  }
  for (const qWord of queryWords) {
    if (descLower.includes(qWord)) score += 20;
  }

  // Tag matches
  for (const qWord of queryWords) {
    if (tagsLower.includes(qWord)) score += 40;
  }

  // Recency boost (newer posts get slight boost)
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

export async function initSearchIndex(): Promise<void> {
  // Check cache first
  const cached = getCachedIndex();
  if (cached && cached.length > 0) {
    searchData = cached;
    buildIndex();
    return;
  }

  // Fetch from API
  loadingCallback?.(true);
  errorCallback?.(null);

  try {
    const response = await fetch("/api/search-index.json");
    if (!response.ok) {
      throw new Error("Failed to load search index");
    }

    const data = (await response.json()) as SearchResult[];
    searchData = data;

    // Cache the data
    cacheIndex(data);

    // Build the FlexSearch index
    buildIndex();
  } catch (err) {
    console.error("Error loading search index:", err);
    errorCallback?.("Failed to load search. Please try again.");
  } finally {
    loadingCallback?.(false);
  }
}

function buildIndex(): void {
  searchIndex = new Index({
    tokenize: "forward",
  });

  // Index all items (search titles, descriptions, and tags only - not content body)
  searchData.forEach((item, idx) => {
    const searchableText = [item.title, item.description, item.tags.join(" ")]
      .join(" ")
      .toLowerCase();
    searchIndex?.add(idx, searchableText);
  });
}

export function setCallbacks(
  onResults: (results: SearchResult[]) => void,
  onLoading: (loading: boolean) => void,
  onError: (error: string | null) => void
): void {
  resultsCallback = onResults;
  loadingCallback = onLoading;
  errorCallback = onError;
}

export function clearCallbacks(): void {
  resultsCallback = null;
  loadingCallback = null;
  errorCallback = null;
}

export function search(query: string): void {
  // Clear existing timer
  if (searchTimer) {
    clearTimeout(searchTimer);
  }

  // Reset results for empty query
  if (!query.trim()) {
    resultsCallback?.([]);
    return;
  }

  // Debounce search
  searchTimer = setTimeout(() => {
    performSearch(query);
  }, SEARCH_DEBOUNCE);
}

function performSearch(query: string): void {
  if (!searchIndex || searchData.length === 0) {
    resultsCallback?.([]);
    return;
  }

  const normalizedQuery = query.toLowerCase().trim();

  try {
    // First try exact search
    let searchResults = searchIndex.search(normalizedQuery, {
      limit: 100,
    });

    // If no results, try with individual words
    if (searchResults.length === 0 && normalizedQuery.length > 2) {
      const words = normalizedQuery.split(/\s+/).filter((w) => w.length > 2);
      const wordResults = new Set<number>();

      for (const word of words) {
        const wordSearch = searchIndex.search(word, { limit: 50 });
        for (const idx of wordSearch) {
          wordResults.add(Number(idx));
        }
      }

      searchResults = Array.from(wordResults);
    }

    // Map results to data and calculate scores
    const matchedResults = searchResults
      .map((idx: number | string) => searchData[Number(idx)])
      .filter(Boolean);

    // Calculate relevance scores and sort
    const scoredResults = matchedResults.map((result) => ({
      result,
      score: calculateRelevanceScore(result, query, normalizedQuery),
    }));

    // Sort by score (descending)
    scoredResults.sort((a, b) => b.score - a.score);

    // Extract results
    const sortedResults = scoredResults.map((item) => item.result);

    resultsCallback?.(sortedResults);
  } catch (err) {
    console.error("Search error:", err);
    resultsCallback?.([]);
  }
}

export function getAllData(): SearchResult[] {
  return searchData;
}

export function clearSearchIndex(): void {
  searchIndex = null;
  searchData = [];
  if (searchTimer) {
    clearTimeout(searchTimer);
    searchTimer = null;
  }
}

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
