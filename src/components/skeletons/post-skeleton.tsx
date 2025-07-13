import { Skeleton } from '@/components/ui/skeleton'

/**
 * Renders a skeleton loader for a single blog post card.
 * Displays animated placeholder elements for title and summary.
 */
export function PostSkeleton() {
  return (
    <div className='group relative rounded-lg border p-6'>
      <div className='space-y-3'>
        <Skeleton className='h-6 w-2/3' />
        <Skeleton className='h-4 w-full' />
        <div className='flex items-center gap-2'>
          <Skeleton className='h-4 w-20' />
          <Skeleton className='h-4 w-4' />
          <Skeleton className='h-4 w-24' />
        </div>
      </div>
    </div>
  )
}

/**
 * Renders a grid of `PostSkeleton` components.
 * Useful for displaying multiple post placeholders during data loading.
 * @param count - The number of post skeletons to display. Defaults to 4.
 */
export function PostsGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className='space-y-8'>
      {Array.from({ length: count }).map((_, i) => (
        <PostSkeleton key={i} />
      ))}
    </div>
  )
}
