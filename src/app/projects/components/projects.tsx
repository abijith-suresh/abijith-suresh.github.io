'use client'

import {
  StaggerIn,
  StaggerItem
} from '@/components/animations/framer/transitions'
import { ProjectsGridSkeleton } from '@/components/skeletons/project-skeleton'
import { ProjectMetadata } from '@/lib/projects'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

interface ProjectsProps {
  projects: ProjectMetadata[]
  isLoading?: boolean
  emptyMessage?: {
    title?: string
    description?: string
  }
}

/**
 * Renders a grid of project cards with optional loading states and empty messages.
 * Each project card links to its detailed page and displays an image, title, summary, and publish date.
 */
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
      <div className='rounded-lg border border-dashed p-8 text-center'>
        <h2 className='mb-2 text-xl font-semibold'>{emptyMessage.title}</h2>
        <p className='text-muted-foreground'>{emptyMessage.description}</p>
      </div>
    )
  }

  return (
    <StaggerIn>
      <ul className='grid grid-cols-1 gap-8 sm:grid-cols-2'>
        {projects.map((project, index) => (
          <StaggerItem key={project.slug} className='group relative'>
            <Link href={`/projects/${project.slug}`}>
              {project.image && (
                <div className='bg-muted h-72 w-full overflow-hidden sm:h-60 relative'>
                  <Image
                    src={project.image}
                    alt={project.title || ''}
                    fill
                    className='rounded-lg object-cover object-center transition-transform duration-500 group-hover:scale-105'
                    sizes='(max-width: 640px) 100vw, 50vw'
                    priority={index < 2}
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent'></div>
                </div>
              )}

              <div className='absolute inset-x-0 bottom-0 px-6 py-5'>
                <h2 className='title line-clamp-1 text-xl no-underline text-white'>
                  {project.title}
                </h2>
                <p className='line-clamp-1 text-sm text-gray-100'>
                  {project.summary}
                </p>
                <p className='text-xs font-light text-gray-200'>
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
