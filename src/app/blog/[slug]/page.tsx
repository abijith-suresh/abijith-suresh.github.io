import MDXContent from '@/components/mdx-content'
import { getPostBySlug } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import { notFound } from 'next/navigation'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className='pt-40 pb-24'>
      <div className='container max-w-3xl'>
        {/* Header */}
        <header className='mb-8'>
          <h1 className='title mb-4'>{post.metadata.title}</h1>
          <div className='flex items-center gap-2 text-sm text-muted-foreground'>
            {post.metadata.author && (
              <>
                <span>{post.metadata.author}</span>
                <span>•</span>
              </>
            )}
            <time dateTime={post.metadata.publishedAt}>
              {formatDate(post.metadata.publishedAt ?? '')}
            </time>
          </div>
        </header>

        {/* Content */}
        <div>
          <MDXContent source={post.content} />
        </div>
      </div>
    </article>
  )
}