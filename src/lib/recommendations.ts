import { type CollectionEntry, getCollection } from "astro:content";

type BlogPost = CollectionEntry<"blog">;

/**
 * Calculate similarity score between two blog posts based on shared tags
 */
function calculateSimilarity(currentPost: BlogPost, otherPost: BlogPost): number {
  const currentTags = new Set(currentPost.data.tags);
  const otherTags = otherPost.data.tags;

  // Count matching tags
  const matchingTags = otherTags.filter((tag) => currentTags.has(tag)).length;

  // Similarity score: number of matching tags
  return matchingTags;
}

/**
 * Get related posts based on tag similarity
 * @param currentPostSlug - Slug of the current blog post
 * @param limit - Maximum number of related posts to return (default: 3)
 * @returns Array of related blog posts sorted by relevance
 */
export async function getRelatedPosts(
  currentPostSlug: string,
  limit: number = 3
): Promise<BlogPost[]> {
  // Get all published blog posts
  const allPosts = await getCollection("blog", (post) => !post.data.draft);

  // Find the current post
  const currentPost = allPosts.find((post) => post.slug === currentPostSlug);

  if (!currentPost) {
    return [];
  }

  // Calculate similarity scores for all other posts
  const postsWithScores = allPosts
    .filter((post) => post.slug !== currentPostSlug) // Exclude current post
    .map((post) => ({
      post,
      score: calculateSimilarity(currentPost, post),
      date: post.data.publishDate.valueOf(),
    }))
    .filter((item) => item.score > 0) // Only include posts with at least one matching tag
    .sort((a, b) => {
      // Sort by similarity score first (descending)
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      // If scores are equal, sort by date (newest first)
      return b.date - a.date;
    });

  // If we don't have enough related posts with matching tags, fill with recent posts
  if (postsWithScores.length < limit) {
    const remainingSlots = limit - postsWithScores.length;
    const existingSlugs = new Set([
      currentPostSlug,
      ...postsWithScores.map((item) => item.post.slug),
    ]);

    const recentPosts = allPosts
      .filter((post) => !existingSlugs.has(post.slug))
      .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf())
      .slice(0, remainingSlots)
      .map((post) => ({ post, score: 0, date: post.data.publishDate.valueOf() }));

    postsWithScores.push(...recentPosts);
  }

  // Return limited number of posts
  return postsWithScores.slice(0, limit).map((item) => item.post);
}
