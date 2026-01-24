import { type CollectionEntry, getCollection } from "astro:content";

type Blog = CollectionEntry<"blog">;

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
 * Get all unique tags from blog posts (without counts)
 */
export async function getAllBlogTags(): Promise<string[]> {
  const tagsWithCount = await getAllBlogTagsWithCount();
  return tagsWithCount.map((t) => t.tag);
}
