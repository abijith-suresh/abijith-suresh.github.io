import { SITE } from "@/consts";
import { type CollectionEntry, getCollection } from "astro:content";

type Project = CollectionEntry<"projects">;
type Blog = CollectionEntry<"blog">;

/**
 * Get all projects with optional filtering
 */
export async function getAllProjects(options?: {
  featured?: boolean;
  tags?: string[];
  limit?: number;
}): Promise<Project[]> {
  let projects = await getCollection("projects");

  // Filter by featured status
  if (options?.featured !== undefined) {
    projects = projects.filter((project) => project.data.featured === options.featured);
  }

  // Filter by tags
  if (options?.tags && options.tags.length > 0) {
    projects = projects.filter((project) =>
      options.tags!.some((tag) => project.data.tags.includes(tag))
    );
  }

  // Apply limit
  if (options?.limit) {
    projects = projects.slice(0, options.limit);
  }

  return projects;
}

/**
 * Sort projects by different criteria
 */
export function sortProjects(
  projects: Project[],
  sortBy: "date" | "title" | "order" = "date"
): Project[] {
  const sorted = [...projects];

  switch (sortBy) {
    case "date":
      return sorted.sort((a, b) => b.data.startDate.valueOf() - a.data.startDate.valueOf());
    case "title":
      return sorted.sort((a, b) => a.data.title.localeCompare(b.data.title));
    case "order":
      return sorted.sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999));
    default:
      return sorted;
  }
}

/**
 * Get all unique tags from blog posts
 */
export async function getAllBlogTags(): Promise<string[]> {
  const posts = await getCollection("blog");
  const tags = new Set<string>();

  posts.forEach((post) => {
    post.data.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort();
}

/**
 * Get all unique tags from blog posts with counts
 */
export async function getAllBlogTagsWithCount(): Promise<Array<{ tag: string; count: number }>> {
  const posts = await getCollection("blog");
  const tagCounts = new Map<string, number>();

  // Filter out drafts
  const publishedPosts = posts.filter((post) => !post.data.draft);

  publishedPosts.forEach((post) => {
    post.data.tags.forEach((tag) => {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    });
  });

  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

/**
 * Format project date range
 */
export function formatProjectDate(startDate: Date, endDate?: Date): string {
  const formatMonth = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  const start = formatMonth(startDate);

  if (!endDate) {
    return `${start} - Present`;
  }

  const end = formatMonth(endDate);
  return `${start} - ${end}`;
}

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

/**
 * Get all published blog posts sorted by date
 */
export async function getAllBlogPosts(options?: {
  limit?: number;
  includeDrafts?: boolean;
}): Promise<Blog[]> {
  let posts = await getCollection("blog");

  // Filter out drafts unless explicitly included
  if (!options?.includeDrafts) {
    posts = posts.filter((post) => !post.data.draft);
  }

  // Sort by publish date (newest first)
  posts = posts.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());

  // Apply limit
  if (options?.limit) {
    posts = posts.slice(0, options.limit);
  }

  return posts;
}
