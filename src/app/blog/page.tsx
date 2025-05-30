import Posts from '@/components/sections/posts'
import { getPosts } from '@/lib/posts'

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="container max-w-4xl py-24">
      <h1 className="title mb-8">Blog</h1>
      <Posts posts={posts} />
    </div>
  )
}
