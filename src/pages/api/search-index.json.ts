import type { APIContext } from "astro";
import { getCollection } from "astro:content";

/**
 * Search index data structure
 */
export interface SearchResult {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  url: string;
  content: string;
  type: "blog" | "project";
}

/**
 * Strip HTML tags from text
 */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Generate search index from blog posts and projects
 */
async function generateSearchIndex(): Promise<SearchResult[]> {
  const [blogPosts, projects] = await Promise.all([
    getCollection("blog"),
    getCollection("projects"),
  ]);

  const results: SearchResult[] = [];

  // Add blog posts
  for (const post of blogPosts) {
    if (post.data.draft) continue;

    const content = stripHtml(post.body || "");

    results.push({
      id: post.id,
      title: post.data.title,
      description: post.data.description,
      date: post.data.publishDate.toISOString(),
      tags: post.data.tags,
      url: `/blog/${post.slug}`,
      content: content.substring(0, 5000),
      type: "blog",
    });
  }

  // Add projects
  for (const project of projects) {
    const content = stripHtml(project.body || "");

    results.push({
      id: project.id,
      title: project.data.title,
      description: project.data.description,
      date: project.data.startDate.toISOString(),
      tags: project.data.tags,
      url: `/projects/${project.slug}`,
      content: content.substring(0, 5000),
      type: "project",
    });
  }

  // Sort by date (newest first)
  return results.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
}

/**
 * GET endpoint to serve search index
 */
export async function GET(_context: APIContext): Promise<Response> {
  const index = await generateSearchIndex();

  return new Response(JSON.stringify(index), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
