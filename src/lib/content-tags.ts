import { getAllBlogTagsWithCount } from "@/lib/blog";
import { getAllProjectTagsWithCount } from "@/lib/projects";

export type TagCounts = {
  tag: string;
  blogCount: number;
  projectCount: number;
  totalCount: number;
};

export async function getAllContentTagCounts(): Promise<TagCounts[]> {
  const blogTags = await getAllBlogTagsWithCount();
  const projectTags = await getAllProjectTagsWithCount();
  const tagMap = new Map<string, { blogCount: number; projectCount: number }>();

  blogTags.forEach(({ tag, count }) => {
    tagMap.set(tag, { blogCount: count, projectCount: 0 });
  });

  projectTags.forEach(({ tag, count }) => {
    const existing = tagMap.get(tag);
    if (existing) {
      existing.projectCount = count;
    } else {
      tagMap.set(tag, { blogCount: 0, projectCount: count });
    }
  });

  return Array.from(tagMap.entries())
    .map(([tag, counts]) => ({
      tag,
      blogCount: counts.blogCount,
      projectCount: counts.projectCount,
      totalCount: counts.blogCount + counts.projectCount,
    }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}
