import Projects from '@/components/projects'
import { getProjects } from '@/lib/projects'
import Link from 'next/link'

export default async function RecentProjects() {
  const projects = await getProjects(2)

  return (
    <section className='pb-24'>
      <div>
        <div className="flex items-center justify-between mb-12">
          <h2 className='title'>Recent projects</h2>
          <Link
            href='/projects'
            className='text-muted-foreground underline decoration-1 underline-offset-2 transition-colors hover:text-foreground'
          >
            View all projects
          </Link>
        </div>

        <Projects
          projects={projects}
          emptyMessage={{
            title: "No Projects Yet",
            description: "Exciting projects are in the works! Check back soon."
          }}
        />
      </div>
    </section>
  )
}