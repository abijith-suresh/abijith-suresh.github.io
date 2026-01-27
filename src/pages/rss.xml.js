import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "@/consts";

export async function GET(context) {
  // Validate site context first
  if (!context.site) {
    // eslint-disable-next-line no-undef
    console.error("RSS: site URL not configured in astro.config.mjs");
    /* eslint-disable-next-line no-undef */
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
      <rss version="2.0">
        <channel>
          <title>Error</title>
          <description>RSS feed unavailable: Site URL not configured</description>
        </channel>
      </rss>`,
      {
        status: 500,
        statusText: "Internal Server Error",
        headers: { "Content-Type": "application/rss+xml" },
      }
    );
  }

  try {
    const posts = await getCollection("blog", ({ data }) => {
      return data.draft !== true;
    });

    const sortedPosts = posts.sort(
      (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
    );

    return rss({
      title: SITE.title,
      description: SITE.description,
      site: context.site,
      xmlns: {
        content: "http://purl.org/rss/1.0/modules/content/",
        atom: "http://www.w3.org/2005/Atom",
      },
      customData: `
        <language>${SITE.locale}</language>
        <author>${SITE.author} (${SITE.url})</author>
      `,
      items: sortedPosts.map((post) => ({
        title: post.data.title,
        pubDate: post.data.publishDate,
        description: post.data.description,
        link: `/blog/${post.slug}/`,
        categories: post.data.tags,
        ...(post.data.updatedDate && {
          updatedDate: post.data.updatedDate,
        }),
      })),
    });
  } catch (error) {
    // eslint-disable-next-line no-undef
    console.error("RSS generation failed:", error.message);

    // Return user-friendly error response instead of failing the entire build
    /* eslint-disable-next-line no-undef */
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
      <rss version="2.0">
        <channel>
          <title>Error</title>
          <description>Failed to generate RSS feed: ${error.message}</description>
        </channel>
      </rss>`,
      {
        status: 500,
        statusText: "Internal Server Error",
        headers: { "Content-Type": "application/rss+xml" },
      }
    );
  }
}
