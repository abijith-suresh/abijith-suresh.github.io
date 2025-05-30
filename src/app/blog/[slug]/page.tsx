import MDXArticle from '@/components/mdx/mdx-article'
import { getPostBySlug } from '@/lib/posts'
import { notFound } from 'next/navigation'

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <MDXArticle
      title={post.metadata.title || ''}
      publishedAt={post.metadata.publishedAt}
      author={post.metadata.author}
      content={post.content}
    />
  )
}
