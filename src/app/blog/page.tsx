import Posts from '@/components/posts'
import { getPosts } from '@/lib/posts'

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <section className='pt-40 pb-24'>
      <div className='container max-w-3xl'>
        <h1 className='title mb-12'>Blog</h1>
        <Posts posts={posts} />
      </div>
    </section>
  )
}
