import { type CollectionEntry, getCollection } from "astro:content";

type Project = CollectionEntry<"projects">;

/**
 * Get all projects with optional filtering
 */
export async function getAllProjects(options?: {
  tags?: string[];
  limit?: number;
}): Promise<Project[]> {
  let projects = await getCollection("projects");

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
export function sortProjects(projects: Project[], sortBy: "date" | "title" = "date"): Project[] {
  const sorted = [...projects];

  switch (sortBy) {
    case "date":
      return sorted.sort((a, b) => b.data.startDate.valueOf() - a.data.startDate.valueOf());
    case "title":
      return sorted.sort((a, b) => a.data.title.localeCompare(b.data.title));
    default:
      return sorted;
  }
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
 * Get all unique tags from projects with counts
 */
export async function getAllProjectTagsWithCount(): Promise<Array<{ tag: string; count: number }>> {
  const projects = await getCollection("projects");
  const tagCounts = new Map<string, number>();

  projects.forEach((project) => {
    project.data.tags.forEach((tag) => {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    });
  });

  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

/**
 * Get all unique tags from projects (without counts)
 */
export async function getAllProjectTags(): Promise<string[]> {
  const tagsWithCount = await getAllProjectTagsWithCount();
  return tagsWithCount.map((t) => t.tag);
}
