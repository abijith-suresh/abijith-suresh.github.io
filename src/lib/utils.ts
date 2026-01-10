import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes with conditional logic
 * Based on shadcn/ui convention
 *
 * @param inputs - Class values to merge
 * @returns Merged class string
 *
 * @example
 * cn("text-red-500", "bg-blue-500") // "text-red-500 bg-blue-500"
 * cn("text-red-500", condition && "bg-blue-500") // Conditional classes
 * cn("p-4", "p-2") // "p-2" (latter takes precedence)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get ordinal suffix for a number (1st, 2nd, 3rd, 4th, etc.)
 */
function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
}

/**
 * Format blog post date with ordinal suffix
 *
 * @param date - Date to format
 * @returns Formatted date string (e.g., "January 8th, 2026")
 *
 * @example
 * formatBlogDate(new Date("2026-01-08")) // "January 8th, 2026"
 * formatBlogDate(new Date("2026-01-21")) // "January 21st, 2026"
 */
export function formatBlogDate(date: Date): string {
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  const suffix = getOrdinalSuffix(day);

  return `${month} ${day}${suffix}, ${year}`;
}
