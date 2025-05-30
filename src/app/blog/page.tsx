import { getPosts } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="container max-w-4xl py-24">
      <h1 className="title mb-8">Blog</h1>

      {posts.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">No Posts Yet</h2>
          <p className="text-muted-foreground">
            Stay tuned! Blog posts are coming soon.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map(post => (
            <article key={post.slug} className="group relative rounded-lg border p-6 hover:border-foreground/50">
              <Link href={`/blog/${post.slug}`} className="absolute inset-0">
                <span className="sr-only">View Article</span>
              </Link>
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              {post.summary && (
                <p className="text-muted-foreground mb-4">{post.summary}</p>
              )}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {post.author && (
                  <>
                    <span>{post.author}</span>
                    <span>•</span>
                  </>
                )}
                {post.publishedAt && (
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
