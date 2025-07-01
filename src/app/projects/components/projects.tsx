'use client';

import { StaggerIn, StaggerItem } from '@/components/animations/framer/transitions';
import { ProjectsGridSkeleton } from '@/components/skeletons/project-skeleton';
import { ProjectMetadata } from '@/lib/projects';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectsProps {
  projects: ProjectMetadata[]
  isLoading?: boolean
  emptyMessage?: {
    title?: string
    description?: string
  }
}

export default function Projects({
  projects,
  isLoading = false,
  emptyMessage = {
    title: 'No Projects Yet',
    description: 'Exciting projects are in the works! Check back soon.'
  }
}: ProjectsProps) {
  if (isLoading) {
    return <ProjectsGridSkeleton />
  }

  if (projects.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <h2 className="text-xl font-semibold mb-2">{emptyMessage.title}</h2>
        <p className="text-muted-foreground">
          {emptyMessage.description}
        </p>
      </div>
    )
  }

  return (
    <StaggerIn>
      <ul className='grid grid-cols-1 gap-8 sm:grid-cols-2'>
        {projects.map(project => (
          <StaggerItem key={project.slug} className='group relative'>
            <Link href={`/projects/${project.slug}`}>
              {project.image && (
                <div className='h-72 w-full overflow-hidden bg-muted sm:h-60'>
                  <Image
                    src={project.image}
                    alt={project.title || ''}
                    fill
                    className='rounded-lg object-cover object-center transition-transform duration-500 group-hover:scale-105'
                  />
                </div>
              )}

              <div className='absolute inset-[1px] rounded-lg bg-background/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

              <div className='absolute inset-x-0 bottom-0 translate-y-2 px-6 py-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100'>
                <h2 className='title line-clamp-1 text-xl no-underline'>
                  {project.title}
                </h2>
                <p className='line-clamp-1 text-sm text-muted-foreground'>
                  {project.summary}
                </p>
                <p className='text-xs font-light text-muted-foreground'>
                  {formatDate(project.publishedAt ?? '')}
                </p>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </ul>
    </StaggerIn>
  )
}