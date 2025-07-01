import { getPosts } from '@/lib/posts'
import Link from 'next/link'
import { Suspense } from 'react'
import Posts from '@/app/blog/components/posts'
import { PostsGridSkeleton } from '@/components/skeletons/post-skeleton'

async function RecentPostsList() {
  const posts = await getPosts(2)

  return (
    <Posts
      posts={posts}
      emptyMessage={{
        title: 'No Posts Yet',
        description: 'Stay tuned! New blog posts are coming soon.'
      }}
    />
  )
}

export default function RecentPosts() {
  return (
    <section className='pb-24'>
      <div>
        <div className='mb-12 flex items-center justify-between'>
          <h2 className='title'>Recent blog posts</h2>
          <Link
            href='/blog'
            className='text-muted-foreground hover:text-foreground underline decoration-1 underline-offset-2 transition-colors'
          >
            View all posts
          </Link>
        </div>

        <Suspense fallback={<PostsGridSkeleton count={2} />}>
          <RecentPostsList />
        </Suspense>
      </div>
    </section>
  )
}
