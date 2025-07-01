import { Skeleton } from '@/components/ui/skeleton'

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

export function PostsGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className='space-y-8'>
      {Array.from({ length: count }).map((_, i) => (
        <PostSkeleton key={i} />
      ))}
    </div>
  )
}
