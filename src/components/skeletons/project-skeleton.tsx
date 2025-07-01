import { Skeleton } from '@/components/ui/skeleton'

/**
 * Renders a skeleton loader for a single project card.
 * Displays animated placeholder elements for image, title, and description.
 */
export function ProjectSkeleton() {
  return (
    <div className='group relative overflow-hidden rounded-lg border'>
      <Skeleton className='h-48 w-full' />
      <div className='space-y-3 p-6'>
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
 * Renders a grid of `ProjectSkeleton` components.
 * Useful for displaying multiple project placeholders during data loading.
 * @param count - The number of project skeletons to display. Defaults to 4.
 */
export function ProjectsGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className='grid gap-8 md:grid-cols-2'>
      {Array.from({ length: count }).map((_, i) => (
        <ProjectSkeleton key={i} />
      ))}
    </div>
  )
}
