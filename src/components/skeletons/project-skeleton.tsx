import { Skeleton } from '@/components/ui/skeleton'

export function ProjectSkeleton() {
  return (
    <div className="group relative rounded-lg border overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  )
}

export function ProjectsGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {Array.from({ length: count }).map((_, i) => (
        <ProjectSkeleton key={i} />
      ))}
    </div>
  )
}