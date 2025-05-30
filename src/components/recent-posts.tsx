import Posts from '@/components/posts'
import { getPosts } from '@/lib/posts'
import Link from 'next/link'

export default async function RecentPosts() {
  const posts = await getPosts(2)

  return (
    <section className='pb-24'>
      <div>
        <h2 className='title mb-12'>Recent blog posts</h2>
        <Posts posts={posts} />

        <Link
          href='/blog'
          className='mt-8 inline-flex items-center gap-2 text-muted-foreground underline decoration-1 underline-offset-2 transition-colors hover:text-foreground'
        >
          <span>All blog posts</span>
        </Link>
      </div>
    </section>
  )
}