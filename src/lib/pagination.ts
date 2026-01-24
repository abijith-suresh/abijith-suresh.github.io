import { SITE } from "@/consts";

/**
 * Paginate an array of items
 */
export function paginate<T>(
  items: T[],
  page: number,
  perPage: number = SITE.postsPerPage
): {
  items: T[];
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
} {
  // Input validation
  if (perPage <= 0) {
    throw new Error("perPage must be a positive number");
  }

  // Ensure page is at least 1
  const validPage = Math.max(1, Math.floor(page));

  const totalPages = Math.ceil(items.length / perPage);
  const currentPage = Math.max(1, Math.min(validPage, totalPages));
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;

  return {
    items: items.slice(start, end),
    currentPage,
    totalPages,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
  };
}
