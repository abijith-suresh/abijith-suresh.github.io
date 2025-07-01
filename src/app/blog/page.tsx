import Posts from '@/app/blog/components/posts'
import { getPosts } from '@/lib/posts'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Abijith',
  description:
    'Read my latest thoughts, tutorials, and insights about software development, tech, and more.',
  openGraph: {
    title: 'Blog | Abijith',
    description:
      'Read my latest thoughts, tutorials, and insights about software development, tech, and more.',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Blog | Abijith'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Abijith',
    description:
      'Read my latest thoughts, tutorials, and insights about software development, tech, and more.',
    images: ['/og-image.jpg']
  }
}

/**
 * Renders the main blog page, displaying a list of all blog posts.
 * Fetches post data and passes it to the `Posts` component for rendering.
 */
export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className='container max-w-4xl pt-40 pb-24'>
      <h1 className='title mb-8'>Blog</h1>
      <Posts posts={posts} />
    </div>
  )
}
