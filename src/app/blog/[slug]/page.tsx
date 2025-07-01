import MDXArticle from '@/components/mdx/mdx-article'
import BlogSchema from '@/components/seo/blog-schema'
import { getPostBySlug } from '@/lib/posts'
import { notFound } from 'next/navigation'
import { ArticleHeader } from '@/components/article-header'
import { PageTransition } from '@/components/animations/page/page-transition'

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
    <PageTransition>
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
    </PageTransition>
  )
}
