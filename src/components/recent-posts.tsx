import Posts from '@/components/posts'
import { getPosts } from '@/lib/posts'
import Link from 'next/link'

export default async function RecentPosts() {
  const posts = await getPosts(2)

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

        <Posts
          posts={posts}
          emptyMessage={{
            title: "No Posts Yet",
            description: "Stay tuned! New blog posts are coming soon."
          }}
        />
      </div>
    </section>
  )
}