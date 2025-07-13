import { getProjects } from '@/lib/projects'
import { Suspense } from 'react'
import Projects from '@/app/projects/components/projects'
import { ProjectsGridSkeleton } from '@/components/skeletons/project-skeleton'
import { ViewAllLink } from '@/components/view-all-link'

/**
 * Fetches and displays a limited number of recent projects.
 * Uses `Projects` component for rendering and `ProjectsGridSkeleton` for loading state.
 */
async function RecentProjectsList() {
  const projects = await getProjects(2)

  return (
    <Projects
      projects={projects}
      emptyMessage={{
        title: 'No Projects Yet',
        description: 'Exciting projects are in the works! Check back soon.'
      }}
    />
  )
}

/**
 * Renders a section displaying recent projects.
 * Includes a heading, a link to view all projects, and a suspended `RecentProjectsList` for data fetching.
 */
export default function RecentProjects() {
  return (
    <section className='pb-24'>
      <div>
        <div className='mb-12 flex items-center justify-between'>
          <h2 className='title'>Recent Projects</h2>
          <ViewAllLink href='/projects' text='View all projects' />
        </div>

        <Suspense fallback={<ProjectsGridSkeleton count={2} />}>
          <RecentProjectsList />
        </Suspense>
      </div>
    </section>
  )
}
