import { getProjects } from '@/lib/projects'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="container max-w-4xl py-24">
      <h1 className="title mb-8">Projects</h1>

      {projects.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">No Projects Yet</h2>
          <p className="text-muted-foreground">
            Exciting projects are in the works! Check back soon.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map(project => (
            <article key={project.slug} className="group relative rounded-lg border overflow-hidden">
              <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-10">
                <span className="sr-only">View Project</span>
              </Link>

              {project.image && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title || 'Project thumbnail'}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              )}

              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                {project.summary && (
                  <p className="text-muted-foreground mb-4">{project.summary}</p>
                )}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {project.author && (
                    <>
                      <span>{project.author}</span>
                      <span>•</span>
                    </>
                  )}
                  {project.publishedAt && (
                    <time dateTime={project.publishedAt}>
                      {formatDate(project.publishedAt)}
                    </time>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
