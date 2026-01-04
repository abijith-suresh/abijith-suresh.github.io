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
