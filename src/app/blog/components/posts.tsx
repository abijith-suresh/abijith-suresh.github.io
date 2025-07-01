'use client'

import {
  StaggerIn,
  StaggerItem
} from '@/components/animations/framer/transitions'
import { PostsGridSkeleton } from '@/components/skeletons/post-skeleton'
import { PostMetadata } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

interface PostsProps {
  posts: PostMetadata[]
  isLoading?: boolean
  emptyMessage?: {
    title?: string
    description?: string
  }
}

/**
 * Renders a grid of blog post cards with optional loading states and empty messages.
 * Each post card links to its detailed page and displays an image, title, summary, and publish date.
 */
export default function Posts({
  posts,
  isLoading = false,
  emptyMessage = {
    title: 'No Posts Yet',
    description: 'Stay tuned! Blog posts are coming soon.'
  }
}: PostsProps) {
  if (isLoading) {
    return <PostsGridSkeleton />
  }

  if (posts.length === 0) {
    return (
      <div className='rounded-lg border border-dashed p-8 text-center'>
        <h2 className='mb-2 text-xl font-semibold'>{emptyMessage.title}</h2>
        <p className='text-muted-foreground'>{emptyMessage.description}</p>
      </div>
    )
  }

  return (
    <StaggerIn>
      <ul className='grid grid-cols-1 gap-8 sm:grid-cols-2'>
        {posts.map((post, index) => (
          <StaggerItem key={post.slug} className='group relative'>
            <Link href={`/blog/${post.slug}`}>
              {post.image && (
                <div className='bg-muted h-72 w-full overflow-hidden sm:h-60 relative'>
                  <Image
                    src={post.image}
                    alt={post.title || ''}
                    fill
                    className='rounded-lg object-cover object-center transition-transform duration-500 group-hover:scale-105'
                    sizes='(max-width: 640px) 100vw, 50vw'
                    priority={index < 2}
                  />
                </div>
              )}

              <div className='bg-background/70 absolute inset-[1px] rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

              <div className='absolute inset-x-0 bottom-0 translate-y-2 px-6 py-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100'>
                <h2 className='title line-clamp-1 text-xl no-underline'>
                  {post.title}
                </h2>
                <p className='text-muted-foreground line-clamp-1 text-sm'>
                  {post.summary}
                </p>
                <p className='text-muted-foreground text-xs font-light'>
                  {formatDate(post.publishedAt ?? '')}
                </p>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </ul>
    </StaggerIn>
  )
}
