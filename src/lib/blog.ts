import { type CollectionEntry, getCollection } from "astro:content";

import { getAllTagsWithCount } from "@/lib/utils";

type Blog = CollectionEntry<"blog">;

export async function getAllBlogPosts(options?: {
  limit?: number;
  includeDrafts?: boolean;
}): Promise<Blog[]> {
  let posts = await getCollection("blog");

  if (!options?.includeDrafts) {
    posts = posts.filter((post) => !post.data.draft);
  }

  posts = posts.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());

  if (options?.limit) {
    posts = posts.slice(0, options.limit);
  }

  return posts;
}

export async function getAllBlogTagsWithCount(): Promise<Array<{ tag: string; count: number }>> {
  const posts = await getCollection("blog");
  const publishedPosts = posts.filter((post) => !post.data.draft);
  return getAllTagsWithCount(publishedPosts, (post) => post.data.tags);
}

export async function getAllBlogTags(): Promise<string[]> {
  const tagsWithCount = await getAllBlogTagsWithCount();
  return tagsWithCount.map((t) => t.tag);
}
