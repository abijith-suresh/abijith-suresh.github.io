import { getPosts } from '@/lib/posts'
import { Suspense } from 'react'
import Posts from '@/app/blog/components/posts'
import { PostsGridSkeleton } from '@/components/skeletons/post-skeleton'
import { ViewAllLink } from '@/components/view-all-link'

/**
 * Fetches and displays a limited number of recent blog posts.
 * Uses `Posts` component for rendering and `PostsGridSkeleton` for loading state.
 */
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

/**
 * Renders a section displaying recent blog posts.
 * Includes a heading, a link to view all posts, and a suspended `RecentPostsList` for data fetching.
 */
export default function RecentPosts() {
  return (
    <section className='pb-24'>
      <div>
        <div className='mb-12 flex items-center justify-between'>
          <h2 className='title'>Recent Blog Posts</h2>
          <ViewAllLink href='/blog' text='View all posts' />
        </div>

        <Suspense fallback={<PostsGridSkeleton count={2} />}>
          <RecentPostsList />
        </Suspense>
      </div>
    </section>
  )
}
