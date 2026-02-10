import { Index } from "flexsearch";

import type { SearchResult } from "@/pages/api/search-index.json";

import { cacheIndex, getCachedIndex } from "./cache";
import { calculateRelevanceScore } from "./scoring";

const SEARCH_DEBOUNCE = 150;

let searchIndex: Index | null = null;
let searchData: SearchResult[] = [];
let searchTimer: ReturnType<typeof setTimeout> | null = null;
let resultsCallback: ((results: SearchResult[]) => void) | null = null;
let loadingCallback: ((loading: boolean) => void) | null = null;
let errorCallback: ((error: string | null) => void) | null = null;

function buildIndex(): void {
  searchIndex = new Index({
    tokenize: "forward",
  });

  searchData.forEach((item, idx) => {
    const searchableText = [item.title, item.description, item.tags.join(" ")]
      .join(" ")
      .toLowerCase();
    searchIndex?.add(idx, searchableText);
  });
}

export async function initSearchIndex(): Promise<void> {
  const cached = getCachedIndex();
  if (cached && cached.length > 0) {
    searchData = cached;
    buildIndex();
    return;
  }

  loadingCallback?.(true);
  errorCallback?.(null);

  try {
    const response = await fetch("/api/search-index.json");
    if (!response.ok) {
      throw new Error("Failed to load search index");
    }

    const data = (await response.json()) as SearchResult[];
    searchData = data;

    cacheIndex(data);
    buildIndex();
  } catch (err) {
    console.error("Error loading search index:", err);
    errorCallback?.("Failed to load search. Please try again.");
  } finally {
    loadingCallback?.(false);
  }
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
  if (searchTimer) {
    clearTimeout(searchTimer);
  }

  if (!query.trim()) {
    resultsCallback?.([]);
    return;
  }

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
    let searchResults = searchIndex.search(normalizedQuery, {
      limit: 100,
    });

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

    const matchedResults = searchResults
      .map((idx: number | string) => searchData[Number(idx)])
      .filter(Boolean);

    const scoredResults = matchedResults.map((result) => ({
      result,
      score: calculateRelevanceScore(result, query, normalizedQuery),
    }));

    scoredResults.sort((a, b) => b.score - a.score);

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

export { extractSnippet, highlightText } from "./highlighting";
