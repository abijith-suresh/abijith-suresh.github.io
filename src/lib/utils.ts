import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines Tailwind CSS classes with `clsx` and `tailwind-merge` for conditional and efficient styling.
 * @param inputs - Class values to combine.
 * @returns A merged string of Tailwind CSS classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date string into a human-readable format (e.g., "January 1, 2023").
 * @param date - The date string to format.
 * @returns A formatted date string.
 */
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
