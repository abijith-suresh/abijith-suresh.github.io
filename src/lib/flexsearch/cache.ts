import type { SearchResult } from "@/pages/api/search-index.json";

const INDEX_CACHE_KEY = "search_index_data";
const INDEX_VERSION = "1.0";
const CACHE_VERSION_KEY = "search_index_version";

export function getCachedIndex(): SearchResult[] | null {
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

export function cacheIndex(data: SearchResult[]): void {
  try {
    localStorage.setItem(INDEX_CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_VERSION_KEY, INDEX_VERSION);
  } catch {
    // localStorage not available or quota exceeded
  }
}
