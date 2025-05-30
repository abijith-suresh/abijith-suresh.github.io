import { getPosts } from '@/lib/posts'
import Link from 'next/link'
import { Suspense } from 'react'
import Posts from '@/components/sections/posts'
import { PostsGridSkeleton } from '@/components/skeletons/post-skeleton'

async function RecentPostsList() {
  const posts = await getPosts(2)

  return (
    <Posts
      posts={posts}
      emptyMessage={{
        title: "No Posts Yet",
        description: "Stay tuned! New blog posts are coming soon."
      }}
    />
  )
}

export default function RecentPosts() {
  return (
    <section className='pb-24'>
      <div>
        <div className="flex items-center justify-between mb-12">
          <h2 className='title'>Recent blog posts</h2>
          <Link
            href='/blog'
            className='text-muted-foreground underline decoration-1 underline-offset-2 transition-colors hover:text-foreground'
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