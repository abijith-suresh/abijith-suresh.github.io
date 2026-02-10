import { type CollectionEntry, getCollection } from "astro:content";

import { getAllTagsWithCount } from "@/lib/utils";

type Project = CollectionEntry<"projects">;

export async function getAllProjects(options?: {
  tags?: string[];
  limit?: number;
}): Promise<Project[]> {
  let projects = await getCollection("projects");

  if (options?.tags && options.tags.length > 0) {
    projects = projects.filter((project) =>
      options.tags!.some((tag) => project.data.tags.includes(tag))
    );
  }

  if (options?.limit) {
    projects = projects.slice(0, options.limit);
  }

  return projects;
}

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

export async function getAllProjectTagsWithCount(): Promise<Array<{ tag: string; count: number }>> {
  const projects = await getCollection("projects");
  return getAllTagsWithCount(projects, (project) => project.data.tags);
}

export async function getAllProjectTags(): Promise<string[]> {
  const tagsWithCount = await getAllProjectTagsWithCount();
  return tagsWithCount.map((t) => t.tag);
}
