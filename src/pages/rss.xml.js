import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "@/consts";

export async function GET(context) {
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
}
