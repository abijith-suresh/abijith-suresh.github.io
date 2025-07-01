import MDXArticle from '@/components/mdx/mdx-article'
import BlogSchema from '@/components/seo/blog-schema'
import { getPostBySlug } from '@/lib/posts'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticleHeader } from '@/components/article-header'

type Props = {
  params: Promise<{ slug: string }>
}

/**
 * Generates dynamic metadata for a blog post page based on its slug.
 * Fetches post data to populate title, description, Open Graph, and Twitter metadata.
 * @param params - The parameters object containing the post slug.
 * @returns A Promise that resolves to the Metadata object for the page.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {}
  }

  const { title, summary, image, author, publishedAt } = post.metadata

  const ogImage = image || '/og-image.jpg'

  return {
    title: `${title} | Blog | Abijith`,
    description: summary,
    openGraph: {
      title: `${title} | Blog | Abijith`,
      description: summary,
      type: 'article',
      publishedTime: publishedAt,
      authors: author ? [author] : undefined,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Blog | Abijith`,
      description: summary,
      images: [ogImage]
    },
    alternates: {
      canonical: `https://abijith.sh/blog/${slug}`
    }
  }
}

/**
 * Renders a single blog post page.
 * Fetches post content by slug and displays it using the `MDXArticle` component.
 * Also includes `BlogSchema` for SEO purposes.
 * @param params - The parameters object containing the post slug.
 */
export default async function PostPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const url = `https://abijith.sh/blog/${slug}`

  return (
    <>
      <BlogSchema post={post.metadata} url={url} />
      <ArticleHeader
        title={post.metadata.title || ''}
        publishedAt={post.metadata.publishedAt}
        author={post.metadata.author}
        backLink={{
          href: '/blog',
          text: 'Back to Blog'
        }}
      />
      <MDXArticle content={post.content} />
    </>
  )
}
